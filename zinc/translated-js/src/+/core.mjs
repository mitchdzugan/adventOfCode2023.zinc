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
}), (function(_anon_PERCENT_1_118, _anon_PERCENT_2_119) {
    return (_anon_PERCENT_1_118 + _anon_PERCENT_2_119);
}));
_PLUS_.implement_monad_plus(_PLUS_.StrT, (function() {
    return "";
}), _PLUS_.str);
_PLUS_.implement_monad_plus(_PLUS_.BoolT, (function() {
    return false;
}), (function(_anon_PERCENT_1_120, _anon_PERCENT_2_121) {
    return (_anon_PERCENT_1_120 || _anon_PERCENT_2_121);
}));
_PLUS_.implement_monad_plus(_PLUS_.VecT, (function() {
    return Vec();
}), (function(_anon_PERCENT_1_122, _anon_PERCENT_2_123) {
    return concat(_anon_PERCENT_1_122, _anon_PERCENT_2_123);
}));
_PLUS_.implement_monad_plus(_PLUS_.MaybeT, (function() {
    return None;
}), (function(_anon_PERCENT_1_125, _anon_PERCENT_2_124) {
    return maybe(_anon_PERCENT_2_124, Just, _anon_PERCENT_1_125);
}));
_PLUS_.implement_applicative(_PLUS_.VecT, (function(_anon_PERCENT_1_126) {
    return Vec(_anon_PERCENT_1_126);
}));
_PLUS_.implement_applicative(_PLUS_.MaybeT, (function(_anon_PERCENT_1_127) {
    return Just(_anon_PERCENT_1_127);
}));
_PLUS_.implement_flatplicative_for_applicative(_PLUS_.VecT);
_PLUS_.implement_flatplicative_for_applicative(_PLUS_.MaybeT);
_PLUS_.implement_flatplicative(_PLUS_.StrT, _PLUS_.str);
_PLUS_.implement_flatplicative(_PLUS_.BoolT, (function(_anon_PERCENT_1_128) {
    return _PLUS_.not(_PLUS_.not(_anon_PERCENT_1_128));
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
        initials24.forEach((function(_anon_PERCENT_1_129) {
            return d25.set(key(_anon_PERCENT_1_129), _anon_PERCENT_1_129);
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
    let empty_QMARK_91 = (function(_anon_PERCENT_1_130) {
        return _PLUS_.is(0, _PLUS_.js_length(_anon_PERCENT_1_130));
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
            return _PLUS_.apply(Vec, Array.from(Array(_PLUS_.ceil(_PLUS_.div((end - init), step))), (function(_anon_PERCENT_1_132, _anon_PERCENT_2_131) {
                return (init + (step * _anon_PERCENT_2_131));
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
            return fmap((function(_anon_PERCENT_1_133) {
                return _anon_PERCENT_1_133[0];
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
    return _PLUS_.apply(Set, filter((function(_anon_PERCENT_1_134) {
        return has_QMARK_(s2, _anon_PERCENT_1_134);
    }), vals(s1))["a"]);
});
var union = (function(s1, s2) {
    return _PLUS_.apply(Set, concat(vals(s1), vals(s2))["a"]);
});
var every_QMARK_ = (function(p, c) {
    return reduce((function(_anon_PERCENT_1_135, _anon_PERCENT_2_136, _anon_PERCENT_3_137, _anon_PERCENT_4_138) {
        return (_anon_PERCENT_1_135 && p(_anon_PERCENT_2_136, _anon_PERCENT_3_137, _anon_PERCENT_4_138));
    }), true, c);
});
var any_QMARK_ = (function(p, c) {
    return !every_QMARK_((function() {
        let f204 = (function(var_args) {
            let args205208 = [];
            let len__24440__auto__209 = arguments["length"];
            let i206210 = 0;
            while (true) {
                if ((i206210 < len__24440__auto__209)) {
                    args205208.push((arguments[i206210]));
                    let G__211 = (i206210 + 1);
                    i206210 = G__211;
                    continue;
                };
                break;
            };
            let argseq__24702__auto__212 = (((0 < args205208["length"])) ? (args205208.slice(0)) : (undefined));
            return f204.cljs$core$IFn$_invoke$arity$variadic(argseq__24702__auto__212);
        });
        f204["cljs$core$IFn$_invoke$arity$variadic"] = (function(args) {
            return !_PLUS_.apply(p, args);
        });
        f204["cljs$lang$maxFixedArity"] = 0;
        f204["cljs$lang$applyTo"] = (function(seq207) {
            let self__24463__auto__213 = this;
            return self__24463__auto__213.cljs$core$IFn$_invoke$arity$variadic(seq(seq207));
        });
        return f204;
    })(), c);
});
var put = (function(val_2, k, v) {
    let $214 = val_2;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            return $214["a"][k] = v;
        }),
        [_PLUS_.MapT]: (function() {
            return $214.set(k, v);
        }),
        [_PLUS_.KeyMapT]: (function() {
            let kk215 = key(k);
            $214["ks"].set(kk215, k);
            return $214["vs"].set(kk215, v);
        }),
        [_PLUS_.KeyedListT]: (function() {
            return "TODO";
        })
    }), $214);
});
var for_each_map = (function(f, m, get_js_m, map_key) {
    return _PLUS_.js_array_from(get_js_m(m), (function(p__216) {
        let vec__217220 = p__216;
        let k221 = vec__217220[0];
        let v222 = vec__217220[1];
        return function() {
            return f(v222, map_key(k221), m);
        };
    })).forEach((function(_anon_PERCENT_1_139) {
        return _anon_PERCENT_1_139();
    }));
});
var each = (function(f, val_3) {
    let $223 = val_3;
    return coll_impl(({
        [_PLUS_.SetT]: (function() {
            return each(f, vals($223));
        }),
        [_PLUS_.VecT]: (function() {
            return $223["a"]["forEach"]((function(_anon_PERCENT_1_140, _anon_PERCENT_2_141) {
                return f(_anon_PERCENT_1_140, _anon_PERCENT_2_141, $223);
            }));
        }),
        [_PLUS_.MapT]: (function() {
            return for_each_map(f, $223, _PLUS_.id, _PLUS_.id);
        }),
        [_PLUS_.KeyMapT]: (function() {
            return for_each_map(f, $223, (function(_anon_PERCENT_1_142) {
                return _anon_PERCENT_1_142["vs"];
            }), (function(_anon_PERCENT_1_143) {
                return $223["ks"]["get"](_anon_PERCENT_1_143);
            }));
        }),
        [_PLUS_.MaybeT]: (function() {
            if ($223["e"]) {
                return undefined;
            } else {
                return f($223["j"], 0, $223);
            }
        }),
        [_PLUS_.KeyedListT]: (function() {
            return $223["a"].forEach().fn([
                [id, v], ind
            ], f(v, id, $223, ind))();
        })
    }), $223);
});
var for$ = (function(c, f) {
    return each(f, c);
});
var reduce = (function(f, init, coll) {
    let res224 = [init];
    each((function(_anon_PERCENT_1_144, _anon_PERCENT_2_145, _anon_PERCENT_3_146, _anon_PERCENT_4_147) {
        return res224[0] = f(res224[0], _anon_PERCENT_1_144, _anon_PERCENT_2_145, _anon_PERCENT_3_146, _anon_PERCENT_4_147);
    }), coll);
    return res224[0];
});
var fmap = (function(f, val_4) {
    let $225 = val_4;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            return _PLUS_.apply(Vec, $225["a"]["map"]((function(_anon_PERCENT_1_148, _anon_PERCENT_2_149) {
                return f(_anon_PERCENT_1_148, _anon_PERCENT_2_149, $225);
            })));
        }),
        [_PLUS_.MapT]: (function() {
            return Map(_PLUS_.js_array_from($225, (function(p__226) {
                let vec__227230 = p__226;
                let k231 = vec__227230[0];
                let v232 = vec__227230[1];
                return [k231, f(v232, k231, $225)];
            })));
        }),
        [_PLUS_.MaybeT]: (function() {
            if ($225["e"]) {
                return $225;
            } else {
                return Just(f($225["j"], 0, $225));
            }
        })
    }), $225);
});
var bind = (function(f, val_5) {
    let $233 = val_5;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            return _PLUS_.apply(Vec, $233["a"]["flatMap"]((function(_anon_PERCENT_1_150, _anon_PERCENT_2_151) {
                return f(_anon_PERCENT_1_150, _anon_PERCENT_2_151, $233)["a"];
            })));
        }),
        [_PLUS_.MaybeT]: (function() {
            if ($233["e"]) {
                return $233;
            } else {
                return f($233["j"], 0, $233);
            }
        })
    }), $233);
});
var concat = (function(...args) {
    return bind(_PLUS_.id, _PLUS_.apply(Vec, args));
});
var filter = (function(p, val_6) {
    let $234 = val_6;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            return _PLUS_.apply(Vec, $234["a"]["filter"]((function(_anon_PERCENT_1_152, _anon_PERCENT_2_153) {
                return p(_anon_PERCENT_1_152, _anon_PERCENT_2_153, $234);
            })));
        }),
        [_PLUS_.MaybeT]: (function() {
            if (($234["e"] || p($234["j"], 0, $234))) {
                return $234;
            } else {
                return None;
            }
        })
    }), $234);
});
var remove = (function(p, coll) {
    return filter((function(_anon_PERCENT_1_154, _anon_PERCENT_2_155, _anon_PERCENT_3_156) {
        return _PLUS_.not(p(_anon_PERCENT_1_154, _anon_PERCENT_2_155, _anon_PERCENT_3_156));
    }), coll);
});
var keys = (function(val_7) {
    let $235 = val_7;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            return Range(_PLUS_.js_length($235["a"]));
        }),
        [_PLUS_.MapT]: (function() {
            return _PLUS_.apply(Vec, _PLUS_.js_array_from($235, (function(_anon_PERCENT_1_157) {
                return _anon_PERCENT_1_157[0];
            })));
        }),
        [_PLUS_.SetT]: (function() {
            return vals($235["d"]);
        }),
        [_PLUS_.KeyMapT]: (function() {
            return vals($235["ks"]);
        }),
        [_PLUS_.MaybeT]: (function() {
            if ($235["e"]) {
                return Vec();
            } else {
                return Vec(0);
            }
        })
    }), $235);
});
var vals = (function(val_8) {
    let $236 = val_8;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            return _PLUS_.apply(Vec, $236["a"]);
        }),
        [_PLUS_.MapT]: (function() {
            return _PLUS_.apply(Vec, _PLUS_.js_array_from($236, (function(_anon_PERCENT_1_158) {
                return _anon_PERCENT_1_158[1];
            })));
        }),
        [_PLUS_.SetT]: (function() {
            return vals($236["d"]);
        }),
        [_PLUS_.KeyMapT]: (function() {
            return vals($236["vs"]);
        }),
        [_PLUS_.MaybeT]: (function() {
            if ($236["e"]) {
                return Vec();
            } else {
                return Vec($236["j"]);
            }
        })
    }), $236);
});
var size = (function(val_9) {
    let $237 = val_9;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            return _PLUS_.js_length($237["a"]);
        }),
        [_PLUS_.MapT]: (function() {
            return $237["size"];
        }),
        [_PLUS_.SetT]: (function() {
            return size(vals($237["d"]));
        }),
        [_PLUS_.KeyMapT]: (function() {
            return size($237["ks"]);
        }),
        [_PLUS_.MaybeT]: (function() {
            if ($237["e"]) {
                return 0;
            } else {
                return 1;
            }
        })
    }), $237);
});
var or_ = (function(mk_default_val, val_10) {
    let $238 = val_10;
    return coll_impl(({
        [_PLUS_.MaybeT]: (function() {
            if ($238["e"]) {
                return mk_default_val();
            } else {
                return $238["j"];
            }
        })
    }), $238);
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
var last_BANG_ = (function(_anon_PERCENT_1_159) {
    return at_BANG_(_anon_PERCENT_1_159, (size(_anon_PERCENT_1_159) - 1));
});
var first_BANG_ = (function(_anon_PERCENT_1_160) {
    return at_BANG_(_anon_PERCENT_1_160, 0);
});
var maybe_ = (function(on_none, on_just, val_11) {
    let $239 = val_11;
    return coll_impl(({
        [_PLUS_.MaybeT]: (function() {
            if ($239["e"]) {
                return on_none();
            } else {
                return on_just($239["j"]);
            }
        })
    }), $239);
});
var maybe = (function(none, on_just, m) {
    return maybe_((function() {
        return none;
    }), on_just, m);
});
var slice = (function() {
    let f240 = (function(var_args) {
        let args241245 = [];
        let len__24440__auto__246 = arguments["length"];
        let i242247 = 0;
        while (true) {
            if ((i242247 < len__24440__auto__246)) {
                args241245.push((arguments[i242247]));
                let G__248 = (i242247 + 1);
                i242247 = G__248;
                continue;
            };
            break;
        };
        let argseq__24702__auto__249 = (((1 < args241245["length"])) ? (args241245.slice(1)) : (undefined));
        return f240.cljs$core$IFn$_invoke$arity$variadic((arguments[0]), argseq__24702__auto__249);
    });
    f240["cljs$core$IFn$_invoke$arity$variadic"] = (function(v, args) {
        return _PLUS_.apply(Vec, v["a"]["slice"]["apply"](v["a"], args));
    });
    f240["cljs$lang$maxFixedArity"] = 1;
    f240["cljs$lang$applyTo"] = (function(seq243) {
        let G__244250 = first(seq243);
        let seq243251 = next(seq243);
        let self__24462__auto__252 = this;
        return self__24462__auto__252.cljs$core$IFn$_invoke$arity$variadic(G__244250, seq243251);
    });
    return f240;
})();
var reverse = (function(v) {
    let res253 = Vec();
    let i254 = (size(v) - 1);
    while (true) {
        if ((i254 < 0)) {
            return res253;
        } else {
            push(res253, at_BANG_(v, i254));
            let G__255 = (i254 - 1);
            i254 = G__255;
            continue;
        };
        break;
    }

});
var insert = (function(val_12, target_id, v) {
    let $256 = val_12;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            if ((target_id >= size($256))) {
                return None;
            } else {
                $256.splice(target_id, 0, v);
                return Just(target_id);
            }
        }),
        [_PLUS_.MapT]: (function() {
            return fmap((function() {
                put($256, target_id, v);
                return target_id;
            }), at($256, target_id));
        }),
        [_PLUS_.KeyMapT]: (function() {
            let kk257 = key(target_id);
            return fmap((function() {
                put($256["ks"], kk257, v);
                put($256["vs"], kk257, v);
                return kk257;
            }), at($256["ks"], kk257));
        }),
        [_PLUS_.KeyedListT]: (function() {
            let id258 = $256["i"];
            let prepend259 = $256["d"][target_id];
            if (nil_QMARK_(prepend259)) {
                return None;
            } else {
                let vec__260263 = prepend259[1];
                let pid264 = vec__260263[0];
                let G__265266 = $256;
                G__265266["n"] = (inc)(G__265266["n"]);
                ((_PLUS_.nil_QMARK_(pid264)) ? ((function(_anon_PERCENT_1_161) {
                    return _anon_PERCENT_1_161["f"] = pid264;
                })) : ((function(_anon_PERCENT_1_162) {
                    return _anon_PERCENT_1_162["d"][pid264][2] = id258;
                })))(G__265266);
                G__265266[_anon_PERCENT_1_163]["d"][target_id][1] = id258;
                G__265266[_anon_PERCENT_1_163]["d"][id258] = [v, pid264, target_id];
                G__265266;
                return Just(id258);
            }
        })
    }), $256);
});
var push = (function(val_13, v) {
    let $267 = val_13;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            return $267["a"].push(v);
        }),
        [_PLUS_.SetT]: (function() {
            return $267["d"].set(key(v), v);
        }),
        [_PLUS_.KeyedListT]: (function() {
            return "TODO";
        })
    }), $267);
});
var unshift = (function(val_14, v) {
    let $268 = val_14;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            return $268["a"].unshift(v);
        }),
        [_PLUS_.SetT]: (function() {
            return $268["d"].set(key(v), v);
        }),
        [_PLUS_.KeyedListT]: (function() {
            return insert($268, $268["f"], v);
        })
    }), $268);
});
var sort_by = (function(f, val_15) {
    let $269 = val_15;
    return coll_impl(({
        [_PLUS_.VecT]: (function() {
            let res270 = _PLUS_.apply(Vec, $269["a"]);
            res270["a"].sort((function(_anon_PERCENT_1_164, _anon_PERCENT_2_165) {
                return (f(_anon_PERCENT_1_164) - f(_anon_PERCENT_2_165));
            }));
            return res270;
        })
    }), $269);
});
var sort = (function(c) {
    return sort_by(_PLUS_.id, c);
});
var keyBy = (function(f, c) {
    let res271 = Map();
    each((function(_anon_PERCENT_1_166) {
        return put(res271, f(_anon_PERCENT_1_166), _anon_PERCENT_1_166);
    }), c);
    return res271;
});
var groupBy = (function(f, c) {
    let res272 = Map();
    each((function(_anon_PERCENT_1_167) {
        let k273 = f(_anon_PERCENT_1_167);
        let curr274 = or_(Vec, at(res272, k273));
        push(curr274, _anon_PERCENT_1_167);
        return put(res272, k273, curr274);
    }), c);
    return res272;
});
var empty_QMARK_ = (function(c) {
    return _PLUS_.is(0, size(c));
});
var unjson = (function(v) {
    let unjson_pairs275 = (function(p__276) {
        let vec__277280 = p__276;
        let k281 = vec__277280[0];
        let v282 = vec__277280[1];
        return [unjson(k281), unjson(v282)];
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
                return Map(unjson_pairs275.map(v.slice(1)));
            }),
            [_PLUS_.KeyMapT]: (function() {
                return KeyMap(unjson_pairs275.map(v.slice(1)));
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
    reverse,
    first_BANG_,
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
    for$,
    groupBy,
    at_BANG_,
    each,
    any_QMARK_,
    fmap,
    slice,
    insert,
    size,
    reduce,
    unwrap_BANG_,
    last_BANG_,
    encode,
    type_id,
    at,
    every_QMARK_,
    Maybe,
    Set,
    has_QMARK_
}
