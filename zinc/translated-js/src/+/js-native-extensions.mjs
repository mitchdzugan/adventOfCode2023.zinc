import * as _PLUS_ from './core.mjs';var def_property = (function (js_class, k, impl) {
if (js_class["prototype"]["hasOwnProperty"](k)) {
return undefined;} else {
return Object.defineProperty(js_class["prototype"], k, ({ "get": (function () {
let this1 = this;
return impl.bind(this1)();
}) }));}
})
;
var def_method = (function (js_class, k, impl) {
return js_class["prototype"][k] = impl;
})
;
var defs_for = (function (js_class, f) {
return f((function (k, impl) {
return def_property(js_class, k, impl);
}), (function (k, impl) {
return def_method(js_class, k, impl);
}));
})
;
defs_for(Number, (function (def_property, def_method) {
def_property("T", (function () {
let $_262 = this;
return _PLUS_.NumT;
}));
for (let k of ["J", "P", "I"]) {
[true, def_property(k, (function () {
let $_273 = this;
return $_273.valueOf();
}))]
};
return undefined;
}));
defs_for(Boolean, (function (def_property, def_method) {
def_property("T", (function () {
let $_284 = this;
return _PLUS_.BoolT;
}));
for (let k of ["J", "P", "I"]) {
[true, def_property(k, (function () {
let $_295 = this;
return $_295.valueOf();
}))]
};
return undefined;
}));
defs_for(String, (function (def_property, def_method) {
def_property("T", (function () {
let $_306 = this;
return _PLUS_.StrT;
}));
for (let k of ["J", "P", "I"]) {
[true, def_property(k, (function () {
let $_317 = this;
return $_317.valueOf();
}))]
};
return undefined;
}));
defs_for(Map, (function (def_property, def_method) {
def_property("T", (function () {
let $_328 = this;
return _PLUS_.MapT;
}));
def_property("I", (function () {
let $_339 = this;
let i10 = ($_339["i"] || _PLUS_.mk_inst_id());
$_339["i"] = i10;
return i10;
}));
def_property("J", (function () {
let $_3411 = this;
return _PLUS_.js_array_from($_3411, [_PLUS_.MapT], (function (_anon_PERCENT_1_63) {
return _anon_PERCENT_1_63.map(_PLUS_.json);
}));
}));
return def_property("P", (function () {
let $_3512 = this;
let res13 = ({  });
_PLUS_.js_array_from($_3512).forEach((function (_anon_PERCENT_1_64) {
let k14 = _anon_PERCENT_1_64[0];
let pk15 = ((_PLUS_.js_str_QMARK_(k14)) ? (_PLUS_.str("\"", k14, "\"")) : (k14));
let pv16 = _PLUS_.pretty(_anon_PERCENT_1_64[1]);
return res13[pk15] = pv16;
}));
return res13;
}));
}));
defs_for(Array, (function (def_property, def_method) {
def_property("T", (function () {
let $_3617 = this;
return $_3617[0];
}));
def_property("I", (function () {
let $_3718 = this;
let i19 = ($_3718["i"] || _PLUS_.mk_inst_id());
$_3718["i"] = i19;
return i19;
}));
def_property("J", (function () {
let $_3820 = this;
return $_3820.map(_PLUS_.json);
}));
return def_property("P", (function () {
let $_3921 = this;
let id22 = $_3921["T"];
let res23 = ({  });
res23["Type"] = (_PLUS_.qt_store[id22] || id22);
$_3921.slice(1).forEach((function (v, ind) {
let pk24 = (_PLUS_.dig(_PLUS_.prop_store, [id22, undefined, ind, "idname"]) || _PLUS_.dig(_PLUS_.prop_store, [id22, $_3921[1], ind, "idname"]) || ind);
if (_PLUS_.is(pk24, "+")) {
return res23["Type"] = _PLUS_.str(res23["Type"], "[", _PLUS_.dig(_PLUS_.variant_store, [id22, $_3921[1]]), "]");} else {
return res23[pk24] = _PLUS_.pretty(v);}
}));
return res23;
}));
}));
