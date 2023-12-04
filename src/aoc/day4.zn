(require '["/aoc/lib.zn" :as lib])
(require '["/+.zn" :as + :refer-macros true])

(def* CardT [id [winning :type [+/SetT +/NumT]] [my :type [+/SetT +/NumT]]])
(defn-un cardId [CardT] %id)

(def rx_whitespace (js/RegExp. "\\s+"))
(defn parseCard [line]
  (let [[idLabelStr numDataStr] (.split line ":")
        [_cardStr idStr] (.split (.trim idLabelStr) rx_whitespace)
        id (js/parseInt idStr 10)
        [winningNumStr myNumStr] (.split (.trim numDataStr) "|")
        toSet (fn [numStr]
                (as-> numStr $
                  (.split (.trim $) rx_whitespace)
                  (.map $ #(js/parseInt %1 10))
                  (+/apply +/Set $)))
        winning (toSet winningNumStr)
        my (toSet myNumStr)]
    (mk CardT (%= [id winning my]))))

(defn-un myWinCount [CardT] (+/size (+/intersection %winning %my)))

(defn cardValue [card]
  (->> (myWinCount card) (+ -1) (js/Math.pow 2) js/Math.floor))

(defn parseCards [input]
  (->> (lib/strsplit input "\n")
       (+/filter #(not (+/is "" (.trim %1))))
       (+/fmap parseCard)))

(defn part1 [input]
  (->> (parseCards input)
       (+/fmap cardValue)
       (+/reduce #(+ %1 %2) 0)))

(defn scratchCardsWonByCard [card cardsById]
  (->> (+/Range (myWinCount card))
       (+/fmap #(scratchCardsWonById (+ (cardId card) 1 %1) cardsById))
       (+/reduce #(+ %1 %2) 1)))

(defn-memo scratchCardsWonById [id cardsById]
  (->> (+/at cardsById id)
       (+/fmap #(scratchCardsWonByCard %1 cardsById))
       (+/or 0)))

(defn part2 [input]
  (let [cards (parseCards input)
        cardsById (+/keyBy cardId cards)]
    (->> (+/keys cardsById)
         (+/fmap #(scratchCardsWonById %1 cardsById))
         (+/reduce #(+ %1 %2) 0))))
