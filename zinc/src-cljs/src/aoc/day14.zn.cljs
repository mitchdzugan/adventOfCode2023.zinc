(require '["/aoc/lib.zn" :as lib])
(require '["/+.zn" :as + :refer-macros true])

(defn part1 [input] (.part1 (js/eval (lib/getRawInput "js/day14.js")) input))
(defn part2 [input] (.part2 (js/eval (lib/getRawInput "js/day14.js")) input))
