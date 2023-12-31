(require '["/aoc/lib.zn" :as lib])
(require '["/+.zn" :as + :refer-macros true])

(def* SchemaNumberT [value part-number?])
(defn-mk (SchemaNumber [value] SchemaNumberT)
  (%value value) (%part-number? false))
(defn-un value [SchemaNumberT] %value)
(defn-un part-number? [SchemaNumberT] %part-number?)
(defn accept-part-number [schema-number]
  (mk SchemaNumberT (%value (value schema-number)) (%part-number? true)))

(def+ TokenT (Digit [d]) (Symbol [s]) (Dot))

(defn-mk (Digit [d] TokenT ) (%= [d]))
(defn-mk (Symbol [s] TokenT) (%= [s]))
(def Dot (mk (Dot of TokenT)))

(defn classify [c]
  (<<- (if (+/is c ".") Dot)
       (let [d (lib/parseInt c)])
       (if (and (>= d 0) (< d 10))
         (Digit d) (Symbol c))))

(defn put-in [v2d i j v]
  (let [row (+/or (+/Vec) (+/at v2d i))]
    (+/put row j v)))

(defn process-grid [input handle-symbol-neighbors]
  (let [token-grid (->> (lib/strsplit input "\n")
                        (+/fmap #(+/fmap classify (lib/strsplit %1 ""))))
        schema-number-id-grid (+/fmap #(+/fmap (fn [] +/None) %) token-grid)
        schema-numbers (+/Vec)
        init-schema-number #(<<- (when (> %1 0))
                                 (+/put schema-numbers (+/size schema-numbers))
                                 (SchemaNumber %1))
        add-neighbor
        (fn [neighbors i j]
          (<<- (#(+/bind %2 %1) (+/at schema-number-id-grid i))
               (fn [row])
               (#(+/bind %2 %1) (+/at row j))
               (fn [mschema-number-id])
               (#(+/bind %2 %1) mschema-number-id)
               (fn [schema-number-id])
               (#(+/bind %2 %1) (+/at schema-numbers schema-number-id))
               (fn [schema-number])
               (+/put neighbors schema-number-id schema-number)))]

    (<- (+/each token-grid)
        (fn [row i]
          (-> (fn-impl [acc TokenT j]
                (Digit
                  (let [next (+ (* 10 acc) %d)]
                    (<<- (when (> next 0))
                         (put-in schema-number-id-grid i j)
                         (+/Just (+/size schema-numbers)))
                    next))
                (_ (do (init-schema-number acc) 0)))
              (+/reduce 0 row)
              (init-schema-number))))
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
                (_)))))
    schema-numbers))

(defn part1 [input]
  (->> (<<- (process-grid input)
            (fn [neighbors schema-nums])
            (+/each #(+/put schema-nums %2 (accept-part-number %1)) neighbors))
       (+/filter part-number?)
       (+/fmap value)
       (+/reduce #(+ %1 %2) 0)))

(defn part2 [input]
  (let [sum-ref (aref 0)]
    (<<- (process-grid input)
         (fn [neighbors])
         (when (+/is 2 (+/size neighbors)))
         (@= sum-ref)
         (+ @sum-ref)
         (+/reduce #(* %1 (value %2)) 1 neighbors))
    @sum-ref))
