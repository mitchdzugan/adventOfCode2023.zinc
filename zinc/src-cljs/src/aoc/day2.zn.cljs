(require '["/aoc/lib.zn" :as lib])
(require '["/+.zn" :as + :refer-macros true])

(def* CubeNumsT [[red :type +/NumT] [green :type +/NumT] [blue :type +/NumT]])
(defn-mk (CubeNums [red green blue] CubeNumsT) (%= [red green blue]))

(def* GameT [id [rounds :type [+/VecT CubeNumsT]]])

(defn-un cubes-power [CubeNumsT] (* %red %green %blue))

(defn addColorValFromColorStr [colorVals _colorStr]
  (let [colorStr (.trim _colorStr)
        [colorValStr color] (.split colorStr " ")
        colorVal (js/parseInt colorValStr 10)]
    (+/put colorVals color colorVal)))

(defn parse-round [_roundStr]
  (let [roundStr (.trim _roundStr)
        colorVals (+/Map)
        colorStrs (lib/strsplit roundStr ",")]
    (+/each #(addColorValFromColorStr colorVals %1) colorStrs)
    (CubeNums
      (+/or 0 (+/at colorVals "red"  ))
      (+/or 0 (+/at colorVals "green"))
      (+/or 0 (+/at colorVals "blue" )))))

(defn parse-game [line]
  (let [[idStr, roundsStr] (.split line ":")
        [_game_ idValStr] (.split idStr " ")
        id (js/parseInt idValStr 10)
        roundStrs (lib/strsplit roundsStr ";")
        rounds (+/fmap parse-round roundStrs)]
    (mk GameT (%= [id rounds]))))

(def all-cubes (CubeNums 12 13 14))
(defn-un valid-round? [CubeNumsT]
  (un [CubeNumsT all-cubes :prefix {:type :ns :s "all"}]
      (and (<= %red   %all/red  )
           (<= %green %all/green)
           (<= %blue  %all/blue ))))

(defn-un valid-game? [GameT]
  (+/reduce #(and %1 (valid-round? %2)) true %rounds))

(defn to-games [input]
  (->> (lib/strsplit input "\n")
       (+/filter #(not (+/is "" (.trim %1))))
       (+/fmap parse-game)))

(defn part1 [input]
  (->> (to-games input)
       (+/filter valid-game?)
       (+/fmap (fn-un [GameT] %id))
       (+/reduce #(+ %1 %2) 0)))

(defn-un update-min-cubes [acc CubeNumsT]
  (un [CubeNumsT acc :prefix {:type :ns :s "acc"}]
      (let [red   (.max js/Math %acc/red   %red  )
            green (.max js/Math %acc/green %green)
            blue  (.max js/Math %acc/blue  %blue )]
        (CubeNums red green blue))))

(defn-un min-cubes [GameT] (+/reduce update-min-cubes (CubeNums 0 0 0) %rounds))

(defn part2 [input]
  (->> (to-games input)
       (+/fmap min-cubes)
       (+/fmap cubes-power)
       (+/reduce #(+ %1 %2) 0)))

(defn solve []
  (let [input (lib/getInput 2)]
    (lib/Solution (part1 input) (part2 input))))
