(require '["/../test/__test_utils__/+.zn" :as +])
(require '["jest-diff" :as jd])

(.extend js/expect
         {:to_be_within_range
          (fn [actual min max]
            (let [pass (and (>= actual min) (<= actual max))]
              {:pass pass
               :message #(+/str "expected " actual (if pass " not" "")
                                " to be within range (" min ".." max ")")}))
          :to_eq
          (fn [actual-zn expected-zn]
            (let [actual (+/pretty actual-zn)
                  expected (+/pretty expected-zn)
                  eq-diff (jd/diff {} {})
                  test-diff (jd/diff expected actual)
                  pass (+/is eq-diff test-diff)]
              {:pass pass
               :message
               #(if pass
                  "expected not to be equal"
                  (+/str "expected to be equal:\n" test-diff))}))

          :to_raw_eq
          (fn [actual expected]
            (let [eq-diff (jd/diff {} {})
                  test-diff (jd/diff expected actual)
                  pass (+/is eq-diff test-diff)]
              {:pass pass
               :message
               #(if pass
                  "expected not to be equal"
                  (+/str "expected to be equal:\n" test-diff))}))})
