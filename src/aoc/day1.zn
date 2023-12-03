(require '["/aoc/lib.zn" :as lib])
(require '["/+.zn" :as + :refer-macros true])

(def IGNORE_LEADING_0 false)

(def digitStrs
  (+/Map [["one" 1] ["two"   2] ["three" 3] ["four" 4] ["five" 5]
          ["six" 6] ["seven" 7] ["eight" 8] ["nine" 9] ["ten" 10]]))
(def digitStrLengths
  ((fn []
     (let [seenLengths (+/Map)]
       (+/each #(+/put seenLengths (.-length %2) true) digitStrs)
       (+/sort (+/keys seenLengths))))))

(defn getDigit [src index useDigitStrs exclude0]
  (let [digit (js/parseInt (.substr src index 1) 10)]
    (if (and (< digit 10) (>= digit (if exclude0 1 0)))
      (+/Just digit)
      (loop [result +/None strLenIndex 0]
        (if (or (not useDigitStrs)
                (not (+/empty? result))
                (> strLenIndex (+/size digitStrLengths)))
          result
          (let [strLen (+/or 0 (+/at digitStrLengths strLenIndex))
                substr (.substr src index strLen)]
            (recur (+/at digitStrs substr) (+ strLenIndex 1))))))))

(def+ OriginT (Front) (Back))
(def Front (mk (Front of OriginT)))
(def Back (mk (Back of OriginT)))

(defn firstDigit [src origin useDigitStrs]
  (let [start (impl [OriginT origin] (Front 0) (Back (- (.-length src) 1)))
        delta (impl [OriginT origin] (Front 1) (Back -1))
        exclude0 (impl [OriginT origin] (Front IGNORE_LEADING_0) (Back false))]
    (loop [result +/None index start]
      (if (or (not (+/empty? result)) (>= index (.-length src)) (< index 0))
        result
        (recur (getDigit src index useDigitStrs exclude0) (+ index delta))))))

(defn getCalibrationValue [src useDigitStrs]
  (<<- (#(+/bind %2 %1) (firstDigit src Front useDigitStrs)) (fn [dTens])
       (#(+/bind %2 %1) (firstDigit src Back  useDigitStrs)) (fn [dOnes])
       (+/Just (+ (* 10 dTens) dOnes))))

(defn getCalibrationSum [input useDigitStrs]
  (->> (lib/strsplit input "\n")
       (+/fmap #(getCalibrationValue % useDigitStrs))
       (+/reduce #(+ %1 (+/or 0 %2)) 0)))

(defn part1 [input] (getCalibrationSum input false))
(defn part2 [input] (getCalibrationSum input true ))

(defn solve []
  (let [input (lib/getInput 1)]
    (lib/Solution (part1 input) (part2 input))))
