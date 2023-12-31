(require '["/aoc/lib.zn" :as lib])
(require '["/+.zn" :as + :refer-macros true])

(def* InputDataT [initials category-maps])
(defn-mk (InputData [initials category-maps] InputDataT)
  (%= [category-maps initials]))

(def* GuideT [id offset])
(defn-mk (Guide [id offset] GuideT) (%= [id offset]))
(defn-un guide-id [GuideT] %id)
(defn-un offset [GuideT] %offset)

(def+ InitialT
  (Item [category id])
  (Range [category start length]))
(defn-mk (Item [category id] InitialT) (%= [id category]))
(defn-mk (Range [category start length] InitialT) (%= [start length category]))

(def* CategoryMapT [src dst guides])
(defn-mk (init-category-map [src dst] CategoryMapT)
  (%guides (+/Vec))
  (%= [src dst]))
(defn-un destination [CategoryMapT] %dst)
(defn-un guides [CategoryMapT] %guides)
(defn-un push-guide [CategoryMapT guide] (+/push %guides guide))

(def+ InputLineT
  (Noop)
  (InitialSeeds [[seeds :type [+/VecT +/NumT]]])
  (MapHeader [[from :type +/StrT] [to :type +/StrT]])
  (MapEntry [[dst :type +/NumT] [src :type +/NumT] [length :type +/NumT]]))

(defn parse-initial-seeds [line]
  (let [[_seeds ids_str] (.split line ":")]
    (as->
      (.trim ids_str) $
      (lib/strsplit $ lib/rx_whitespace)
      (+/fmap lib/parseInt $)
      (mk (InitialSeeds of InputLineT) (%seeds $)))))

(defn parse-map-header [line]
  (let [[categories_str] (.split line lib/rx_whitespace)
        [from _to_ to] (.split categories_str "-")]
    (mk (MapHeader of InputLineT) (%= [from to]))))

(defn parse-map-entry [line]
  (let [[dst src length] (.map (.split line lib/rx_whitespace) lib/parseInt)]
    (mk (MapEntry of InputLineT) (%= [dst src length]))))

(defn parse-line [line]
  (cond
    (= "" (.trim line)) (mk (Noop of InputLineT))
    (.startsWith line "seeds:") (parse-initial-seeds line)
    (.endsWith (.trim line) "map:") (parse-map-header line)
    :else (parse-map-entry line)))

(defn-memo get-guide-ind [id guides]
  (let [get-id #(guide-id (+/at! guides %1))]
    (loop [lbound 0 rbound (- (+/size guides) 1)]
      (cond
        (<  id (get-id lbound))       +/None
        (>= id (get-id rbound))       (+/Just rbound)
        (<= (- rbound lbound) 1)      (+/Just lbound)
        :else
        (let [mbound (+ lbound (+/floor (/ (- rbound lbound) 2)))]
          (cond
            (+/is id (get-id mbound)) (+/Just mbound)
            (< id (get-id mbound))    (recur lbound mbound)
            :else                     (recur mbound rbound)))))))

(defn get-offset [id guides]
  (->> (get-guide-ind id guides)
       (+/fmap #(offset (+/at! guides %1)))
       (+/or 0)))

(defn get-associated-item [category-maps category id]
  (let [cat-map (+/at! category-maps category)]
    (Item (destination cat-map) (+ id (get-offset id (guides cat-map))))))

(defn get-associated-ranges [category-maps category start length]
  (let [cat-map (+/at! category-maps category)
        cat-guides (guides cat-map)
        dst (destination cat-map)
        mk-range #(Range dst %1 %2)
        get-id #(guide-id (+/at! cat-guides %1))
        get-offset #(offset (+/at! cat-guides %1))
        results (+/Vec)
        end (+ start length)
        oob? #(>= %1 end)]
    (loop [id start m-ind (get-guide-ind start cat-guides)]
      (let [off (+/or 0 (+/fmap get-offset m-ind))
            ind (+/or 0 (+/fmap +/inc m-ind))]
        (if (or (>= ind (+/size cat-guides)) (oob? (get-id ind)))
          (+/push results (mk-range (+ id off) (- end id)))
          (let [next-id (get-id ind)]
            (+/push results (mk-range (+ id off) (- next-id id)))
            (recur next-id (+/Just ind))))))
    results))

(defn-impl get-location [category-maps InitialT]
  (Item
    (<<- (if (+/is "location" %category) %id)
         (get-location category-maps)
         (get-associated-item category-maps %category %id)))
  (Range
    (<<- (if (+/is "location" %category) %start)
         (min-location category-maps)
         (get-associated-ranges category-maps %category %start %length))))

(defn-un min-location [category-maps initials]
  (->> (+/fmap (fn [initial] (get-location category-maps initial)) initials)
       (+/reduce (fn [acc loc] (+/Just (+/min (+/or loc acc) loc))) +/None)
       (+/unwrap!)))

(defn-un min-location-for-input [InputDataT]
  (min-location %category-maps %initials))

(defn parse-input [input ranges?]
  (let [rsrc (aref "")
        rmap (aref (+/Map))
        rinitials (aref (+/Vec))
        category-maps (+/Map)
        inputs (->> (lib/strsplit input "\n") (+/fmap parse-line))
        finalize-category-map
        (fn []
          (->> (+/at category-maps @rsrc)
               (+/each (fn [cat-map]
                         (->> (+/vals (+/fmap #(Guide %2 %1) @rmap))
                              (+/sort-by guide-id)
                              (+/each #(push-guide cat-map %1))))))
          (@= rmap (+/Map)))]
    (<- (+/each inputs)
        (fn-impl [InputLineT]
          (InitialSeeds
            (@= rinitials
                (if ranges?
                  (->> (+/Range (+/floor (/ (+/size %seeds) 2)))
                       (+/fmap (fn [n]
                                 (Range "seed"
                                        (+/at! %seeds (+ 0 (* 2 n)))
                                        (+/at! %seeds (+ 1 (* 2 n)))))))
                  (+/fmap (fn [id] (Item "seed" id)) %seeds))))
          (MapHeader
            (finalize-category-map)
            (+/put category-maps %from (init-category-map %from %to))
            (@= rsrc %from))
          (MapEntry
            (let [offset (- %dst %src)
                  end (+ %src %length)]
              (+/put @rmap %src offset)
              (+/put @rmap end (+/or 0 (+/at @rmap end)))))
          (_)))
    (finalize-category-map)
    (InputData @rinitials category-maps)))


(defn part1 [input]
  (-> input (parse-input false) min-location-for-input))

(defn part2 [input]
  (-> input (parse-input true ) min-location-for-input))
