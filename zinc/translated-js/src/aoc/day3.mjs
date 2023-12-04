import * as lib from './lib.mjs';import * as _PLUS_ from './../+.mjs';
_PLUS_.qt_store[16] = "SchemaNumberT";
_PLUS_.bury(_PLUS_.prop_store, [16, undefined], ({ 0: ({ "idname": "value", "fullname": "%value", "ind": 0 }), 1: ({ "idname": "part-number?", "fullname": "%part-number?", "ind": 1 }) }));
var SchemaNumberT = 16
;
var SchemaNumber = (function (value) {
return [16, value, false];
})
;
var value = (function (val_48) {
let var_value_491 = val_48[1];
return var_value_491;
})
;
var part_number_QMARK_ = (function (val_50) {
let var_part_number_QMARK__512 = val_50[2];
return var_part_number_QMARK__512;
})
;
var accept_part_number = (function (schema_number) {
return [16, value(schema_number), true];
})
;
_PLUS_.qt_store[17] = "TokenT";
_PLUS_.bury(_PLUS_.prop_store, [17, 1], ({ 0: ({ "idname": "+", "fullname": "%+", "ind": 0 }), 1: ({ "idname": "d", "fullname": "%d", "ind": 1 }) }));
_PLUS_.bury(_PLUS_.prop_store, [17, 2], ({ 0: ({ "idname": "+", "fullname": "%+", "ind": 0 }), 1: ({ "idname": "s", "fullname": "%s", "ind": 1 }) }));
_PLUS_.bury(_PLUS_.prop_store, [17, 3], ({ 0: ({ "idname": "+", "fullname": "%+", "ind": 0 }) }));
_PLUS_.bury(_PLUS_.variant_store, [17, 1], "Digit");
_PLUS_.bury(_PLUS_.variant_store, [17, 2], "Symbol");
_PLUS_.bury(_PLUS_.variant_store, [17, 3], "Dot");
var TokenT = 17
;
var Digit = (function (d) {
return [17, 1, d];
})
;
var Symbol = (function (s) {
return [17, 2, s];
})
;
var Dot = [17, 3]
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
let token_grid5 = _PLUS_.fmap((function (_anon_PERCENT_1_26) {
return _PLUS_.fmap(classify, lib.strsplit(_anon_PERCENT_1_26, ""));
}), lib.strsplit(input, "\n"));
let schema_number_id_grid6 = _PLUS_.fmap((function (_anon_PERCENT_1_27) {
return _PLUS_.fmap((function () {
return _PLUS_.None;
}), _anon_PERCENT_1_27);
}), token_grid5);
let schema_numbers7 = _PLUS_.Vec();
let init_schema_number8 = (function (_anon_PERCENT_1_28) {
if ((_anon_PERCENT_1_28 > 0)) {
return _PLUS_.put(schema_numbers7, _PLUS_.size(schema_numbers7), SchemaNumber(_anon_PERCENT_1_28));}
});
let add_neighbor9 = (function (neighbors, i, j) {
return (function (_anon_PERCENT_1_30, _anon_PERCENT_2_29) {
return _PLUS_.bind(_anon_PERCENT_2_29, _anon_PERCENT_1_30);
})(_PLUS_.at(schema_number_id_grid6, i), (function (row) {
return (function (_anon_PERCENT_1_32, _anon_PERCENT_2_31) {
return _PLUS_.bind(_anon_PERCENT_2_31, _anon_PERCENT_1_32);
})(_PLUS_.at(row, j), (function (mschema_number_id) {
return (function (_anon_PERCENT_1_34, _anon_PERCENT_2_33) {
return _PLUS_.bind(_anon_PERCENT_2_33, _anon_PERCENT_1_34);
})(mschema_number_id, (function (schema_number_id) {
return (function (_anon_PERCENT_1_36, _anon_PERCENT_2_35) {
return _PLUS_.bind(_anon_PERCENT_2_35, _anon_PERCENT_1_36);
})(_PLUS_.at(schema_numbers7, schema_number_id), (function (schema_number) {
return _PLUS_.put(neighbors, schema_number_id, schema_number);
}));
}));
}));
}));
});
_PLUS_.each((function (row, i) {
return init_schema_number8(_PLUS_.reduce((function (acc, val_52, j) {
let val_5310 = val_52;
let spec_5411 = ({ 1: (function () {
let var_d_5512 = val_5310[2];
let next13 = ((10 * acc) + var_d_5512);
if ((next13 > 0)) {
put_in(schema_number_id_grid6, i, j, _PLUS_.Just(_PLUS_.size(schema_numbers7)))};
return next13;
}), 0: (function () {
init_schema_number8(acc);
return 0;
}) });
return (spec_5411[val_5310[1]] || spec_5411[0])();
}), 0, row));
}), token_grid5);
_PLUS_.each((function (row, i) {
return _PLUS_.each((function (val_56, j) {
let val_5714 = val_56;
let spec_5815 = ({ 2: (function () {
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
return (spec_5815[val_5714[1]] || spec_5815[0])();
}), row);
}), token_grid5);
return schema_numbers7;
})
;
var part1 = (function (input) {
return _PLUS_.reduce((function (_anon_PERCENT_1_39, _anon_PERCENT_2_40) {
return (_anon_PERCENT_1_39 + _anon_PERCENT_2_40);
}), 0, _PLUS_.fmap(value, _PLUS_.filter(part_number_QMARK_, process_grid(input, (function (neighbors, schema_nums) {
return _PLUS_.each((function (_anon_PERCENT_1_38, _anon_PERCENT_2_37) {
return _PLUS_.put(schema_nums, _anon_PERCENT_2_37, accept_part_number(_anon_PERCENT_1_38));
}), neighbors);
})))));
})
;
var part2 = (function (input) {
let sum_ref17 = {r:0};
process_grid(input, (function (neighbors) {
if (_PLUS_.is(2, _PLUS_.size(neighbors))) {
return (sum_ref17.r = (sum_ref17["r"] + _PLUS_.reduce((function (_anon_PERCENT_1_41, _anon_PERCENT_2_42) {
return (_anon_PERCENT_1_41 * value(_anon_PERCENT_2_42));
}), 1, neighbors)));}
}));
return sum_ref17["r"];
})
;

export { Symbol, accept_part_number, SchemaNumberT, part2, TokenT, process_grid, value, classify, Dot, part1, Digit, put_in, SchemaNumber, part_number_QMARK_ }
