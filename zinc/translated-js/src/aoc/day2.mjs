import * as lib from './lib.mjs';import * as _PLUS_ from './../+.mjs';
_PLUS_.qt_store[14] = "CubeNumsT";
_PLUS_.bury(_PLUS_.prop_store, [14, undefined], ({ 0: ({ "idname": "red", "fullname": "%red", "ind": 0, "type": _PLUS_.NumT }), 1: ({ "idname": "green", "fullname": "%green", "ind": 1, "type": _PLUS_.NumT }), 2: ({ "idname": "blue", "fullname": "%blue", "ind": 2, "type": _PLUS_.NumT }) }));
var CubeNumsT = 14
;
var CubeNums = (function (red, green, blue) {
return [14, red, green, blue];
})
;
_PLUS_.qt_store[15] = "GameT";
_PLUS_.bury(_PLUS_.prop_store, [15, undefined], ({ 0: ({ "idname": "id", "fullname": "%id", "ind": 0 }), 1: ({ "idname": "rounds", "fullname": "%rounds", "ind": 1, "type": [_PLUS_.VecT, CubeNumsT] }) }));
var GameT = 15
;
var cubes_power = (function (val_24) {
let var_red_251 = val_24[1];
let var_green_262 = val_24[2];
let var_blue_273 = val_24[3];
return (var_red_251 * var_green_262 * var_blue_273);
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
_PLUS_.each((function (_anon_PERCENT_1_43) {
return addColorValFromColorStr(colorVals13, _anon_PERCENT_1_43);
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
return [15, id27, rounds29];
})
;
var all_cubes = CubeNums(12, 13, 14)
;
var valid_round_QMARK_ = (function (val_28) {
let var_red_2930 = val_28[1];
let var_green_3031 = val_28[2];
let var_blue_3132 = val_28[3];
let var_red_3233 = all_cubes[1];
let var_green_3334 = all_cubes[2];
let var_blue_3435 = all_cubes[3];
return ((var_red_2930 <= var_red_3233) && (var_green_3031 <= var_green_3334) && (var_blue_3132 <= var_blue_3435));
})
;
var valid_game_QMARK_ = (function (val_35) {
let var_rounds_3636 = val_35[2];
return _PLUS_.reduce((function (_anon_PERCENT_1_44, _anon_PERCENT_2_45) {
return (_anon_PERCENT_1_44 && valid_round_QMARK_(_anon_PERCENT_2_45));
}), true, var_rounds_3636);
})
;
var to_games = (function (input) {
return _PLUS_.fmap(parse_game, _PLUS_.filter((function (_anon_PERCENT_1_46) {
return !_PLUS_.is("", _anon_PERCENT_1_46.trim());
}), lib.strsplit(input, "\n")));
})
;
var part1 = (function (input) {
return _PLUS_.reduce((function (_anon_PERCENT_1_47, _anon_PERCENT_2_48) {
return (_anon_PERCENT_1_47 + _anon_PERCENT_2_48);
}), 0, _PLUS_.fmap((function (val_37) {
let var_id_3837 = val_37[1];
return var_id_3837;
}), _PLUS_.filter(valid_game_QMARK_, to_games(input))));
})
;
var update_min_cubes = (function (acc, val_39) {
let var_red_4038 = val_39[1];
let var_green_4139 = val_39[2];
let var_blue_4240 = val_39[3];
let var_red_4341 = acc[1];
let var_green_4442 = acc[2];
let var_blue_4543 = acc[3];
let red44 = Math.max(var_red_4341, var_red_4038);
let green45 = Math.max(var_green_4442, var_green_4139);
let blue46 = Math.max(var_blue_4543, var_blue_4240);
return CubeNums(red44, green45, blue46);
})
;
var min_cubes = (function (val_46) {
let var_rounds_4747 = val_46[2];
return _PLUS_.reduce(update_min_cubes, CubeNums(0, 0, 0), var_rounds_4747);
})
;
var part2 = (function (input) {
return _PLUS_.reduce((function (_anon_PERCENT_1_49, _anon_PERCENT_2_50) {
return (_anon_PERCENT_1_49 + _anon_PERCENT_2_50);
}), 0, _PLUS_.fmap(cubes_power, _PLUS_.fmap(min_cubes, to_games(input))));
})
;

export { parse_game, min_cubes, part2, all_cubes, valid_round_QMARK_, part1, CubeNums, CubeNumsT, to_games, addColorValFromColorStr, cubes_power, update_min_cubes, parse_round, valid_game_QMARK_, GameT }
