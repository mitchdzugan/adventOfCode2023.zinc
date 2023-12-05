import * as _PLUS_ from './core.mjs';
var def_property = (function(js_class, k, impl) {
    if (js_class["prototype"]["hasOwnProperty"](k)) {
        return undefined;
    } else {
        return Object.defineProperty(js_class["prototype"], k, ({
            "get": (function() {
                let this1 = this;
                return impl.bind(this1)();
            })
        }));
    }
});
var def_method = (function(js_class, k, impl) {
    return js_class["prototype"][k] = impl;
});
var defs_for = (function(js_class, f) {
    return f((function(k, impl) {
        return def_property(js_class, k, impl);
    }), (function(k, impl) {
        return def_method(js_class, k, impl);
    }));
});
defs_for(Number, (function(def_property, def_method) {
    def_property("T", (function() {
        let $_942 = this;
        return _PLUS_.NumT;
    }));
    for (let k of ["J", "P", "I"]) {
        [true, def_property(k, (function() {
            let $_953 = this;
            return $_953.valueOf();
        }))]
    };
    return undefined;
}));
defs_for(Boolean, (function(def_property, def_method) {
    def_property("T", (function() {
        let $_964 = this;
        return _PLUS_.BoolT;
    }));
    for (let k of ["J", "P", "I"]) {
        [true, def_property(k, (function() {
            let $_975 = this;
            return $_975.valueOf();
        }))]
    };
    return undefined;
}));
defs_for(String, (function(def_property, def_method) {
    def_property("T", (function() {
        let $_986 = this;
        return _PLUS_.StrT;
    }));
    for (let k of ["J", "P", "I"]) {
        [true, def_property(k, (function() {
            let $_997 = this;
            return $_997.valueOf();
        }))]
    };
    return undefined;
}));
defs_for(Map, (function(def_property, def_method) {
    def_property("T", (function() {
        let $_1008 = this;
        return _PLUS_.MapT;
    }));
    def_property("I", (function() {
        let $_1019 = this;
        let i10 = ($_1019["i"] || _PLUS_.mk_inst_id());
        $_1019["i"] = i10;
        return i10;
    }));
    def_property("J", (function() {
        let $_10211 = this;
        return _PLUS_.js_array_from($_10211, [_PLUS_.MapT], (function(_anon_PERCENT_1_113) {
            return _anon_PERCENT_1_113.map(_PLUS_.json);
        }));
    }));
    return def_property("P", (function() {
        let $_10312 = this;
        let res13 = ({});
        _PLUS_.js_array_from($_10312).forEach((function(_anon_PERCENT_1_114) {
            let k14 = _anon_PERCENT_1_114[0];
            let pk15 = ((_PLUS_.js_str_QMARK_(k14)) ? (_PLUS_.str("\"", k14, "\"")) : (k14));
            let pv16 = _PLUS_.pretty(_anon_PERCENT_1_114[1]);
            return res13[pk15] = pv16;
        }));
        return res13;
    }));
}));
defs_for(Array, (function(def_property, def_method) {
    def_property("T", (function() {
        let $_10417 = this;
        return $_10417[0];
    }));
    def_property("I", (function() {
        let $_10518 = this;
        let i19 = ($_10518["i"] || _PLUS_.mk_inst_id());
        $_10518["i"] = i19;
        return i19;
    }));
    def_property("J", (function() {
        let $_10620 = this;
        return $_10620.map(_PLUS_.json);
    }));
    return def_property("P", (function() {
        let $_10721 = this;
        let id22 = $_10721["T"];
        let res23 = ({});
        res23["Type"] = (_PLUS_.qt_store[id22] || id22);
        $_10721.slice(1).forEach((function(v, ind) {
            let pk24 = (_PLUS_.dig(_PLUS_.prop_store, [id22, undefined, ind, "idname"]) || _PLUS_.dig(_PLUS_.prop_store, [id22, $_10721[1], ind, "idname"]) || ind);
            if (_PLUS_.is(pk24, "+")) {
                return res23["Type"] = _PLUS_.str(res23["Type"], "[", _PLUS_.dig(_PLUS_.variant_store, [id22, $_10721[1]]), "]");
            } else {
                return res23[pk24] = _PLUS_.pretty(v);
            }
        }));
        return res23;
    }));
}));
