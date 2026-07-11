(ns kami.modeler.project)

(def current-version 2)

(defn document
  [{:keys [id name scene selection camera interaction]}]
  {:kami/document :modeler-project
   :kami/version current-version
   :project/id (or id "untitled")
   :project/name (or name "Untitled Model")
   :project/scene scene
   :project/selection selection
   :project/camera camera
   :project/interaction interaction})

(defn migrate
  "Normalizes supported project versions. A legacy bare scene is v1."
  [value]
  (cond
    (= :modeler-project (:kami/document value))
    (case (:kami/version value)
      2 value
      1 (-> value
            (assoc :kami/version 2
                   :project/selection {:object-id (some-> value :project/scene :scene/objects first :object/id)
                                       :face-id 0 :mode :object}
                   :project/camera {:azimuth 0.7 :elevation 0.45}
                   :project/interaction {:profile :blender})
            (dissoc :project/version))
      (throw (ex-info "Unsupported Modeler project version" {:version (:kami/version value)})))

    (:scene/objects value)
    (document {:scene value
               :selection {:object-id (some-> value :scene/objects first :object/id) :face-id 0 :mode :object}
               :camera {:azimuth 0.7 :elevation 0.45}
               :interaction {:profile :blender}})

    :else (throw (ex-info "Not a Modeler project or scene" {:value value}))))

(defn valid? [project]
  (and (= :modeler-project (:kami/document project))
       (= current-version (:kami/version project))
       (string? (:project/id project))
       (string? (:project/name project))
       (seq (get-in project [:project/scene :scene/objects]))
       (map? (:project/selection project))
       (map? (:project/camera project))
       (map? (:project/interaction project))))

(defn open [value]
  (let [project (migrate value)]
    (when-not (valid? project)
      (throw (ex-info "Invalid Modeler project" {:project project})))
    project))
