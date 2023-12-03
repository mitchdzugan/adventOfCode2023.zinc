import * as lib from './lib.mjs';import * as _PLUS_ from './../+.mjs';
_PLUS_.qt_store[18] = "CubeNumsT";
_PLUS_.bury(_PLUS_.prop_store, [18, undefined], ({ 0: ({ "idname": "red", "fullname": "%red", "ind": 0, "type": _PLUS_.NumT }), 1: ({ "idname": "green", "fullname": "%green", "ind": 1, "type": _PLUS_.NumT }), 2: ({ "idname": "blue", "fullname": "%blue", "ind": 2, "type": _PLUS_.NumT }) }));
var CubeNumsT = 18
;
var CubeNums = (function (red, green, blue) {
return [18, red, green, blue];
})
;
_PLUS_.qt_store[22] = "SchemaNumberT";
_PLUS_.bury(_PLUS_.prop_store, [22, undefined], ({ 0: ({ "idname": "value", "fullname": "%value", "ind": 0 }), 1: ({ "idname": "part-number?", "fullname": "%part-number?", "ind": 1 }) }));
var SchemaNumberT = 22
;
var SchemaNumber = (function (value) {
return [22, value, false];
})
;
var value = (function (val_1) {
let var_value_21 = val_1[1];
return var_value_21;
})
;
var part_number_QMARK_ = (function (val_3) {
let var_part_number_QMARK__42 = val_3[2];
return var_part_number_QMARK__42;
})
;
var accept_part_number = (function (schema_number) {
return [22, value(schema_number), true];
})
;
_PLUS_.qt_store[19] = "GameT";
_PLUS_.bury(_PLUS_.prop_store, [19, undefined], ({ 0: ({ "idname": "id", "fullname": "%id", "ind": 0 }), 1: ({ "idname": "rounds", "fullname": "%rounds", "ind": 1, "type": [_PLUS_.VecT, CubeNumsT] }) }));
var GameT = 19
;
_PLUS_.qt_store[20] = "TokenT";
_PLUS_.bury(_PLUS_.prop_store, [20, 1], ({ 0: ({ "idname": "+", "fullname": "%+", "ind": 0 }), 1: ({ "idname": "d", "fullname": "%d", "ind": 1 }) }));
_PLUS_.bury(_PLUS_.prop_store, [20, 2], ({ 0: ({ "idname": "+", "fullname": "%+", "ind": 0 }), 1: ({ "idname": "s", "fullname": "%s", "ind": 1 }) }));
_PLUS_.bury(_PLUS_.prop_store, [20, 3], ({ 0: ({ "idname": "+", "fullname": "%+", "ind": 0 }) }));
_PLUS_.bury(_PLUS_.variant_store, [20, 1], "Digit");
_PLUS_.bury(_PLUS_.variant_store, [20, 2], "Symbol");
_PLUS_.bury(_PLUS_.variant_store, [20, 3], "Dot");
var TokenT = 20
;
var Digit = (function (d) {
return [20, 1, d];
})
;
var Symbol = (function (s) {
return [20, 2, s];
})
;
var Dot = [20, 3]
;
var classify = (function (c) {
if (_PLUS_.is(c, ".")) {
return Dot;} else {
let d3 = parseInt(c, 10);
if (((d3 >= 0) && (d3 < 10))) {
return Digit(d3);} else {
return Symbol(c);}}
})
;
var put_in = (function (v2d, i, j, v) {
let row4 = _PLUS_.or(_PLUS_.Vec(), _PLUS_.at(v2d, i));
return _PLUS_.put(row4, j, v);
})
;
var process_grid = (function (input, handle_symbol_neighbors) {
let token_grid5 = _PLUS_.fmap((function (_anon_PERCENT_1_1) {
return _PLUS_.fmap(classify, lib.strsplit(_anon_PERCENT_1_1, ""));
}), lib.strsplit(input, "\n"));
let schema_number_id_grid6 = _PLUS_.fmap((function (_anon_PERCENT_1_2) {
return _PLUS_.fmap((function () {
return _PLUS_.None;
}), _anon_PERCENT_1_2);
}), token_grid5);
let schema_numbers7 = _PLUS_.Vec();
let add_neighbor8 = (function (neighbors, i, j) {
return (function (_anon_PERCENT_1_4, _anon_PERCENT_2_3) {
return _PLUS_.bind(_anon_PERCENT_2_3, _anon_PERCENT_1_4);
})(_PLUS_.at(schema_number_id_grid6, i), (function (row) {
return (function (_anon_PERCENT_1_6, _anon_PERCENT_2_5) {
return _PLUS_.bind(_anon_PERCENT_2_5, _anon_PERCENT_1_6);
})(_PLUS_.at(row, j), (function (mschema_number_id) {
return (function (_anon_PERCENT_1_8, _anon_PERCENT_2_7) {
return _PLUS_.bind(_anon_PERCENT_2_7, _anon_PERCENT_1_8);
})(mschema_number_id, (function (schema_number_id) {
return (function (_anon_PERCENT_1_10, _anon_PERCENT_2_9) {
return _PLUS_.bind(_anon_PERCENT_2_9, _anon_PERCENT_1_10);
})(_PLUS_.at(schema_numbers7, schema_number_id), (function (schema_number) {
return _PLUS_.put(neighbors, schema_number_id, schema_number);
}));
}));
}));
}));
});
let init_schema_number9 = (function (_anon_PERCENT_1_11) {
if ((_anon_PERCENT_1_11 > 0)) {
return _PLUS_.put(schema_numbers7, _PLUS_.size(schema_numbers7), SchemaNumber(_anon_PERCENT_1_11));}
});
_PLUS_.each((function (row, i) {
let ending10 = _PLUS_.reduce((function (acc, val_5, j) {
let val_611 = val_5;
let spec_712 = ({ 1: (function () {
let var_d_813 = val_611[2];
let next14 = ((10 * acc) + var_d_813);
if ((next14 > 0)) {
put_in(schema_number_id_grid6, i, j, _PLUS_.Just(_PLUS_.size(schema_numbers7)))};
return next14;
}), 0: (function () {
init_schema_number9(acc);
return 0;
}) });
return (spec_712[val_611[1]] || spec_712[0])();
}), 0, row);
return init_schema_number9(ending10);
}), token_grid5);
_PLUS_.each((function (row, i) {
return _PLUS_.each((function (val_9, j) {
let val_1015 = val_9;
let spec_1116 = ({ 2: (function () {
let neighbors17 = _PLUS_.Map();
add_neighbor8(neighbors17, _PLUS_.dec(i), _PLUS_.dec(j));
add_neighbor8(neighbors17, _PLUS_.dec(i), _PLUS_.id(j));
add_neighbor8(neighbors17, _PLUS_.dec(i), _PLUS_.inc(j));
add_neighbor8(neighbors17, _PLUS_.id(i), _PLUS_.dec(j));
add_neighbor8(neighbors17, _PLUS_.id(i), _PLUS_.inc(j));
add_neighbor8(neighbors17, _PLUS_.inc(i), _PLUS_.dec(j));
add_neighbor8(neighbors17, _PLUS_.inc(i), _PLUS_.id(j));
add_neighbor8(neighbors17, _PLUS_.inc(i), _PLUS_.inc(j));
return handle_symbol_neighbors(neighbors17, schema_numbers7);
}), 0: (function () {
return undefined;
}) });
return (spec_1116[val_1015[1]] || spec_1116[0])();
}), row);
}), token_grid5);
return schema_numbers7;
})
;
var part1 = (function (input) {
return _PLUS_.reduce((function (_anon_PERCENT_1_14, _anon_PERCENT_2_15) {
return (_anon_PERCENT_1_14 + _anon_PERCENT_2_15);
}), 0, _PLUS_.fmap(value, _PLUS_.filter(part_number_QMARK_, process_grid(input, (function (neighbors, schema_nums) {
return _PLUS_.each((function (_anon_PERCENT_1_13, _anon_PERCENT_2_12) {
return _PLUS_.put(schema_nums, _anon_PERCENT_2_12, accept_part_number(_anon_PERCENT_1_13));
}), neighbors);
})))));
})
;
var part2 = (function (input) {
let gear_ratio_sum_ref18 = [0];
let get_gear_ratio_sum19 = (function () {
return gear_ratio_sum_ref18[0];
});
let add_gear_ratio20 = (function (_anon_PERCENT_1_16) {
return gear_ratio_sum_ref18[0] = (get_gear_ratio_sum19() + _anon_PERCENT_1_16);
});
process_grid(input, (function (neighbors) {
if (_PLUS_.is(2, _PLUS_.size(neighbors))) {
return add_gear_ratio20(_PLUS_.reduce((function (_anon_PERCENT_1_17, _anon_PERCENT_2_18) {
return (_anon_PERCENT_1_17 * value(_anon_PERCENT_2_18));
}), 1, neighbors));}
}));
return get_gear_ratio_sum19();
})
;
var solve = (function () {
let input21 = lib.getInput(3);
return lib.Solution(part1(input21), part2(input21));
})
;

export { Symbol, solve, accept_part_number, SchemaNumberT, part2, TokenT, process_grid, value, classify, Dot, part1, CubeNums, Digit, CubeNumsT, put_in, SchemaNumber, GameT, part_number_QMARK_ }
