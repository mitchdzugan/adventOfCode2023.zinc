import * as lib from './lib.mjs';import * as _PLUS_ from './../+.mjs';
_PLUS_.qt_store[12] = "CubeNumsT";
_PLUS_.bury(_PLUS_.prop_store, [12, undefined], ({ 0: ({ "idname": "red", "fullname": "%red", "ind": 0, "type": _PLUS_.NumT }), 1: ({ "idname": "green", "fullname": "%green", "ind": 1, "type": _PLUS_.NumT }), 2: ({ "idname": "blue", "fullname": "%blue", "ind": 2, "type": _PLUS_.NumT }) }));
var CubeNumsT = 12
;
var CubeNums = (function (red, green, blue) {
return [12, red, green, blue];
})
;
_PLUS_.qt_store[13] = "GameT";
_PLUS_.bury(_PLUS_.prop_store, [13, undefined], ({ 0: ({ "idname": "id", "fullname": "%id", "ind": 0 }), 1: ({ "idname": "rounds", "fullname": "%rounds", "ind": 1, "type": [_PLUS_.VecT, CubeNumsT] }) }));
var GameT = 13
;
var cubes_power = (function (val_22) {
let var_red_231 = val_22[1];
let var_green_242 = val_22[2];
let var_blue_253 = val_22[3];
return (var_red_231 * var_green_242 * var_blue_253);
})
;
var addColorValFromColorStr = (function (colorVals, _colorStr) {
let colorStr7 = _colorStr.trim();
let vec__48 = colorStr7.split(" ");
let colorValStr9 = vec__48[0];
let color10 = vec__48[1];
let colorVal11 = parseInt(colorValStr9, 10);
return _PLUS_.put(colorVals, color10, colorVal11);
})
;
var parse_round = (function (_roundStr) {
let roundStr12 = _roundStr.trim();
let colorVals13 = _PLUS_.Map();
let colorStrs14 = lib.strsplit(roundStr12, ",");
_PLUS_.each((function (_anon_PERCENT_1_18) {
return addColorValFromColorStr(colorVals13, _anon_PERCENT_1_18);
}), colorStrs14);
return CubeNums(_PLUS_.or(0, _PLUS_.at(colorVals13, "red")), _PLUS_.or(0, _PLUS_.at(colorVals13, "green")), _PLUS_.or(0, _PLUS_.at(colorVals13, "blue")));
})
;
var parse_game = (function (line) {
let vec__1521 = line.split(":");
let idStr22 = vec__1521[0];
let roundsStr23 = vec__1521[1];
let vec__1824 = idStr22.split(" ");
let _game_25 = vec__1824[0];
let idValStr26 = vec__1824[1];
let id27 = parseInt(idValStr26, 10);
let roundStrs28 = lib.strsplit(roundsStr23, ";");
let rounds29 = _PLUS_.fmap(parse_round, roundStrs28);
return [13, id27, rounds29];
})
;
var all_cubes = CubeNums(12, 13, 14)
;
var valid_round_QMARK_ = (function (val_26) {
let var_red_2730 = val_26[1];
let var_green_2831 = val_26[2];
let var_blue_2932 = val_26[3];
let var_red_3033 = all_cubes[1];
let var_green_3134 = all_cubes[2];
let var_blue_3235 = all_cubes[3];
return ((var_red_2730 <= var_red_3033) && (var_green_2831 <= var_green_3134) && (var_blue_2932 <= var_blue_3235));
})
;
var valid_game_QMARK_ = (function (val_33) {
let var_rounds_3436 = val_33[2];
return _PLUS_.reduce((function (_anon_PERCENT_1_19, _anon_PERCENT_2_20) {
return (_anon_PERCENT_1_19 && valid_round_QMARK_(_anon_PERCENT_2_20));
}), true, var_rounds_3436);
})
;
var to_games = (function (input) {
return _PLUS_.fmap(parse_game, _PLUS_.filter((function (_anon_PERCENT_1_21) {
return !_PLUS_.is("", _anon_PERCENT_1_21.trim());
}), lib.strsplit(input, "\n")));
})
;
var part1 = (function (input) {
return _PLUS_.reduce((function (_anon_PERCENT_1_22, _anon_PERCENT_2_23) {
return (_anon_PERCENT_1_22 + _anon_PERCENT_2_23);
}), 0, _PLUS_.fmap((function (val_35) {
let var_id_3637 = val_35[1];
return var_id_3637;
}), _PLUS_.filter(valid_game_QMARK_, to_games(input))));
})
;
var update_min_cubes = (function (acc, val_37) {
let var_red_3838 = val_37[1];
let var_green_3939 = val_37[2];
let var_blue_4040 = val_37[3];
let var_red_4141 = acc[1];
let var_green_4242 = acc[2];
let var_blue_4343 = acc[3];
let red44 = Math.max(var_red_4141, var_red_3838);
let green45 = Math.max(var_green_4242, var_green_3939);
let blue46 = Math.max(var_blue_4343, var_blue_4040);
return CubeNums(red44, green45, blue46);
})
;
var min_cubes = (function (val_44) {
let var_rounds_4547 = val_44[2];
return _PLUS_.reduce(update_min_cubes, CubeNums(0, 0, 0), var_rounds_4547);
})
;
var part2 = (function (input) {
return _PLUS_.reduce((function (_anon_PERCENT_1_24, _anon_PERCENT_2_25) {
return (_anon_PERCENT_1_24 + _anon_PERCENT_2_25);
}), 0, _PLUS_.fmap(cubes_power, _PLUS_.fmap(min_cubes, to_games(input))));
})
;

export { parse_game, min_cubes, part2, all_cubes, valid_round_QMARK_, part1, CubeNums, CubeNumsT, to_games, addColorValFromColorStr, cubes_power, update_min_cubes, parse_round, valid_game_QMARK_, GameT }
