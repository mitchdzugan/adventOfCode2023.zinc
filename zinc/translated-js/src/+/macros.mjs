import * as _PLUS_ from './raw-js.mjs';
export * from './raw-js.mjs';
var mk_id_generator = (function() {
    let next_id1 = [1];
    return function() {
        next_id1[0] = (_PLUS_.inc)(next_id1[0]);
        return _PLUS_.dec(next_id1[0]);
    };
});
var mk_inst_id = mk_id_generator();
var qt_store = ({});
var set_qt_store = (function(id, display_name) {
    qt_store[id] = display_name;
    return id;
});
var prop_store = ({});
var variant_store = ({});
var monad_plus_impls = ({});
var implement_monad_plus = (function(type_id, mzero_impl, mplus_impl) {
    return monad_plus_impls[type_id] = [mzero_impl, mplus_impl];
});
var mzero = (function(type_id) {
    return monad_plus_impls[type_id][0]();
});
var mplus = (function(a, b) {
    return monad_plus_impls[a["T"]][1](a, b);
});
var applicative_impls = ({});
var implement_applicative = (function(type_id, pure_impl) {
    return applicative_impls[type_id] = pure_impl;
});
var pure = (function(type_id, a) {
    return applicative_impls[type_id](a);
});
var flatplicative_impls = ({});
var implement_flatplicative = (function(type_id, ensure_type_impl) {
    return flatplicative_impls[type_id] = ensure_type_impl;
});
var implement_flatplicative_for_applicative = (function(type_id) {
    return implement_flatplicative(type_id, (function(_anon_PERCENT_1_168) {
        if ((type_id === _anon_PERCENT_1_168["T"])) {
            return _anon_PERCENT_1_168;
        } else {
            return pure(type_id, _anon_PERCENT_1_168);
        }
    }));
});
var ensure_type = (function(type_id, obj) {
    return flatplicative_impls[type_id](obj);
});
var fplus = (function(type_id, a, b) {
    let b_flat2 = ((b) ? (ensure_type(type_id, b)) : (undefined));
    if (_PLUS_.nil_QMARK_(a)) {
        return b_flat2;
    } else {
        if (_PLUS_.nil_QMARK_(b)) {
            return a;
        } else {
            if ("else") {
                return mplus(a, b_flat2);
            } else {
                return undefined;
            }
        }
    }
});

export {
    mzero,
    mk_inst_id,
    implement_flatplicative_for_applicative,
    mplus,
    qt_store,
    pure,
    ensure_type,
    prop_store,
    mk_id_generator,
    variant_store,
    flatplicative_impls,
    implement_monad_plus,
    implement_flatplicative,
    set_qt_store,
    implement_applicative,
    monad_plus_impls,
    applicative_impls,
    fplus
}
