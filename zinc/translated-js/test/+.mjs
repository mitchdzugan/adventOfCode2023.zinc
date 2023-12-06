import * as _PLUS_ from './__test_utils__/+.mjs';
var TestProd = -1;
var mkTestProd = (function(a, b) {
    return [-1, a, b];
});
var Sugar = -2;
var TestSum = -3;
var testKey = (function(val_1) {
    let val_21 = val_1;
    let spec_32 = ({
        4: (function() {
            return "t:";
        }),
        5: (function() {
            let var_d_43 = val_21[2];
            return _PLUS_.str("d:", _PLUS_.key(var_d_43));
        }),
        6: (function() {
            let var_res_54 = val_21[2];
            let var_acc_65 = val_21[3];
            return _PLUS_.str("w:", _PLUS_.key(var_res_54), "|", _PLUS_.key(var_acc_65));
        })
    });
    return (spec_32[val_21[1]] || spec_32[0])();
});
_PLUS_.implement_key(TestSum, testKey);
var TagT = 4;
var DataT = 5;
var WriterT = 6;
var Tag = [-3, 4];
var Data = (function(d) {
    return [-3, 5, d];
});
var Writer = (function(res, acc) {
    return [-3, 6, res, acc];
});
describe("core data library '+'", (function() {
    describe("mk sugar", (function() {
        return it(_PLUS_.str("macro supports various ways of creating objects which are ", "represented internally as arrays with the typeId in 0 index"), (function() {
            let x6 = "hey";
            let y7 = 0;
            let children8 = _PLUS_.Vec(3, 4, 5);
            expect([-2, x6, children8, y7])["to_eq"]([Sugar, x6, children8, y7]);
            expect([-2, x6, children8, y7])["to_eq"]([-2, x6, children8, y7]);
            expect([-2, x6, children8, y7])["to_eq"]([-2, x6, children8, y7]);
            return expect([-2, _PLUS_.mplus(_PLUS_.mplus(_PLUS_.mzero(_PLUS_.StrT), "h"), "ey"), _PLUS_.fplus(_PLUS_.VecT, _PLUS_.mplus(_PLUS_.mzero(_PLUS_.VecT), _PLUS_.Vec(3, 4)), 5), _PLUS_.mzero(_PLUS_.NumT)])["to_eq"]([-2, x6, children8, y7]);
        }));
    }));
    describe("key", (function() {
        return it("uses implementation provided by `implement-key`", (function() {
            expect(_PLUS_.key(Tag))["to_eq"]("t:");
            expect(_PLUS_.key(Data(7)))["to_eq"]("d:7");
            return expect(_PLUS_.key(Writer(true, "hi")))["to_eq"]("w:true|hi");
        }));
    }));
    describe("serializing", (function() {
        it("encodes to array representation with type-id in 0 index", (function() {
            expect(_PLUS_.encode(_PLUS_.None))["to_eq"](_PLUS_.str("[", _PLUS_.MaybeT, ",null]"));
            expect(_PLUS_.encode(_PLUS_.Just(true)))["to_eq"](_PLUS_.str("[", _PLUS_.MaybeT, ",true]"));
            expect(_PLUS_.encode(_PLUS_.Vec(1, 2, 3)))["to_eq"](_PLUS_.str("[", _PLUS_.VecT, ",1,2,3]"));
            expect(_PLUS_.encode(_PLUS_.KeyedList([
                [1, 2],
                [3, 4]
            ])))["to_eq"](_PLUS_.str("[", _PLUS_.KeyedListT, ",[1,2],[3,4]]"));
            expect(_PLUS_.encode(_PLUS_.Map([
                [1, 2],
                [3, 4]
            ])))["to_eq"](_PLUS_.str("[", _PLUS_.MapT, ",[1,2],[3,4]]"));
            expect(_PLUS_.encode(_PLUS_.KeyMap([
                [Tag, 2],
                [Data(3), 4]
            ])))["to_eq"](_PLUS_.str("[", _PLUS_.KeyMapT, ",[[", TestSum, ",", TagT, "],2],", "[[", TestSum, ",", DataT, ",3],4]]"));
            expect(_PLUS_.encode(mkTestProd(5, 8)))["to_eq"](_PLUS_.str("[", TestProd, ",5,8]"));
            return expect(_PLUS_.encode(Writer(1, "log")))["to_eq"](_PLUS_.str("[", TestSum, ",", WriterT, ",1,\"log\"]"));
        }));
        it("encodes array representations recursively", (function() {
            return expect(_PLUS_.encode(mkTestProd(_PLUS_.None, _PLUS_.Vec(-1, 3))))["to_eq"](_PLUS_.str("[", TestProd, ",[", _PLUS_.MaybeT, ",null],[", _PLUS_.VecT, ",-1,3]]"));
        }));
        return it("encodes to string that deocdes to structurally identical value", (function() {
            let v_prior9 = _PLUS_.Just(Writer(_PLUS_.Vec(Tag, Data(mkTestProd(2, 3))), "hi"));
            let v_after10 = _PLUS_.decode(_PLUS_.encode(v_prior9));
            expect(v_prior9)["to_eq"](v_after10);
            return expect(_PLUS_.json(v_prior9))["to_raw_eq"](_PLUS_.json(v_after10));
        }));
    }));
    describe("Maybe", (function() {
        describe("or", (function() {
            it("returns value if just", (function() {
                return expect(_PLUS_.or(2, _PLUS_.Just(4)))["to_eq"](4);
            }));
            return it("returns default value if none", (function() {
                return expect(_PLUS_.or(2, _PLUS_.None))["to_eq"](2);
            }));
        }));
        return describe("or-", (function() {
            return it("only uses functions when it needs to", (function() {
                let n_count11 = [0];
                let track_n12 = (function() {
                    return n_count11[0] = (_PLUS_.inc)(n_count11[0]);
                });
                let fn13 = (function() {
                    track_n12();
                    return 1;
                });
                expect(_PLUS_.or_(fn13, _PLUS_.Just(4)))["to_eq"](4);
                expect(n_count11)["to_raw_eq"]([0]);
                expect(_PLUS_.or_(fn13, _PLUS_.None))["to_eq"](1);
                return expect(n_count11)["to_raw_eq"]([1]);
            }));
        }));
    }));
    describe("Range", (function() {
        return it("builds vector of ints based on [end]/[init, end]/[init, end, step] args", (function() {
            expect(_PLUS_.Range(2))["to_eq"](_PLUS_.Vec(0, 1));
            expect(_PLUS_.Range(-4))["to_eq"](_PLUS_.Vec(0, -1, -2, -3));
            expect(_PLUS_.Range(3, 8))["to_eq"](_PLUS_.Vec(3, 4, 5, 6, 7));
            expect(_PLUS_.Range(-1, 2))["to_eq"](_PLUS_.Vec(-1, 0, 1));
            expect(_PLUS_.Range(5, 3))["to_eq"](_PLUS_.Vec(5, 4));
            expect(_PLUS_.Range(2, 9, 3))["to_eq"](_PLUS_.Vec(2, 5, 8));
            expect(_PLUS_.Range(2, 8, 3))["to_eq"](_PLUS_.Vec(2, 5));
            expect(_PLUS_.Range(2, 7, 3))["to_eq"](_PLUS_.Vec(2, 5));
            return expect(_PLUS_.Range(9, 2, -2))["to_eq"](_PLUS_.Vec(9, 7, 5, 3));
        }));
    }));
    describe("keys/vals", (function() {
        it("gets a vector of the keys or values in a collection", (function() {
            expect(_PLUS_.keys(_PLUS_.Map([
                [4, "a"],
                [5, "b"],
                [6, "c"]
            ])))["to_eq"](_PLUS_.Vec(4, 5, 6));
            expect(_PLUS_.keys(_PLUS_.Vec("a", "b", "c")))["to_eq"](_PLUS_.Vec(0, 1, 2));
            expect(_PLUS_.keys(_PLUS_.Just("a")))["to_eq"](_PLUS_.Vec(0));
            expect(_PLUS_.keys(_PLUS_.None))["to_eq"](_PLUS_.Vec());
            expect(_PLUS_.vals(_PLUS_.Map([
                [4, "a"],
                [5, "b"],
                [6, "c"]
            ])))["to_eq"](_PLUS_.Vec("a", "b", "c"));
            expect(_PLUS_.vals(_PLUS_.Vec("a", "b", "c")))["to_eq"](_PLUS_.Vec("a", "b", "c"));
            expect(_PLUS_.vals(_PLUS_.Just("a")))["to_eq"](_PLUS_.Vec("a"));
            return expect(_PLUS_.vals(_PLUS_.None))["to_eq"](_PLUS_.Vec());
        }));
        return it("returns fresh instance even when keys/vals just returns itself", (function() {
            let vec114 = _PLUS_.Vec(mkTestProd(1, 2), mkTestProd(3, 4), mkTestProd(5, 6));
            let vec215 = _PLUS_.vals(vec114);
            expect(vec114)["to_eq"](vec215);
            expect(vec114)["not"]["toBe"](vec215);
            expect(vec114["a"])["not"]["toBe"](vec215["a"]);
            return expect(vec114["a"][0])["toBe"](vec215["a"][0]);
        }));
    }));
    describe("fmap", (function() {
        it("maps function over collection", (function() {
            expect(_PLUS_.fmap(_PLUS_.inc, _PLUS_.Vec(0, 1, 2)))["to_eq"](_PLUS_.Vec(1, 2, 3));
            expect(_PLUS_.fmap(_PLUS_.inc, _PLUS_.Map([
                [4, 8],
                [15, 16]
            ])))["to_eq"](_PLUS_.Map([
                [4, 9],
                [15, 17]
            ]));
            return expect(_PLUS_.fmap(_PLUS_.inc, _PLUS_.Just(5)))["to_eq"](_PLUS_.Just(6));
        }));
        it("noops on empty collection", (function() {
            expect(_PLUS_.fmap(_PLUS_.inc, _PLUS_.Vec()))["to_eq"](_PLUS_.Vec());
            expect(_PLUS_.fmap(_PLUS_.inc, _PLUS_.Map()))["to_eq"](_PLUS_.Map());
            return expect(_PLUS_.fmap(_PLUS_.inc, _PLUS_.None))["to_eq"](_PLUS_.None);
        }));
        return it("passes all args", (function() {
            let fmapper16 = (function(coll) {
                return _PLUS_.fmap((function(_anon_PERCENT_1_57, _anon_PERCENT_2_58, _anon_PERCENT_3_59) {
                    return _PLUS_.Vec(_PLUS_.inc(_anon_PERCENT_1_57), _anon_PERCENT_2_58, _PLUS_.size(_anon_PERCENT_3_59));
                }), coll);
            });
            expect(fmapper16(_PLUS_.Vec(0, 1, 2)))["to_eq"](_PLUS_.Vec(_PLUS_.Vec(1, 0, 3), _PLUS_.Vec(2, 1, 3), _PLUS_.Vec(3, 2, 3)));
            expect(fmapper16(_PLUS_.Map([
                [7, 0],
                [8, 1],
                [9, 2]
            ])))["to_eq"](_PLUS_.Map([
                [7, _PLUS_.Vec(1, 7, 3)],
                [8, _PLUS_.Vec(2, 8, 3)],
                [9, _PLUS_.Vec(3, 9, 3)]
            ]));
            return expect(fmapper16(_PLUS_.Just(1)))["to_eq"](_PLUS_.Just(_PLUS_.Vec(2, 0, 1)));
        }));
    }));
    return describe("filter/remove", (function() {
        it("filters collection by predicate", (function() {
            expect(_PLUS_.filter((function(_anon_PERCENT_1_60) {
                return (_anon_PERCENT_1_60 > 2);
            }), _PLUS_.Vec(3, 1, 4, 5, 2)))["to_eq"](_PLUS_.Vec(3, 4, 5));
            expect(_PLUS_.filter((function(_anon_PERCENT_1_61) {
                return (_anon_PERCENT_1_61 > 2);
            }), _PLUS_.Just(5)))["to_eq"](_PLUS_.Just(5));
            expect(_PLUS_.filter((function(_anon_PERCENT_1_62) {
                return (_anon_PERCENT_1_62 > 2);
            }), _PLUS_.Just(1)))["to_eq"](_PLUS_.None);
            expect(_PLUS_.filter((function(_anon_PERCENT_1_63) {
                return (_anon_PERCENT_1_63 > 2);
            }), _PLUS_.None))["to_eq"](_PLUS_.None);
            expect(_PLUS_.remove((function(_anon_PERCENT_1_64) {
                return (_anon_PERCENT_1_64 > 2);
            }), _PLUS_.Vec(3, 1, 4, 5, 2)))["to_eq"](_PLUS_.Vec(1, 2));
            expect(_PLUS_.remove((function(_anon_PERCENT_1_65) {
                return (_anon_PERCENT_1_65 > 2);
            }), _PLUS_.Just(5)))["to_eq"](_PLUS_.None);
            expect(_PLUS_.remove((function(_anon_PERCENT_1_66) {
                return (_anon_PERCENT_1_66 > 2);
            }), _PLUS_.Just(1)))["to_eq"](_PLUS_.Just(1));
            return expect(_PLUS_.filter((function(_anon_PERCENT_1_67) {
                return (_anon_PERCENT_1_67 > 2);
            }), _PLUS_.None))["to_eq"](_PLUS_.None);
        }));
        return it("passes all args", (function() {
            let filterer17 = _PLUS_.partial(_PLUS_.filter, (function(_anon_PERCENT_1_68, _anon_PERCENT_2_69, _anon_PERCENT_3_70) {
                return _PLUS_.is(0, _PLUS_.mod((_anon_PERCENT_1_68 + _anon_PERCENT_2_69 + _PLUS_.size(_anon_PERCENT_3_70)), 2));
            }));
            expect(filterer17(_PLUS_.Vec(1, 2, 3, 4)))["to_eq"](_PLUS_.Vec());
            expect(filterer17(_PLUS_.Vec(1, 2, 3)))["to_eq"](_PLUS_.Vec(1, 2, 3));
            expect(filterer17(_PLUS_.Vec(1, 2, 10, 3)))["to_eq"](_PLUS_.Vec(10, 3));
            expect(filterer17(_PLUS_.Just(1)))["to_eq"](_PLUS_.Just(1));
            return expect(filterer17(_PLUS_.Just(2)))["to_eq"](_PLUS_.None);
        }));
    }));
}));

export {
    mkTestProd,
    TestProd,
    TestSum,
    TagT,
    DataT,
    Sugar,
    Writer,
    WriterT,
    Data,
    Tag,
    testKey
}
