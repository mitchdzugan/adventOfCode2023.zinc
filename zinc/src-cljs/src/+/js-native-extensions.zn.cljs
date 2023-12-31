(require '["/+/core.zn" :as +])

(defn- def-property [js-class k impl]
  (when-not ((.. js-class -prototype -hasOwnProperty) k)
    (.defineProperty js/Object (.-prototype js-class) k
                     {:get (fn [] (this-as this ((.bind impl this))))})))

(defn- def-method [js-class k impl]
  (aset (.-prototype js-class) k impl))

(defn- defs-for [js-class f]
  (f (fn [k impl] (def-property js-class k impl))
     (fn [k impl] (def-method js-class k impl))))

(defs-for js/Number
  (fn [def-property def-method]
    (def-property "T" (+/method$ [] +/NumT))
    (doseq [k ["J" "P" "I"]]
      (def-property k (+/method$ [] (.valueOf $))))))

(defs-for js/Boolean
  (fn [def-property def-method]
    (def-property "T" (+/method$ [] +/BoolT))
    (doseq [k ["J" "P" "I"]]
      (def-property k (+/method$ [] (.valueOf $))))))

(defs-for js/String
  (fn [def-property def-method]
    (def-property "T" (+/method$ [] +/StrT))
    (doseq [k ["J" "P" "I"]]
      (def-property k (+/method$ [] (.valueOf $))))))

(defs-for js/Map
  (fn [def-property def-method]
    (def-property "T" (+/method$ [] +/MapT))
    (def-property "I" (+/method$ [] (let [i (or (aget $ "i") (+/mk-inst-id))]
                                      (aset $ "i" i) i)))
    (def-property "J" (+/method$ [] (+/js-array-from $ [+/MapT] #(.map % +/json))))
    (def-property "P"
      (+/method$ []
                 (let [res {}]
                   (.forEach (+/js-array-from $)
                             #(let [k (aget % 0)
                                    pk (if (+/js-str? k) (+/str "\"" k "\"") k)
                                    pv (+/pretty (aget % 1))]
                                (aset res pk pv)))
                   res)))))

(defs-for js/Array
  (fn [def-property def-method]
    (def-property "T" (+/method$ [] (aget $ 0)))
    (def-property "I" (+/method$ [] (let [i (or (aget $ "i") (+/mk-inst-id))]
                                      (aset $ "i" i) i)))
    (def-property "J" (+/method$ [] (.map $ +/json)))
    (def-property "P"
      (+/method$ []
                 (let [id (.-T $) res {}]
                   (aset res "Type" (or (aget +/qt-store id) id))
                   (.forEach (.slice $ 1)
                             (fn [v ind]
                               (let [pk (or (+/dig +/prop-store [id nil ind :idname])
                                            (+/dig +/prop-store [id (aget $ 1) ind :idname])
                                            ind)]
                                 (if (+/is pk "+")
                                   (aset res
                                         "Type"
                                         (+/str (aget res "Type")
                                                "["
                                                (+/dig +/variant-store [id (aget $ 1)])
                                                "]"))
                                   (aset res pk (+/pretty v))))))
                   res)))))
