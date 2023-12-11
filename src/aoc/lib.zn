(require '["path" :as path])
(require '["fs$default" :as fs])
(require '["/+.zn" :as + :refer-macros true])

(def rx_whitespace (js/RegExp. "\\s+"))

(defn strsplit [src split] (+/apply +/Vec (.split src split)))

(defn parseInt [s] (js/Number.parseInt s 10))

(defn getRawInput [basename]
  (let [filename (<<- (if (.startsWith basename ".") basename)
                      (path/join js/__dirname ".." "resources" "input")
                      basename)]
    (fs/readFileSync filename "utf8")))

(defn getInput [n]
  (getRawInput (+/str "day" n)))
