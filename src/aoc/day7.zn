(require '["/aoc/lib.zn" :as lib])
(require '["/+.zn" :as + :refer-macros true])

(def+ HandTypeT (Kind5) (Kind4) (Kind3) (Kind2) (Kind1) (FullHouse) (TwoPair))

(defn-impl type-val [HandTypeT]
  (Kind5     6)
  (Kind4     5)
  (FullHouse 4)
  (Kind3     3)
  (TwoPair   2)
  (Kind2     1)
  (Kind1     0))

(def Kind5     (mk (Kind5     of HandTypeT)))
(def Kind4     (mk (Kind4     of HandTypeT)))
(def FullHouse (mk (FullHouse of HandTypeT)))
(def Kind3     (mk (Kind3     of HandTypeT)))
(def TwoPair   (mk (TwoPair   of HandTypeT)))
(def Kind2     (mk (Kind2     of HandTypeT)))
(def Kind1     (mk (Kind1     of HandTypeT)))

(defn card-val [c jokers?]
  (cond
    (+/is c "2") 1
    (+/is c "3") 2
    (+/is c "4") 3
    (+/is c "5") 4
    (+/is c "6") 5
    (+/is c "7") 6
    (+/is c "8") 7
    (+/is c "9") 8
    (+/is c "T") 9
    (+/is c "J") (if jokers? 0 10)
    (+/is c "Q") 11
    (+/is c "K") 12
    (+/is c "A") 13
    :else 0))

(defn joker? [c] (+/is c "J"))

(defn get-type [cards jokers?]
  (let [card-counts (+/Map)
        rpairs (aref 0)
        rjokers (aref 0)
        rkind (aref 0)]
    (+/for cards
      #(let [card-count (+ 1 (+/or 0 (+/at card-counts %1)))]
         (when (or (not jokers?) (not (joker? %1)))
           (@= rkind (js/Math.max @rkind card-count)))
         (when (joker? %1)
           (@#= rjokers +/inc))
         (when (+/is card-count 2)
           (@#= rpairs +/inc))
         (+/put card-counts %1 card-count)))
    (let [kind (+ @rkind (if jokers? @rjokers 0))
          pairs? (> @rpairs 1)]
      (cond
        (and (+/is kind 5) true  ) Kind5
        (and (+/is kind 4) true  ) Kind4
        (and (+/is kind 3) pairs?) FullHouse
        (and (+/is kind 3) true  ) Kind3
        (and (+/is kind 2) pairs?) TwoPair
        (and (+/is kind 2) true  ) Kind2
        (and (+/is kind 1) true  ) Kind1))))

(defn get-val [cards jokers?]
  (->> (+/fmap #(card-val %1 jokers?) cards)
       (+/reduce #(+ %1 (* (js/Math.pow 14 (- (+/size cards) 1 %3)) %2)) 0)))

(def* HandStatsT [type val bid])
(defn-un hand-val [HandStatsT] %val)
(defn-un hand-bid [HandStatsT] %bid)
(defn-un hand-type-val [HandStatsT] (type-val %type))

(defn parse-line [line jokers?]
  (let [[cardsstr bidstr] (.split (.trim line) lib/rx_whitespace)
        cards (lib/strsplit cardsstr "")
        type (get-type cards jokers?)
        val (get-val cards jokers?)
        bid (lib/parseInt bidstr)]
    (mk HandStatsT (%= [type val bid]))))

(defn sort-hands [hands]
  (let [by-type-val (+/groupBy hand-type-val hands)]
    (<- (+/bind (+/Vec Kind1 Kind2 TwoPair Kind3 FullHouse Kind4 Kind5))
        #(+/sort-by hand-val (+/or (+/Vec) (+/at by-type-val (type-val %)))))))

(defn get-total-winnings [input jokers?]
  (->> (lib/strsplit input "\n")
       (+/filter #(not (+/is "" (.trim %))))
       (+/fmap #(parse-line %1 jokers?))
       (sort-hands)
       (+/reduce #(+ %1 (* (+ 1 %3) (hand-bid %2))) 0)))

(defn part1 [input] (get-total-winnings input false))

(defn part2 [input] (get-total-winnings input true ))
