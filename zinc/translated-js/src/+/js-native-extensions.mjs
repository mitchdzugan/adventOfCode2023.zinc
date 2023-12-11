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
        let $_1882 = this;
        return _PLUS_.NumT;
    }));
    for (let k of ["J", "P", "I"]) {
        [true, def_property(k, (function() {
            let $_1893 = this;
            return $_1893.valueOf();
        }))]
    };
    return undefined;
}));
defs_for(Boolean, (function(def_property, def_method) {
    def_property("T", (function() {
        let $_1904 = this;
        return _PLUS_.BoolT;
    }));
    for (let k of ["J", "P", "I"]) {
        [true, def_property(k, (function() {
            let $_1915 = this;
            return $_1915.valueOf();
        }))]
    };
    return undefined;
}));
defs_for(String, (function(def_property, def_method) {
    def_property("T", (function() {
        let $_1926 = this;
        return _PLUS_.StrT;
    }));
    for (let k of ["J", "P", "I"]) {
        [true, def_property(k, (function() {
            let $_1937 = this;
            return $_1937.valueOf();
        }))]
    };
    return undefined;
}));
defs_for(Map, (function(def_property, def_method) {
    def_property("T", (function() {
        let $_1948 = this;
        return _PLUS_.MapT;
    }));
    def_property("I", (function() {
        let $_1959 = this;
        let i10 = ($_1959["i"] || _PLUS_.mk_inst_id());
        $_1959["i"] = i10;
        return i10;
    }));
    def_property("J", (function() {
        let $_19611 = this;
        return _PLUS_.js_array_from($_19611, [_PLUS_.MapT], (function(_anon_PERCENT_1_169) {
            return _anon_PERCENT_1_169.map(_PLUS_.json);
        }));
    }));
    return def_property("P", (function() {
        let $_19712 = this;
        let res13 = ({});
        _PLUS_.js_array_from($_19712).forEach((function(_anon_PERCENT_1_170) {
            let k14 = _anon_PERCENT_1_170[0];
            let pk15 = ((_PLUS_.js_str_QMARK_(k14)) ? (_PLUS_.str("\"", k14, "\"")) : (k14));
            let pv16 = _PLUS_.pretty(_anon_PERCENT_1_170[1]);
            return res13[pk15] = pv16;
        }));
        return res13;
    }));
}));
defs_for(Array, (function(def_property, def_method) {
    def_property("T", (function() {
        let $_19817 = this;
        return $_19817[0];
    }));
    def_property("I", (function() {
        let $_19918 = this;
        let i19 = ($_19918["i"] || _PLUS_.mk_inst_id());
        $_19918["i"] = i19;
        return i19;
    }));
    def_property("J", (function() {
        let $_20020 = this;
        return $_20020.map(_PLUS_.json);
    }));
    return def_property("P", (function() {
        let $_20121 = this;
        let id22 = $_20121["T"];
        let res23 = ({});
        res23["Type"] = (_PLUS_.qt_store[id22] || id22);
        $_20121.slice(1).forEach((function(v, ind) {
            let pk24 = (_PLUS_.dig(_PLUS_.prop_store, [id22, undefined, ind, "idname"]) || _PLUS_.dig(_PLUS_.prop_store, [id22, $_20121[1], ind, "idname"]) || ind);
            if (_PLUS_.is(pk24, "+")) {
                return res23["Type"] = _PLUS_.str(res23["Type"], "[", _PLUS_.dig(_PLUS_.variant_store, [id22, $_20121[1]]), "]");
            } else {
                return res23[pk24] = _PLUS_.pretty(v);
            }
        }));
        return res23;
    }));
}));
