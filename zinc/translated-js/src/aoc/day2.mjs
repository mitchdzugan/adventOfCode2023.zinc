import * as lib from './lib.mjs';import * as _PLUS_ from './../+.mjs';
_PLUS_.qt_store[18] = "CubeNumsT";
_PLUS_.bury(_PLUS_.prop_store, [18, undefined], ({ 0: ({ "idname": "red", "fullname": "%red", "ind": 0, "type": _PLUS_.NumT }), 1: ({ "idname": "green", "fullname": "%green", "ind": 1, "type": _PLUS_.NumT }), 2: ({ "idname": "blue", "fullname": "%blue", "ind": 2, "type": _PLUS_.NumT }) }));
var CubeNumsT = 18
;
var CubeNums = (function (red, green, blue) {
return [18, red, green, blue];
})
;
_PLUS_.qt_store[19] = "GameT";
_PLUS_.bury(_PLUS_.prop_store, [19, undefined], ({ 0: ({ "idname": "id", "fullname": "%id", "ind": 0 }), 1: ({ "idname": "rounds", "fullname": "%rounds", "ind": 1, "type": [_PLUS_.VecT, CubeNumsT] }) }));
var GameT = 19
;
var cubes_power = (function (val_1) {
let var_red_21 = val_1[1];
let var_green_32 = val_1[2];
let var_blue_43 = val_1[3];
return (var_red_21 * var_green_32 * var_blue_43);
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
_PLUS_.each((function (_anon_PERCENT_1_1) {
return addColorValFromColorStr(colorVals13, _anon_PERCENT_1_1);
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
return [19, id27, rounds29];
})
;
var all_cubes = CubeNums(12, 13, 14)
;
var valid_round_QMARK_ = (function (val_5) {
let var_red_630 = val_5[1];
let var_green_731 = val_5[2];
let var_blue_832 = val_5[3];
let var_red_933 = all_cubes[1];
let var_green_1034 = all_cubes[2];
let var_blue_1135 = all_cubes[3];
return ((var_red_630 <= var_red_933) && (var_green_731 <= var_green_1034) && (var_blue_832 <= var_blue_1135));
})
;
var valid_game_QMARK_ = (function (val_12) {
let var_rounds_1336 = val_12[2];
return _PLUS_.reduce((function (_anon_PERCENT_1_2, _anon_PERCENT_2_3) {
return (_anon_PERCENT_1_2 && valid_round_QMARK_(_anon_PERCENT_2_3));
}), true, var_rounds_1336);
})
;
var to_games = (function (input) {
return _PLUS_.fmap(parse_game, _PLUS_.filter((function (_anon_PERCENT_1_4) {
return !_PLUS_.is("", _anon_PERCENT_1_4.trim());
}), lib.strsplit(input, "\n")));
})
;
var part1 = (function (input) {
return _PLUS_.reduce((function (_anon_PERCENT_1_5, _anon_PERCENT_2_6) {
return (_anon_PERCENT_1_5 + _anon_PERCENT_2_6);
}), 0, _PLUS_.fmap((function (val_14) {
let var_id_1537 = val_14[1];
return var_id_1537;
}), _PLUS_.filter(valid_game_QMARK_, to_games(input))));
})
;
var update_min_cubes = (function (acc, val_16) {
let var_red_1738 = val_16[1];
let var_green_1839 = val_16[2];
let var_blue_1940 = val_16[3];
let var_red_2041 = acc[1];
let var_green_2142 = acc[2];
let var_blue_2243 = acc[3];
let red44 = Math.max(var_red_2041, var_red_1738);
let green45 = Math.max(var_green_2142, var_green_1839);
let blue46 = Math.max(var_blue_2243, var_blue_1940);
return CubeNums(red44, green45, blue46);
})
;
var min_cubes = (function (val_23) {
let var_rounds_2447 = val_23[2];
return _PLUS_.reduce(update_min_cubes, CubeNums(0, 0, 0), var_rounds_2447);
})
;
var part2 = (function (input) {
return _PLUS_.reduce((function (_anon_PERCENT_1_7, _anon_PERCENT_2_8) {
return (_anon_PERCENT_1_7 + _anon_PERCENT_2_8);
}), 0, _PLUS_.fmap(cubes_power, _PLUS_.fmap(min_cubes, to_games(input))));
})
;
var solve = (function () {
let input48 = lib.getInput(2);
return lib.Solution(part1(input48), part2(input48));
})
;

export { solve, parse_game, min_cubes, part2, all_cubes, valid_round_QMARK_, part1, CubeNums, CubeNumsT, to_games, addColorValFromColorStr, cubes_power, update_min_cubes, parse_round, valid_game_QMARK_, GameT }
