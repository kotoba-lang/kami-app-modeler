(ns kami.modeler.ui
  "Kami Modeler UI, authored as portable EDN and rendered only through the
  kotoba-lang HTML/CSS substrates. Browser behavior is layered on this shell."
  (:require [html.core :as html]
            [css.core :as css]))

(def sheet {:rules
            {"*" {:box-sizing :border-box}
             "body" {:margin 0 :height "100vh" :display :grid :grid-template-rows "54px 1fr" :font-family "Inter,ui-sans-serif,system-ui" :background "#0b1020" :color "#e8ecf8"}
             "header" {:display :flex :align-items :center :gap 20 :padding "0 18px" :background "#111936" :border-bottom "1px solid #293456"}
             "header strong" {:color "#9eb8ff" :letter-spacing ".04em"}
             "header span,.hint" {:color "#9ca9c9" :font-size 12}
             "header button" {:margin-left :auto}
             "main" {:display :grid :grid-template-columns "230px 1fr 260px" :min-height 0}
             "aside" {:padding 18 :background "#101733" :display :flex :flex-direction :column :gap 9 :border-right "1px solid #293456"}
             "aside:last-child" {:border-left "1px solid #293456" :border-right 0}
             "h2" {:margin "8px 0 3px" :font-size 11 :text-transform :uppercase :letter-spacing ".12em" :color "#91a1ca"}
             "button" {:border "1px solid #35446e" :border-radius 7 :background "#171f3b" :color "#e8ecf8" :padding "9px 10px" :text-align :left :cursor :pointer}
             "button:hover,.selected" {:border-color "#7d9cff" :background "#293a70"}
             ".primary" {:background "#6f8fff" :color "#071127" :border 0 :font-weight 700}
             ".viewport" {:position :relative :overflow :hidden :background "radial-gradient(circle at 50% 42%,#1e315a,#0a0f1e 62%)"}
             "#gpu-canvas" {:width "100%" :height "100%" :display :block}
             ".gpu-fallback" {:position :absolute :inset "45% auto auto 50%" :transform "translate(-50%,-50%)" :color "#ffb9b9"}
             ".axis,.status" {:position :absolute :font-family :ui-monospace :font-size 12 :color "#b8caff"}
             ".axis" {:bottom 24 :left 26 :color "#ffadb7"}
             ".status" {:right 18 :bottom 16 :display :flex :gap 14 :background "#0b1020bb" :padding 8 :border-radius 6}
             "label" {:display :grid :gap 8 :color "#bfcbe8"}
             "input,select" {:accent-color "#8aa8ff" :background "#171f3b" :color "#e8ecf8" :border "1px solid #35446e" :padding 8}}})

(defn page []
  (html/html5
   [:html {:lang "en"}
    [:head [:meta {:charset "utf-8"}] [:meta {:name "viewport" :content "width=device-width,initial-scale=1"}]
     [:title "Kami Modeler"] [:style (css/css sheet)]]
    [:body [:header [:strong "KAMI MODELER"] [:a {:href "https://kotoba-lang.github.io/kami-studio/"} "Studio"] [:span "WGPU polygon workspace"] [:button {:id "export"} "Export EDN"]]
     [:main [:aside [:h2 "Scene"] [:button.object.selected "◆ Cube"] [:h2 "Tools"] [:button {:data-command "select"} "Select"] [:button {:data-command "extrude"} "Extrude"] [:button {:data-command "orbit"} "Orbit"] [:h2 "Interaction profile"] [:select {:id "profile"} [:option {:value "blender"} "Blender"] [:option {:value "maya"} "Maya"] [:option {:value "max"} "3ds Max"] [:option {:value "c4d"} "Cinema 4D"]] [:p.hint {:id "shortcutHint"} "E Extrude · MMB Orbit · Ctrl+Z Undo"]]
      [:section.viewport [:canvas {:id "gpu-canvas" :aria-label "WebGPU mesh viewport"}] [:div.gpu-fallback {:id "gpu-status"} "Initializing WebGPU…"] [:div.axis "Y\n│\n└── X"] [:div.status [:span {:id "tool"} "Select Face"] [:span {:id "meshStats"} "8 vertices · 6 faces"]]]
      [:aside [:h2 "Face Inspector"] [:label "Extrude distance " [:output {:id "distanceValue"} "0.50"] [:input {:id "distance" :type "range" :min "0.1" :max "2" :step "0.1" :value "0.5"}]] [:button.primary {:id "extrude"} "Extrude selected face"] [:h2 "History"] [:ol {:id "history"} [:li "Create cube"]] [:button {:id "undo"} "Undo"] [:button {:id "redo"} "Redo"]]]
     [:script {:src "./js/app.js"}]]]))
