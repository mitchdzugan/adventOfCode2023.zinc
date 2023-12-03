(require '["path" :as path])
(require '["fs$default" :as fs])
(require '["/+.zn" :as + :refer-macros true])

(defn strsplit [src split] (+/apply +/Vec (.split src split)))

(defn getInput [n]
  (let [basename (+/str "day" n)
        filename (path/join js/__dirname ".." "resources" "input" basename)]
    (fs/readFileSync filename "utf8")))