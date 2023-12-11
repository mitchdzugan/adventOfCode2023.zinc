(require '["/aoc/lib.zn" :as lib])
(require '["/+.zn" :as + :refer-macros true])

(defn emptyXs [line]
  (let [res (+/Set)]
    (+/for (lib/strsplit line "") #(when (= "." %1) (+/push res %2)))
    res))

(defn make-grid [input]
  (let [rmemptyCols (aref +/None)
        joinEmptyXs (<<- (fn [xs])
                         (@#= rmemptyCols)
                         (fn [memptyCols])
                         (+/or (+/Just xs))
                         (+/fmap #(+/Just (+/intersection xs %1)))
                         memptyCols)
        emptyCols #(+/unwrap! @rmemptyCols)]
    (->> (+/filter #(not= (.trim %1) "") (lib/strsplit input "\n"))
         (+/fmap #(<<- (let [xs (emptyXs %1)] (joinEmptyXs xs))
                       (if-not (= (.-length %1) (+/size xs)) %1)
                       (.replaceAll %1 "." "x")))
         (+/fmap (fn [line]
                   (->> (lib/strsplit line "")
                        (+/fmap #(if (+/has? (emptyCols) %2) "x" %1))))))))

(def* GalaxyT [id x y])
(defn-mk (Galaxy [id x y] GalaxyT) (%= [id x y]))
(defn-un gx [GalaxyT] %x)
(defn-un gy [GalaxyT] %y)
(defn distance [g1 g2]
  (+ (js/Math.abs (- (gx g1) (gx g2)))
     (js/Math.abs (- (gy g1) (gy g2)))))

(defn get-galaxies [grid expandBy]
  (let [galaxies (+/Vec)
        nextId #(+/size galaxies)]
    (<<- (loop [j 0 y 0]) (when (< j (+/size grid)))
         (let [row (+/at! grid j)])
         (recur (+ j 1))
         (loop [i 0 x 0 allX? true])
         (if (>= i (+/size row))
           (+ y 1 (if allX? expandBy 0))
           (let [c (+/at! row i)]
             (cond
               (= "#" c)  (do (+/push galaxies (Galaxy (nextId) x y))
                              (recur (+ i 1) (+ x 1) false))
               (= "." c)  (recur (+ i 1) (+ x 1) false)
               (= "x" c)  (recur (+ i 1) (+ x 1 expandBy) allX?)))))
    galaxies))

(defn calc-sum [input expandBy]
  (let [grid (make-grid input)
        galaxies (get-galaxies grid expandBy)]
    (->> galaxies
         (+/bind #(+/fmap (fn [g2] (distance %1 g2)) (+/slice galaxies (+ 1 %2))))
         (+/reduce #(+ %1 %2) 0))))

(defn part1 [input] (calc-sum input 1))

(defn part2 [input] (calc-sum input (- 1000000 1)))
