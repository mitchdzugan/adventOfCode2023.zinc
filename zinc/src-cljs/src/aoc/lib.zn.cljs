(require '["path" :as path])
(require '["fs$default" :as fs])
(require '["/+.zn" :as + :refer-macros true])

(def* SolutionT [part1 part2])
(defn-mk (Solution [part1 part2] SolutionT) (%= [part1 part2]))
(defn-un part1 [SolutionT] %part1)
(defn-un part2 [SolutionT] %part2)

(defn strsplit [src split] (+/apply +/Vec (.split src split)))

(defn getInput [n]
  (let [basename (+/str "day" n)
        filename (path/join js/__dirname ".." "resources" "input" basename)]
    (fs/readFileSync filename "utf8")))
