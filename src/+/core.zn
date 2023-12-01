(require '["/+/types.zn" :as + :exporting "*"])

(def- key-impls {})
(defn implement-key [type-id f]
  (aset key-impls type-id f))
(defn key [obj]
  ((aget key-impls (type-id obj)) obj))

(implement-key +/NumT +/id)
(implement-key +/StrT +/id)
(implement-key +/BoolT +/id)

(+/implement-monad-plus +/NumT #(-> 0) #(+ %1 %2))
(+/implement-monad-plus +/StrT #(-> "") +/str)
(+/implement-monad-plus +/BoolT #(-> false) #(clojure.core/or %1 %2))
(+/implement-monad-plus +/VecT #(Vec) #(concat %1 %2))
(+/implement-monad-plus +/MaybeT #(-> None) #(maybe %2 Just %1))

(+/implement-applicative +/VecT   #(Vec %))
(+/implement-applicative +/MaybeT #(Just %))

(+/implement-flatplicative-for-applicative +/VecT)
(+/implement-flatplicative-for-applicative +/MaybeT)
(+/implement-flatplicative +/StrT +/str)
(+/implement-flatplicative +/BoolT #(+/not (+/not %)))

(def MapClass +/MapClass)

(defn Vec [& a-]
  (let [a  (clojure.core/or a- [])
        id (+/mk-inst-id)]
    {:T +/VecT
     :I id
     :J (+/prop$ (+/apply +/argv +/VecT (.map a json)))
     :P (+/prop$ (.map a pretty))
     :a a}))

(defn Map [pairs] (new MapClass pairs))

(defn KeyMap [pairs]
  (let [ks (Map (.map pairs (fn [[k  ]] [(key k) k])))
        vs (Map (.map pairs (fn [[k v]] [(key k) v])))
        id (+/mk-inst-id)]
    {:T +/KeyMapT
     :I id
     :J (+/prop$ (+/js-array-from vs [+/KeyMapT] (fn [[kk v]]
                                                   [(json (.get ks kk))
                                                    (json v)])))
     :P (+/prop$ (pretty vs))
     :ks ks
     :vs vs}))

(defn KeyedList [pairs]
  (let [id (+/mk-inst-id)
        kl {:T +/KeyedListT
            :I id
            :a (+/prop$ (let [res []]
                          (loop [id (.-f $)]
                            (if (+/nil? id) res
                                (let [[v pid nid] (aget $ "d" id)]
                                  (.push res [id v])
                                  (recur nid))))))
            :J (+/prop$ (+/<<- (+/js-array-from      (.-a $) [ +/KeyedListT])
                               (fn [[id v]] [id             (json   v)])))
            :P (+/prop$ (+/<<- (+/js-flat-array-from (.-a $) ["#:KeyedList"])
                               (fn [[id v]] [(+/str "#" id) (pretty v)])))
            :i 1
            :d {}
            :f nil
            :l nil}
        empty? #(+/is 0 (+/js-length %))]
    (doto kl
      (do (when-not (empty? pairs)
            (aset kl "f" (aget pairs 0 0))
            (loop [[[nid nv :as next] & rest] pairs
                   [cid cv :as curr] []
                   [pid pv :as prev] []
                   max-id 0]
              (when-not (+/nil? cid)
                (aset kl "d" cid [cv pid nid]))
              (if (not (empty? rest)) (recur rest next curr (+/max max-id nid))
                  (doto kl
                    (aset "i" (inc max-id))
                    (aset "l" nid)
                    (aset "d" nid [nv cid])))))))))

(defn- mkMaybe [j e]
  (let [id (+/mk-inst-id)]
    {:T +/MaybeT
     :I id
     :J (+/prop$ (if e [+/MaybeT +/null] [+/MaybeT (json j)]))
     :P (+/prop$ (if e +/null {:just (pretty j)}))
     :j j
     :e e}))
(defn Just [j] (mkMaybe j false))
(def None (mkMaybe nil true))
(defn Maybe [nilable] (mkMaybe nilable (+/nil? nilable)))

(defn type-id    [any] (.-T any))
(defn inst-id    [any] (.-I any))
(defn json       [any] (.-J any))
(defn pretty     [any] (and any (.-P any)))
(defn- coll-impl [spec obj]
  ((clojure.core/or (aget spec (type-id obj)) (aget spec +/else))))

#zinc/preprocess
(defmacro defn-impl$ [arg-spec-placeholder & cases]
  (let [valsym (gensym "val")
        arg-spec (->> arg-spec-placeholder
                      (mapv (fn [form]
                              (let [placeholder? (and (symbol? form) (= "$" (name form)))]
                                (if placeholder? valsym form)))))
        spec (->> cases
                  (reduce #(assoc %1 (first %2) `(fn [] ~@(drop 1 %2))) {}))]
    `(~arg-spec (let [$ ~valsym] (coll-impl ~spec $)))))

(defn Range [& args]
  (let [[a1 a2 a3] args
        fin (fn [init end step]
              (+/apply Vec (js/Array.from (js/Array (+/ceil (+/div (- end init) step)))
                                          #(+ init (* step %2)))))]
    (cond (+/nil? a1) (Vec)
          (+/nil? a2) (fin 0  a1 (if (>= a1 0 ) 1 -1))
          (+/nil? a3) (fin a1 a2 (if (>= a2 a1) 1 -1))
          :else       (fin a1 a2 a3))))

(defn at
  (defn-impl$ [$ k]
    ([+/VecT] (Maybe (aget $ "a" k)))
    ([+/MapT] (Maybe (.get $ k)))
    ([+/KeyMapT] (Maybe ((.. $ -vs -get) (key k))))
    ([+/KeyedListT] (fmap #(aget % 0) (Maybe (aget $ "d" k))))
    ([+/MaybeT] (if (or (not= 0 k) (.-e $)) None $))))

(defn put
  (defn-impl$ [$ k v]
    ([+/VecT] (aset $ "a" k v))
    ([+/MapT] (.set $ k v))
    ([+/KeyMapT] (let [kk (key k)]
                   (.set (.-ks $) kk k)
                   (.set (.-vs $) kk v)))
    ([+/KeyedListT] "TODO")))

(defn for-each-map [f m get-js-m map-key]
  (.forEach (+/js-array-from (get-js-m m) (fn [[k v]] #(f v (map-key k) m))) #(%)))

(defn each
  (defn-impl$ [f $]
    ([+/VecT] ((.. $ -a -forEach) #(f %1 %2 $)))
    ([+/MapT]    (for-each-map f $ +/id      +/id                ))
    ([+/KeyMapT] (for-each-map f $ #(.-vs %) #((.. $ -ks -get) %)))
    ([+/MaybeT] (when-not (.-e $) (f (.-j $) 0 $)))
    ([+/KeyedListT] ((.. $ -a forEach (fn [[id v] ind] (f v id $ ind)))))))

(defn reduce [f init coll]
  (let [res [init]]
    (each #(aset res 0 (f (aget res 0) %1 %2 %3 %4)) coll)
    (aget res 0)))

(defn fmap
  (defn-impl$ [f $]
    ([+/VecT] (+/apply Vec ((.. $ -a -map) #(f %1 %2 $))))
    ([+/MapT] (Map (+/js-array-from $ (fn [[k v]] [k (f v k $)]))))
    ([+/MaybeT] (if (.-e $) $ (Just (f (.-j $) 0 $))))))

(defn bind
  (defn-impl$ [f $]
    ([+/VecT] (+/apply Vec ((.. $ -a -flatMap) #(.-a (f %1 %2 $)))))
    ([+/MaybeT] (if (.-e $) $ (f (.-j $) 0 $)))))

(defn concat [...args]
  (bind +/id (+/apply Vec args)))

(defn filter
  (defn-impl$ [p $]
    ([+/VecT] (+/apply Vec ((.. $ -a -filter) #(p %1 %2 $))))
    ([+/MaybeT] (if (clojure.core/or (.-e $) (p (.-j $) 0 $)) $ None))))
(defn remove [p coll] (filter #(+/not (p %1 %2 %3)) coll))

(defn keys
  (defn-impl$ [$]
    ([+/VecT] (Range (+/js-length (.-a $))))
    ([+/MapT] (+/apply Vec (+/js-array-from $ #(aget % 0))))
    ([+/KeyMapT] (vals (.-ks $)))
    ([+/MaybeT] (if (.-e $) (Vec) (Vec 0)))))

(defn vals
  (defn-impl$ [$]
    ([+/VecT] (+/apply Vec (.-a $)))
    ([+/MapT] (+/apply Vec (+/js-array-from $ #(aget % 1))))
    ([+/KeyMapT] (vals (.-vs $)))
    ([+/MaybeT] (if (.-e $) (Vec) (Vec (.-j $))))))

(defn size
  (defn-impl$ [$]
    ([+/VecT] (+/js-length (.-a $)))
    ([+/MapT] (.. $ -size))
    ([+/KeyMapT] (size (.-ks $)))
    ([+/MaybeT] (if (.-e $) 0 1))))

(defn or-
  (defn-impl$ [mk-default-val $]
    ([+/MaybeT] (if (.-e $) (mk-default-val) (.-j $)))))
(defn or [default-val m] (or- (fn [] default-val) m))

(defn maybe-
  (defn-impl$ [on-none on-just $]
    ([+/MaybeT] (if (.-e $) (on-none) (on-just (.-j $))))))
(defn maybe [none on-just m] (maybe- (fn [] none) on-just m))

(defn insert
  (defn-impl$ [$ target-id v]
    ([+/VecT] (if (>= target-id (size $)) None
                  (do (.splice $ target-id 0 v) (Just target-id))))
    ([+/MapT] (fmap #(do (put $ target-id v) target-id) (at $ target-id)))
    ([+/KeyMapT] (let [kk (key target-id)]
                   (fmap #(do (put (.-ks $) kk v) (put (.-vs $) kk v) kk)
                         (at (.-ks $) kk))))
    ([+/KeyedListT] (let [id (aget $ "i")
                          prepend (aget $ "d" target-id)]
                      (if (nil? prepend) None
                          (let [[pid] (aget prepend 1)]
                            (doto $
                              (amod "n" inc)
                              ((if (+/nil? pid) #(aset % "f" pid)
                                   #(aset % "d" pid 2 id)))
                              (aset % "d" target-id 1 id)
                              (aset % "d" id [v pid target-id]))
                            (Just id)))))))

(defn unshift
  (defn-impl$ [$ v]
    ([+/VecT] (.unshift (.-a $) v))
    ([+/KeyedListT] (insert $ (.-f $) v))))

(defn sort
  (defn-impl$ [$ v]
    ([+/VecT]
      (let [res (+/apply Vec (.-a $))]
        (.sort (.-a res))
        res))))

(defn empty? [c] (+/is 0 (size c)))

(defn unjson [v]
  (let [unjson-pairs (fn [[k v]] [(unjson k) (unjson v)])]
    (cond
      (+/js-array? v)
      ((-> {[+/MaybeT ] #(fmap unjson (Maybe (aget v 1)))
            [+/VecT   ] #(fmap unjson (+/apply Vec (.slice v 1)))
            [+/MapT   ] #(Map    (.map unjson-pairs (.slice v 1)))
            [+/KeyMapT] #(KeyMap (.map unjson-pairs (.slice v 1)))}
           (aget (type-id v))
           (or #(.map v unjson))))

      (aget {[+/StrT] true [+/NumT] true [+/BoolT] true} (and v (type-id v))) v
      :else (throw (+/str "Val: /" v "/ is of unsupported type")))))

(defn encode [v] (js/JSON.stringify (json v)))
(defn decode [s] (unjson (js/JSON.parse s)))
