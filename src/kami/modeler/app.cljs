(ns kami.modeler.app
  (:require [cljs.reader :as reader]
            [kami.modeling :as modeling]
            [kami.webgpu.mesh :as gpu-mesh]))

(def cube (modeling/cube 2))
(def initial-scene (modeling/scene [(modeling/object 1 "Cube" cube)]))

(defonce state (atom {:scene initial-scene :selected-object 1 :next-id 2 :selected-face 1 :distance 0.5
                      :history [initial-scene] :future [] :azimuth 0.7 :elevation 0.45
                      :mode :edit :profile :blender}))
(defonce runtime (atom nil))

(defn- sub3 [a b] (mapv - a b))
(defn- cross [[ax ay az] [bx by bz]] [(- (* ay bz) (* az by)) (- (* az bx) (* ax bz)) (- (* ax by) (* ay bx))])
(defn- norm [v]
  (let [l (max 1.0e-8 (js/Math.hypot (nth v 0) (nth v 1) (nth v 2)))]
    (mapv #(/ % l) v)))
(defn- render-geometry [{:mesh/keys [vertices faces]}]
  (let [triangles (mapcat (fn [f] (map (fn [i] [(first f) (nth f i) (nth f (inc i))]) (range 1 (dec (count f))))) faces)
        positions (vec (mapcat (fn [tri] (map #(nth vertices %) tri)) triangles))
        normals (vec (mapcat (fn [[a b c]] (repeat 3 (norm (cross (sub3 (nth vertices b) (nth vertices a)) (sub3 (nth vertices c) (nth vertices a)))))) triangles))]
    {:positions positions :normals normals :indices (vec (range (count positions)))}))
(defn- selected-object [] (modeling/find-object (:scene @state) (:selected-object @state)))
(defn- selected-mesh [] (:object/mesh (selected-object)))
(declare commit-scene!)

(defn- refresh-mesh! []
  (let [combined (modeling/scene-mesh (:scene @state))]
  (set! (.-__kami_modeler_mesh js/window) (clj->js combined))
  (when-let [{:keys [mesh-context]} @runtime]
    (swap! runtime assoc :buffers
           (gpu-mesh/upload-mesh! mesh-context (render-geometry combined))))))

(defn- update-ui! []
  (let [{:keys [scene distance history future profile selected-face mode]} @state
        selected-id (:selected-object @state) mesh (selected-mesh) object (selected-object)]
    (set! (.-textContent (.getElementById js/document "distanceValue")) (.toFixed distance 2))
    (set! (.-textContent (.getElementById js/document "meshStats"))
          (str (count (:scene/objects scene)) " objects · " (count (:mesh/vertices (modeling/scene-mesh scene))) " vertices"))
    (set! (.-textContent (.getElementById js/document "selection"))
          (if (= mode :edit) (if (some? selected-face) (str "Face " selected-face " selected") "No face selected")
              (str "Object · " (:object/name object))))
    (set! (.-textContent (.getElementById js/document "mode-toggle")) (if (= mode :edit) "Edit Mode" "Object Mode"))
    (set! (.-textContent (.getElementById js/document "tool")) (if (= mode :edit) "Face Select" "Object Select"))
    (doseq [id ["extrude" "inset" "scale" "move" "delete-face"]]
      (set! (.-disabled (.getElementById js/document id)) (not= mode :edit)))
    (let [tree (.getElementById js/document "scene-tree")]
      (set! (.-innerHTML tree) "")
      (doseq [o (:scene/objects scene)]
        (let [b (.createElement js/document "button")]
          (set! (.-textContent b) (str "◆ " (:object/name o)))
          (when (= selected-id (:object/id o)) (.add (.-classList b) "selected"))
          (.addEventListener b "click" #(do (swap! state assoc :selected-object (:object/id o) :selected-face 0) (update-ui!)))
          (.appendChild tree b))))
    (when object
      (set! (.-value (.getElementById js/document "object-name")) (:object/name object))
      (doseq [[id value] (map vector ["tx" "ty" "tz"] (:object/translation object))]
        (set! (.-value (.getElementById js/document id)) value))
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
                                       :mode (name mode) :profile (name profile)})))
    (set! (.-disabled (.getElementById js/document "undo")) (= 1 (count history)))
    (set! (.-disabled (.getElementById js/document "redo")) (empty? future))
    (set! (.-textContent (.getElementById js/document "shortcutHint"))
          (case profile :maya "Ctrl+E Extrude · W Move · R Scale · Ctrl+D Duplicate"
                :max "Alt+E Extrude · W Move · R Scale · Ctrl+V Duplicate"
                :c4d "D Extrude · E Move · T Scale · Ctrl+drag Orbit"
                "E Extrude · I Inset · G Move · S Scale · X Delete · Tab Mode"))))

(defn- commit-scene! [scene]
  (swap! state (fn [s] (-> s (assoc :scene scene :future []) (update :history conj scene))))
  (refresh-mesh!) (update-ui!))
(defn- commit-mesh! [m]
  (commit-scene! (modeling/update-object (:scene @state) (:selected-object @state) assoc :object/mesh m)))
(defn- edit-mode? [] (= :edit (:mode @state)))
(defn- extrude! []
  (when (edit-mode?)
  (let [{:keys [selected-face distance]} @state mesh (selected-mesh)
        next-selected-face (dec (count (:mesh/faces mesh)))]
    (swap! state assoc :selected-face next-selected-face)
    (commit-mesh! (modeling/extrude-face mesh selected-face [0 0 distance])))))
(defn- inset! [] (let [{:keys [selected-face distance]} @state mesh (selected-mesh)] (when (and (edit-mode?) (some? selected-face)) (commit-mesh! (modeling/inset-face mesh selected-face (max 0.05 (min 0.95 distance)))))))
(defn- scale! [] (let [{:keys [selected-face distance]} @state mesh (selected-mesh)] (when (and (edit-mode?) (some? selected-face)) (commit-mesh! (modeling/scale-face mesh selected-face distance)))))
(defn- move! [] (let [{:keys [selected-face distance]} @state mesh (selected-mesh)] (when (and (edit-mode?) (some? selected-face)) (commit-mesh! (modeling/translate-face mesh selected-face [0 0 distance])))))
(defn- delete-face! [] (let [{:keys [selected-face]} @state mesh (selected-mesh)] (when (and (edit-mode?) (some? selected-face) (> (count (:mesh/faces mesh)) 1)) (commit-mesh! (modeling/delete-face mesh selected-face)) (swap! state assoc :selected-face 0) (update-ui!))))
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
      (= profile :blender) ({"e" :extrude "i" :inset "g" :move "s" :scale "x" :delete-face} key)
      (= profile :maya) (cond (and ctrl (= key "e")) :extrude (and ctrl (= key "d")) :duplicate-object
                              (= key "w") :move (= key "r") :scale (= key "delete") :delete-face)
      (= profile :max) (cond (and alt (= key "e")) :extrude (and ctrl (= key "v")) :duplicate-object
                             (= key "w") :move (= key "r") :scale (= key "delete") :delete-face)
      (= profile :c4d) ({"d" :extrude "i" :inset "e" :move "t" :scale "backspace" :delete-face} key))))
(defn- execute-command! [command]
  (case command :extrude (extrude!) :inset (inset!) :move (move!) :scale (scale!)
        :delete-face (delete-face!) :duplicate-object (duplicate-object!) :undo (undo!) :redo (redo!)
        :toggle-mode (toggle-mode!) nil))

(defn- draw! []
  (when-let [{:keys [buffers] :as viewport} @runtime]
    (when buffers
      (let [{:keys [azimuth elevation]} @state
            d 6.0
            eye [(* d (js/Math.cos elevation) (js/Math.cos azimuth))
                 (* d (js/Math.sin elevation))
                 (* d (js/Math.cos elevation) (js/Math.sin azimuth))]]
        (gpu-mesh/render-frame! viewport buffers eye [0 0 0] [0.35 0.58 1.0]))))
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
        face (modeling/pick-face (:object/mesh object) local-eye dir)]
    (when (some? face) (swap! state assoc :selected-face face) (update-ui!))))

