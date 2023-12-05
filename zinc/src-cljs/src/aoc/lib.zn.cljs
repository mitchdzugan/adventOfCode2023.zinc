(require '["path" :as path])
(require '["fs$default" :as fs])
(require '["/+.zn" :as + :refer-macros true])

(def rx_whitespace (js/RegExp. "\\s+"))

(defn strsplit [src split] (+/apply +/Vec (.split src split)))

(defn parseInt [s] (js/global.parseInt s 10))

(defn getInput [n]
  (let [basename (+/str "day" n)
        filename (path/join js/__dirname ".." "resources" "input" basename)]
    (fs/readFileSync filename "utf8")))
