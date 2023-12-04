(require '["/aoc/day1.zn" :as day1])
(require '["/aoc/day2.zn" :as day2])
(require '["/aoc/day3.zn" :as day3])
(require '["/aoc/day4.zn" :as day4])
(require '["/aoc/lib.zn" :as lib])
(require '["/+.zn" :as + :refer-macros true])

(def dayModules (+/Vec day1 day2 day3 day4))

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

(let [toSolve (js/parseInt (+/dig js/process ["argv" 2]) 10)]
  (if (and (> toSolve 0) (<= toSolve (+/size dayModules)))
    (solve toSolve)
    (+/each (fn [_ index] (solve (+ index 1))) dayModules)))
