(require '["/aoc/lib.zn" :as lib])
(require '["/+.zn" :as + :refer-macros true])

(def+ DirT (Up) (Down) (Left) (Right))
(def Left  (mk (Left  of DirT)))
(def Right (mk (Right of DirT)))
(def Up    (mk (Up    of DirT)))
(def Down  (mk (Down  of DirT)))

;; can be either of the legal directions a path headed into
;; a space containing the given character would be going
(defn init-dir [c]
  (cond
    (+/is c "-") Left
    (+/is c "7") Up
    (+/is c "|") Up
    (+/is c "J") Down
    (+/is c "L") Down
    (+/is c "F") Up))

(defn next-dir [c dir]
  (cond
    (+/is c "-") (impl [DirT dir] (Left  Left ) (Right Right))
    (+/is c "7") (impl [DirT dir] (Up    Left ) (Right Down ))
    (+/is c "|") (impl [DirT dir] (Up    Up   ) (Down  Down ))
    (+/is c "J") (impl [DirT dir] (Down  Left ) (Right Up   ))
    (+/is c "L") (impl [DirT dir] (Down  Right) (Left  Up   ))
    (+/is c "F") (impl [DirT dir] (Up    Right) (Left  Down ))))

(def* PosT [x y])
(defn-mk (Pos [x y] PosT) (%= [x y]))

(defn eq-pos [p1 p2]
  (un [PosT p1 :prefix {:type :ns :s "p1"}]
    (un [PosT p2 :prefix {:type :ns :s "p2"}]
      (and (= %p1/x %p2/x) (= %p1/y %p2/y)))))

(defn-un get-at-pos [m PosT s-char]
  (let [res (+/or "." (+/at (+/or (+/Vec) (+/at m %y)) %x))]
    (if (+/is res "S") s-char res)))

(defn-un set-at-pos [m PosT v] (+/put (+/at! m %y) %x v))

(defn-un step-pos [PosT dir]
  (let [x %x y %y]
    (impl [DirT dir]
      (Left  (Pos (- x 1) y))
      (Right (Pos (+ x 1) y))
      (Up    (Pos x (- y 1)))
      (Down  (Pos x (+ y 1))))))

(def* InstT [m pos dir origin s-char])
(defn-mk (Inst [m pos dir origin s-char] InstT) (%= [m pos dir origin s-char]))
(defn-un inst-pos [InstT] %pos)

(defn-un step [InstT]
  (let [ndir (next-dir (get-at-pos %m %pos %s-char) %dir)]
    (Inst %m (step-pos %pos ndir) ndir %origin %s-char)))

(defn-un start? [InstT] (eq-pos %pos %origin))

(defn get-initial-pos [m]
  (->> (+/bind (fn [r y] (+/fmap (fn [c x] [c x y]) r)) m)
       (+/fmap (fn [[c x y]] (if (= "S" c) (+/Just (Pos x y)) +/None)))
       (+/bind +/vals)
       (+/first!)))

(defn make-loop-only-assuming [base s-char]
  (let [loop-only (+/fmap #(+/fmap (fn [] ".") %1) base)
        init-pos (get-initial-pos base)
        mk-inst #(Inst %1 init-pos (init-dir s-char) init-pos s-char)]
    (loop [inst (step (mk-inst base))]
      (let [p (inst-pos inst)]
        (set-at-pos loop-only p (get-at-pos base p s-char)))
      (if (start? inst)
        (step inst)
        (recur (step inst))))
    loop-only))

(defn try-s-char [base s-char]
  (try
    (+/Just (make-loop-only-assuming base s-char))
    (catch js/Object e +/None)))

(defn make-loop-only [base]
  (<- (+/unwrap!)
      (+/reduce +/None (+/Vec "-" "|" "J" "L" "F" "7"))
      #(+/or- (fn [] (try-s-char base %2)) (+/fmap +/Just %1))))

(defn to-matrix [input] (+/fmap #(lib/strsplit % "") (lib/strsplit input "\n")))
(defn-memo parse-into-matrix-with-loop-only [input]
  (make-loop-only (to-matrix input)))

(defn part1 [input]
  (let [m (parse-into-matrix-with-loop-only input)]
    (->> (+/bind +/id m)
         (+/remove #(+/is "." %1))
         ((fn [p] (+/floor (/ (+/size p) 2)))))))

(defn-memo crossings-to-top-edge [m x y]
  (let [getc #(get-at-pos m (Pos x %1))
        plain? #(+/is (getc %1) ".")
        edge? #(or (+/is (getc %1) "-") (+/is (getc %1) "|"))
        corner? #(and (not (edge? %1)) (not (plain? (getc %1))))
        get-rest #(crossings-to-top-edge m x (- %1 1))]
    (cond
      (< y 0)     0
      (plain? y)  (get-rest y)
      (edge? y)   (+ 1 (get-rest y))
      :else
      (loop [suby (- y 1)]
        (if (edge? suby)
          (recur (- suby 1))
          (+ (get-rest suby)
             (if (= (next-dir (getc y   ) Down)
                    (next-dir (getc suby) Up  ))
               0 1)))))))

(defn-un enclosed? [m PosT]
  (and (= "." (get-at-pos m %.))
       (= 1 (+/mod (crossings-to-top-edge m %x %y) 2))))

(defn part2 [input]
  (let [m (parse-into-matrix-with-loop-only input)]
    (->> (+/fmap (fn [row y] (+/filter #(enclosed? m (Pos %2 y)) row)) m)
         (+/reduce #(+ %1 (+/size %2)) 0))))
