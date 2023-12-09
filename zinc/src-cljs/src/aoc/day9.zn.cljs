(require '["/aoc/lib.zn" :as lib])
(require '["/+.zn" :as + :refer-macros true])

(defn zeros? [history] (+/every? #(+/is 0 %1) history))

(defn next-value [history]
  (<<-(let [seqs (+/Vec history)])
      (loop [depth 0])
      (let [curr (+/at! seqs depth)])
      (if (zeros? curr)
        (do (+/push curr 0)
            (loop [depth depth]
              (if (<= depth 0)
                (+/last! history)
                (let [curr (+/at! seqs depth)
                      prev (+/at! seqs (- depth 1))]
                  (+/push prev (+ (+/last! prev) (+/last! curr)))
                  (recur (- depth 1)))))))
      (let [next (+/Vec)]
        (+/push seqs next)
        (loop [ind 1]
          (when (< ind (+/size curr))
            (+/push next (- (+/at! curr ind) (+/at! curr (- ind 1))))
            (recur (+ ind 1))))
        (recur (+ depth 1)))))

(defn process [input reverse?]
  (->> (lib/strsplit input "\n")
       (+/filter #(not (+/is "" (.trim %1))))
       (+/fmap #(lib/strsplit (.trim %1) lib/rx_whitespace))
       (+/fmap #(+/fmap lib/parseInt %1))
       (+/fmap (if reverse? +/reverse +/id))
       (+/fmap next-value)
       (+/reduce #(+ %1 %2) 0)))

(defn part1 [input] (process input false))
(defn part2 [input] (process input true ))
