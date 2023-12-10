(require '["/aoc/lib.zn" :as lib])
(require '["/+.zn" :as + :refer-macros true])

(def+ DirT (Up) (Down) (Left) (Right))
(def Left  (mk (Left  of DirT)))
(def Right (mk (Right of DirT)))
(def Up    (mk (Up    of DirT)))
(def Down  (mk (Down  of DirT)))

(def* PosT [x y])
(defn-mk (Pos [x y] PosT) (%= [x y]))

;; determined using the inspectGrid util fn
(def INITIAL_POS (Pos 74 82))
(def INITIAL_DIR Up)
(def TRUE_S_CHAR "7")

(defn-un pipe-at [m PosT preserveS?]
  (let [res (+/at! (+/at! m %y) %x)]
    (cond
      preserveS? res
      (+/is res "S") TRUE_S_CHAR
      :else res)))

(defn-un step-pos [PosT dir]
  (let [x %x y %y]
    (impl [DirT dir]
      (Left  (Pos (- x 1) y))
      (Right (Pos (+ x 1) y))
      (Up    (Pos x (- y 1)))
      (Down  (Pos x (+ y 1))))))

(def* InstT [m pos dir])
(defn-mk (Inst [m pos dir] InstT) (%= [m pos dir]))
(defn-un inst-pos [InstT] %pos)

(defn-un step [InstT]
  (let [ndir (next-dir (pipe-at %m %pos) %dir)]
    (Inst %m (step-pos %pos ndir) ndir)))

(defn next-dir [c dir]
  (cond
    (+/is c "-") (impl [DirT dir] (Left  Left ) (Right Right))
    (+/is c "7") (impl [DirT dir] (Up    Left ) (Right Down ))
    (+/is c "|") (impl [DirT dir] (Up    Up   ) (Down  Down ))
    (+/is c "J") (impl [DirT dir] (Down  Left ) (Right Up   ))
    (+/is c "L") (impl [DirT dir] (Down  Right) (Left  Up   ))
    (+/is c "F") (impl [DirT dir] (Up    Right) (Left  Down ))))

(defn parse-input [input]
  (let [m (+/fmap #(lib/strsplit %1 "") (lib/strsplit input "\n"))]
    [m (Inst m INITIAL_POS INITIAL_DIR)]))

(defn-un start? [InstT] (+/is "S" (pipe-at %m %pos true)))

(defn part1 [input]
  (let [[m initial] (parse-input input)]
    (loop [inst (step initial) steps 1]
      (if (start? inst)
        (+/floor (/ steps 2))
        (recur (step inst) (+ 1 steps))))))

(defn init-matrix [rows cols init]
  (let [res (+/Vec)]
    (loop [y 0]
      (when (< y cols)
        (let [row (+/Vec)]
          (loop [x 0]
            (when (< x rows)
              (+/push row init)
              (recur (+ x 1))))
          (+/push res row))
        (recur (+ y 1))))
    res))

(defn inflate-char [c]
  (cond
    (+/is c "-") ["..."
                  "---"
                  "..."]

    (+/is c "7") ["..."
                  "-7."
                  ".|."]

    (+/is c "|") [".|."
                  ".|."
                  ".|."]

    (+/is c "J") [".|."
                  "-J."
                  "..."]

    (+/is c "L") [".|."
                  ".L-"
                  "..."]

    (+/is c "F") ["..."
                  ".F-"
                  ".|."]))

(defn-un set-at-pos [src PosT v] (+/put (+/at! src %y) %x v))
(defn-un get-at-pos [src PosT] (+/at! (+/at! src %y) %x))

(defn-un inflate [PosT src dst]
  (let [grid (inflate-char (pipe-at src %.))
        put (fn [x y] (+/put (+/at! dst (+ y (* 3 %y)))
                             (+ x (* 3 %x))
                             (aget grid y x)))]
    (+/for (+/Vec 0 1 2) (fn [x] (put x 0) (put x 1) (put x 2)))))

(defn-un fill-unenclosed [expanded checked enclosed]
  (loop [stack [[0 0]]]
    (when (> (.-length stack) 0)
      (let [[x y] (.pop stack) pos (Pos x y) ]
        (when (and (>= x 0)
                   (>= y 0)
                   (< x (+/size (+/at! expanded 0)))
                   (< y (+/size expanded))
                   (not (get-at-pos checked pos)))
          (set-at-pos checked pos true)
          (when (+/is "." (get-at-pos expanded pos))
            (set-at-pos enclosed (Pos (+/floor (/ x 3)) (+/floor (/ y 3))) false)
            (.push stack [x (+ y 1)])
            (.push stack [x (- y 1)])
            (.push stack [(+ x 1) y])
            (.push stack [(- x 1) y]))))
      (recur stack))))

(defn part2 [input]
  (let [[m initial] (parse-input input)
        h (+/size m)
        w (+/size (+/at! m 0))
        expanded (init-matrix (* 3 w) (* 3 h) ".")
        checked (init-matrix (* 3 w) (* 3 h) false)
        enclosed (init-matrix w h true)]
    (loop [inst (step initial)]
      (set-at-pos enclosed (inst-pos inst) false)
      (inflate (inst-pos inst) m expanded)
      (when (not (start? inst))
        (recur (step inst))))
    (fill-unenclosed expanded checked enclosed (Pos 0 0))
    (+/reduce #(+/reduce (fn [acc b] (+ acc (if b 1 0))) %1 %2) 0 enclosed)))

(defn inspectGrid [input]
  (let [m (+/fmap #(lib/strsplit %1 "") (lib/strsplit input "\n"))]
    (loop [i 0]
      (when (< i (+/size m))
        (loop [j 0]
          (when (< j (+/size (+/at! m i)))
            (if (+/is "S" (+/at! (+/at! m i) j))
              (do
                (+/log "I" i "J" j)
                (+/log (+/str " " (+/at! (+/at! m (- i 1)) j)))
                (+/log (+/str (+/at! (+/at! m i) (- j 1))
                              "?"
                              (+/at! (+/at! m i) (+ j 1))))
                (+/log (+/str " " (+/at! (+/at! m (+ i 1)) j))))
              (recur (+ 1 j)))))
        (recur (+ 1 i))))))
