(ns kami.modeler.app
  (:require [cljs.reader :as reader]
            [kami.modeling :as modeling]
            [kami.webgpu.mesh :as gpu-mesh]))

(def cube (modeling/cube 2))

(defonce state (atom {:mesh cube :selected-face 1 :distance 0.5 :history [cube]
                      :future [] :azimuth 0.7 :elevation 0.45 :profile :blender}))
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

(defn- refresh-mesh! []
  (set! (.-__kami_modeler_mesh js/window) (clj->js (:mesh @state)))
  (when-let [{:keys [mesh-context]} @runtime]
    (swap! runtime assoc :buffers
           (gpu-mesh/upload-mesh! mesh-context (render-geometry (:mesh @state))))))

(defn- update-ui! []
  (let [{:keys [mesh distance history future profile selected-face]} @state]
    (set! (.-textContent (.getElementById js/document "distanceValue")) (.toFixed distance 2))
    (set! (.-textContent (.getElementById js/document "meshStats"))
          (str (count (:mesh/vertices mesh)) " vertices · " (count (:mesh/faces mesh)) " faces"))
    (set! (.-textContent (.getElementById js/document "selection"))
          (if (some? selected-face) (str "Face " selected-face " selected") "No face selected"))
    (set! (.-innerHTML (.getElementById js/document "history"))
          (apply str (map-indexed (fn [i _] (str "<li>" (if (zero? i) "Create cube" "Extrude face") "</li>")) history)))
    (set! (.-disabled (.getElementById js/document "undo")) (= 1 (count history)))
    (set! (.-disabled (.getElementById js/document "redo")) (empty? future))
    (set! (.-textContent (.getElementById js/document "shortcutHint"))
          (case profile :maya "Ctrl+E Extrude · Alt+drag Orbit · Ctrl+Z Undo"
                :max "Alt+E Extrude · Alt+drag Orbit · Ctrl+Z Undo"
                :c4d "D Extrude · Alt+drag Orbit · Ctrl+Z Undo"
                "E Extrude · MMB Orbit · Ctrl+Z Undo"))))

(defn- commit-mesh! [m]
  (swap! state (fn [s] (-> s (assoc :mesh m :future []) (update :history conj m))))
  (refresh-mesh!) (update-ui!))
(defn- extrude! []
  (let [{:keys [mesh selected-face distance]} @state
        next-selected-face (dec (count (:mesh/faces mesh)))]
    (swap! state assoc :selected-face next-selected-face)
    (commit-mesh! (modeling/extrude-face mesh selected-face [0 0 distance]))))
(defn- inset! [] (let [{:keys [mesh selected-face distance]} @state] (when (some? selected-face) (commit-mesh! (modeling/inset-face mesh selected-face (max 0.05 (min 0.95 distance)))))))
(defn- scale! [] (let [{:keys [mesh selected-face distance]} @state] (when (some? selected-face) (commit-mesh! (modeling/scale-face mesh selected-face distance)))))
(defn- move! [] (let [{:keys [mesh selected-face distance]} @state] (when (some? selected-face) (commit-mesh! (modeling/translate-face mesh selected-face [0 0 distance])))))
(defn- delete! [] (let [{:keys [mesh selected-face]} @state] (when (and (some? selected-face) (> (count (:mesh/faces mesh)) 1)) (commit-mesh! (modeling/delete-face mesh selected-face)) (swap! state assoc :selected-face 0) (update-ui!))))
(defn- undo! [] (when (> (count (:history @state)) 1) (swap! state (fn [s] (let [h (:history s) current (peek h) h' (pop h)] (assoc s :history h' :mesh (peek h') :future (conj (:future s) current))))) (refresh-mesh!) (update-ui!)))
(defn- redo! [] (when-let [m (peek (:future @state))] (swap! state (fn [s] (assoc s :mesh m :history (conj (:history s) m) :future (pop (:future s))))) (refresh-mesh!) (update-ui!)))

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
        face (modeling/pick-face (:mesh @state) eye dir)]
    (when (some? face) (swap! state assoc :selected-face face) (update-ui!))))

(defn ^:export init! []
  (let [canvas (.getElementById js/document "gpu-canvas") drag (atom nil)]
    (.addEventListener (.getElementById js/document "extrude") "click" extrude!)
    (.addEventListener (.getElementById js/document "inset") "click" inset!)
    (.addEventListener (.getElementById js/document "scale") "click" scale!)
    (.addEventListener (.getElementById js/document "move") "click" move!)
    (.addEventListener (.getElementById js/document "delete") "click" delete!)
    (.addEventListener (.getElementById js/document "undo") "click" undo!)
    (.addEventListener (.getElementById js/document "redo") "click" redo!)
    (.addEventListener (.getElementById js/document "distance") "input" #(swap! state assoc :distance (js/parseFloat (.. % -target -value))))
    (.addEventListener (.getElementById js/document "profile") "change" #(do (swap! state assoc :profile (keyword (.. % -target -value))) (update-ui!)))
    (.addEventListener canvas "contextmenu" #(.preventDefault %))
    (.addEventListener canvas "pointerdown" #(if (or (= 1 (.-button %)) (.-altKey %)) (reset! drag [(.-clientX %) (.-clientY %)]) (pick-at! canvas %)))
    (.addEventListener js/window "pointerup" #(reset! drag nil))
    (.addEventListener js/window "pointermove"
      (fn [event]
        (when-let [[x y] @drag]
          (swap! state update :azimuth + (* 0.008 (- (.-clientX event) x)))
          (swap! state update :elevation
                 (fn [e] (max -1.3 (min 1.3 (+ e (* 0.008 (- (.-clientY event) y)))))))
          (reset! drag [(.-clientX event) (.-clientY event)]))))
    (.addEventListener js/window "keydown" #(cond (and (.-ctrlKey %) (= "z" (.toLowerCase (.-key %)))) (undo!) (= "e" (.toLowerCase (.-key %))) (extrude!)))
    (.addEventListener (.getElementById js/document "new-cube") "click" #(do (reset! state {:mesh cube :selected-face 1 :distance 0.5 :history [cube] :future [] :azimuth 0.7 :elevation 0.45 :profile :blender}) (refresh-mesh!) (update-ui!)))
    (.addEventListener (.getElementById js/document "import") "click" #(.click (.getElementById js/document "import-file")))
    (.addEventListener (.getElementById js/document "import-file") "change"
                       (fn [event]
                         (when-let [file (aget (.. event -target -files) 0)]
                           (-> (.text file)
                               (.then (fn [text]
                                        (let [m (reader/read-string text)]
                                          (when (modeling/valid-mesh? m)
                                            (swap! state assoc :mesh m :history [m] :future [] :selected-face 0)
                                            (refresh-mesh!)
                                            (update-ui!)))))))))
    (.addEventListener (.getElementById js/document "export") "click" #(let [a (.createElement js/document "a") data (pr-str (:mesh @state))] (set! (.-href a) (.createObjectURL js/URL (js/Blob. #js [data] #js {:type "application/edn"}))) (set! (.-download a) "model.edn") (.click a)))
    (update-ui!)
    (init-gpu! canvas)))
