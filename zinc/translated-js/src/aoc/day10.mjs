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
        let val_11 = dir;
        let spec_22 = ({
            3: (function() {
                return Left;
            }),
            4: (function() {
                return Right;
            })
        });
        return (spec_22[val_11[1]] || spec_22[0])();
    } else {
        if (_PLUS_.is(c, "7")) {
            let val_33 = dir;
            let spec_44 = ({
                1: (function() {
                    return Left;
                }),
                4: (function() {
                    return Down;
                })
            });
            return (spec_44[val_33[1]] || spec_44[0])();
        } else {
            if (_PLUS_.is(c, "|")) {
                let val_55 = dir;
                let spec_66 = ({
                    1: (function() {
                        return Up;
                    }),
                    2: (function() {
                        return Down;
                    })
                });
                return (spec_66[val_55[1]] || spec_66[0])();
            } else {
                if (_PLUS_.is(c, "J")) {
                    let val_77 = dir;
                    let spec_88 = ({
                        2: (function() {
                            return Left;
                        }),
                        4: (function() {
                            return Up;
                        })
                    });
                    return (spec_88[val_77[1]] || spec_88[0])();
                } else {
                    if (_PLUS_.is(c, "L")) {
                        let val_99 = dir;
                        let spec_1010 = ({
                            2: (function() {
                                return Right;
                            }),
                            3: (function() {
                                return Up;
                            })
                        });
                        return (spec_1010[val_99[1]] || spec_1010[0])();
                    } else {
                        if (_PLUS_.is(c, "F")) {
                            let val_1111 = dir;
                            let spec_1212 = ({
                                1: (function() {
                                    return Right;
                                }),
                                3: (function() {
                                    return Down;
                                })
                            });
                            return (spec_1212[val_1111[1]] || spec_1212[0])();
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
    let var_x_1313 = p1[1];
    let var_y_1414 = p1[2];
    let var_x_1515 = p2[1];
    let var_y_1616 = p2[2];
    return ((var_x_1313 === var_x_1515) && (var_y_1414 === var_y_1616));
});
var get_at_pos = (function(m, val_17, s_char) {
    let var_y_1817 = val_17[2];
    let var_x_1918 = val_17[1];
    let res19 = _PLUS_.or(".", _PLUS_.at(_PLUS_.or(_PLUS_.Vec(), _PLUS_.at(m, var_y_1817)), var_x_1918));
    if (_PLUS_.is(res19, "S")) {
        return s_char;
    } else {
        return res19;
    }
});
var set_at_pos = (function(m, val_20, v) {
    let var_y_2120 = val_20[2];
    let var_x_2221 = val_20[1];
    return _PLUS_.put(_PLUS_.at_BANG_(m, var_y_2120), var_x_2221, v);
});
var step_pos = (function(val_23, dir) {
    let var_x_2422 = val_23[1];
    let var_y_2523 = val_23[2];
    let x24 = var_x_2422;
    let y25 = var_y_2523;
    let val_2626 = dir;
    let spec_2727 = ({
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
    return (spec_2727[val_2626[1]] || spec_2727[0])();
});
undefined;
var InstT = 35;
var Inst = (function(m, pos, dir, origin, s_char) {
    return [35, m, pos, dir, origin, s_char];
});
var inst_pos = (function(val_28) {
    let var_pos_2928 = val_28[2];
    return var_pos_2928;
});
var step = (function(val_30) {
    let var_m_3129 = val_30[1];
    let var_pos_3230 = val_30[2];
    let var_s_char_3331 = val_30[5];
    let var_dir_3432 = val_30[3];
    let var_origin_3533 = val_30[4];
    let ndir34 = next_dir(get_at_pos(var_m_3129, var_pos_3230, var_s_char_3331), var_dir_3432);
    return Inst(var_m_3129, step_pos(var_pos_3230, ndir34), ndir34, var_origin_3533, var_s_char_3331);
});
var start_QMARK_ = (function(val_36) {
    let var_pos_3735 = val_36[2];
    let var_origin_3836 = val_36[4];
    return eq_pos(var_pos_3735, var_origin_3836);
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
    let loop_only45 = _PLUS_.fmap((function(_anon_PERCENT_1_4) {
        return _PLUS_.fmap((function() {
            return ".";
        }), _anon_PERCENT_1_4);
    }), base);
    let init_pos46 = get_initial_pos(base);
    let mk_inst47 = (function(_anon_PERCENT_1_5) {
        return Inst(_anon_PERCENT_1_5, init_pos46, init_dir(s_char), init_pos46, s_char);
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
    return _PLUS_.unwrap_BANG_(_PLUS_.reduce((function(_anon_PERCENT_1_7, _anon_PERCENT_2_6) {
        return _PLUS_.or_((function() {
            return try_s_char(base, _anon_PERCENT_2_6);
        }), _PLUS_.fmap(_PLUS_.Just, _anon_PERCENT_1_7));
    }), _PLUS_.None, _PLUS_.Vec("-", "|", "J", "L", "F", "7")));
});
var to_matrix = (function(input) {
    return _PLUS_.fmap((function(_anon_PERCENT_1_8) {
        return lib.strsplit(_anon_PERCENT_1_8, "");
    }), lib.strsplit(input, "\n"));
});
let parse_into_matrix_with_loop_only_impl_352 = (function(input) {
    return make_loop_only(to_matrix(input));
});
let parse_into_matrix_with_loop_only_memo_553 = _PLUS_.Map();
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
    f54["cljs$core$IFn$_invoke$arity$variadic"] = (function(parse_into_matrix_with_loop_only_args_4) {
        let parse_into_matrix_with_loop_only_mkey_263 = _PLUS_.encode(_PLUS_.fmap(_PLUS_.forcedKey, _PLUS_.apply(_PLUS_.Vec, parse_into_matrix_with_loop_only_args_4)));
        let parse_into_matrix_with_loop_only_rtrn_164 = _PLUS_.or_((function() {
            return _PLUS_.apply(parse_into_matrix_with_loop_only_impl_352, parse_into_matrix_with_loop_only_args_4);
        }), _PLUS_.at(parse_into_matrix_with_loop_only_memo_553, parse_into_matrix_with_loop_only_mkey_263));
        _PLUS_.put(parse_into_matrix_with_loop_only_memo_553, parse_into_matrix_with_loop_only_mkey_263, parse_into_matrix_with_loop_only_rtrn_164);
        return parse_into_matrix_with_loop_only_rtrn_164;
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
    })(_PLUS_.remove((function(_anon_PERCENT_1_9) {
        return _PLUS_.is(".", _anon_PERCENT_1_9);
    }), _PLUS_.bind(_PLUS_.id, m66)));
});
let crossings_to_top_edge_impl_867 = (function(m, x, y) {
    let getc68 = (function(_anon_PERCENT_1_10) {
        return get_at_pos(m, Pos(x, _anon_PERCENT_1_10));
    });
    let plain_QMARK_69 = (function(_anon_PERCENT_1_11) {
        return _PLUS_.is(getc68(_anon_PERCENT_1_11), ".");
    });
    let edge_QMARK_70 = (function(_anon_PERCENT_1_12) {
        return (_PLUS_.is(getc68(_anon_PERCENT_1_12), "-") || _PLUS_.is(getc68(_anon_PERCENT_1_12), "|"));
    });
    let get_rest71 = (function(_anon_PERCENT_1_13) {
        return crossings_to_top_edge(m, x, (_anon_PERCENT_1_13 - 1));
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
let crossings_to_top_edge_memo_1074 = _PLUS_.Map();
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
    f75["cljs$core$IFn$_invoke$arity$variadic"] = (function(crossings_to_top_edge_args_9) {
        let crossings_to_top_edge_mkey_784 = _PLUS_.encode(_PLUS_.fmap(_PLUS_.forcedKey, _PLUS_.apply(_PLUS_.Vec, crossings_to_top_edge_args_9)));
        let crossings_to_top_edge_rtrn_685 = _PLUS_.or_((function() {
            return _PLUS_.apply(crossings_to_top_edge_impl_867, crossings_to_top_edge_args_9);
        }), _PLUS_.at(crossings_to_top_edge_memo_1074, crossings_to_top_edge_mkey_784));
        _PLUS_.put(crossings_to_top_edge_memo_1074, crossings_to_top_edge_mkey_784, crossings_to_top_edge_rtrn_685);
        return crossings_to_top_edge_rtrn_685;
    });
    f75["cljs$lang$maxFixedArity"] = 0;
    f75["cljs$lang$applyTo"] = (function(seq78) {
        let self__24463__auto__86 = this;
        return self__24463__auto__86.cljs$core$IFn$_invoke$arity$variadic(seq(seq78));
    });
    return f75;
})();
var enclosed_QMARK_ = (function(m, val_39) {
    let var_x_4087 = val_39[1];
    let var_y_4188 = val_39[2];
    return (("." === get_at_pos(m, val_39)) && (1 === _PLUS_.mod(crossings_to_top_edge(m, var_x_4087, var_y_4188), 2)));
});
var part2 = (function(input) {
    let m89 = parse_into_matrix_with_loop_only(input);
    return _PLUS_.reduce((function(_anon_PERCENT_1_16, _anon_PERCENT_2_17) {
        return (_anon_PERCENT_1_16 + _PLUS_.size(_anon_PERCENT_2_17));
    }), 0, _PLUS_.fmap((function(row, y) {
        return _PLUS_.filter((function(_anon_PERCENT_1_15, _anon_PERCENT_2_14) {
            return enclosed_QMARK_(m89, Pos(_anon_PERCENT_2_14, y));
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
