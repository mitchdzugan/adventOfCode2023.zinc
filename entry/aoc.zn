(require '["/aoc/day1.zn"  :as day1 ])
(require '["/aoc/day2.zn"  :as day2 ])
(require '["/aoc/day3.zn"  :as day3 ])
(require '["/aoc/day4.zn"  :as day4 ])
(require '["/aoc/day5.zn"  :as day5 ])
(require '["/aoc/day6.zn"  :as day6 ])
(require '["/aoc/day7.zn"  :as day7 ])
(require '["/aoc/day8.zn"  :as day8 ])
(require '["/aoc/day9.zn"  :as day9 ])
(require '["/aoc/day10.zn" :as day10])
(require '["/aoc/day11.zn" :as day11])
(require '["/aoc/day12.zn" :as day12])
(require '["/aoc/day13.zn" :as day13])
(require '["/aoc/day14.zn" :as day14])
(require '["/aoc/day15.zn" :as day15])
(require '["/aoc/day16.zn" :as day16])
(require '["/aoc/lib.zn" :as lib])
(require '["/+.zn" :as + :refer-macros true])

(def dayModules
  (+/Vec day1 day2 day3 day4 day5 day6 day7 day8 day9
         day10 day11 day12 day13 day14 day15 day16))

(def toSolve (+/Vec))
(def rp1? (aref true))
(def rp2? (aref true))
(def rgetInput (aref lib/getInput))

(defn solve [day]
  (let [module (+/or {} (+/at dayModules (- day 1)))]
    (+/log (+/str "❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ "))
    (+/log (+/str "🎄 advent of code day " day " 🎄"))
    (let [input (@rgetInput day)]
      (when @rp1?
        (+/log (+/str "❄ 🎄 part 1:🎄 ❄ 🎄 ❄ 🎄 ❄ "))
        (+/log (.part1 module input)))
      (when @rp2?
        (+/log (+/str "❄ 🎄 part 2:🎄 ❄ 🎄 ❄ 🎄 ❄ "))
        (+/log (.part2 module input)))
      (+/log (+/str "❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ "))
      (+/log))))

(loop [n 2 past-opts? false]
  (when (< n (.-length js/process.argv))
    (let [push #(let [v (lib/parseInt %1)]
                  (when (and (> v 0) (<= v (+/size dayModules)))
                    (+/push toSolve v)))
          arg (aget js/process.argv n)]
      (cond
        past-opts?     (do (push arg) (recur (+ n 1) true))
        (= arg "-n1")  (do (@= rp1? false) (recur (+ n 1) false))
        (= arg "-n2")  (do (@= rp2? false) (recur (+ n 1) false))
        (= arg "-i")   (do (let [basename (aget js/process.argv (+ n 1))
                                 getInput #(lib/getRawInput basename)]
                             (@= rgetInput getInput)
                             (recur (+ n 2) false)))
        :else          (do (push arg) (recur (+ n 1) true))))))

(when (+/empty? toSolve)
  (+/for dayModules #(+/push toSolve (+ 1 %2))))

(+/for toSolve solve)
