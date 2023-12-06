import * as _PLUS_ from './types.mjs';
export * from './types.mjs';
var key_impls = ({});
var implement_key = (function(type_id, f) {
    return key_impls[type_id] = f;
});
var key = (function(obj) {
    return key_impls[type_id(obj)](obj);
});
var forcedKey = (function(obj) {
    return (key_impls[type_id(obj)] || inst_id)(obj);
});
implement_key(_PLUS_.NumT, _PLUS_.id);
implement_key(_PLUS_.StrT, _PLUS_.id);
implement_key(_PLUS_.BoolT, _PLUS_.id);
_PLUS_.implement_monad_plus(_PLUS_.NumT, (function() {
    return 0;
}), (function(_anon_PERCENT_1_71, _anon_PERCENT_2_72) {
    return (_anon_PERCENT_1_71 + _anon_PERCENT_2_72);
}));
_PLUS_.implement_monad_plus(_PLUS_.StrT, (function() {
    return "";
}), _PLUS_.str);
_PLUS_.implement_monad_plus(_PLUS_.BoolT, (function() {
    return false;
}), (function(_anon_PERCENT_1_73, _anon_PERCENT_2_74) {
    return (_anon_PERCENT_1_73 || _anon_PERCENT_2_74);
}));
_PLUS_.implement_monad_plus(_PLUS_.VecT, (function() {
    return Vec();
}), (function(_anon_PERCENT_1_75, _anon_PERCENT_2_76) {
    return concat(_anon_PERCENT_1_75, _anon_PERCENT_2_76);
}));
_PLUS_.implement_monad_plus(_PLUS_.MaybeT, (function() {
    return None;
}), (function(_anon_PERCENT_1_78, _anon_PERCENT_2_77) {
    return maybe(_anon_PERCENT_2_77, Just, _anon_PERCENT_1_78);
}));
_PLUS_.implement_applicative(_PLUS_.VecT, (function(_anon_PERCENT_1_79) {
    return Vec(_anon_PERCENT_1_79);
}));
_PLUS_.implement_applicative(_PLUS_.MaybeT, (function(_anon_PERCENT_1_80) {
    return Just(_anon_PERCENT_1_80);
}));
_PLUS_.implement_flatplicative_for_applicative(_PLUS_.VecT);
_PLUS_.implement_flatplicative_for_applicative(_PLUS_.MaybeT);
_PLUS_.implement_flatplicative(_PLUS_.StrT, _PLUS_.str);
_PLUS_.implement_flatplicative(_PLUS_.BoolT, (function(_anon_PERCENT_1_81) {
    return _PLUS_.not(_PLUS_.not(_anon_PERCENT_1_81));
}));
var MapClass = _PLUS_.MapClass;
var Unit = [_PLUS_.UnitT];
var Vec = (function() {
    let f1 = (function(var_args) {
        let args25 = [];
        let len__24440__auto__6 = arguments["length"];
        let i37 = 0;
        while (true) {
            if ((i37 < len__24440__auto__6)) {
                args25.push((arguments[i37]));
                let G__8 = (i37 + 1);
                i37 = G__8;
                continue;
            };
            break;
        };
        let argseq__24702__auto__9 = (((0 < args25["length"])) ? (args25.slice(0)) : (undefined));
        return f1.cljs$core$IFn$_invoke$arity$variadic(argseq__24702__auto__9);
    });
    f1["cljs$core$IFn$_invoke$arity$variadic"] = (function(a_) {
        let a10 = (a_ || []);
        let id11 = _PLUS_.mk_inst_id();
        return ({
            "T": _PLUS_.VecT,
            "I": id11,
            get "J"() {
                let $_712 = this;
                return _PLUS_.apply(_PLUS_.argv, _PLUS_.VecT, a10.map(json));
            },
            get "P"() {
                let $_813 = this;
                return a10.map(pretty);
            },
            "a": a10
        });
    });
    f1["cljs$lang$maxFixedArity"] = 0;
    f1["cljs$lang$applyTo"] = (function(seq4) {
        let self__24463__auto__14 = this;
        return self__24463__auto__14.cljs$core$IFn$_invoke$arity$variadic(seq(seq4));
    });
    return f1;
})();
var Map = (function(pairs) {
    return new MapClass(pairs);
});
var Set = (function() {
    let f15 = (function(var_args) {
        let args1619 = [];
        let len__24440__auto__20 = arguments["length"];
        let i1721 = 0;
        while (true) {
            if ((i1721 < len__24440__auto__20)) {
                args1619.push((arguments[i1721]));
                let G__22 = (i1721 + 1);
                i1721 = G__22;
                continue;
            };
            break;
        };
        let argseq__24702__auto__23 = (((0 < args1619["length"])) ? (args1619.slice(0)) : (undefined));
        return f15.cljs$core$IFn$_invoke$arity$variadic(argseq__24702__auto__23);
    });
    f15["cljs$core$IFn$_invoke$arity$variadic"] = (function(initials_) {
        let initials24 = (initials_ || []);
        let d25 = Map();
        let id26 = _PLUS_.mk_inst_id();
        initials24.forEach((function(_anon_PERCENT_1_82) {
            return d25.set(key(_anon_PERCENT_1_82), _anon_PERCENT_1_82);
        }));
        return ({
            "T": _PLUS_.SetT,
            "I": id26,
            get "J"() {
                let $_927 = this;
                return _PLUS_.js_array_from(d25, [_PLUS_.SetT], (function(p__28) {
                    let vec__2932 = p__28;
                    let _33 = vec__2932[0];
                    let v34 = vec__2932[1];
                    return json(v34);
                }));
            },
            get "P"() {
                let $_1035 = this;
                return pretty(vals(d25));
            },
            "d": d25
        });
    });
    f15["cljs$lang$maxFixedArity"] = 0;
    f15["cljs$lang$applyTo"] = (function(seq18) {
        let self__24463__auto__36 = this;
        return self__24463__auto__36.cljs$core$IFn$_invoke$arity$variadic(seq(seq18));
    });
    return f15;
})();
var KeyMap = (function(pairs) {
    let ks37 = Map(pairs.map((function(p__38) {
        let vec__3942 = p__38;
        let k43 = vec__3942[0];
        return [key(k43), k43];
    })));
    let vs44 = Map(pairs.map((function(p__45) {
        let vec__4649 = p__45;
        let k50 = vec__4649[0];
        let v51 = vec__4649[1];
        return [key(k50), v51];
    })));
    let id52 = _PLUS_.mk_inst_id();
    return ({
        "T": _PLUS_.KeyMapT,
        "I": id52,
        get "J"() {
            let $_1153 = this;
            return _PLUS_.js_array_from(vs44, [_PLUS_.KeyMapT], (function(p__54) {
                let vec__5558 = p__54;
                let kk59 = vec__5558[0];
                let v60 = vec__5558[1];
                return [json(ks37.get(kk59)), json(v60)];
            }));
        },
        get "P"() {
            let $_1261 = this;
            return pretty(vs44);
        },
        "ks": ks37,
        "vs": vs44
    });
});
var KeyedList = (function(pairs) {
    let id62 = _PLUS_.mk_inst_id();
    let kl63 = ({
        "I": id62,
        get "P"() {
            let $_1364 = this;
            return _PLUS_.js_flat_array_from($_1364["a"], ["#:KeyedList"], (function(p__65) {
                let vec__6669 = p__65;
                let id70 = vec__6669[0];
                let v71 = vec__6669[1];
                return [_PLUS_.str("#", id70), pretty(v71)];
            }));
        },
        get "J"() {
            let $_1472 = this;
            return _PLUS_.js_array_from($_1472["a"], [_PLUS_.KeyedListT], (function(p__73) {
                let vec__7477 = p__73;
                let id78 = vec__7477[0];
                let v79 = vec__7477[1];
                return [id78, json(v79)];
            }));
        },
        "T": _PLUS_.KeyedListT,
        "l": undefined,
        "d": ({}),
        "f": undefined,
        "i": 1,
        get "a"() {
            let $_1580 = this;
            let res81 = [];
            let id82 = $_1580["f"];
            while (true) {
                if (_PLUS_.nil_QMARK_(id82)) {
                    return res81;
                } else {
                    let vec__8386 = $_1580["d"][id82];
                    let v87 = vec__8386[0];
                    let pid88 = vec__8386[1];
                    let nid89 = vec__8386[2];
                    res81.push([id82, v87]);
                    let G__90 = nid89;
                    id82 = G__90;
                    continue;
                };
                break;
            }
        }
    });
    let empty_QMARK_91 = (function(_anon_PERCENT_1_83) {
        return _PLUS_.is(0, _PLUS_.js_length(_anon_PERCENT_1_83));
    });
    let G__9293 = kl63;
    G__9293;
    if (empty_QMARK_91(pairs)) {
        undefined
    } else {
        kl63["f"] = pairs[0][0];
        let G__106121 = pairs;
        let vec__109122 = G__106121;
        let seq__110123 = vec__109122;
        let first__111124 = seq__110123[0];
        let seq__110125 = seq__110123.slice(1);
        let vec__112126 = first__111124;
        let nid127 = vec__112126[0];
        let nv128 = vec__112126[1];
        let next129 = vec__112126;
        let rest130 = seq__110125;
        let G__107131 = [];
        let vec__115132 = G__107131;
        let cid133 = vec__115132[0];
        let cv134 = vec__115132[1];
        let curr135 = vec__115132;
        let G__108136 = [];
        let vec__118137 = G__108136;
        let pid138 = vec__118137[0];
        let pv139 = vec__118137[1];
        let prev140 = vec__118137;
        let max_id141 = 0;
        let G__106142 = G__106121;
        let G__107143 = G__107131;
        let G__108144 = G__108136;
        let max_id145 = max_id141;
        while (true) {
            let vec__146158 = G__106142;
            let seq__147159 = vec__146158;
            let first__148160 = seq__147159[0];
            let seq__147161 = seq__147159.slice(1);
            let vec__149162 = first__148160;
            let nid163 = vec__149162[0];
            let nv164 = vec__149162[1];
            let next165 = vec__149162;
            let rest166 = seq__147161;
            let vec__152167 = G__107143;
            let cid168 = vec__152167[0];
            let cv169 = vec__152167[1];
            let curr170 = vec__152167;
            let vec__155171 = G__108144;
            let pid172 = vec__155171[0];
            let pv173 = vec__155171[1];
            let prev174 = vec__155171;
            let max_id175 = max_id145;
            if (_PLUS_.nil_QMARK_(cid168)) {
                undefined
            } else {
                kl63["d"][cid168] = [cv169, pid172, nid163]
            };
            if (!empty_QMARK_91(rest166)) {
                let G__176 = rest166;
                let G__177 = next165;
                let G__178 = curr170;
                let G__179 = _PLUS_.max(max_id175, nid163);
                G__106142 = G__176;
                G__107143 = G__177;
                G__108144 = G__178;
                max_id145 = G__179;
                continue;
            } else {
                let G__180181 = kl63;
                G__180181["i"] = (max_id175 + 1);
                G__180181["l"] = nid163;
                G__180181["d"][nid163] = [nv164, cid168];
                G__180181
            };
            break;
        }
    };
    return G__9293;
});
var mkMaybe = (function(j, e) {
    let id182 = _PLUS_.mk_inst_id();
    return ({
        "T": _PLUS_.MaybeT,
        "I": id182,
        get "J"() {
            let $_16183 = this;
            if (e) {
                return [_PLUS_.MaybeT, _PLUS_.null$];
            } else {
                return [_PLUS_.MaybeT, json(j)];
            }
        },
        get "P"() {
            let $_17184 = this;
            if (e) {
                return _PLUS_.null$;
            } else {
                return ({
                    "just": pretty(j)
                });
            }
        },
        "j": j,
        "e": e
    });
});
var Just = (function(j) {
    return mkMaybe(j, false);
});
var None = mkMaybe(undefined, true);
var Maybe = (function(nilable) {
    return mkMaybe(nilable, _PLUS_.nil_QMARK_(nilable));
});
var type_id = (function(any) {
    return any["T"];
});
var inst_id = (function(any) {
    return any["I"];
});
var json = (function(any) {
    return any["J"];
});
var pretty = (function(any) {
    return (any && any["P"]);
});
var coll_impl = (function(spec, obj) {
    return (spec[type_id(obj)] || spec[_PLUS_.else$])();
});
var Range = (function() {
    let f185 = (function(var_args) {
        let args186189 = [];
        let len__24440__auto__190 = arguments["length"];
        let i187191 = 0;
        while (true) {
            if ((i187191 < len__24440__auto__190)) {
                args186189.push((arguments[i187191]));
                let G__192 = (i187191 + 1);
                i187191 = G__192;
                continue;
            };
            break;
        };
        let argseq__24702__auto__193 = (((0 < args186189["length"])) ? (args186189.slice(0)) : (undefined));
        return f185.cljs$core$IFn$_invoke$arity$variadic(argseq__24702__auto__193);
    });
    f185["cljs$core$IFn$_invoke$arity$variadic"] = (function(args) {
        let vec__194197 = args;
        let a1198 = vec__194197[0];
        let a2199 = vec__194197[1];
        let a3200 = vec__194197[2];
        let fin201 = (function(init, end, step) {
            return _PLUS_.apply(Vec, Array.from(Array(_PLUS_.ceil(_PLUS_.div((end - init), step))), (function(_anon_PERCENT_1_85, _anon_PERCENT_2_84) {
                return (init + (step * _anon_PERCENT_2_84));
            })));
        });
        if (_PLUS_.nil_QMARK_(a1198)) {
            return Vec();
        } else {
            if (_PLUS_.nil_QMARK_(a2199)) {
                return fin201(0, a1198, (((a1198 >= 0)) ? (1) : (-1)));
            } else {
                if (_PLUS_.nil_QMARK_(a3200)) {
                    return fin201(a1198, a2199, (((a2199 >= a1198)) ? (1) : (-1)));
                } else {
                    if ("else") {
                        return fin201(a1198, a2199, a3200);
                    } else {
                        return undefined;
                    }
                }
            }
        }
    });
    f185["cljs$lang$maxFixedArity"] = 0;
    f185["cljs$lang$applyTo"] = (function(seq188) {
        let self__24463__auto__202 = this;
        return self__24463__auto__202.cljs$core$IFn$_invoke$arity$variadic(seq(seq188));
    });
    return f185;
})();
var at = (function(val_1, k) {
    let $203 = val_1;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            return Maybe($203["a"][k]);
        }),
        [_PLUS_.MapT]: (function() {
            return Maybe($203.get(k));
        }),
        [_PLUS_.SetT]: (function() {
            return fmap((function() {
                return Unit;
            }), Maybe($203["d"].get(key(k))));
        }),
        [_PLUS_.KeyMapT]: (function() {
            return Maybe($203["vs"]["get"](key(k)));
        }),
        [_PLUS_.KeyedListT]: (function() {
            return fmap((function(_anon_PERCENT_1_86) {
                return _anon_PERCENT_1_86[0];
            }), Maybe($203["d"][k]));
        }),
        [_PLUS_.MaybeT]: (function() {
            if (((0 !== k) || $203["e"])) {
                return None;
            } else {
                return $203;
            }
        })
    }), $203);
});
var has_QMARK_ = (function(c, k) {
    return !empty_QMARK_(at(c, k));
});
var intersection = (function(s1, s2) {
    return _PLUS_.apply(Set, filter((function(_anon_PERCENT_1_87) {
        return has_QMARK_(s2, _anon_PERCENT_1_87);
    }), vals(s1))["a"]);
});
var union = (function(s1, s2) {
    return _PLUS_.apply(Set, concat(vals(s1), vals(s2))["a"]);
});
var put = (function(val_2, k, v) {
    let $204 = val_2;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            return $204["a"][k] = v;
        }),
        [_PLUS_.MapT]: (function() {
            return $204.set(k, v);
        }),
        [_PLUS_.KeyMapT]: (function() {
            let kk205 = key(k);
            $204["ks"].set(kk205, k);
            return $204["vs"].set(kk205, v);
        }),
        [_PLUS_.KeyedListT]: (function() {
            return "TODO";
        })
    }), $204);
});
var for_each_map = (function(f, m, get_js_m, map_key) {
    return _PLUS_.js_array_from(get_js_m(m), (function(p__206) {
        let vec__207210 = p__206;
        let k211 = vec__207210[0];
        let v212 = vec__207210[1];
        return function() {
            return f(v212, map_key(k211), m);
        };
    })).forEach((function(_anon_PERCENT_1_88) {
        return _anon_PERCENT_1_88();
    }));
});
var each = (function(f, val_3) {
    let $213 = val_3;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            return $213["a"]["forEach"]((function(_anon_PERCENT_1_89, _anon_PERCENT_2_90) {
                return f(_anon_PERCENT_1_89, _anon_PERCENT_2_90, $213);
            }));
        }),
        [_PLUS_.MapT]: (function() {
            return for_each_map(f, $213, _PLUS_.id, _PLUS_.id);
        }),
        [_PLUS_.KeyMapT]: (function() {
            return for_each_map(f, $213, (function(_anon_PERCENT_1_91) {
                return _anon_PERCENT_1_91["vs"];
            }), (function(_anon_PERCENT_1_92) {
                return $213["ks"]["get"](_anon_PERCENT_1_92);
            }));
        }),
        [_PLUS_.MaybeT]: (function() {
            if ($213["e"]) {
                return undefined;
            } else {
                return f($213["j"], 0, $213);
            }
        }),
        [_PLUS_.KeyedListT]: (function() {
            return $213["a"].forEach().fn([
                [id, v], ind
            ], f(v, id, $213, ind))();
        })
    }), $213);
});
var reduce = (function(f, init, coll) {
    let res214 = [init];
    each((function(_anon_PERCENT_1_93, _anon_PERCENT_2_94, _anon_PERCENT_3_95, _anon_PERCENT_4_96) {
        return res214[0] = f(res214[0], _anon_PERCENT_1_93, _anon_PERCENT_2_94, _anon_PERCENT_3_95, _anon_PERCENT_4_96);
    }), coll);
    return res214[0];
});
var fmap = (function(f, val_4) {
    let $215 = val_4;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            return _PLUS_.apply(Vec, $215["a"]["map"]((function(_anon_PERCENT_1_97, _anon_PERCENT_2_98) {
                return f(_anon_PERCENT_1_97, _anon_PERCENT_2_98, $215);
            })));
        }),
        [_PLUS_.MapT]: (function() {
            return Map(_PLUS_.js_array_from($215, (function(p__216) {
                let vec__217220 = p__216;
                let k221 = vec__217220[0];
                let v222 = vec__217220[1];
                return [k221, f(v222, k221, $215)];
            })));
        }),
        [_PLUS_.MaybeT]: (function() {
            if ($215["e"]) {
                return $215;
            } else {
                return Just(f($215["j"], 0, $215));
            }
        })
    }), $215);
});
var bind = (function(f, val_5) {
    let $223 = val_5;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            return _PLUS_.apply(Vec, $223["a"]["flatMap"]((function(_anon_PERCENT_1_99, _anon_PERCENT_2_100) {
                return f(_anon_PERCENT_1_99, _anon_PERCENT_2_100, $223)["a"];
            })));
        }),
        [_PLUS_.MaybeT]: (function() {
            if ($223["e"]) {
                return $223;
            } else {
                return f($223["j"], 0, $223);
            }
        })
    }), $223);
});
var concat = (function(...args) {
    return bind(_PLUS_.id, _PLUS_.apply(Vec, args));
});
var filter = (function(p, val_6) {
    let $224 = val_6;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            return _PLUS_.apply(Vec, $224["a"]["filter"]((function(_anon_PERCENT_1_101, _anon_PERCENT_2_102) {
                return p(_anon_PERCENT_1_101, _anon_PERCENT_2_102, $224);
            })));
        }),
        [_PLUS_.MaybeT]: (function() {
            if (($224["e"] || p($224["j"], 0, $224))) {
                return $224;
            } else {
                return None;
            }
        })
    }), $224);
});
var remove = (function(p, coll) {
    return filter((function(_anon_PERCENT_1_103, _anon_PERCENT_2_104, _anon_PERCENT_3_105) {
        return _PLUS_.not(p(_anon_PERCENT_1_103, _anon_PERCENT_2_104, _anon_PERCENT_3_105));
    }), coll);
});
var keys = (function(val_7) {
    let $225 = val_7;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            return Range(_PLUS_.js_length($225["a"]));
        }),
        [_PLUS_.MapT]: (function() {
            return _PLUS_.apply(Vec, _PLUS_.js_array_from($225, (function(_anon_PERCENT_1_106) {
                return _anon_PERCENT_1_106[0];
            })));
        }),
        [_PLUS_.SetT]: (function() {
            return vals($225["d"]);
        }),
        [_PLUS_.KeyMapT]: (function() {
            return vals($225["ks"]);
        }),
        [_PLUS_.MaybeT]: (function() {
            if ($225["e"]) {
                return Vec();
            } else {
                return Vec(0);
            }
        })
    }), $225);
});
var vals = (function(val_8) {
    let $226 = val_8;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            return _PLUS_.apply(Vec, $226["a"]);
        }),
        [_PLUS_.MapT]: (function() {
            return _PLUS_.apply(Vec, _PLUS_.js_array_from($226, (function(_anon_PERCENT_1_107) {
                return _anon_PERCENT_1_107[1];
            })));
        }),
        [_PLUS_.SetT]: (function() {
            return vals($226["d"]);
        }),
        [_PLUS_.KeyMapT]: (function() {
            return vals($226["vs"]);
        }),
        [_PLUS_.MaybeT]: (function() {
            if ($226["e"]) {
                return Vec();
            } else {
                return Vec($226["j"]);
            }
        })
    }), $226);
});
var size = (function(val_9) {
    let $227 = val_9;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            return _PLUS_.js_length($227["a"]);
        }),
        [_PLUS_.MapT]: (function() {
            return $227["size"];
        }),
        [_PLUS_.SetT]: (function() {
            return size(vals($227["d"]));
        }),
        [_PLUS_.KeyMapT]: (function() {
            return size($227["ks"]);
        }),
        [_PLUS_.MaybeT]: (function() {
            if ($227["e"]) {
                return 0;
            } else {
                return 1;
            }
        })
    }), $227);
});
var or_ = (function(mk_default_val, val_10) {
    let $228 = val_10;
    return coll_impl(({
        [_PLUS_.MaybeT]: (function() {
            if ($228["e"]) {
                return mk_default_val();
            } else {
                return $228["j"];
            }
        })
    }), $228);
});
var or = (function(default_val, m) {
    return or_((function() {
        return default_val;
    }), m);
});
var unwrap_BANG_ = (function(m) {
    return or_((function() {
        throw "unwrap forced on 'None' type"
    }), m);
});
var at_BANG_ = (function(c, id) {
    return unwrap_BANG_(at(c, id));
});
var maybe_ = (function(on_none, on_just, val_11) {
    let $229 = val_11;
    return coll_impl(({
        [_PLUS_.MaybeT]: (function() {
            if ($229["e"]) {
                return on_none();
            } else {
                return on_just($229["j"]);
            }
        })
    }), $229);
});
var maybe = (function(none, on_just, m) {
    return maybe_((function() {
        return none;
    }), on_just, m);
});
var insert = (function(val_12, target_id, v) {
    let $230 = val_12;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            if ((target_id >= size($230))) {
                return None;
            } else {
                $230.splice(target_id, 0, v);
                return Just(target_id);
            }
        }),
        [_PLUS_.MapT]: (function() {
            return fmap((function() {
                put($230, target_id, v);
                return target_id;
            }), at($230, target_id));
        }),
        [_PLUS_.KeyMapT]: (function() {
            let kk231 = key(target_id);
            return fmap((function() {
                put($230["ks"], kk231, v);
                put($230["vs"], kk231, v);
                return kk231;
            }), at($230["ks"], kk231));
        }),
        [_PLUS_.KeyedListT]: (function() {
            let id232 = $230["i"];
            let prepend233 = $230["d"][target_id];
            if (nil_QMARK_(prepend233)) {
                return None;
            } else {
                let vec__234237 = prepend233[1];
                let pid238 = vec__234237[0];
                let G__239240 = $230;
                G__239240["n"] = (inc)(G__239240["n"]);
                ((_PLUS_.nil_QMARK_(pid238)) ? ((function(_anon_PERCENT_1_108) {
                    return _anon_PERCENT_1_108["f"] = pid238;
                })) : ((function(_anon_PERCENT_1_109) {
                    return _anon_PERCENT_1_109["d"][pid238][2] = id232;
                })))(G__239240);
                G__239240[_anon_PERCENT_1_110]["d"][target_id][1] = id232;
                G__239240[_anon_PERCENT_1_110]["d"][id232] = [v, pid238, target_id];
                G__239240;
                return Just(id232);
            }
        })
    }), $230);
});
var push = (function(val_13, v) {
    let $241 = val_13;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            return $241["a"].push(v);
        }),
        [_PLUS_.SetT]: (function() {
            return $241["d"].set(key(v), v);
        }),
        [_PLUS_.KeyedListT]: (function() {
            return "TODO";
        })
    }), $241);
});
var unshift = (function(val_14, v) {
    let $242 = val_14;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            return $242["a"].unshift(v);
        }),
        [_PLUS_.SetT]: (function() {
            return $242["d"].set(key(v), v);
        }),
        [_PLUS_.KeyedListT]: (function() {
            return insert($242, $242["f"], v);
        })
    }), $242);
});
var sort_by = (function(f, val_15) {
    let $243 = val_15;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            let res244 = _PLUS_.apply(Vec, $243["a"]);
            res244["a"].sort((function(_anon_PERCENT_1_111, _anon_PERCENT_2_112) {
                return (f(_anon_PERCENT_1_111) - f(_anon_PERCENT_2_112));
            }));
            return res244;
        })
    }), $243);
});
var sort = (function(c) {
    return sort_by(_PLUS_.id, c);
});
var keyBy = (function(f, c) {
    let res245 = Map();
    each((function(_anon_PERCENT_1_113) {
        return put(res245, f(_anon_PERCENT_1_113), _anon_PERCENT_1_113);
    }), c);
    return res245;
});
var empty_QMARK_ = (function(c) {
    return _PLUS_.is(0, size(c));
});
var unjson = (function(v) {
    let unjson_pairs246 = (function(p__247) {
        let vec__248251 = p__247;
        let k252 = vec__248251[0];
        let v253 = vec__248251[1];
        return [unjson(k252), unjson(v253)];
    });
    if (_PLUS_.js_array_QMARK_(v)) {
        return (({
            [_PLUS_.MaybeT]: (function() {
                return fmap(unjson, Maybe(v[1]));
            }),
            [_PLUS_.VecT]: (function() {
                return fmap(unjson, _PLUS_.apply(Vec, v.slice(1)));
            }),
            [_PLUS_.MapT]: (function() {
                return Map(unjson_pairs246.map(v.slice(1)));
            }),
            [_PLUS_.KeyMapT]: (function() {
                return KeyMap(unjson_pairs246.map(v.slice(1)));
            })
        })[type_id(v)] || (function() {
            return v.map(unjson);
        }))();
    } else {
        if (({
                [_PLUS_.StrT]: true,
                [_PLUS_.NumT]: true,
                [_PLUS_.BoolT]: true
            })[(v && type_id(v))]) {
            return v;
        } else {
            if ("else") {
                throw _PLUS_.str("Val: /", v, "/ is of unsupported type")
            } else {
                return undefined;
            }
        }
    }
});
var encode = (function(v) {
    return JSON.stringify(json(v));
});
var decode = (function(s) {
    return unjson(JSON.parse(s));
});

export {
    json,
    unjson,
    Unit,
    sort_by,
    or_,
    implement_key,
    keys,
    Vec,
    maybe,
    put,
    Map,
    KeyedList,
    empty_QMARK_,
    bind,
    decode,
    key,
    union,
    KeyMap,
    Just,
    push,
    for_each_map,
    forcedKey,
    sort,
    MapClass,
    maybe_,
    pretty,
    None,
    unshift,
    Range,
    keyBy,
    vals,
    or,
    inst_id,
    remove,
    concat,
    filter,
    intersection,
    at_BANG_,
    each,
    fmap,
    insert,
    size,
    reduce,
    unwrap_BANG_,
    encode,
    type_id,
    at,
    Maybe,
    Set,
    has_QMARK_
}
