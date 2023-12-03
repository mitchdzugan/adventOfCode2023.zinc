(require '["/aoc/lib.zn" :as lib])
(require '["/+.zn" :as + :refer-macros true])

(def* SchemaNumberT [value part-number?])
(defn-mk (SchemaNumber [value] SchemaNumberT)
  (%value value) (%part-number? false))
(defn-un value [SchemaNumberT] %value)
(defn-un part-number? [SchemaNumberT] %part-number?)
(defn accept-part-number [schema-number]
  (mk SchemaNumberT (%value (value schema-number)) (%part-number? true)))

(def+ TokenT
  (Digit [d])
  (Symbol [s])
  (Dot))

(defn-mk (Digit [d] TokenT ) (%= [d]))
(defn-mk (Symbol [s] TokenT) (%= [s]))
(def Dot (mk (Dot of TokenT)))

(defn classify [c]
  (if (+/is c ".")
    Dot
    (let [d (js/parseInt c 10)]
      (if (and (>= d 0) (< d 10))
        (Digit d)
        (Symbol c)))))

(defn put-in [v2d i j v]
  (let [row (+/or (+/Vec) (+/at v2d i))]
    (+/put row j v)))

(defn process-grid [input handle-symbol-neighbors]
  (let [token-grid (->> (lib/strsplit input "\n")
                        (+/fmap #(+/fmap classify (lib/strsplit %1 ""))))
        schema-number-id-grid (+/fmap #(+/fmap (fn [] +/None) %) token-grid)
        schema-numbers (+/Vec)

        add-neighbor
        (fn [neighbors i j]
          (<<- (#(+/bind %2 %1) (+/at schema-number-id-grid i)) (fn [row])
               (#(+/bind %2 %1) (+/at row j)) (fn [mschema-number-id])
               (#(+/bind %2 %1) mschema-number-id) (fn [schema-number-id])
               (#(+/bind %2 %1) (+/at schema-numbers schema-number-id)) (fn [schema-number])
               (+/put neighbors schema-number-id schema-number)))

        init-schema-number
        #(when (> %1 0)
           (+/put schema-numbers (+/size schema-numbers) (SchemaNumber %1)))]

    (<- (+/each token-grid)
        (fn [row i]
          (let [ending
                (<- (+/reduce 0 row)
                    (fn-impl [acc TokenT j]
                             (Digit
                               (let [next (+ (* 10 acc) %d)]
                                 (<<- (when (> next 0))
                                      (put-in schema-number-id-grid i j)
                                      (+/Just (+/size schema-numbers)))
                                 next))
                             (_ (do (init-schema-number acc) 0))))]
            (init-schema-number ending))))
    (<- (+/each token-grid)
        (fn [row i]
          (<- (+/each row)
              (fn-impl [TokenT j]
                       (Symbol
                         (let [neighbors (+/Map)]
                           (add-neighbor neighbors (+/dec i) (+/dec j))
                           (add-neighbor neighbors (+/dec i) (+/id  j))
                           (add-neighbor neighbors (+/dec i) (+/inc j))
                           (add-neighbor neighbors (+/id  i) (+/dec j))
                           (add-neighbor neighbors (+/id  i) (+/inc j))
                           (add-neighbor neighbors (+/inc i) (+/dec j))
                           (add-neighbor neighbors (+/inc i) (+/id  j))
                           (add-neighbor neighbors (+/inc i) (+/inc j))
                           (handle-symbol-neighbors neighbors schema-numbers)))
                       (_ nil)))))
    schema-numbers))

(defn part1 [input]
  (->> (<<- (process-grid input)
            (fn [neighbors schema-nums])
            (+/each #(+/put schema-nums %2 (accept-part-number %1)) neighbors))
       (+/filter part-number?)
       (+/fmap value)
       (+/reduce #(+ %1 %2) 0)))

(defn part2 [input]
  (let [gear-ratio-sum-ref [0]
        get-gear-ratio-sum #(aget gear-ratio-sum-ref 0)
        add-gear-ratio #(aset gear-ratio-sum-ref 0 (+ (get-gear-ratio-sum) %1))]
    (<<- (process-grid input)
         (fn [neighbors])
         (when (+/is 2 (+/size neighbors)))
         (add-gear-ratio (+/reduce #(* %1 (value %2)) 1 neighbors)))
    (get-gear-ratio-sum)))
