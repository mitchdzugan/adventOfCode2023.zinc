import * as lib from './lib.mjs';
import * as _PLUS_ from './../+.mjs';
undefined;
var DirT = 34;
var Left = [34, 3];
var Right = [34, 4];
var Up = [34, 1];
var Down = [34, 2];
var init_dir = (function(c) {
    if (_PLUS_.is(c, "-")) {
        return Left;
    } else {
        if (_PLUS_.is(c, "7")) {
            return Up;
        } else {
            if (_PLUS_.is(c, "|")) {
                return Up;
            } else {
                if (_PLUS_.is(c, "J")) {
                    return Down;
                } else {
                    if (_PLUS_.is(c, "L")) {
                        return Down;
                    } else {
                        if (_PLUS_.is(c, "F")) {
                            return Up;
                        } else {
                            return undefined;
                        }
                    }
                }
            }
        }
    }
});
var next_dir = (function(c, dir) {
    if (_PLUS_.is(c, "-")) {
        let val_1071 = dir;
        let spec_1082 = ({
            3: (function() {
                return Left;
            }),
            4: (function() {
                return Right;
            })
        });
        return (spec_1082[val_1071[1]] || spec_1082[0])();
    } else {
        if (_PLUS_.is(c, "7")) {
            let val_1093 = dir;
            let spec_1104 = ({
                1: (function() {
                    return Left;
                }),
                4: (function() {
                    return Down;
                })
            });
            return (spec_1104[val_1093[1]] || spec_1104[0])();
        } else {
            if (_PLUS_.is(c, "|")) {
                let val_1115 = dir;
                let spec_1126 = ({
                    1: (function() {
                        return Up;
                    }),
                    2: (function() {
                        return Down;
                    })
                });
                return (spec_1126[val_1115[1]] || spec_1126[0])();
            } else {
                if (_PLUS_.is(c, "J")) {
                    let val_1137 = dir;
                    let spec_1148 = ({
                        2: (function() {
                            return Left;
                        }),
                        4: (function() {
                            return Up;
                        })
                    });
                    return (spec_1148[val_1137[1]] || spec_1148[0])();
                } else {
                    if (_PLUS_.is(c, "L")) {
                        let val_1159 = dir;
                        let spec_11610 = ({
                            2: (function() {
                                return Right;
                            }),
                            3: (function() {
                                return Up;
                            })
                        });
                        return (spec_11610[val_1159[1]] || spec_11610[0])();
                    } else {
                        if (_PLUS_.is(c, "F")) {
                            let val_11711 = dir;
                            let spec_11812 = ({
                                1: (function() {
                                    return Right;
                                }),
                                3: (function() {
                                    return Down;
                                })
                            });
                            return (spec_11812[val_11711[1]] || spec_11812[0])();
                        } else {
                            return undefined;
                        }
                    }
                }
            }
        }
    }
});
undefined;
var PosT = 33;
var Pos = (function(x, y) {
    return [33, x, y];
});
var eq_pos = (function(p1, p2) {
    let var_x_11913 = p1[1];
    let var_y_12014 = p1[2];
    let var_x_12115 = p2[1];
    let var_y_12216 = p2[2];
    return ((var_x_11913 === var_x_12115) && (var_y_12014 === var_y_12216));
});
var get_at_pos = (function(m, val_123, s_char) {
    let var_y_12417 = val_123[2];
    let var_x_12518 = val_123[1];
    let res19 = _PLUS_.or(".", _PLUS_.at(_PLUS_.or(_PLUS_.Vec(), _PLUS_.at(m, var_y_12417)), var_x_12518));
    if (_PLUS_.is(res19, "S")) {
        return s_char;
    } else {
        return res19;
    }
});
var set_at_pos = (function(m, val_126, v) {
    let var_y_12720 = val_126[2];
    let var_x_12821 = val_126[1];
    return _PLUS_.put(_PLUS_.at_BANG_(m, var_y_12720), var_x_12821, v);
});
var step_pos = (function(val_129, dir) {
    let var_x_13022 = val_129[1];
    let var_y_13123 = val_129[2];
    let x24 = var_x_13022;
    let y25 = var_y_13123;
    let val_13226 = dir;
    let spec_13327 = ({
        3: (function() {
            return Pos((x24 - 1), y25);
        }),
        4: (function() {
            return Pos((x24 + 1), y25);
        }),
        1: (function() {
            return Pos(x24, (y25 - 1));
        }),
        2: (function() {
            return Pos(x24, (y25 + 1));
        })
    });
    return (spec_13327[val_13226[1]] || spec_13327[0])();
});
undefined;
var InstT = 35;
var Inst = (function(m, pos, dir, origin, s_char) {
    return [35, m, pos, dir, origin, s_char];
});
var inst_pos = (function(val_134) {
    let var_pos_13528 = val_134[2];
    return var_pos_13528;
});
var step = (function(val_136) {
    let var_m_13729 = val_136[1];
    let var_pos_13830 = val_136[2];
    let var_s_char_13931 = val_136[5];
    let var_dir_14032 = val_136[3];
    let var_origin_14133 = val_136[4];
    let ndir34 = next_dir(get_at_pos(var_m_13729, var_pos_13830, var_s_char_13931), var_dir_14032);
    return Inst(var_m_13729, step_pos(var_pos_13830, ndir34), ndir34, var_origin_14133, var_s_char_13931);
});
var start_QMARK_ = (function(val_142) {
    let var_pos_14335 = val_142[2];
    let var_origin_14436 = val_142[4];
    return eq_pos(var_pos_14335, var_origin_14436);
});
var get_initial_pos = (function(m) {
    return _PLUS_.first_BANG_(_PLUS_.bind(_PLUS_.vals, _PLUS_.fmap((function(p__37) {
        let vec__3841 = p__37;
        let c42 = vec__3841[0];
        let x43 = vec__3841[1];
        let y44 = vec__3841[2];
        if (("S" === c42)) {
            return _PLUS_.Just(Pos(x43, y44));
        } else {
            return _PLUS_.None;
        }
    }), _PLUS_.bind((function(r, y) {
        return _PLUS_.fmap((function(c, x) {
            return [c, x, y];
        }), r);
    }), m))));
});
var make_loop_only_assuming = (function(base, s_char) {
    let loop_only45 = _PLUS_.fmap((function(_anon_PERCENT_1_48) {
        return _PLUS_.fmap((function() {
            return ".";
        }), _anon_PERCENT_1_48);
    }), base);
    let init_pos46 = get_initial_pos(base);
    let mk_inst47 = (function(_anon_PERCENT_1_49) {
        return Inst(_anon_PERCENT_1_49, init_pos46, init_dir(s_char), init_pos46, s_char);
    });
    let inst48 = step(mk_inst47(base));
    while (true) {
        let p49 = inst_pos(inst48);
        set_at_pos(loop_only45, p49, get_at_pos(base, p49, s_char));
        if (start_QMARK_(inst48)) {
            step(inst48)
        } else {
            let G__50 = step(inst48);
            inst48 = G__50;
            continue;
        };
        break;
    };
    return loop_only45;
});
var try_s_char = (function(base, s_char) {
    return (function() {
        try {
            return _PLUS_.Just(make_loop_only_assuming(base, s_char));
        } catch (e51) {
            return _PLUS_.None;
        }

    })();
});
var make_loop_only = (function(base) {
    return _PLUS_.unwrap_BANG_(_PLUS_.reduce((function(_anon_PERCENT_1_51, _anon_PERCENT_2_50) {
        return _PLUS_.or_((function() {
            return try_s_char(base, _anon_PERCENT_2_50);
        }), _PLUS_.fmap(_PLUS_.Just, _anon_PERCENT_1_51));
    }), _PLUS_.None, _PLUS_.Vec("-", "|", "J", "L", "F", "7")));
});
var to_matrix = (function(input) {
    return _PLUS_.fmap((function(_anon_PERCENT_1_52) {
        return lib.strsplit(_anon_PERCENT_1_52, "");
    }), lib.strsplit(input, "\n"));
});
let parse_into_matrix_with_loop_only_impl_2852 = (function(input) {
    return make_loop_only(to_matrix(input));
});
let parse_into_matrix_with_loop_only_memo_3053 = _PLUS_.Map();
var parse_into_matrix_with_loop_only = (function() {
    let f54 = (function(var_args) {
        let args5558 = [];
        let len__24440__auto__59 = arguments["length"];
        let i5660 = 0;
        while (true) {
            if ((i5660 < len__24440__auto__59)) {
                args5558.push((arguments[i5660]));
                let G__61 = (i5660 + 1);
                i5660 = G__61;
                continue;
            };
            break;
        };
        let argseq__24702__auto__62 = (((0 < args5558["length"])) ? (args5558.slice(0)) : (undefined));
        return f54.cljs$core$IFn$_invoke$arity$variadic(argseq__24702__auto__62);
    });
    f54["cljs$core$IFn$_invoke$arity$variadic"] = (function(parse_into_matrix_with_loop_only_args_29) {
        let parse_into_matrix_with_loop_only_mkey_2763 = _PLUS_.encode(_PLUS_.fmap(_PLUS_.forcedKey, _PLUS_.apply(_PLUS_.Vec, parse_into_matrix_with_loop_only_args_29)));
        let parse_into_matrix_with_loop_only_rtrn_2664 = _PLUS_.or_((function() {
            return _PLUS_.apply(parse_into_matrix_with_loop_only_impl_2852, parse_into_matrix_with_loop_only_args_29);
        }), _PLUS_.at(parse_into_matrix_with_loop_only_memo_3053, parse_into_matrix_with_loop_only_mkey_2763));
        _PLUS_.put(parse_into_matrix_with_loop_only_memo_3053, parse_into_matrix_with_loop_only_mkey_2763, parse_into_matrix_with_loop_only_rtrn_2664);
        return parse_into_matrix_with_loop_only_rtrn_2664;
    });
    f54["cljs$lang$maxFixedArity"] = 0;
    f54["cljs$lang$applyTo"] = (function(seq57) {
        let self__24463__auto__65 = this;
        return self__24463__auto__65.cljs$core$IFn$_invoke$arity$variadic(seq(seq57));
    });
    return f54;
})();
var part1 = (function(input) {
    let m66 = parse_into_matrix_with_loop_only(input);
    return (function(p) {
        return _PLUS_.floor((_PLUS_.size(p) / 2));
    })(_PLUS_.remove((function(_anon_PERCENT_1_53) {
        return _PLUS_.is(".", _anon_PERCENT_1_53);
    }), _PLUS_.bind(_PLUS_.id, m66)));
});
let crossings_to_top_edge_impl_3367 = (function(m, x, y) {
    let getc68 = (function(_anon_PERCENT_1_54) {
        return get_at_pos(m, Pos(x, _anon_PERCENT_1_54));
    });
    let plain_QMARK_69 = (function(_anon_PERCENT_1_55) {
        return _PLUS_.is(getc68(_anon_PERCENT_1_55), ".");
    });
    let edge_QMARK_70 = (function(_anon_PERCENT_1_56) {
        return (_PLUS_.is(getc68(_anon_PERCENT_1_56), "-") || _PLUS_.is(getc68(_anon_PERCENT_1_56), "|"));
    });
    let get_rest71 = (function(_anon_PERCENT_1_57) {
        return crossings_to_top_edge(m, x, (_anon_PERCENT_1_57 - 1));
    });
    if ((y < 0)) {
        return 0;
    } else {
        if (plain_QMARK_69(y)) {
            return get_rest71(y);
        } else {
            if (edge_QMARK_70(y)) {
                return (1 + get_rest71(y));
            } else {
                if ("else") {
                    let suby72 = (y - 1);
                    while (true) {
                        if (edge_QMARK_70(suby72)) {
                            let G__73 = (suby72 - 1);
                            suby72 = G__73;
                            continue;
                        } else {
                            return (get_rest71(suby72) + (((next_dir(getc68(y), Down) === next_dir(getc68(suby72), Up))) ? (0) : (1)));
                        };
                        break;
                    }
                } else {
                    return undefined;
                }
            }
        }
    }
});
let crossings_to_top_edge_memo_3574 = _PLUS_.Map();
var crossings_to_top_edge = (function() {
    let f75 = (function(var_args) {
        let args7679 = [];
        let len__24440__auto__80 = arguments["length"];
        let i7781 = 0;
        while (true) {
            if ((i7781 < len__24440__auto__80)) {
                args7679.push((arguments[i7781]));
                let G__82 = (i7781 + 1);
                i7781 = G__82;
                continue;
            };
            break;
        };
        let argseq__24702__auto__83 = (((0 < args7679["length"])) ? (args7679.slice(0)) : (undefined));
        return f75.cljs$core$IFn$_invoke$arity$variadic(argseq__24702__auto__83);
    });
    f75["cljs$core$IFn$_invoke$arity$variadic"] = (function(crossings_to_top_edge_args_34) {
        let crossings_to_top_edge_mkey_3284 = _PLUS_.encode(_PLUS_.fmap(_PLUS_.forcedKey, _PLUS_.apply(_PLUS_.Vec, crossings_to_top_edge_args_34)));
        let crossings_to_top_edge_rtrn_3185 = _PLUS_.or_((function() {
            return _PLUS_.apply(crossings_to_top_edge_impl_3367, crossings_to_top_edge_args_34);
        }), _PLUS_.at(crossings_to_top_edge_memo_3574, crossings_to_top_edge_mkey_3284));
        _PLUS_.put(crossings_to_top_edge_memo_3574, crossings_to_top_edge_mkey_3284, crossings_to_top_edge_rtrn_3185);
        return crossings_to_top_edge_rtrn_3185;
    });
    f75["cljs$lang$maxFixedArity"] = 0;
    f75["cljs$lang$applyTo"] = (function(seq78) {
        let self__24463__auto__86 = this;
        return self__24463__auto__86.cljs$core$IFn$_invoke$arity$variadic(seq(seq78));
    });
    return f75;
})();
var enclosed_QMARK_ = (function(m, val_145) {
    let var_x_14687 = val_145[1];
    let var_y_14788 = val_145[2];
    return (("." === get_at_pos(m, val_145)) && (1 === _PLUS_.mod(crossings_to_top_edge(m, var_x_14687, var_y_14788), 2)));
});
var part2 = (function(input) {
    let m89 = parse_into_matrix_with_loop_only(input);
    return _PLUS_.reduce((function(_anon_PERCENT_1_60, _anon_PERCENT_2_61) {
        return (_anon_PERCENT_1_60 + _PLUS_.size(_anon_PERCENT_2_61));
    }), 0, _PLUS_.fmap((function(row, y) {
        return _PLUS_.filter((function(_anon_PERCENT_1_59, _anon_PERCENT_2_58) {
            return enclosed_QMARK_(m89, Pos(_anon_PERCENT_2_58, y));
        }), row);
    }), m89));
});

export {
    Inst,
    Left,
    get_at_pos,
    eq_pos,
    InstT,
    part2,
    enclosed_QMARK_,
    Pos,
    next_dir,
    Down,
    start_QMARK_,
    parse_into_matrix_with_loop_only,
    inst_pos,
    part1,
    to_matrix,
    PosT,
    make_loop_only_assuming,
    DirT,
    crossings_to_top_edge,
    Up,
    step_pos,
    make_loop_only,
    try_s_char,
    Right,
    init_dir,
    set_at_pos,
    get_initial_pos,
    step
}
