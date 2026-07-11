(ns kami.modeler.project-test
  (:require [clojure.test :refer [deftest is testing]]
            [kami.modeler.project :as project]
            [kami.modeling :as modeling]))

(def scene (modeling/scene [(modeling/object 7 "Cube" (modeling/cube 2))]))

(deftest document-round-trip
  (let [p (project/document {:id "demo" :name "Demo" :scene scene
                             :selection {:object-id 7 :face-id 2 :mode :edit}
                             :camera {:azimuth 1 :elevation 0.5}
                             :interaction {:profile :maya}})]
    (is (project/valid? p))
    (is (= p (project/open p)))
    (is (= 2 (:kami/version p)))))

(deftest legacy-scene-migration
  (let [p (project/open scene)]
    (is (= :modeler-project (:kami/document p)))
    (is (= 7 (get-in p [:project/selection :object-id])))
    (is (= :blender (get-in p [:project/interaction :profile])))))

(deftest rejects-unknown-or-corrupt-documents
  (testing "unknown version"
    (is (thrown? #?(:clj Exception :cljs js/Error)
                 (project/open {:kami/document :modeler-project :kami/version 99}))))
  (testing "unrelated EDN"
    (is (thrown? #?(:clj Exception :cljs js/Error) (project/open {:hello :world})))))
