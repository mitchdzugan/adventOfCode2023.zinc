(require '["/+/raw-js.zn" :as + :exporting "*"])

;; TODO refactor stores

(defn mk-id-generator []
  (let [next-id [1]]
    (fn [] (amod next-id 0 +/inc) (+/dec (aget next-id 0)))))
(def mk-inst-id (mk-id-generator))
(def qt-store {})
(defn set-qt-store [id display-name]
  (aset qt-store id display-name)
  id)
(def prop-store {})
(def variant-store {})

(def monad-plus-impls {})
(defn implement-monad-plus [type-id mzero-impl mplus-impl]
  (aset monad-plus-impls type-id [mzero-impl mplus-impl]))
(defn mzero [type-id] ((aget monad-plus-impls type-id 0)))
(defn mplus [a b] ((aget monad-plus-impls (.-T a) 1) a b))

(def applicative-impls {})
(defn implement-applicative [type-id pure-impl]
  (aset applicative-impls type-id pure-impl))
(defn pure [type-id a]
  ((aget applicative-impls type-id) a))

(def flatplicative-impls {})
(defn implement-flatplicative [type-id ensure-type-impl]
  (aset flatplicative-impls type-id ensure-type-impl))
(defn implement-flatplicative-for-applicative [type-id]
  (implement-flatplicative type-id #(if (= type-id (.-T %)) % (pure type-id %))))
(defn ensure-type [type-id obj]
  ((aget flatplicative-impls type-id) obj))
(defn fplus [type-id a b]
  (let [b-flat (when b (ensure-type type-id b))]
    (cond (+/nil? a) b-flat (+/nil? b) a :else (mplus a b-flat))))

 ;;; UTIL
#zinc/preprocess
(defn mk-guid-gen []
  (let [next-id (atom 1)]
    (fn [] (swap! next-id inc) (dec @next-id))))

#zinc/preprocess
(def mk-guid (mk-guid-gen))

#zinc/preprocess
(def prop-lookup (atom {}))

#zinc/preprocess
(def variant-lookup (atom {}))

#zinc/preprocess
(def adt-lookup (atom {}))

#zinc/preprocess
(def used-type-ids (atom {}))

#zinc/preprocess
(defn take-type-id-fn [typename-sym reserved-sym]
  (let [typename (name typename-sym)
        fs (js/require "fs")
        types (read-string (.readFileSync fs "./types.edn" "utf-8"))
        next-id (->> (vals (:type-ids types))
                     (reduce max 0)
                     inc)
        id (get (:type-ids types) typename next-id)
        ns-s (or (namespace reserved-sym) (name (ns-name *ns*)))
        ident-user (symbol ns-s (name reserved-sym))]
    (when (get @used-type-ids id)
      (throw (str "Type: '" typename "' already taken")))
    (swap! used-type-ids assoc id ident-user)
    (.writeFileSync  fs
                     "./types.edn"
                     (-> types
                         (assoc-in [:type-ids typename] id)
                         pr-str
                         (str "\n")))
    id))

#zinc/preprocess
(defn take-variant-id [base-type-id variant-name]
  (let [fs (js/require "fs")
        types (read-string (.readFileSync fs "./types.edn" "utf-8"))
        next-id (->> (vals (-> types :variant-ids (get base-type-id)))
                     (reduce max 0)
                     inc)
        id (get-in types [:variant-ids base-type-id variant-name] next-id)]
    (.writeFileSync  fs
                     "./types.edn"
                     (-> types
                         (assoc-in [:variant-ids base-type-id variant-name] id)
                         pr-str
                         (str "\n")))
    id))

 ;;; MACROS
#zinc/preprocess
(defmacro def-type-id [reserved-symbol & args]
  (let [[arg1 arg2] args
        typename (if (= :as arg1) arg2 reserved-symbol)
        id (take-type-id-fn typename reserved-symbol)]
    `(do
       (+/dev-only
        (set-qt-store ~id ~(name typename)))
       (def ~reserved-symbol ~id))))

#zinc/preprocess
(defmacro prop$ [& raw-body]
  (let [$$ (gensym "$")
        body (-> #(-> (and (symbol? %)
                           (= "$" (name %))
                           (nil? (namespace %)))
                      (if $$ %))
                 (clojure.walk/postwalk raw-body))]
    (-> `(cljs.core/this-as ~$$ ~@body)
        (with-meta {:get true}))))

#zinc/preprocess
(defmacro method$ [arg-spec & raw-body]
  (let [$$ (gensym "$")
        body (-> #(-> (and (symbol? %)
                           (= "$" (name %))
                           (nil? (namespace %)))
                      (if $$ %))
                 (clojure.walk/postwalk raw-body))]
    `(fn ~arg-spec (cljs.core/this-as ~$$ ~@body))))

#zinc/preprocess
(defn store-prop-data [type-id variant-id props]
  (doseq [[ind prop-spec] (map #(-> [%1 %2]) (range) props)]
    (let [[prop & init-datas] (if (vector? prop-spec) prop-spec [prop-spec])
          init-data (->> init-datas
                         (partition-all 2)
                         (reduce #(assoc %1 (first %2) (last %2)) {}))
          idname (name prop)
          fullname (str "%" idname)
          data (merge {:idname idname :fullname fullname :ind ind} init-data)]
      (swap! prop-lookup #(assoc-in % [type-id variant-id :ind ind] data))
      (swap! prop-lookup #(assoc-in % [type-id variant-id :name idname] data))))
  (swap! prop-lookup #(assoc-in % [type-id variant-id :count] (count props))))

#zinc/preprocess
(defn do-def* [arg1- props]
  (let [arg1 (if (coll? arg1-) (into [] arg1-) arg1-)
        [reserved-symbol typename] (if (coll? arg1)
                                     [(nth arg1 0) (nth arg1 2)]
                                     [arg1 arg1])
        no-save? (= (name typename) "*no-save*")
        id (if no-save? (* -1 (mk-guid)) (take-type-id-fn typename reserved-symbol))
        typename (if no-save? reserved-symbol typename)]
    (store-prop-data id nil props)
    (swap! adt-lookup #(assoc % reserved-symbol id))
    [id reserved-symbol typename]))

#zinc/preprocess
(defmacro def* [& args]
  (let [[id reserved-symbol typename] (apply do-def* args)]
    `(do
       (+/dev-only
        (do
          (aset qt-store ~id ~(name typename))
          (+/bury prop-store
                  [~id nil]
                  ~(-> @prop-lookup (get id) (get nil) :ind))))
       (def ~reserved-symbol ~id))))

