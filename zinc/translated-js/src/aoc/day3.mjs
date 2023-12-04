import * as lib from './lib.mjs';import * as _PLUS_ from './../+.mjs';
_PLUS_.qt_store[14] = "SchemaNumberT";
_PLUS_.bury(_PLUS_.prop_store, [14, undefined], ({ 0: ({ "idname": "value", "fullname": "%value", "ind": 0 }), 1: ({ "idname": "part-number?", "fullname": "%part-number?", "ind": 1 }) }));
var SchemaNumberT = 14
;
var SchemaNumber = (function (value) {
return [14, value, false];
})
;
var value = (function (val_46) {
let var_value_471 = val_46[1];
return var_value_471;
})
;
var part_number_QMARK_ = (function (val_48) {
let var_part_number_QMARK__492 = val_48[2];
return var_part_number_QMARK__492;
})
;
var accept_part_number = (function (schema_number) {
return [14, value(schema_number), true];
})
;
_PLUS_.qt_store[15] = "TokenT";
_PLUS_.bury(_PLUS_.prop_store, [15, 1], ({ 0: ({ "idname": "+", "fullname": "%+", "ind": 0 }), 1: ({ "idname": "d", "fullname": "%d", "ind": 1 }) }));
_PLUS_.bury(_PLUS_.prop_store, [15, 2], ({ 0: ({ "idname": "+", "fullname": "%+", "ind": 0 }), 1: ({ "idname": "s", "fullname": "%s", "ind": 1 }) }));
_PLUS_.bury(_PLUS_.prop_store, [15, 3], ({ 0: ({ "idname": "+", "fullname": "%+", "ind": 0 }) }));
_PLUS_.bury(_PLUS_.variant_store, [15, 1], "Digit");
_PLUS_.bury(_PLUS_.variant_store, [15, 2], "Symbol");
_PLUS_.bury(_PLUS_.variant_store, [15, 3], "Dot");
var TokenT = 15
;
var Digit = (function (d) {
return [15, 1, d];
})
;
var Symbol = (function (s) {
return [15, 2, s];
})
;
var Dot = [15, 3]
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
let token_grid5 = _PLUS_.fmap((function (_anon_PERCENT_1_15) {
return _PLUS_.fmap(classify, lib.strsplit(_anon_PERCENT_1_15, ""));
}), lib.strsplit(input, "\n"));
let schema_number_id_grid6 = _PLUS_.fmap((function (_anon_PERCENT_1_16) {
return _PLUS_.fmap((function () {
return _PLUS_.None;
}), _anon_PERCENT_1_16);
}), token_grid5);
let schema_numbers7 = _PLUS_.Vec();
let init_schema_number8 = (function (_anon_PERCENT_1_17) {
if ((_anon_PERCENT_1_17 > 0)) {
return _PLUS_.put(schema_numbers7, _PLUS_.size(schema_numbers7), SchemaNumber(_anon_PERCENT_1_17));}
});
let add_neighbor9 = (function (neighbors, i, j) {
return (function (_anon_PERCENT_1_19, _anon_PERCENT_2_18) {
return _PLUS_.bind(_anon_PERCENT_2_18, _anon_PERCENT_1_19);
})(_PLUS_.at(schema_number_id_grid6, i), (function (row) {
return (function (_anon_PERCENT_1_21, _anon_PERCENT_2_20) {
return _PLUS_.bind(_anon_PERCENT_2_20, _anon_PERCENT_1_21);
})(_PLUS_.at(row, j), (function (mschema_number_id) {
return (function (_anon_PERCENT_1_23, _anon_PERCENT_2_22) {
return _PLUS_.bind(_anon_PERCENT_2_22, _anon_PERCENT_1_23);
})(mschema_number_id, (function (schema_number_id) {
return (function (_anon_PERCENT_1_25, _anon_PERCENT_2_24) {
return _PLUS_.bind(_anon_PERCENT_2_24, _anon_PERCENT_1_25);
})(_PLUS_.at(schema_numbers7, schema_number_id), (function (schema_number) {
return _PLUS_.put(neighbors, schema_number_id, schema_number);
}));
}));
}));
}));
});
_PLUS_.each((function (row, i) {
return init_schema_number8(_PLUS_.reduce((function (acc, val_50, j) {
let val_5110 = val_50;
let spec_5211 = ({ 1: (function () {
let var_d_5312 = val_5110[2];
let next13 = ((10 * acc) + var_d_5312);
if ((next13 > 0)) {
put_in(schema_number_id_grid6, i, j, _PLUS_.Just(_PLUS_.size(schema_numbers7)))};
return next13;
}), 0: (function () {
init_schema_number8(acc);
return 0;
}) });
return (spec_5211[val_5110[1]] || spec_5211[0])();
}), 0, row));
}), token_grid5);
_PLUS_.each((function (row, i) {
return _PLUS_.each((function (val_54, j) {
let val_5514 = val_54;
let spec_5615 = ({ 2: (function () {
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
}), 0: (function () {
return undefined;
}) });
return (spec_5615[val_5514[1]] || spec_5615[0])();
}), row);
}), token_grid5);
return schema_numbers7;
})
;
var part1 = (function (input) {
return _PLUS_.reduce((function (_anon_PERCENT_1_28, _anon_PERCENT_2_29) {
return (_anon_PERCENT_1_28 + _anon_PERCENT_2_29);
}), 0, _PLUS_.fmap(value, _PLUS_.filter(part_number_QMARK_, process_grid(input, (function (neighbors, schema_nums) {
return _PLUS_.each((function (_anon_PERCENT_1_27, _anon_PERCENT_2_26) {
return _PLUS_.put(schema_nums, _anon_PERCENT_2_26, accept_part_number(_anon_PERCENT_1_27));
}), neighbors);
})))));
})
;
var part2 = (function (input) {
let sum_ref17 = {r:0};
process_grid(input, (function (neighbors) {
if (_PLUS_.is(2, _PLUS_.size(neighbors))) {
return (sum_ref17.r = (sum_ref17["r"] + _PLUS_.reduce((function (_anon_PERCENT_1_30, _anon_PERCENT_2_31) {
return (_anon_PERCENT_1_30 * value(_anon_PERCENT_2_31));
}), 1, neighbors)));}
}));
return sum_ref17["r"];
})
;

export { Symbol, accept_part_number, SchemaNumberT, part2, TokenT, process_grid, value, classify, Dot, part1, Digit, put_in, SchemaNumber, part_number_QMARK_ }
