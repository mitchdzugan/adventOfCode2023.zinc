(require '["/+.zn" :as + :exporting "*"])

#zinc/preprocess
(defmacro describe [s & body]
  `(js/describe ~s (fn [] ~@body)))

#zinc/preprocess
(defmacro it [s & body]
  `(js/it ~s (fn [] ~@body)))

#zinc/preprocess
(defmacro expect [expected & rest]
  (let [[props args] (split-with #(and (symbol? %)
                                       (.startsWith (name %) "-"))
                                 rest)
        inner `(.. (js/expect ~expected) ~@props)]
    (if (empty? args)
      inner
      `(~inner ~@args))))

#zinc/preprocess
(defmacro def* [arg1- props]
  (let [arg1 (if (coll? arg1-) (into [] arg1-) arg1-)
        [reserved-symbol typename] (if (coll? arg1)
                                     [(nth arg1 0) (nth arg1 2)]
                                     [arg1 arg1])
        no-save? (= (name typename) "*no-save*")
        typename (if no-save? reserved-symbol typename)]
    `(def ~reserved-symbol ~(first (+/do-def* `(~reserved-symbol :as *no-save*) props)))))

#zinc/preprocess
(defmacro def+ [arg1- & variants]
  (let [arg1 (if (coll? arg1-) (into [] arg1-) arg1-)
        [reserved-symbol typename] (if (coll? arg1)
                                     [(nth arg1 0) (nth arg1 2)]
                                     [arg1 arg1])
        no-save? (= (name typename) "*no-save*")
        typename (if no-save? reserved-symbol typename)]
    (when (and (not no-save?) (not= typename reserved-symbol))
      (throw "Types in test mode can not be saved"))
    `(def ~reserved-symbol ~(first (apply +/do-def+ `(~reserved-symbol :as *no-save*) variants)))))

(zinc/referred-macros describe it expect def* def+)
