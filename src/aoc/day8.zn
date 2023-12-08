(require '["/aoc/lib.zn" :as lib])
(require '["/+.zn" :as + :refer-macros true])

(defn gcd [a_ b_] (loop [a a_ b b_] (if (+/is 0 b) a (recur b (+/mod a b)))))

(defn lcm [a_ b_]
  (let [a (+/max a_ b_) b (+/min a_ b_)]
    (* (/ a (gcd a b)) b)))

(def+ DirectionT (Left) (Right))
(def Left  (mk (Left  of DirectionT)))
(def Right (mk (Right of DirectionT)))
(defn-impl left? [DirectionT] (Left true) (_ false))

(def* NodeT [id left right])
(defn-mk (Node [id left right] NodeT) (%= [id left right]))
(defn-un left  [NodeT] %left )
(defn-un right [NodeT] %right)
(defn-un nodeId [NodeT] %id)

(defn parseLine [line]
  (let [[idstr neighbors] (.split line "=")
        id (.trim idstr)
        left  (-> neighbors (.split ",") (aget 0) (.split "(") (aget 1) .trim)
        right (-> neighbors (.split ",") (aget 1) (.split ")") (aget 0) .trim)]
    (Node id left right)))

(defn parseNav [line]
  (->> (lib/strsplit line "")
       (+/bind #(cond (= %1 "L") (+/Vec Left)
                      (= %1 "R") (+/Vec Right)
                      :else (+/Vec)))))

(def* NavInputT [nav nodes])
(defn-mk (NavInput [nav nodes] NavInputT) (%= [nav nodes]))

(defn parseInput [input]
  (let [lines (lib/strsplit input "\n")
        navLine (+/at! lines 0)
        nav (parseNav navLine)
        nodes (->> (+/filter #(.includes %1 "=") lines)
                   (+/fmap parseLine)
                   (+/keyBy (fn-un [NodeT] %id)))]
    (NavInput nav nodes)))

(defn-un step [NavInputT steps id]
  (let [node (+/at! %nodes id)
        dir (+/at! %nav (+/mod steps (+/size %nav)))]
    ((if (left? dir) left right) node)))

(defn part1 [input]
  (-> (parseInput input)
      ((fn-un [NavInputT]
         (loop [steps 0 id "AAA"]
           (if (= id "ZZZ")
             steps
             (recur (+ steps 1) (step %. steps id))))))))

;;;; PART 2 STRUCTURES

;; Represents an infinitely repeating pattern in the navigation
;;   initLength:  amount of steps before reaching the loop point
;;   loopLength:  amount of steps in each repeated loop
;;   inits:       list of steps that end in Z during the initial nav
;;   loops:       list of positions within the loop that end in Z
(def* PatternT [initLength loopLength inits loops])
(defn-mk (Pattern [initLength loopLength inits loops] PatternT)
  (%= [initLength loopLength inits loops]))

(def NullPattern (Pattern 0 0 (+/Vec) (+/Vec)))
(defn-un nullPattern? [PatternT] (+/is 0 (+ %initLength %loopLength)))

;; check if the target step ends in Z for a given pattern
(defn-un in-pattern? [PatternT target]
  (let [offsetTarget (+/mod (- target %initLength) %loopLength)
        isTarget?       (fn [v] (+/is target       v))
        isOffsetTarget? (fn [v] (+/is offsetTarget v))]
    (if (< target %initLength)
      (+/any? isTarget?       %inits)
      (+/any? isOffsetTarget? %loops))))

;; generate step values that end in Z until reaching one of the caps
;;   stepCap:  will not generate step values higher than this number
;;   genCap :  the amount of step values to generate
;; caps are disabled by supplying 0 and assumed to be disabled if not supplied
(defn-un gen-until [PatternT stepCap_ genCap_]
  (let [stepCap (or stepCap_ 0)
        genCap (or genCap_ 0)
        res (+/Vec)
        loopStart (fn [i] (+ %initLength (* i %loopLength)))
        validStep? (fn [v] (or (+/is 0 stepCap) (< v            stepCap)))
        canGen?    (fn [ ] (or (+/is 0 genCap ) (< (+/size res) genCap)))
        canPush?   (fn [v] (and (validStep? v) (canGen?)))
        push (fn [v] (when (canPush? v) (+/push res v)))
        pushLoop (fn [i] (fn [v] (push (+ (loopStart i) v))))
        validIter? (fn [i] (validStep? (loopStart i)))]
    (+/for %inits push)
    (loop [i 0]
      (if (and (canGen?) (validIter? i))
        (do (+/for %loops (pushLoop i)) (recur (+ i 1)))
        res))))

;; merge two Patterns creating a new one that only generates
;; steps when both of its inputs end in Z
(defn merge [p1 p2]
  (cond
    (nullPattern? p1) p2
    (nullPattern? p2) p1
    :else
    (un [PatternT p1 :prefix {:type :ns :s "p1"}]
      (un [PatternT p2 :prefix {:type :ns :s "p2"}]
        (let [initLength (+/max %p1/initLength %p2/initLength)
              loopLength (lcm %p1/loopLength %p2/loopLength)
              inits (+/Vec)
              loops (+/Vec)
              total (+ initLength loopLength)]
          (+/for (gen-until %p1/. total)
            (fn [v]
              (when (in-pattern? %p2/. v)
                (if (< v initLength)
                  (+/push inits v)
                  (+/push loops (- v initLength))))))
          (Pattern initLength loopLength inits loops))))))

;; given the bounds and start id of pattern, find the steps
;; that end in Z and generate the Pattern object
(defn-un fill-pattern [NavInputT startId initLength totalLength]
  (let [loopLength (- totalLength initLength) inits (+/Vec) loops (+/Vec)]
    (loop [steps 0 id startId]
      (let [loop? (>= steps initLength)
            done? (>= steps (+ initLength loopLength))]
        (if done?
          (Pattern initLength loopLength inits loops)
          (do
            (when (.endsWith id "Z")
              (+/push (if loop? loops inits)
                      (if loop? (- steps initLength) steps)))
            (recur (+ steps 1) (step %. steps id))))))))

;; find a Pattern for a given starting id
(defn-un find-pattern [NavInputT startId]
  (let [seen (+/Map)]
    (loop [steps 0 id startId]
      (let [navPos (+/mod steps (+/size %nav))
            pos (+/str id "." navPos)]
        (if (+/has? seen pos)
          (fill-pattern %. startId (+/at! seen pos) steps)
          (do
            (+/put seen pos steps)
            (recur (+ steps 1) (step %. steps id))))))))

(defn part2 [input]
  (-> (parseInput input)
      ((fn-un [NavInputT]
         (->> (+/fmap nodeId (+/vals %nodes))
              (+/filter (fn [id] (.endsWith id "A")))
              (+/fmap (fn [id] (find-pattern %. id)))
              (+/reduce (fn [acc p] (merge acc p)) NullPattern))))
      (gen-until 0 1)))
