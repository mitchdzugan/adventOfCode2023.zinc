import * as lib from './lib.mjs';
import * as _PLUS_ from './../+.mjs';
undefined;
var DirT = 34;
var Left = [34, 3];
var Right = [34, 4];
var Up = [34, 1];
var Down = [34, 2];
undefined;
var PosT = 33;
var Pos = (function(x, y) {
    return [33, x, y];
});
var INITIAL_POS = Pos(74, 82);
var INITIAL_DIR = Up;
var TRUE_S_CHAR = "7";
var pipe_at = (function(m, val_107, preserveS_QMARK_) {
    let var_y_1081 = val_107[2];
    let var_x_1092 = val_107[1];
    let res3 = _PLUS_.at_BANG_(_PLUS_.at_BANG_(m, var_y_1081), var_x_1092);
    if (preserveS_QMARK_) {
        return res3;
    } else {
        if (_PLUS_.is(res3, "S")) {
            return TRUE_S_CHAR;
        } else {
            if ("else") {
                return res3;
            } else {
                return undefined;
            }
        }
    }
});
var step_pos = (function(val_110, dir) {
    let var_x_1114 = val_110[1];
    let var_y_1125 = val_110[2];
    let x6 = var_x_1114;
    let y7 = var_y_1125;
    let val_1138 = dir;
    let spec_1149 = ({
        3: (function() {
            return Pos((x6 - 1), y7);
        }),
        4: (function() {
            return Pos((x6 + 1), y7);
        }),
        1: (function() {
            return Pos(x6, (y7 - 1));
        }),
        2: (function() {
            return Pos(x6, (y7 + 1));
        })
    });
    return (spec_1149[val_1138[1]] || spec_1149[0])();
});
undefined;
var InstT = 35;
var Inst = (function(m, pos, dir) {
    return [35, m, pos, dir];
});
var inst_pos = (function(val_115) {
    let var_pos_11610 = val_115[2];
    return var_pos_11610;
});
var step = (function(val_117) {
    let var_m_11811 = val_117[1];
    let var_pos_11912 = val_117[2];
    let var_dir_12013 = val_117[3];
    let ndir14 = next_dir(pipe_at(var_m_11811, var_pos_11912), var_dir_12013);
    return Inst(var_m_11811, step_pos(var_pos_11912, ndir14), ndir14);
});
var next_dir = (function(c, dir) {
    if (_PLUS_.is(c, "-")) {
        let val_12115 = dir;
        let spec_12216 = ({
            3: (function() {
                return Left;
            }),
            4: (function() {
                return Right;
            })
        });
        return (spec_12216[val_12115[1]] || spec_12216[0])();
    } else {
        if (_PLUS_.is(c, "7")) {
            let val_12317 = dir;
            let spec_12418 = ({
                1: (function() {
                    return Left;
                }),
                4: (function() {
                    return Down;
                })
            });
            return (spec_12418[val_12317[1]] || spec_12418[0])();
        } else {
            if (_PLUS_.is(c, "|")) {
                let val_12519 = dir;
                let spec_12620 = ({
                    1: (function() {
                        return Up;
                    }),
                    2: (function() {
                        return Down;
                    })
                });
                return (spec_12620[val_12519[1]] || spec_12620[0])();
            } else {
                if (_PLUS_.is(c, "J")) {
                    let val_12721 = dir;
                    let spec_12822 = ({
                        2: (function() {
                            return Left;
                        }),
                        4: (function() {
                            return Up;
                        })
                    });
                    return (spec_12822[val_12721[1]] || spec_12822[0])();
                } else {
                    if (_PLUS_.is(c, "L")) {
                        let val_12923 = dir;
                        let spec_13024 = ({
                            2: (function() {
                                return Right;
                            }),
                            3: (function() {
                                return Up;
                            })
                        });
                        return (spec_13024[val_12923[1]] || spec_13024[0])();
                    } else {
                        if (_PLUS_.is(c, "F")) {
                            let val_13125 = dir;
                            let spec_13226 = ({
                                1: (function() {
                                    return Right;
                                }),
                                3: (function() {
                                    return Down;
                                })
                            });
                            return (spec_13226[val_13125[1]] || spec_13226[0])();
                        } else {
                            return undefined;
                        }
                    }
                }
            }
        }
    }
});
var parse_input = (function(input) {
    let m27 = _PLUS_.fmap((function(_anon_PERCENT_1_42) {
        return lib.strsplit(_anon_PERCENT_1_42, "");
    }), lib.strsplit(input, "\n"));
    return [m27, Inst(m27, INITIAL_POS, INITIAL_DIR)];
});
var start_QMARK_ = (function(val_133) {
    let var_m_13428 = val_133[1];
    let var_pos_13529 = val_133[2];
    return _PLUS_.is("S", pipe_at(var_m_13428, var_pos_13529, true));
});
var part1 = (function(input) {
    let vec__3033 = parse_input(input);
    let m34 = vec__3033[0];
    let initial35 = vec__3033[1];
    let inst36 = step(initial35);
    let steps37 = 1;
    while (true) {
        if (start_QMARK_(inst36)) {
            return _PLUS_.floor((steps37 / 2));
        } else {
            let G__38 = step(inst36);
            let G__39 = (1 + steps37);
            inst36 = G__38;
            steps37 = G__39;
            continue;
        };
        break;
    }

});
var init_matrix = (function(rows, cols, init) {
    let res40 = _PLUS_.Vec();
    let y41 = 0;
    while (true) {
        if ((y41 < cols)) {
            let row42 = _PLUS_.Vec();
            let x43 = 0;
            while (true) {
                if ((x43 < rows)) {
                    _PLUS_.push(row42, init);
                    let G__44 = (x43 + 1);
                    x43 = G__44;
                    continue;
                };
                break;
            };
            _PLUS_.push(res40, row42);
            let G__45 = (y41 + 1);
            y41 = G__45;
            continue;
        };
        break;
    };
    return res40;
});
var inflate_char = (function(c) {
    if (_PLUS_.is(c, "-")) {
        return ["...", "---", "..."];
    } else {
        if (_PLUS_.is(c, "7")) {
            return ["...", "-7.", ".|."];
        } else {
            if (_PLUS_.is(c, "|")) {
                return [".|.", ".|.", ".|."];
            } else {
                if (_PLUS_.is(c, "J")) {
                    return [".|.", "-J.", "..."];
                } else {
                    if (_PLUS_.is(c, "L")) {
                        return [".|.", ".L-", "..."];
                    } else {
                        if (_PLUS_.is(c, "F")) {
                            return ["...", ".F-", ".|."];
                        } else {
                            return undefined;
                        }
                    }
                }
            }
        }
    }
});
var set_at_pos = (function(src, val_136, v) {
    let var_y_13746 = val_136[2];
    let var_x_13847 = val_136[1];
    return _PLUS_.put(_PLUS_.at_BANG_(src, var_y_13746), var_x_13847, v);
});
var get_at_pos = (function(src, val_139) {
    let var_y_14048 = val_139[2];
    let var_x_14149 = val_139[1];
    return _PLUS_.at_BANG_(_PLUS_.at_BANG_(src, var_y_14048), var_x_14149);
});
var inflate = (function(val_142, src, dst) {
    let var_y_14350 = val_142[2];
    let var_x_14451 = val_142[1];
    let grid52 = inflate_char(pipe_at(src, val_142));
    let put53 = (function(x, y) {
        return _PLUS_.put(_PLUS_.at_BANG_(dst, (y + (3 * var_y_14350))), (x + (3 * var_x_14451)), grid52[y][x]);
    });
    return _PLUS_.for$(_PLUS_.Vec(0, 1, 2), (function(x) {
        put53(x, 0);
        put53(x, 1);
        return put53(x, 2);
    }));
});
var fill_unenclosed = (function(expanded, checked, enclosed) {
    let stack54 = [
        [0, 0]
    ];
    while (true) {
        if ((stack54["length"] > 0)) {
            let vec__5558 = stack54.pop();
            let x59 = vec__5558[0];
            let y60 = vec__5558[1];
            let pos61 = Pos(x59, y60);
            if (((x59 >= 0) && (y60 >= 0) && (x59 < _PLUS_.size(_PLUS_.at_BANG_(expanded, 0))) && (y60 < _PLUS_.size(expanded)) && !get_at_pos(checked, pos61))) {
                set_at_pos(checked, pos61, true);
                if (_PLUS_.is(".", get_at_pos(expanded, pos61))) {
                    set_at_pos(enclosed, Pos(_PLUS_.floor((x59 / 3)), _PLUS_.floor((y60 / 3))), false);
                    stack54.push([x59, (y60 + 1)]);
                    stack54.push([x59, (y60 - 1)]);
                    stack54.push([(x59 + 1), y60]);
                    stack54.push([(x59 - 1), y60])
                }
            };
            let G__62 = stack54;
            stack54 = G__62;
            continue;
        };
        break;
    }

});
var part2 = (function(input) {
    let vec__6366 = parse_input(input);
    let m67 = vec__6366[0];
    let initial68 = vec__6366[1];
    let h69 = _PLUS_.size(m67);
    let w70 = _PLUS_.size(_PLUS_.at_BANG_(m67, 0));
    let expanded71 = init_matrix((3 * w70), (3 * h69), ".");
    let checked72 = init_matrix((3 * w70), (3 * h69), false);
    let enclosed73 = init_matrix(w70, h69, true);
    let inst74 = step(initial68);
    while (true) {
        set_at_pos(enclosed73, inst_pos(inst74), false);
        inflate(inst_pos(inst74), m67, expanded71);
        if (!start_QMARK_(inst74)) {
            let G__75 = step(inst74);
            inst74 = G__75;
            continue;
        };
        break;
    };
    fill_unenclosed(expanded71, checked72, enclosed73, Pos(0, 0));
    return _PLUS_.reduce((function(_anon_PERCENT_1_43, _anon_PERCENT_2_44) {
        return _PLUS_.reduce((function(acc, b) {
            return (acc + ((b) ? (1) : (0)));
        }), _anon_PERCENT_1_43, _anon_PERCENT_2_44);
    }), 0, enclosed73);
});
var inspectGrid = (function(input) {
    let m76 = _PLUS_.fmap((function(_anon_PERCENT_1_45) {
        return lib.strsplit(_anon_PERCENT_1_45, "");
    }), lib.strsplit(input, "\n"));
    let i77 = 0;
    while (true) {
        if ((i77 < _PLUS_.size(m76))) {
            let j78 = 0;
            while (true) {
                if ((j78 < _PLUS_.size(_PLUS_.at_BANG_(m76, i77)))) {
                    if (_PLUS_.is("S", _PLUS_.at_BANG_(_PLUS_.at_BANG_(m76, i77), j78))) {
                        _PLUS_.log("I", i77, "J", j78);
                        _PLUS_.log(_PLUS_.str(" ", _PLUS_.at_BANG_(_PLUS_.at_BANG_(m76, (i77 - 1)), j78)));
                        _PLUS_.log(_PLUS_.str(_PLUS_.at_BANG_(_PLUS_.at_BANG_(m76, i77), (j78 - 1)), "?", _PLUS_.at_BANG_(_PLUS_.at_BANG_(m76, i77), (j78 + 1))));
                        _PLUS_.log(_PLUS_.str(" ", _PLUS_.at_BANG_(_PLUS_.at_BANG_(m76, (i77 + 1)), j78)))
                    } else {
                        let G__79 = (1 + j78);
                        j78 = G__79;
                        continue;
                    }
                };
                break;
            };
            let G__80 = (1 + i77);
            i77 = G__80;
            continue;
        };
        break;
    }

});

export {
    Inst,
    Left,
    get_at_pos,
    inflate_char,
    inflate,
    InstT,
    part2,
    Pos,
    next_dir,
    Down,
    pipe_at,
    start_QMARK_,
    parse_input,
    inst_pos,
    part1,
    TRUE_S_CHAR,
    fill_unenclosed,
    INITIAL_POS,
    inspectGrid,
    init_matrix,
    PosT,
    INITIAL_DIR,
    DirT,
    Up,
    step_pos,
    Right,
    set_at_pos,
    step
}