(defn ^:export init! []
  (let [canvas (.getElementById js/document "gpu-canvas") drag (atom nil)]
    (.addEventListener (.getElementById js/document "extrude") "click" extrude!)
    (.addEventListener (.getElementById js/document "inset") "click" inset!)
    (.addEventListener (.getElementById js/document "scale") "click" scale!)
    (.addEventListener (.getElementById js/document "move") "click" move!)
    (.addEventListener (.getElementById js/document "delete-face") "click" delete-face!)
    (.addEventListener (.getElementById js/document "undo") "click" undo!)
    (.addEventListener (.getElementById js/document "redo") "click" redo!)
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
    (doseq [[id kind options] [["add-mirror" :mirror {:axis :x}]
                               ["add-subdivision" :subdivision {:levels 1}]
                               ["add-array" :array {:count 3 :offset [2.5 0 0]}]]]
      (.addEventListener (.getElementById js/document id) "click"
                         #(commit-scene! (modeling/update-object (:scene @state) (:selected-object @state)
                                                                  modeling/add-modifier (modeling/modifier kind options)))))
    (.addEventListener (.getElementById js/document "import") "click" #(.click (.getElementById js/document "import-file")))
    (.addEventListener (.getElementById js/document "import-file") "change"
                       (fn [event]
                         (when-let [file (aget (.. event -target -files) 0)]
                           (-> (.text file)
                               (.then (fn [text]
                                        (let [m (reader/read-string text)]
                                          (let [scene (if (modeling/valid-mesh? m) (modeling/scene [(modeling/object 1 "Imported" m)]) m)]
                                          (when (:scene/objects scene)
                                            (swap! state assoc :scene scene :history [scene] :future [] :selected-object (:object/id (first (:scene/objects scene))) :selected-face 0)
                                            (refresh-mesh!)
                                            (update-ui!))))))))))
    (.addEventListener (.getElementById js/document "export") "click" #(let [a (.createElement js/document "a") data (pr-str (:scene @state))] (set! (.-href a) (.createObjectURL js/URL (js/Blob. #js [data] #js {:type "application/edn"}))) (set! (.-download a) "scene.edn") (.click a)))
    (update-ui!)
    (init-gpu! canvas)))
