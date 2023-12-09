(require '["/aoc/day1.zn" :as day1])
(require '["/aoc/day2.zn" :as day2])
(require '["/aoc/day3.zn" :as day3])
(require '["/aoc/day4.zn" :as day4])
(require '["/aoc/day5.zn" :as day5])
(require '["/aoc/day6.zn" :as day6])
(require '["/aoc/day7.zn" :as day7])
(require '["/aoc/day8.zn" :as day8])
(require '["/aoc/day9.zn" :as day9])
(require '["/aoc/lib.zn" :as lib])
(require '["/+.zn" :as + :refer-macros true])

(def dayModules (+/Vec day1 day2 day3 day4 day5 day6 day7 day8 day9))

(defn solve [day]
  (let [module (+/or {} (+/at dayModules (- day 1)))]
    (+/log (+/str "❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ "))
    (+/log (+/str "🎄 advent of code day " day " 🎄"))
    (let [input (lib/getInput day)]
      (+/log (+/str "❄ 🎄 part 1:🎄 ❄ 🎄 ❄ 🎄 ❄ "))
      (+/log (.part1 module input))
      (+/log (+/str "❄ 🎄 part 2:🎄 ❄ 🎄 ❄ 🎄 ❄ "))
      (+/log (.part2 module input))
      (+/log (+/str "❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ "))
      (+/log))))

(let [toSolve (lib/parseInt (+/dig js/process ["argv" 2]))]
  (if (and (> toSolve 0) (<= toSolve (+/size dayModules)))
    (solve toSolve)
    (+/each (fn [_ index] (solve (+ index 1))) dayModules)))
