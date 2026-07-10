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
             ".grid" {:position :absolute :inset "45% -30% -45%" :background "linear-gradient(#35507b 1px,transparent 1px),linear-gradient(90deg,#35507b 1px,transparent 1px)" :background-size "34px 34px" :transform "perspective(380px) rotateX(62deg)" :opacity ".6"}
             "#cube" {:position :absolute :left "50%" :top "42%" :width 150 :height 150 :transform "translate(-50%,-50%) skewY(-30deg) scaleY(.86)" :background "#6292ff" :box-shadow "inset -18px -16px #3655a8,0 26px 48px #0008" :transition "height .2s"}
             ".axis,.status" {:position :absolute :font-family :ui-monospace :font-size 12 :color "#b8caff"}
             ".axis" {:bottom 24 :left 26 :color "#ffadb7"}
             ".status" {:right 18 :bottom 16 :display :flex :gap 14 :background "#0b1020bb" :padding 8 :border-radius 6}
             "label" {:display :grid :gap 8 :color "#bfcbe8"}
             "input" {:accent-color "#8aa8ff"}}})

(defn page []
  (html/html5
   [:html {:lang "en"}
    [:head [:meta {:charset "utf-8"}] [:meta {:name "viewport" :content "width=device-width,initial-scale=1"}]
     [:title "Kami Modeler"] [:style (css/css sheet)]]
    [:body [:header [:strong "KAMI MODELER"] [:a {:href "https://kotoba-lang.github.io/kami-studio/"} "Studio"] [:span "Polygon authoring preview"] [:button {:id "export"} "Export project"]]
     [:main [:aside [:h2 "Scene"] [:button.object.selected "◆ Cube"] [:h2 "Tools"] [:button {:data-tool "select"} "Select"] [:button {:data-tool "extrude"} "Extrude"] [:button {:data-tool "move"} "Move"] [:p.hint "Choose Extrude, then use the control on the right."]]
      [:section.viewport [:div.grid] [:div {:id "cube" :aria-label "Selected cube"}] [:div.axis "Y\n│\n└── X"] [:div.status [:span {:id "tool"} "Select"] [:span {:id "faces"} "6 faces"]]]
      [:aside [:h2 "Inspector"] [:label "Extrude distance " [:output {:id "distanceValue"} "0.50"] [:input {:id "distance" :type "range" :min "0.1" :max "2" :step "0.1" :value "0.5"}]] [:button.primary {:id "extrude"} "Extrude selected face"] [:h2 "History"] [:ol {:id "history"} [:li "Create cube"]] [:button {:id "undo"} "Undo"]]]
     [:script {:type "module" :src "./app.js"}]]]))
