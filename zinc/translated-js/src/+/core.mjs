import * as _PLUS_ from './types.mjs';export * from './types.mjs';
var key_impls = ({  })
;
var implement_key = (function (type_id, f) {
return key_impls[type_id] = f;
})
;
var key = (function (obj) {
return key_impls[type_id(obj)](obj);
})
;
implement_key(_PLUS_.NumT, _PLUS_.id);
implement_key(_PLUS_.StrT, _PLUS_.id);
implement_key(_PLUS_.BoolT, _PLUS_.id);
_PLUS_.implement_monad_plus(_PLUS_.NumT, (function () {
return 0;
}), (function (_anon_PERCENT_1_24, _anon_PERCENT_2_25) {
return (_anon_PERCENT_1_24 + _anon_PERCENT_2_25);
}));
_PLUS_.implement_monad_plus(_PLUS_.StrT, (function () {
return "";
}), _PLUS_.str);
_PLUS_.implement_monad_plus(_PLUS_.BoolT, (function () {
return false;
}), (function (_anon_PERCENT_1_26, _anon_PERCENT_2_27) {
return (_anon_PERCENT_1_26 || _anon_PERCENT_2_27);
}));
_PLUS_.implement_monad_plus(_PLUS_.VecT, (function () {
return Vec();
}), (function (_anon_PERCENT_1_28, _anon_PERCENT_2_29) {
return concat(_anon_PERCENT_1_28, _anon_PERCENT_2_29);
}));
_PLUS_.implement_monad_plus(_PLUS_.MaybeT, (function () {
return None;
}), (function (_anon_PERCENT_1_31, _anon_PERCENT_2_30) {
return maybe(_anon_PERCENT_2_30, Just, _anon_PERCENT_1_31);
}));
_PLUS_.implement_applicative(_PLUS_.VecT, (function (_anon_PERCENT_1_32) {
return Vec(_anon_PERCENT_1_32);
}));
_PLUS_.implement_applicative(_PLUS_.MaybeT, (function (_anon_PERCENT_1_33) {
return Just(_anon_PERCENT_1_33);
}));
_PLUS_.implement_flatplicative_for_applicative(_PLUS_.VecT);
_PLUS_.implement_flatplicative_for_applicative(_PLUS_.MaybeT);
_PLUS_.implement_flatplicative(_PLUS_.StrT, _PLUS_.str);
_PLUS_.implement_flatplicative(_PLUS_.BoolT, (function (_anon_PERCENT_1_34) {
return _PLUS_.not(_PLUS_.not(_anon_PERCENT_1_34));
}));
var MapClass = _PLUS_.MapClass
;
var Vec = (function () {
 let f1 = (function (var_args) {
let args25 = [];
let len__24403__auto__6 = arguments["length"];
let i37 = 0;
while(true){
if ((i37 < len__24403__auto__6)) {
args25.push((arguments[i37]));
let G__8 = (i37 + 1);
i37 = G__8;
continue;
};break;
}
;
let argseq__24657__auto__9 = (((0 < args25["length"])) ? (args25.slice(0)) : (undefined));
return f1.cljs$core$IFn$_invoke$arity$variadic(argseq__24657__auto__9);
});
f1["cljs$core$IFn$_invoke$arity$variadic"] = (function (a_) {
let a10 = (a_ || []);
let id11 = _PLUS_.mk_inst_id();
return ({ "T": _PLUS_.VecT, "I": id11, get "J"(){ let $_712 = this;
return _PLUS_.apply(_PLUS_.argv, _PLUS_.VecT, a10.map(json));}, get "P"(){ let $_813 = this;
return a10.map(pretty);}, "a": a10 });
});
f1["cljs$lang$maxFixedArity"] = 0;
f1["cljs$lang$applyTo"] = (function (seq4) {
let self__24444__auto__14 = this;
return self__24444__auto__14.cljs$core$IFn$_invoke$arity$variadic(seq(seq4));
});
return f1;
})()
;
var Map = (function (pairs) {
return new MapClass(pairs);
})
;
var KeyMap = (function (pairs) {
let ks15 = Map(pairs.map((function (p__16) {
let vec__1720 = p__16;
let k21 = vec__1720[0];
return [key(k21), k21];
})));
let vs22 = Map(pairs.map((function (p__23) {
let vec__2427 = p__23;
let k28 = vec__2427[0];
let v29 = vec__2427[1];
return [key(k28), v29];
})));
let id30 = _PLUS_.mk_inst_id();
return ({ "T": _PLUS_.KeyMapT, "I": id30, get "J"(){ let $_931 = this;
return _PLUS_.js_array_from(vs22, [_PLUS_.KeyMapT], (function (p__32) {
let vec__3336 = p__32;
let kk37 = vec__3336[0];
let v38 = vec__3336[1];
return [json(ks15.get(kk37)), json(v38)];
}));}, get "P"(){ let $_1039 = this;
return pretty(vs22);}, "ks": ks15, "vs": vs22 });
})
;
var KeyedList = (function (pairs) {
let id40 = _PLUS_.mk_inst_id();
let kl41 = ({ "I": id40, get "P"(){ let $_1142 = this;
return _PLUS_.js_flat_array_from($_1142["a"], ["#:KeyedList"], (function (p__43) {
let vec__4447 = p__43;
let id48 = vec__4447[0];
let v49 = vec__4447[1];
return [_PLUS_.str("#", id48), pretty(v49)];
}));}, get "J"(){ let $_1250 = this;
return _PLUS_.js_array_from($_1250["a"], [_PLUS_.KeyedListT], (function (p__51) {
let vec__5255 = p__51;
let id56 = vec__5255[0];
let v57 = vec__5255[1];
return [id56, json(v57)];
}));}, "T": _PLUS_.KeyedListT, "l": undefined, "d": ({  }), "f": undefined, "i": 1, get "a"(){ let $_1358 = this;
let res59 = [];
let id60 = $_1358["f"];
while(true){
if (_PLUS_.nil_QMARK_(id60)) {
return res59;} else {
let vec__6164 = $_1358["d"][id60];
let v65 = vec__6164[0];
let pid66 = vec__6164[1];
let nid67 = vec__6164[2];
res59.push([id60, v65]);
let G__68 = nid67;
id60 = G__68;
continue;
};break;
}
} });
let empty_QMARK_69 = (function (_anon_PERCENT_1_35) {
return _PLUS_.is(0, _PLUS_.js_length(_anon_PERCENT_1_35));
});
let G__7071 = kl41;
G__7071;
if (empty_QMARK_69(pairs)) {
undefined} else {
kl41["f"] = pairs[0][0];
let G__8499 = pairs;
let vec__87100 = G__8499;
let seq__88101 = vec__87100;
let first__89102 = seq__88101[0];
let seq__88103 = seq__88101.slice(1);
let vec__90104 = first__89102;
let nid105 = vec__90104[0];
let nv106 = vec__90104[1];
let next107 = vec__90104;
let rest108 = seq__88103;
let G__85109 = [];
let vec__93110 = G__85109;
let cid111 = vec__93110[0];
let cv112 = vec__93110[1];
let curr113 = vec__93110;
let G__86114 = [];
let vec__96115 = G__86114;
let pid116 = vec__96115[0];
let pv117 = vec__96115[1];
let prev118 = vec__96115;
let max_id119 = 0;
let G__84120 = G__8499;
let G__85121 = G__85109;
let G__86122 = G__86114;
let max_id123 = max_id119;
while(true){
let vec__124136 = G__84120;
let seq__125137 = vec__124136;
let first__126138 = seq__125137[0];
let seq__125139 = seq__125137.slice(1);
let vec__127140 = first__126138;
let nid141 = vec__127140[0];
let nv142 = vec__127140[1];
let next143 = vec__127140;
let rest144 = seq__125139;
let vec__130145 = G__85121;
let cid146 = vec__130145[0];
let cv147 = vec__130145[1];
let curr148 = vec__130145;
let vec__133149 = G__86122;
let pid150 = vec__133149[0];
let pv151 = vec__133149[1];
let prev152 = vec__133149;
let max_id153 = max_id123;
if (_PLUS_.nil_QMARK_(cid146)) {
undefined} else {
kl41["d"][cid146] = [cv147, pid150, nid141]};
if (!empty_QMARK_69(rest144)) {
let G__154 = rest144;
let G__155 = next143;
let G__156 = curr148;
let G__157 = _PLUS_.max(max_id153, nid141);
G__84120 = G__154;
G__85121 = G__155;
G__86122 = G__156;
max_id123 = G__157;
continue;
} else {
let G__158159 = kl41;
G__158159["i"] = (max_id153 + 1);
G__158159["l"] = nid141;
G__158159["d"][nid141] = [nv142, cid146];
G__158159};break;
}
};
return G__7071;
})
;
var mkMaybe = (function (j, e) {
let id160 = _PLUS_.mk_inst_id();
return ({ "T": _PLUS_.MaybeT, "I": id160, get "J"(){ let $_14161 = this;
if (e) {
return [_PLUS_.MaybeT, _PLUS_.null$];} else {
return [_PLUS_.MaybeT, json(j)];}}, get "P"(){ let $_15162 = this;
if (e) {
return _PLUS_.null$;} else {
return ({ "just": pretty(j) });}}, "j": j, "e": e });
})
;
var Just = (function (j) {
return mkMaybe(j, false);
})
;
var None = mkMaybe(undefined, true)
;
var Maybe = (function (nilable) {
return mkMaybe(nilable, _PLUS_.nil_QMARK_(nilable));
})
;
var type_id = (function (any) {
return any["T"];
})
;
var inst_id = (function (any) {
return any["I"];
})
;
var json = (function (any) {
return any["J"];
})
;
var pretty = (function (any) {
return (any && any["P"]);
})
;
var coll_impl = (function (spec, obj) {
return (spec[type_id(obj)] || spec[_PLUS_.else$])();
})
;
var Range = (function () {
 let f163 = (function (var_args) {
let args164167 = [];
let len__24403__auto__168 = arguments["length"];
let i165169 = 0;
while(true){
if ((i165169 < len__24403__auto__168)) {
args164167.push((arguments[i165169]));
let G__170 = (i165169 + 1);
i165169 = G__170;
continue;
};break;
}
;
let argseq__24657__auto__171 = (((0 < args164167["length"])) ? (args164167.slice(0)) : (undefined));
return f163.cljs$core$IFn$_invoke$arity$variadic(argseq__24657__auto__171);
});
f163["cljs$core$IFn$_invoke$arity$variadic"] = (function (args) {
let vec__172175 = args;
let a1176 = vec__172175[0];
let a2177 = vec__172175[1];
let a3178 = vec__172175[2];
let fin179 = (function (init, end, step) {
return _PLUS_.apply(Vec, Array.from(Array(_PLUS_.ceil(_PLUS_.div((end - init), step))), (function (_anon_PERCENT_1_37, _anon_PERCENT_2_36) {
return (init + (step * _anon_PERCENT_2_36));
})));
});
if (_PLUS_.nil_QMARK_(a1176)) {
return Vec();} else {
if (_PLUS_.nil_QMARK_(a2177)) {
return fin179(0, a1176, (((a1176 >= 0)) ? (1) : (-1)));} else {
if (_PLUS_.nil_QMARK_(a3178)) {
return fin179(a1176, a2177, (((a2177 >= a1176)) ? (1) : (-1)));} else {
if ("else") {
return fin179(a1176, a2177, a3178);} else {
return undefined;}}}}
});
f163["cljs$lang$maxFixedArity"] = 0;
f163["cljs$lang$applyTo"] = (function (seq166) {
let self__24444__auto__180 = this;
return self__24444__auto__180.cljs$core$IFn$_invoke$arity$variadic(seq(seq166));
});
return f163;
})()
;
var at = (function (val_1, k) {
let $181 = val_1;
return coll_impl(({ [_PLUS_.VecT]: (function () {
return Maybe($181["a"][k]);
}), [_PLUS_.MapT]: (function () {
return Maybe($181.get(k));
}), [_PLUS_.KeyMapT]: (function () {
return Maybe($181["vs"]["get"](key(k)));
}), [_PLUS_.KeyedListT]: (function () {
return fmap((function (_anon_PERCENT_1_38) {
return _anon_PERCENT_1_38[0];
}), Maybe($181["d"][k]));
}), [_PLUS_.MaybeT]: (function () {
if (((0 !== k) || $181["e"])) {
return None;} else {
return $181;}
}) }), $181);
})
;
var put = (function (val_2, k, v) {
let $182 = val_2;
return coll_impl(({ [_PLUS_.VecT]: (function () {
return $182["a"][k] = v;
}), [_PLUS_.MapT]: (function () {
return $182.set(k, v);
}), [_PLUS_.KeyMapT]: (function () {
let kk183 = key(k);
$182["ks"].set(kk183, k);
return $182["vs"].set(kk183, v);
}), [_PLUS_.KeyedListT]: (function () {
return "TODO";
}) }), $182);
})
;
var for_each_map = (function (f, m, get_js_m, map_key) {
return _PLUS_.js_array_from(get_js_m(m), (function (p__184) {
let vec__185188 = p__184;
let k189 = vec__185188[0];
let v190 = vec__185188[1];
return function () {
return f(v190, map_key(k189), m);
};
})).forEach((function (_anon_PERCENT_1_39) {
return _anon_PERCENT_1_39();
}));
})
;
var each = (function (f, val_3) {
let $191 = val_3;
return coll_impl(({ [_PLUS_.VecT]: (function () {
return $191["a"]["forEach"]((function (_anon_PERCENT_1_40, _anon_PERCENT_2_41) {
return f(_anon_PERCENT_1_40, _anon_PERCENT_2_41, $191);
}));
}), [_PLUS_.MapT]: (function () {
return for_each_map(f, $191, _PLUS_.id, _PLUS_.id);
}), [_PLUS_.KeyMapT]: (function () {
return for_each_map(f, $191, (function (_anon_PERCENT_1_42) {
return _anon_PERCENT_1_42["vs"];
}), (function (_anon_PERCENT_1_43) {
return $191["ks"]["get"](_anon_PERCENT_1_43);
}));
}), [_PLUS_.MaybeT]: (function () {
if ($191["e"]) {
return undefined;} else {
return f($191["j"], 0, $191);}
}), [_PLUS_.KeyedListT]: (function () {
return $191["a"].forEach().fn([[id, v], ind], f(v, id, $191, ind))();
}) }), $191);
})
;
var reduce = (function (f, init, coll) {
let res192 = [init];
each((function (_anon_PERCENT_1_44, _anon_PERCENT_2_45, _anon_PERCENT_3_46, _anon_PERCENT_4_47) {
return res192[0] = f(res192[0], _anon_PERCENT_1_44, _anon_PERCENT_2_45, _anon_PERCENT_3_46, _anon_PERCENT_4_47);
}), coll);
return res192[0];
})
;
var fmap = (function (f, val_4) {
let $193 = val_4;
return coll_impl(({ [_PLUS_.VecT]: (function () {
return _PLUS_.apply(Vec, $193["a"]["map"]((function (_anon_PERCENT_1_48, _anon_PERCENT_2_49) {
return f(_anon_PERCENT_1_48, _anon_PERCENT_2_49, $193);
})));
}), [_PLUS_.MapT]: (function () {
return Map(_PLUS_.js_array_from($193, (function (p__194) {
let vec__195198 = p__194;
let k199 = vec__195198[0];
let v200 = vec__195198[1];
return [k199, f(v200, k199, $193)];
})));
}), [_PLUS_.MaybeT]: (function () {
if ($193["e"]) {
return $193;} else {
return Just(f($193["j"], 0, $193));}
}) }), $193);
})
;
var bind = (function (f, val_5) {
let $201 = val_5;
return coll_impl(({ [_PLUS_.VecT]: (function () {
return _PLUS_.apply(Vec, $201["a"]["flatMap"]((function (_anon_PERCENT_1_50, _anon_PERCENT_2_51) {
return f(_anon_PERCENT_1_50, _anon_PERCENT_2_51, $201)["a"];
})));
}), [_PLUS_.MaybeT]: (function () {
if ($201["e"]) {
return $201;} else {
return f($201["j"], 0, $201);}
}) }), $201);
})
;
var concat = (function (...args) {
return bind(_PLUS_.id, _PLUS_.apply(Vec, args));
})
;
var filter = (function (p, val_6) {
let $202 = val_6;
return coll_impl(({ [_PLUS_.VecT]: (function () {
return _PLUS_.apply(Vec, $202["a"]["filter"]((function (_anon_PERCENT_1_52, _anon_PERCENT_2_53) {
return p(_anon_PERCENT_1_52, _anon_PERCENT_2_53, $202);
})));
}), [_PLUS_.MaybeT]: (function () {
if (($202["e"] || p($202["j"], 0, $202))) {
return $202;} else {
return None;}
}) }), $202);
})
;
var remove = (function (p, coll) {
return filter((function (_anon_PERCENT_1_54, _anon_PERCENT_2_55, _anon_PERCENT_3_56) {
return _PLUS_.not(p(_anon_PERCENT_1_54, _anon_PERCENT_2_55, _anon_PERCENT_3_56));
}), coll);
})
;
var keys = (function (val_7) {
let $203 = val_7;
return coll_impl(({ [_PLUS_.VecT]: (function () {
return Range(_PLUS_.js_length($203["a"]));
}), [_PLUS_.MapT]: (function () {
return _PLUS_.apply(Vec, _PLUS_.js_array_from($203, (function (_anon_PERCENT_1_57) {
return _anon_PERCENT_1_57[0];
})));
}), [_PLUS_.KeyMapT]: (function () {
return vals($203["ks"]);
}), [_PLUS_.MaybeT]: (function () {
if ($203["e"]) {
return Vec();} else {
return Vec(0);}
}) }), $203);
})
;
var vals = (function (val_8) {
let $204 = val_8;
return coll_impl(({ [_PLUS_.VecT]: (function () {
return _PLUS_.apply(Vec, $204["a"]);
}), [_PLUS_.MapT]: (function () {
return _PLUS_.apply(Vec, _PLUS_.js_array_from($204, (function (_anon_PERCENT_1_58) {
return _anon_PERCENT_1_58[1];
})));
}), [_PLUS_.KeyMapT]: (function () {
return vals($204["vs"]);
}), [_PLUS_.MaybeT]: (function () {
if ($204["e"]) {
return Vec();} else {
return Vec($204["j"]);}
}) }), $204);
})
;
var size = (function (val_9) {
let $205 = val_9;
return coll_impl(({ [_PLUS_.VecT]: (function () {
return _PLUS_.js_length($205["a"]);
}), [_PLUS_.MapT]: (function () {
return $205["size"];
}), [_PLUS_.KeyMapT]: (function () {
return size($205["ks"]);
}), [_PLUS_.MaybeT]: (function () {
if ($205["e"]) {
return 0;} else {
return 1;}
}) }), $205);
})
;
var or_ = (function (mk_default_val, val_10) {
let $206 = val_10;
return coll_impl(({ [_PLUS_.MaybeT]: (function () {
if ($206["e"]) {
return mk_default_val();} else {
return $206["j"];}
}) }), $206);
})
;
var or = (function (default_val, m) {
return or_((function () {
return default_val;
}), m);
})
;
var maybe_ = (function (on_none, on_just, val_11) {
let $207 = val_11;
return coll_impl(({ [_PLUS_.MaybeT]: (function () {
if ($207["e"]) {
return on_none();} else {
return on_just($207["j"]);}
}) }), $207);
})
;
var maybe = (function (none, on_just, m) {
return maybe_((function () {
return none;
}), on_just, m);
})
;
var insert = (function (val_12, target_id, v) {
let $208 = val_12;
return coll_impl(({ [_PLUS_.VecT]: (function () {
if ((target_id >= size($208))) {
return None;} else {
$208.splice(target_id, 0, v);
return Just(target_id);}
}), [_PLUS_.MapT]: (function () {
return fmap((function () {
put($208, target_id, v);
return target_id;
}), at($208, target_id));
}), [_PLUS_.KeyMapT]: (function () {
let kk209 = key(target_id);
return fmap((function () {
put($208["ks"], kk209, v);
put($208["vs"], kk209, v);
return kk209;
}), at($208["ks"], kk209));
}), [_PLUS_.KeyedListT]: (function () {
let id210 = $208["i"];
let prepend211 = $208["d"][target_id];
if (nil_QMARK_(prepend211)) {
return None;} else {
let vec__212215 = prepend211[1];
let pid216 = vec__212215[0];
let G__217218 = $208;
G__217218["n"] = (inc)(G__217218["n"]);
((_PLUS_.nil_QMARK_(pid216)) ? ((function (_anon_PERCENT_1_59) {
return _anon_PERCENT_1_59["f"] = pid216;
})) : ((function (_anon_PERCENT_1_60) {
return _anon_PERCENT_1_60["d"][pid216][2] = id210;
})))(G__217218);
G__217218[_anon_PERCENT_1_61]["d"][target_id][1] = id210;
G__217218[_anon_PERCENT_1_61]["d"][id210] = [v, pid216, target_id];
G__217218;
return Just(id210);}
}) }), $208);
})
;
var unshift = (function (val_13, v) {
let $219 = val_13;
return coll_impl(({ [_PLUS_.VecT]: (function () {
return $219["a"].unshift(v);
}), [_PLUS_.KeyedListT]: (function () {
return insert($219, $219["f"], v);
}) }), $219);
})
;
var sort = (function (val_14, v) {
let $220 = val_14;
return coll_impl(({ [_PLUS_.VecT]: (function () {
let res221 = _PLUS_.apply(Vec, $220["a"]);
res221["a"].sort();
return res221;
}) }), $220);
})
;
var empty_QMARK_ = (function (c) {
return _PLUS_.is(0, size(c));
})
;
var unjson = (function (v) {
let unjson_pairs222 = (function (p__223) {
let vec__224227 = p__223;
let k228 = vec__224227[0];
let v229 = vec__224227[1];
return [unjson(k228), unjson(v229)];
});
if (_PLUS_.js_array_QMARK_(v)) {
return (({ [_PLUS_.MaybeT]: (function () {
return fmap(unjson, Maybe(v[1]));
}), [_PLUS_.VecT]: (function () {
return fmap(unjson, _PLUS_.apply(Vec, v.slice(1)));
}), [_PLUS_.MapT]: (function () {
return Map(unjson_pairs222.map(v.slice(1)));
}), [_PLUS_.KeyMapT]: (function () {
return KeyMap(unjson_pairs222.map(v.slice(1)));
}) })[type_id(v)] || (function () {
return v.map(unjson);
}))();} else {
if (({ [_PLUS_.StrT]: true, [_PLUS_.NumT]: true, [_PLUS_.BoolT]: true })[(v && type_id(v))]) {
return v;} else {
if ("else") {
throw _PLUS_.str("Val: /", v, "/ is of unsupported type")} else {
return undefined;}}}
})
;
var encode = (function (v) {
return JSON.stringify(json(v));
})
;
var decode = (function (s) {
return unjson(JSON.parse(s));
})
;

export { json, unjson, or_, implement_key, keys, Vec, maybe, put, Map, KeyedList, empty_QMARK_, bind, decode, key, KeyMap, Just, for_each_map, sort, MapClass, maybe_, pretty, None, unshift, Range, vals, or, inst_id, remove, concat, filter, each, fmap, insert, size, reduce, encode, type_id, at, Maybe }
