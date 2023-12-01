(require '["/aoc/day1.zn" :as day1])
(require '["/aoc/lib.zn" :as lib])
(require '["/+.zn" :as + :refer-macros true])

(def dayModules (+/Vec day1))

(defn solve [day]
  (let [module (+/or {} (+/at dayModules (- day 1)))]
    (+/log (+/str "❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ "))
    (+/log (+/str "🎄 advent of code day " day " 🎄"))
    (let [solution (.solve module)]
      (+/log (+/str "❄ 🎄 part 1:🎄 ❄ 🎄 ❄ 🎄 ❄ "))
      (+/log (lib/part1 solution))
      (+/log (+/str "❄ 🎄 part 2:🎄 ❄ 🎄 ❄ 🎄 ❄ "))
      (+/log (lib/part2 solution))
      (+/log (+/str "❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ "))
      (+/log))))

(let [toSolve (js/parseInt (+/dig js/process ["argv" 2]) 10)]
  (if (and (> toSolve 0) (<= toSolve (+/size dayModules)))
    (solve toSolve)
    (+/each (fn [_ index] (solve (+ index 1))) dayModules)))
