(ns kami.modeler.app
  (:require [cljs.reader :as reader]
            [kami.modeling :as modeling]
            [kami.modeler.project :as project]
            [kami.webgpu.mesh :as gpu-mesh]))

(def cube (modeling/cube 2))
(def initial-scene (modeling/scene [(modeling/object 1 "Cube" cube)]))

(defonce state (atom {:scene initial-scene :selected-object 1 :next-id 2 :selected-face 1 :distance 0.5
                      :component-mode :face :selected-vertex nil :selected-edge nil
                      :history [initial-scene] :future [] :azimuth 0.7 :elevation 0.45
                      :mode :edit :profile :blender :project-id "untitled-model"
                      :project-name "Untitled Model" :revision 0 :save-status :clean}))
(defonce runtime (atom nil))

(defn- sub3 [a b] (mapv - a b))
(defn- cross [[ax ay az] [bx by bz]] [(- (* ay bz) (* az by)) (- (* az bx) (* ax bz)) (- (* ax by) (* ay bx))])
(defn- norm [v]
  (let [l (max 1.0e-8 (js/Math.hypot (nth v 0) (nth v 1) (nth v 2)))]
    (mapv #(/ % l) v)))
(defn- render-geometry [{:mesh/keys [vertices faces uvs]}]
  (let [triangles (mapcat (fn [f] (map (fn [i] [(first f) (nth f i) (nth f (inc i))]) (range 1 (dec (count f))))) faces)
        positions (vec (mapcat (fn [tri] (map #(nth vertices %) tri)) triangles))
        normals (vec (mapcat (fn [[a b c]] (repeat 3 (norm (cross (sub3 (nth vertices b) (nth vertices a)) (sub3 (nth vertices c) (nth vertices a)))))) triangles))]
    {:positions positions :normals normals
     :uvs (when uvs (vec (mapcat (fn [tri] (map #(nth uvs %) tri)) triangles)))
     :indices (vec (range (count positions)))}))
(defn- selected-object [] (modeling/find-object (:scene @state) (:selected-object @state)))
(defn- selected-mesh [] (:object/mesh (selected-object)))
(defn- channel->hex [value]
  (let [hex (.toString (js/Math.round (* 255 value)) 16)] (if (= 1 (count hex)) (str "0" hex) hex)))
(defn- color->hex [[r g b]] (str "#" (channel->hex r) (channel->hex g) (channel->hex b)))
(defn- hex->color [hex]
  (let [n (js/parseInt (subs hex 1) 16)]
    [(/ (bit-and (bit-shift-right n 16) 255) 255)
     (/ (bit-and (bit-shift-right n 8) 255) 255)
     (/ (bit-and n 255) 255) 1.0]))
(declare commit-scene!)

(defn- refresh-mesh! []
  (let [combined (modeling/scene-mesh (:scene @state))]
  (set! (.-__kami_modeler_mesh js/window) (clj->js combined))
  (when-let [{:keys [mesh-context]} @runtime]
    (swap! runtime assoc :draws
           (mapv (fn [{:object/keys [id material mesh]}]
                   {:object-id id
                    :color (subvec (vec (:material/base-color material)) 0 3)
                    :material {:metallic (:material/metallic material)
                               :roughness (:material/roughness material)}
                    :buffers (gpu-mesh/upload-mesh! mesh-context (render-geometry mesh))})
                 (modeling/scene-renderables (:scene @state)))))))

(defn- update-ui! []
  (let [{:keys [scene distance history future profile selected-face selected-vertex selected-edge component-mode mode save-status revision]} @state
        selected-id (:selected-object @state) mesh (selected-mesh) object (selected-object)]
    (set! (.-textContent (.getElementById js/document "distanceValue")) (.toFixed distance 2))
    (set! (.-textContent (.getElementById js/document "meshStats"))
          (str (count (:scene/objects scene)) " objects · " (count (:mesh/vertices (modeling/scene-mesh scene))) " vertices"))
    (set! (.-textContent (.getElementById js/document "selection"))
          (if (= mode :edit) (case component-mode
                               :vertex (if (some? selected-vertex) (str "Vertex " selected-vertex " selected") "No vertex selected")
                               :edge (if (some? selected-edge) (str "Edge " (pr-str selected-edge) " selected") "No edge selected")
                               (if (some? selected-face) (str "Face " selected-face " selected") "No face selected"))
              (str "Object · " (:object/name object))))
    (set! (.-textContent (.getElementById js/document "mode-toggle")) (if (= mode :edit) "Edit Mode" "Object Mode"))
    (set! (.-textContent (.getElementById js/document "tool")) (if (= mode :edit) (str (name component-mode) " Select") "Object Select"))
    (doseq [kind [:vertex :edge :face]]
      (.toggle (.-classList (.getElementById js/document (str "component-" (name kind)))) "selected" (= kind component-mode)))
    (doseq [id ["extrude" "inset" "scale" "move" "delete-face"]]
      (set! (.-disabled (.getElementById js/document id)) (or (not= mode :edit) (not= component-mode :face) (:object/locked? object))))
    (set! (.-disabled (.getElementById js/document "move")) (or (not= mode :edit) (:object/locked? object)))
    (let [tree (.getElementById js/document "scene-tree")]
      (set! (.-innerHTML tree) "")
      (doseq [o (:scene/objects scene)]
        (let [row (.createElement js/document "div") b (.createElement js/document "button")
              visible (.createElement js/document "button") locked (.createElement js/document "button")]
          (set! (.-className row) "outliner-row")
          (set! (.-textContent b) (str "◆ " (:object/name o)))
          (when (= selected-id (:object/id o)) (.add (.-classList b) "selected"))
          (.addEventListener b "click" #(when-not (:object/locked? o) (swap! state assoc :selected-object (:object/id o) :selected-face 0) (update-ui!)))
          (set! (.-textContent visible) (if (:object/visible? o) "◉" "○")) (set! (.-title visible) "Toggle visibility")
          (.addEventListener visible "click" #(commit-scene! (modeling/set-object-visible (:scene @state) (:object/id o) (not (:object/visible? o)))))
          (set! (.-textContent locked) (if (:object/locked? o) "🔒" "🔓")) (set! (.-title locked) "Toggle lock")
          (.addEventListener locked "click" #(commit-scene! (modeling/set-object-locked (:scene @state) (:object/id o) (not (:object/locked? o)))))
          (doseq [node [b visible locked]] (.appendChild row node)) (.appendChild tree row))))
    (when object
      (set! (.-value (.getElementById js/document "object-name")) (:object/name object))
      (doseq [[id value] (map vector ["tx" "ty" "tz"] (:object/translation object))]
        (set! (.-value (.getElementById js/document id)) value))
      (let [material (:object/material object)]
        (set! (.-value (.getElementById js/document "base-color"))
              (color->hex (:material/base-color material)))
        (doseq [[id key] [["metallic" :material/metallic] ["roughness" :material/roughness]]]
          (set! (.-value (.getElementById js/document id)) (get material key))
          (set! (.-textContent (.getElementById js/document (str id "-value")))
                (.toFixed (get material key) 2))))
      (let [parent-select (.getElementById js/document "object-parent")]
        (set! (.-innerHTML parent-select) "")
        (doseq [[value label] (concat [["" "None"]]
                                     (map (fn [o] [(str (:object/id o)) (:object/name o)])
                                          (remove #(= (:object/id %) selected-id) (:scene/objects scene))))]
          (let [option (.createElement js/document "option")] (set! (.-value option) value) (set! (.-textContent option) label) (.appendChild parent-select option)))
        (set! (.-value parent-select) (str (or (:object/parent object) ""))))
      (doseq [id ["object-name" "tx" "ty" "tz" "object-parent" "apply-transform" "add-mirror" "add-subdivision" "add-array" "delete-object"]]
        (set! (.-disabled (.getElementById js/document id)) (:object/locked? object)))
      (let [stack (.getElementById js/document "modifier-stack")]
        (set! (.-innerHTML stack) "")
        (doseq [[index mod] (map-indexed vector (:object/modifiers object))]
          (let [row (.createElement js/document "div") label (.createElement js/document "span")
                up (.createElement js/document "button") down (.createElement js/document "button") remove (.createElement js/document "button")]
            (set! (.-className row) "modifier-row")
            (set! (.-textContent label) (str (name (:modifier/kind mod)) " " (pr-str (:modifier/options mod))))
            (set! (.-textContent up) "↑") (set! (.-disabled up) (zero? index))
            (.addEventListener up "click" #(commit-scene! (modeling/update-object (:scene @state) (:selected-object @state) modeling/move-modifier (:modifier/id mod) (dec index))))
            (set! (.-textContent down) "↓") (set! (.-disabled down) (= index (dec (count (:object/modifiers object)))))
            (.addEventListener down "click" #(commit-scene! (modeling/update-object (:scene @state) (:selected-object @state) modeling/move-modifier (:modifier/id mod) (inc index))))
            (set! (.-textContent remove) "×")
            (.addEventListener remove "click" #(commit-scene! (modeling/update-object (:scene @state) (:selected-object @state) modeling/remove-modifier (:modifier/id mod))))
            (doseq [node [label up down remove]] (.appendChild row node)) (.appendChild stack row)))))
    (set! (.-textContent (.getElementById js/document "debug-state"))
          (js/JSON.stringify (clj->js {:objectCount (count (:scene/objects scene)) :selectedObject selected-id
                                       :faceCount (count (:mesh/faces mesh))
                                       :modifierCount (count (:object/modifiers object))
                                       :evaluatedVertices (count (:mesh/vertices (modeling/evaluated-object-mesh object)))
                                       :mode (name mode) :profile (name profile)
                                       :componentMode (name component-mode) :selectedVertex selected-vertex :selectedEdge selected-edge
                                       :visible (:object/visible? object) :locked (:object/locked? object) :parent (:object/parent object)
                                       :material (:object/material object)
                                       :uvCount (count (:mesh/uvs mesh))
                                       :projectVersion project/current-version :revision revision :saveStatus (name save-status)})))
    (set! (.-textContent (.getElementById js/document "project-status"))
          (str (name save-status) " · r" revision))
    (set! (.-disabled (.getElementById js/document "undo")) (= 1 (count history)))
    (set! (.-disabled (.getElementById js/document "redo")) (empty? future))
    (set! (.-textContent (.getElementById js/document "shortcutHint"))
          (case profile :maya "Ctrl+E Extrude · W Move · R Scale · Ctrl+D Duplicate"
                :max "Alt+E Extrude · W Move · R Scale · Ctrl+V Duplicate"
                :c4d "D Extrude · E Move · T Scale · Ctrl+drag Orbit"
                "E Extrude · I Inset · G Move · S Scale · X Delete · Tab Mode"))))

(defn- commit-scene! [scene]
  (swap! state (fn [s] (-> s (assoc :scene scene :future [] :save-status :dirty)
                            (update :history conj scene) (update :revision inc))))
  (refresh-mesh!) (update-ui!))
(defn- commit-mesh! [m]
  (commit-scene! (modeling/update-object (:scene @state) (:selected-object @state) assoc :object/mesh m)))
(defn- edit-mode? [] (and (= :edit (:mode @state)) (not (:object/locked? (selected-object)))))
(defn- face-edit? [] (and (edit-mode?) (= :face (:component-mode @state))))
(defn- extrude! []
  (when (face-edit?)
  (let [{:keys [selected-face distance]} @state mesh (selected-mesh)
        next-selected-face (dec (count (:mesh/faces mesh)))]
    (swap! state assoc :selected-face next-selected-face)
    (commit-mesh! (modeling/extrude-face mesh selected-face [0 0 distance])))))
(defn- inset! [] (let [{:keys [selected-face distance]} @state mesh (selected-mesh)] (when (and (face-edit?) (some? selected-face)) (commit-mesh! (modeling/inset-face mesh selected-face (max 0.05 (min 0.95 distance)))))))
(defn- scale! [] (let [{:keys [selected-face distance]} @state mesh (selected-mesh)] (when (and (face-edit?) (some? selected-face)) (commit-mesh! (modeling/scale-face mesh selected-face distance)))))
(defn- move! []
  (let [{:keys [component-mode selected-face selected-vertex selected-edge distance]} @state mesh (selected-mesh) delta [0 0 distance]]
    (when (edit-mode?)
      (case component-mode :vertex (when (some? selected-vertex) (commit-mesh! (modeling/translate-vertex mesh selected-vertex delta)))
            :edge (when selected-edge (commit-mesh! (modeling/translate-edge mesh selected-edge delta)))
            :face (when (some? selected-face) (commit-mesh! (modeling/translate-face mesh selected-face delta))) nil))))
(defn- delete-face! [] (let [{:keys [selected-face]} @state mesh (selected-mesh)] (when (and (face-edit?) (some? selected-face) (> (count (:mesh/faces mesh)) 1)) (commit-mesh! (modeling/delete-face mesh selected-face)) (swap! state assoc :selected-face 0) (update-ui!))))
(defn- undo! [] (when (> (count (:history @state)) 1) (swap! state (fn [s] (let [h (:history s) current (peek h) h' (pop h)] (assoc s :history h' :scene (peek h') :future (conj (:future s) current))))) (refresh-mesh!) (update-ui!)))
(defn- redo! [] (when-let [scene (peek (:future @state))] (swap! state (fn [s] (assoc s :scene scene :history (conj (:history s) scene) :future (pop (:future s))))) (refresh-mesh!) (update-ui!)))
(defn- duplicate-object! []
  (let [id (:next-id @state)]
    (commit-scene! (modeling/duplicate-object (:scene @state) (:selected-object @state) id))
    (swap! state assoc :selected-object id :next-id (inc id)) (update-ui!)))
(defn- delete-object! []
  (when (> (count (:scene/objects (:scene @state))) 1)
    (let [scene (modeling/delete-object (:scene @state) (:selected-object @state)) next-id (:object/id (first (:scene/objects scene)))]
      (swap! state assoc :selected-object next-id :selected-face 0) (commit-scene! scene))))
(defn- toggle-mode! [] (swap! state update :mode #(if (= % :edit) :object :edit)) (update-ui!))
(defn- set-component-mode! [kind]
  (swap! state assoc :component-mode kind :selected-vertex nil :selected-edge nil)
  (update-ui!))

(defn- editable-target? [event]
  (let [target (.-target event) tag (some-> target .-tagName .toLowerCase)]
    (or (#{"input" "select" "textarea"} tag) (.-isContentEditable target))))
(defn- command-for-event [event]
  (let [key (.toLowerCase (.-key event)) ctrl (or (.-ctrlKey event) (.-metaKey event)) alt (.-altKey event)
        profile (:profile @state)]
    (cond
      (and ctrl (= key "z") (.-shiftKey event)) :redo
      (and ctrl (= key "z")) :undo
      (and ctrl (= key "y")) :redo
      (= key "tab") :toggle-mode
      (= key "1") :vertex-mode (= key "2") :edge-mode (= key "3") :face-mode
      (= profile :blender) ({"e" :extrude "i" :inset "g" :move "s" :scale "x" :delete-face} key)
      (= profile :maya) (cond (and ctrl (= key "e")) :extrude (and ctrl (= key "d")) :duplicate-object
                              (= key "w") :move (= key "r") :scale (= key "delete") :delete-face)
      (= profile :max) (cond (and alt (= key "e")) :extrude (and ctrl (= key "v")) :duplicate-object
                             (= key "w") :move (= key "r") :scale (= key "delete") :delete-face)
      (= profile :c4d) ({"d" :extrude "i" :inset "e" :move "t" :scale "backspace" :delete-face} key))))
(defn- execute-command! [command]
  (case command :extrude (extrude!) :inset (inset!) :move (move!) :scale (scale!)
        :delete-face (delete-face!) :duplicate-object (duplicate-object!) :undo (undo!) :redo (redo!)
        :toggle-mode (toggle-mode!) :vertex-mode (set-component-mode! :vertex)
        :edge-mode (set-component-mode! :edge) :face-mode (set-component-mode! :face) nil))

(def ^:private storage-key "kami.modeler.project.v2")
(def ^:private backup-key "kami.modeler.project.backup")

(defn- project-document []
  (let [{:keys [project-id project-name scene selected-object selected-face selected-vertex selected-edge component-mode mode
                azimuth elevation profile]} @state]
    (project/document {:id project-id :name project-name :scene scene
                       :selection {:object-id selected-object :face-id selected-face :vertex-id selected-vertex
                                   :edge selected-edge :component-mode component-mode :mode mode}
                       :camera {:azimuth azimuth :elevation elevation}
                       :interaction {:profile profile}})))

(defn- save-project! []
  (let [serialized (pr-str (project-document))
        previous (.getItem js/localStorage storage-key)]
    (when previous (.setItem js/localStorage backup-key previous))
    (.setItem js/localStorage storage-key serialized)
    (swap! state assoc :save-status :saved)
    (update-ui!)))

(defn- apply-project! [value]
  (let [p (project/open value) scene (:project/scene p)
        selection (:project/selection p) camera (:project/camera p)
        interaction (:project/interaction p)
        object-id (or (:object-id selection) (:object/id (first (:scene/objects scene))))]
    (swap! state assoc :project-id (:project/id p) :project-name (:project/name p)
           :scene scene :selected-object object-id :selected-face (:face-id selection)
           :selected-vertex (:vertex-id selection) :selected-edge (:edge selection)
           :component-mode (:component-mode selection :face) :mode (:mode selection)
           :azimuth (:azimuth camera) :elevation (:elevation camera)
           :profile (:profile interaction) :history [scene] :future [] :save-status :saved)
    (set! (.-value (.getElementById js/document "profile")) (name (:profile interaction)))
    (refresh-mesh!) (update-ui!)))

(defn- load-project! []
  (when-let [serialized (.getItem js/localStorage storage-key)]
    (try (apply-project! (reader/read-string serialized))
         (catch :default _
           (when-let [backup (.getItem js/localStorage backup-key)]
             (apply-project! (reader/read-string backup)))))))

(defn- download-project! []
  (let [a (.createElement js/document "a")
        url (.createObjectURL js/URL (js/Blob. #js [(pr-str (project-document))]
                                             #js {:type "application/edn"}))]
    (set! (.-href a) url) (set! (.-download a) "model.kami-modeler.edn") (.click a)
    (js/setTimeout #(.revokeObjectURL js/URL url) 0)))

(defn- bytes->base64 [bytes]
  (let [chunk 8192 parts (array)]
    (loop [offset 0]
      (when (< offset (.-length bytes))
        (let [end (min (.-length bytes) (+ offset chunk)) chars (array)]
          (doseq [i (range offset end)] (.push chars (.fromCharCode js/String (aget bytes i))))
          (.push parts (.join chars "")) (recur end))))
    (js/btoa (.join parts ""))))

(defn- download-gltf! []
  (let [{:keys [positions normals indices]} (render-geometry (modeling/scene-mesh (:scene @state)))
        position-flat (vec (mapcat identity positions)) normal-flat (vec (mapcat identity normals))
        position-bytes (* 4 (count position-flat)) normal-bytes (* 4 (count normal-flat)) index-bytes (* 4 (count indices))
        buffer (js/ArrayBuffer. (+ position-bytes normal-bytes index-bytes)) view (js/DataView. buffer)]
    (doseq [[i value] (map-indexed vector position-flat)] (.setFloat32 view (* i 4) value true))
    (doseq [[i value] (map-indexed vector normal-flat)] (.setFloat32 view (+ position-bytes (* i 4)) value true))
    (doseq [[i value] (map-indexed vector indices)] (.setUint32 view (+ position-bytes normal-bytes (* i 4)) value true))
    (let [axes (apply map vector positions) minima (mapv #(reduce min %) axes) maxima (mapv #(reduce max %) axes)
          doc {:asset {:version "2.0" :generator "Kami Modeler / kami-engine"}
               :scene 0 :scenes [{:nodes [0]}] :nodes [{:name (:project-name @state) :mesh 0}]
               :meshes [{:name (:project-name @state) :primitives [{:attributes {:POSITION 0 :NORMAL 1} :indices 2
                                                                      :material 0 :mode 4}]}]
               :materials [{:name "Kami Material" :pbrMetallicRoughness {:baseColorFactor [0.35 0.58 1.0 1.0]
                                                                           :metallicFactor 0.0 :roughnessFactor 0.5}}]
               :buffers [{:byteLength (.-byteLength buffer)
                          :uri (str "data:application/octet-stream;base64," (bytes->base64 (js/Uint8Array. buffer)))}]
               :bufferViews [{:buffer 0 :byteOffset 0 :byteLength position-bytes :target 34962}
                             {:buffer 0 :byteOffset position-bytes :byteLength normal-bytes :target 34962}
                             {:buffer 0 :byteOffset (+ position-bytes normal-bytes) :byteLength index-bytes :target 34963}]
               :accessors [{:bufferView 0 :componentType 5126 :count (count positions) :type "VEC3" :min minima :max maxima}
                           {:bufferView 1 :componentType 5126 :count (count normals) :type "VEC3"}
                           {:bufferView 2 :componentType 5125 :count (count indices) :type "SCALAR"}]}
          a (.createElement js/document "a") url (.createObjectURL js/URL (js/Blob. #js [(js/JSON.stringify (clj->js doc) nil 2)] #js {:type "model/gltf+json"}))]
      (set! (.-href a) url) (set! (.-download a) "model.gltf") (.click a)
      (js/setTimeout #(.revokeObjectURL js/URL url) 0))))

(defn- draw! []
  (when-let [{:keys [draws] :as viewport} @runtime]
    (when (seq draws)
      (let [{:keys [azimuth elevation]} @state
            d 6.0
            eye [(* d (js/Math.cos elevation) (js/Math.cos azimuth))
                 (* d (js/Math.sin elevation))
                 (* d (js/Math.cos elevation) (js/Math.sin azimuth))]]
        (gpu-mesh/render-scene! viewport draws eye [0 0 0]))))
  (js/requestAnimationFrame draw!))

(defn- init-gpu! [canvas]
  (-> (gpu-mesh/init-canvas! canvas)
      (.then (fn [viewport]
               (reset! runtime viewport)
               (refresh-mesh!)
               (set! (.-textContent (.getElementById js/document "gpu-status")) "")
               (set! (.-__kami_modeler_ready js/window) true)
               (draw!)))
      (.catch (fn [e]
                (set! (.-textContent (.getElementById js/document "gpu-status"))
                      (str "WebGPU unavailable: " e))))))

(defn- normalize [v] (let [l (max 1.0e-9 (js/Math.hypot (nth v 0) (nth v 1) (nth v 2)))] (mapv #(/ % l) v)))
(defn- add3 [& vs] (apply mapv + vs))
(defn- mul3 [v s] (mapv #(* % s) v))
(defn- camera-eye [] (let [{:keys [azimuth elevation]} @state d 6] [(* d (js/Math.cos elevation) (js/Math.cos azimuth)) (* d (js/Math.sin elevation)) (* d (js/Math.cos elevation) (js/Math.sin azimuth))]))
(defn- pick-at! [canvas event]
  (let [r (.getBoundingClientRect canvas) x (- (* 2 (/ (- (.-clientX event) (.-left r)) (.-width r))) 1)
        y (- 1 (* 2 (/ (- (.-clientY event) (.-top r)) (.-height r)))) eye (camera-eye)
        f (normalize (mapv - [0 0 0] eye)) right (normalize (cross f [0 1 0])) up (cross right f)
        tan (js/Math.tan (/ js/Math.PI 6)) dir (normalize (add3 f (mul3 right (* x (/ (.-width r) (.-height r)) tan)) (mul3 up (* y tan))))
        object (selected-object) local-eye (mapv - eye (:object/translation object))
        kind (:component-mode @state) picked (modeling/pick-element (:object/mesh object) local-eye dir kind)]
    (when (some? picked)
      (case kind :vertex (swap! state assoc :selected-vertex picked)
            :edge (swap! state assoc :selected-edge picked)
            :face (swap! state assoc :selected-face picked) nil)
      (update-ui!))))

(defn ^:export init! []
  (let [canvas (.getElementById js/document "gpu-canvas") drag (atom nil)]
    (.addEventListener (.getElementById js/document "extrude") "click" extrude!)
    (.addEventListener (.getElementById js/document "inset") "click" inset!)
    (.addEventListener (.getElementById js/document "scale") "click" scale!)
    (.addEventListener (.getElementById js/document "move") "click" move!)
    (.addEventListener (.getElementById js/document "delete-face") "click" delete-face!)
    (.addEventListener (.getElementById js/document "undo") "click" undo!)
    (.addEventListener (.getElementById js/document "redo") "click" redo!)
    (.addEventListener (.getElementById js/document "save-project") "click" save-project!)
    (.addEventListener (.getElementById js/document "load-project") "click" load-project!)
    (.addEventListener (.getElementById js/document "distance") "input" #(swap! state assoc :distance (js/parseFloat (.. % -target -value))))
    (.addEventListener (.getElementById js/document "profile") "change" #(do (swap! state assoc :profile (keyword (.. % -target -value))) (update-ui!)))
    (.addEventListener canvas "contextmenu" #(.preventDefault %))
    (.addEventListener canvas "pointerdown" #(if (or (= 1 (.-button %)) (.-altKey %)) (reset! drag [(.-clientX %) (.-clientY %)]) (when (edit-mode?) (pick-at! canvas %))))
    (.addEventListener js/window "pointerup" #(reset! drag nil))
    (.addEventListener js/window "pointermove"
      (fn [event]
        (when-let [[x y] @drag]
          (swap! state update :azimuth + (* 0.008 (- (.-clientX event) x)))
          (swap! state update :elevation
                 (fn [e] (max -1.3 (min 1.3 (+ e (* 0.008 (- (.-clientY event) y)))))))
          (reset! drag [(.-clientX event) (.-clientY event)]))))
    (.addEventListener js/window "keydown"
                       #(when-not (editable-target? %)
                          (when-let [command (command-for-event %)]
                            (.preventDefault %) (execute-command! command))))
    (.addEventListener (.getElementById js/document "mode-toggle") "click" toggle-mode!)
    (doseq [kind [:vertex :edge :face]]
      (.addEventListener (.getElementById js/document (str "component-" (name kind))) "click" #(set-component-mode! kind)))
    (.addEventListener (.getElementById js/document "new-cube") "click"
                       #(let [id (:next-id @state) o (modeling/object id (str "Cube " id) cube {:translation [(* id 0.5) 0 0]})]
                          (swap! state assoc :selected-object id :selected-face 1 :next-id (inc id))
                          (commit-scene! (modeling/add-object (:scene @state) o))))
    (.addEventListener (.getElementById js/document "duplicate-object") "click" duplicate-object!)
    (.addEventListener (.getElementById js/document "delete-object") "click" delete-object!)
    (.addEventListener (.getElementById js/document "apply-transform") "click"
                       #(let [translation (mapv (fn [id] (js/parseFloat (.-value (.getElementById js/document id)))) ["tx" "ty" "tz"])
                              name (.-value (.getElementById js/document "object-name"))]
                          (commit-scene! (modeling/update-object (:scene @state) (:selected-object @state)
                                                                 (fn [o] (-> o (assoc :object/name name) (modeling/set-object-transform {:translation translation})))))))
    (.addEventListener (.getElementById js/document "object-parent") "change"
                       #(let [raw (.. % -target -value) parent-id (when (seq raw) (js/parseInt raw))]
                          (commit-scene! (modeling/reparent-object (:scene @state) (:selected-object @state) parent-id))))
    (.addEventListener (.getElementById js/document "base-color") "change"
                       #(let [material (assoc (:object/material (selected-object))
                                             :material/base-color (hex->color (.. % -target -value)))]
                          (commit-scene! (modeling/set-object-material (:scene @state) (:selected-object @state) material))))
    (doseq [[id key] [["metallic" :material/metallic] ["roughness" :material/roughness]]]
      (.addEventListener (.getElementById js/document id) "change"
                         #(let [material (assoc (:object/material (selected-object)) key
                                               (js/parseFloat (.. % -target -value)))]
                            (commit-scene! (modeling/set-object-material (:scene @state) (:selected-object @state) material)))))
    (doseq [[id kind options] [["add-mirror" :mirror {:axis :x}]
                               ["add-subdivision" :subdivision {:levels 1}]
                               ["add-array" :array {:count 3 :offset [2.5 0 0]}]]]
      (.addEventListener (.getElementById js/document id) "click"
                         #(commit-scene! (modeling/update-object (:scene @state) (:selected-object @state)
                                                                  modeling/add-modifier (modeling/modifier kind options)))))
    (.addEventListener (.getElementById js/document "unwrap-uv") "click"
                       #(let [axis (keyword (.-value (.getElementById js/document "unwrap-axis")))]
                          (commit-mesh! (modeling/planar-unwrap (selected-mesh) axis))))
    (.addEventListener (.getElementById js/document "import") "click" #(.click (.getElementById js/document "import-file")))
    (.addEventListener (.getElementById js/document "import-file") "change"
                       (fn [event]
                         (when-let [file (aget (.. event -target -files) 0)]
                           (-> (.text file)
                               (.then (fn [text]
                                        (let [m (reader/read-string text)]
                                          (if (modeling/valid-mesh? m)
                                            (apply-project! (modeling/scene [(modeling/object 1 "Imported" m)]))
                                            (apply-project! m)))))))))
    (.addEventListener (.getElementById js/document "export") "click" download-project!)
    (.addEventListener (.getElementById js/document "export-gltf") "click" download-gltf!)
    (update-ui!)
    (init-gpu! canvas)))
