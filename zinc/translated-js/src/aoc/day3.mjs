import * as lib from './lib.mjs';
import * as _PLUS_ from './../+.mjs';
undefined;
var SchemaNumberT = 25;
var SchemaNumber = (function(value) {
    return [25, value, false];
});
var value = (function(val_96) {
    let var_value_971 = val_96[1];
    return var_value_971;
});
var part_number_QMARK_ = (function(val_98) {
    let var_part_number_QMARK__992 = val_98[2];
    return var_part_number_QMARK__992;
});
var accept_part_number = (function(schema_number) {
    return [25, value(schema_number), true];
});
undefined;
var TokenT = 26;
var Digit = (function(d) {
    return [26, 1, d];
});
var Symbol = (function(s) {
    return [26, 2, s];
});
var Dot = [26, 3];
var classify = (function(c) {
    if (_PLUS_.is(c, ".")) {
        return Dot;
    } else {
        let d3 = lib.parseInt(c);
        if (((d3 >= 0) && (d3 < 10))) {
            return Digit(d3);
        } else {
            return Symbol(c);
        }
    }
});
var put_in = (function(v2d, i, j, v) {
    let row4 = _PLUS_.or(_PLUS_.Vec(), _PLUS_.at(v2d, i));
    return _PLUS_.put(row4, j, v);
});
var process_grid = (function(input, handle_symbol_neighbors) {
    let token_grid5 = _PLUS_.fmap((function(_anon_PERCENT_1_46) {
        return _PLUS_.fmap(classify, lib.strsplit(_anon_PERCENT_1_46, ""));
    }), lib.strsplit(input, "\n"));
    let schema_number_id_grid6 = _PLUS_.fmap((function(_anon_PERCENT_1_47) {
        return _PLUS_.fmap((function() {
            return _PLUS_.None;
        }), _anon_PERCENT_1_47);
    }), token_grid5);
    let schema_numbers7 = _PLUS_.Vec();
    let init_schema_number8 = (function(_anon_PERCENT_1_48) {
        if ((_anon_PERCENT_1_48 > 0)) {
            return _PLUS_.put(schema_numbers7, _PLUS_.size(schema_numbers7), SchemaNumber(_anon_PERCENT_1_48));
        }
    });
    let add_neighbor9 = (function(neighbors, i, j) {
        return (function(_anon_PERCENT_1_50, _anon_PERCENT_2_49) {
            return _PLUS_.bind(_anon_PERCENT_2_49, _anon_PERCENT_1_50);
        })(_PLUS_.at(schema_number_id_grid6, i), (function(row) {
            return (function(_anon_PERCENT_1_52, _anon_PERCENT_2_51) {
                return _PLUS_.bind(_anon_PERCENT_2_51, _anon_PERCENT_1_52);
            })(_PLUS_.at(row, j), (function(mschema_number_id) {
                return (function(_anon_PERCENT_1_54, _anon_PERCENT_2_53) {
                    return _PLUS_.bind(_anon_PERCENT_2_53, _anon_PERCENT_1_54);
                })(mschema_number_id, (function(schema_number_id) {
                    return (function(_anon_PERCENT_1_56, _anon_PERCENT_2_55) {
                        return _PLUS_.bind(_anon_PERCENT_2_55, _anon_PERCENT_1_56);
                    })(_PLUS_.at(schema_numbers7, schema_number_id), (function(schema_number) {
                        return _PLUS_.put(neighbors, schema_number_id, schema_number);
                    }));
                }));
            }));
        }));
    });
    _PLUS_.each((function(row, i) {
        return init_schema_number8(_PLUS_.reduce((function(acc, val_100, j) {
            let val_10110 = val_100;
            let spec_10211 = ({
                1: (function() {
                    let var_d_10312 = val_10110[2];
                    let next13 = ((10 * acc) + var_d_10312);
                    if ((next13 > 0)) {
                        put_in(schema_number_id_grid6, i, j, _PLUS_.Just(_PLUS_.size(schema_numbers7)))
                    };
                    return next13;
                }),
                0: (function() {
                    init_schema_number8(acc);
                    return 0;
                })
            });
            return (spec_10211[val_10110[1]] || spec_10211[0])();
        }), 0, row));
    }), token_grid5);
    _PLUS_.each((function(row, i) {
        return _PLUS_.each((function(val_104, j) {
            let val_10514 = val_104;
            let spec_10615 = ({
                2: (function() {
                    let neighbors16 = _PLUS_.Map();
                    add_neighbor9(neighbors16, _PLUS_.dec(i), _PLUS_.dec(j));
                    add_neighbor9(neighbors16, _PLUS_.dec(i), _PLUS_.id(j));
                    add_neighbor9(neighbors16, _PLUS_.dec(i), _PLUS_.inc(j));
                    add_neighbor9(neighbors16, _PLUS_.id(i), _PLUS_.dec(j));
                    add_neighbor9(neighbors16, _PLUS_.id(i), _PLUS_.inc(j));
                    add_neighbor9(neighbors16, _PLUS_.inc(i), _PLUS_.dec(j));
                    add_neighbor9(neighbors16, _PLUS_.inc(i), _PLUS_.id(j));
                    add_neighbor9(neighbors16, _PLUS_.inc(i), _PLUS_.inc(j));
                    return handle_symbol_neighbors(neighbors16, schema_numbers7);
                }),
                0: (function() {
                    return undefined;
                })
            });
            return (spec_10615[val_10514[1]] || spec_10615[0])();
        }), row);
    }), token_grid5);
    return schema_numbers7;
});
var part1 = (function(input) {
    return _PLUS_.reduce((function(_anon_PERCENT_1_59, _anon_PERCENT_2_60) {
        return (_anon_PERCENT_1_59 + _anon_PERCENT_2_60);
    }), 0, _PLUS_.fmap(value, _PLUS_.filter(part_number_QMARK_, process_grid(input, (function(neighbors, schema_nums) {
        return _PLUS_.each((function(_anon_PERCENT_1_58, _anon_PERCENT_2_57) {
            return _PLUS_.put(schema_nums, _anon_PERCENT_2_57, accept_part_number(_anon_PERCENT_1_58));
        }), neighbors);
    })))));
});
var part2 = (function(input) {
    let sum_ref17 = {
        r: 0
    };
    process_grid(input, (function(neighbors) {
        if (_PLUS_.is(2, _PLUS_.size(neighbors))) {
            return (sum_ref17.r = (sum_ref17["r"] + _PLUS_.reduce((function(_anon_PERCENT_1_61, _anon_PERCENT_2_62) {
                return (_anon_PERCENT_1_61 * value(_anon_PERCENT_2_62));
            }), 1, neighbors)));
        }
    }));
    return sum_ref17["r"];
});

export {
    Symbol,
    accept_part_number,
    SchemaNumberT,
    part2,
    TokenT,
    process_grid,
    value,
    classify,
    Dot,
    part1,
    Digit,
    put_in,
    SchemaNumber,
    part_number_QMARK_
}