#zinc/preprocess
(defn do-def+ [arg1- & variants]
  (let [arg1 (if (coll? arg1-) (into [] arg1-) arg1-)
        [reserved-symbol typename] (if (coll? arg1)
                                     [(nth arg1 0) (nth arg1 2)]
                                     [arg1 arg1])
        no-save? (= (name typename) "*no-save*")
        id (if no-save? (* -1 (mk-guid)) (take-type-id-fn typename reserved-symbol))
        typename (if no-save? reserved-symbol typename)
        variant-defs (atom [])]
    (doseq [[variant-name props] variants]
      (let [variant-id
            (if no-save? (mk-guid) (take-variant-id id (name variant-name)))]
        (swap! variant-lookup assoc-in [id (name variant-name)] variant-id)
        (swap! variant-defs conj [variant-id (name variant-name)])
        (store-prop-data id variant-id (cons '+ props))))
    (swap! adt-lookup #(assoc % reserved-symbol id))
    [id reserved-symbol typename @variant-defs]))

#zinc/preprocess
(defmacro def+ [& args]
  (let [[id reserved-symbol typename variant-defs] (apply do-def+ args)]
    `(do
       (+/dev-only
        (do
          (aset qt-store ~id ~(name typename))
          ~@(mapv (fn [[var-id]]
                    `(+/bury prop-store
                             [~id ~var-id]
                             ~(-> @prop-lookup (get id) (get var-id) :ind)))
                  variant-defs)
          ~@(mapv (fn [[var-id var-name]]
                    `(+/bury variant-store [~id ~var-id] ~var-name))
                  variant-defs)))
       (def ~reserved-symbol ~id))))

#zinc/preprocess
(defmacro -$> [init & forms]
  (let [$$ (with-meta (gensym '$) {:was$? true})
        walked (clojure.walk/postwalk #(-> (and (symbol? %) (= "$" (name %)))
                                           (and (nil? (namespace %)))
                                           (or (:was$? (meta %)))
                                           (if $$ %))
                                      forms)]
    `(as-> ~init ~$$ ~@walked)))

#zinc/preprocess
(defmacro <$- [& forms] `(-$> ~@(reverse forms)))

#zinc/preprocess
(defmacro <<- [& forms] `(->> ~@(reverse forms)))

#zinc/preprocess
(defmacro <-  [& forms] `(->  ~@(reverse forms)))

#zinc/preprocess
(defmacro flip [f a2 a1 & args] `(~f ~a1 ~a2 ~@args))

#zinc/preprocess
(defmacro mk [arg1 & props]
  (let [is-variant? (coll? arg1)
        type-id-symbol (if is-variant? (nth arg1 2) arg1)
        type-id (get @adt-lookup type-id-symbol)
        variant-id (if is-variant?
                     (-> @variant-lookup (get type-id) (get (name (first arg1))))
                     nil)
        type-id (get @adt-lookup type-id-symbol)
        argn (-> @prop-lookup (get type-id) (get variant-id) :count)
        args (atom (mapv #(or (when (and (= 0 %) is-variant?) variant-id)
                              (some-> @prop-lookup
                                      (get-in [type-id variant-id :ind % :type])
                                      ((fn [t] `(mzero ~t)))))
                         (range argn)))
        desugar-props (-> #(-> (and (coll? %) (symbol? (first %)))
                               (and (.startsWith (name (first %)) "%"))
                               (if % (list (symbol "%children") %)))
                          (map props))]
    (doseq [[k v] desugar-props]
      (cond
        (and (symbol? k) (= "%..." (name k)))
        (doseq [i (range (if is-variant? 1 0) argn)]
          (swap! args #(assoc % i `(aget ~v ~(inc i)))))

        (and (symbol? k) (= "%=" (name k)))
        (doseq [vark v]
          (let [by-name (-> @prop-lookup (get type-id) (get variant-id) :name)
                {:keys [ind]} (or (get by-name (name vark))
                                  (get by-name (:unname (meta vark))))]
            (swap! args #(assoc % ind vark))))

        (and (symbol? k) (.endsWith (name k) "<"))
        (let [k-name (name k)
              flatplicative? (not (.endsWith (name k) "<<"))
              k-nameid (subs k-name 1 (- (.-length k-name) (if flatplicative? 1 2)))
              k-nameid (if (= k-nameid "") "children" k-nameid)
              {:keys [ind type]} (get-in @prop-lookup
                                         [type-id variant-id :name k-nameid])
              tplus (if flatplicative? ['fplus type] ['mplus])]
          (<<- (swap! args) (fn [curr]) (update curr ind)
               (fn [acc] `(~@tplus ~acc ~v))))

        :else
        (let [k-name (name k)
              k-nameid (subs k-name 1)
              {:keys [ind]} (-> @prop-lookup (get type-id) (get variant-id) :name (get k-nameid))]
          (swap! args #(assoc % ind v)))))
    (->> (concat [type-id] @args) (into []))))

#zinc/preprocess
(defmacro fn-mk [[arg-spec type-id-symbol plus variant-name] & body]
  (let [type-id (get @adt-lookup type-id-symbol)
        variants (-> @variant-lookup (get type-id))
        has-variants? (and (= '+ plus) (-> variants empty? not))
        arg1 (if has-variants? `(~variant-name :of ~type-id-symbol))]
    `(fn ~arg-spec (mk ~arg1 ~@body))))

#zinc/preprocess
(defmacro defn-mk [[fnname arg-spec type-id-symbol _ mvariant-name] & body]
  (let [type-id (get @adt-lookup type-id-symbol)
        variants (-> @variant-lookup (get type-id))
        has-variants? (-> variants empty? not)
        variant-name (or mvariant-name fnname)
        arg1 (if has-variants? `(~variant-name :of ~type-id-symbol) type-id-symbol)]
    `(defn ~fnname ~arg-spec (mk ~arg1 ~@body))))

#zinc/preprocess
(defn process-using [type-id variant-id val-sym body config]
  (let [get-idname
        (fn [form]
          (when (symbol? form)
            (let [type (get-in config [:prefix :type] :pre)
                  s (str "%" (get-in config [:prefix :s] ""))
                  fname (name form)
                  fns (namespace form)]
              (if (= type :ns)
                (and (= s fns) fname)
                (and (.startsWith fname s) (subs fname (.-length s)))))))

        vars (atom {})

        inner-body
        (-> (fn [curr]
              (if-let [idname (get-idname curr)]
                (if (= idname ".") val-sym
                    (let [varsym (or (get @vars idname) (gensym (str "var-" idname)))
                          varsym (vary-meta varsym #(assoc % :unname idname))]
                      (swap! vars assoc idname varsym)
                      varsym))
                curr))
            (clojure.walk/postwalk body))

        bindings
        (-> (fn [bindings idname varsym]
              (let [{:keys [ind]} (-> @prop-lookup
                                      (get type-id)
                                      (get variant-id)
                                      :name
                                      (get idname))]
                (-> bindings
                    (conj (vary-meta varsym #(assoc % :unname idname)))
                    (conj `(aget ~val-sym ~(inc ind))))))
            (reduce-kv [] @vars))]
    [bindings inner-body]))

#zinc/preprocess
(defmacro un [[type-id-symbol val & config-defs] & body]
  (let [config (->> config-defs (partition-all 2) (reduce #(assoc %1 (first %2) (last %2)) {}))
        type-id (get @adt-lookup type-id-symbol)
        [bindings inner-body] (process-using type-id nil val body config)]
    `(let ~bindings ~@inner-body)))

#zinc/preprocess
(defn mk-fn-un [arg-spec-placeholder & body]
  (let [symbols (atom nil)
        arg-spec (->> arg-spec-placeholder
                      (mapv (fn [form]
                              (let [type-id (get @adt-lookup form)
                                    valsym (and type-id (gensym "val"))]
                                (when type-id (reset! symbols [form valsym]))
                                (if type-id valsym form)))))
        [type-id-symbol valsym] @symbols]
    [arg-spec `(un [~type-id-symbol ~valsym] ~@body)]))

#zinc/preprocess
(defmacro fn-un [& args]
  (let [[arg-spec body] (apply mk-fn-un args)]
    `(fn ~arg-spec ~body)))

#zinc/preprocess
(defmacro defn-un [& args]
  (let [[defn-args mk-fn-args] (split-with #(not (vector? %)) args)
        [arg-spec body] (apply mk-fn-un mk-fn-args)]
    `(defn ~@defn-args ~arg-spec ~body)))


#zinc/preprocess
(defmacro lookup-variant-id [type-id-symbol variant-name]
  (let [type-id (get @adt-lookup type-id-symbol)]
    (get-in @variant-lookup [type-id (subs (name variant-name) 1)])))

#zinc/preprocess
(defn do-impl [type-id-symbol val cases]
  (let [val-sym (gensym "val")
        spec-sym (gensym "spec")
        type-id (get @adt-lookup type-id-symbol)
        variants (get @variant-lookup type-id)
        spec (->
              (fn [spec [variant-name-sym & body]]
                (let [variant-name (name variant-name-sym)
                      variant-id (if (= "_" variant-name) 0
                                     (get variants variant-name))
                      [bindings inner-body]
                      (process-using type-id variant-id val-sym body {})]
                  (assoc spec variant-id `(fn [] (let ~bindings ~@inner-body)))))
              (reduce {} cases))]
    `(let [~val-sym ~val ~spec-sym ~spec]
       ((or (aget ~spec-sym (aget ~val-sym 1)) (aget ~spec-sym 0))))))

#zinc/preprocess
(defmacro impl [[type-id-symbol val] & cases]
  (do-impl type-id-symbol val cases))

#zinc/preprocess
(defn mk-fn-impl [arg-spec-placeholder & cases]
  (let [symbols (atom nil)
        arg-spec (->> arg-spec-placeholder
                      (mapv (fn [form]
                              (let [type-id (get @adt-lookup form)
                                    valsym (and type-id (gensym "val"))]
                                (when type-id (reset! symbols [form valsym]))
                                (if type-id valsym form)))))
        [type-id-symbol valsym] @symbols]
    [arg-spec (do-impl type-id-symbol valsym cases)]))

#zinc/preprocess
(defmacro fn-impl [& args]
  (let [[arg-spec body] (apply mk-fn-impl args)]
    `(fn ~arg-spec ~body)))

#zinc/preprocess
(defmacro defn-impl [& args]
  (let [[defn-args mk-fn-args] (split-with #(not (vector? %)) args)
        [arg-spec body] (apply mk-fn-impl mk-fn-args)]
    `(defn ~@defn-args ~arg-spec ~body)))


(zinc/referred-macros
 def* def+
 prop$ method$
 -$> <$- <<- <-
 defn-impl fn-impl impl
 defn-un fn-un un
 defn-mk fn-mk mk)
