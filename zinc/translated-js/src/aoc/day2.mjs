import * as lib from './lib.mjs';
import * as _PLUS_ from './../+.mjs';
undefined;
var CubeNumsT = 30;
var CubeNums = (function(red, green, blue) {
    return [30, red, green, blue];
});
undefined;
var GameT = 31;
var cubes_power = (function(val_119) {
    let var_red_1201 = val_119[1];
    let var_green_1212 = val_119[2];
    let var_blue_1223 = val_119[3];
    return (var_red_1201 * var_green_1212 * var_blue_1223);
});
var addColorValFromColorStr = (function(colorVals, _colorStr) {
    let colorStr7 = _colorStr.trim();
    let vec__48 = colorStr7.split(" ");
    let colorValStr9 = vec__48[0];
    let color10 = vec__48[1];
    let colorVal11 = lib.parseInt(colorValStr9);
    return _PLUS_.put(colorVals, color10, colorVal11);
});
var parse_round = (function(_roundStr) {
    let roundStr12 = _roundStr.trim();
    let colorVals13 = _PLUS_.Map();
    let colorStrs14 = lib.strsplit(roundStr12, ",");
    _PLUS_.each((function(_anon_PERCENT_1_15) {
        return addColorValFromColorStr(colorVals13, _anon_PERCENT_1_15);
    }), colorStrs14);
    return CubeNums(_PLUS_.or(0, _PLUS_.at(colorVals13, "red")), _PLUS_.or(0, _PLUS_.at(colorVals13, "green")), _PLUS_.or(0, _PLUS_.at(colorVals13, "blue")));
});
var parse_game = (function(line) {
    let vec__1521 = line.split(":");
    let idStr22 = vec__1521[0];
    let roundsStr23 = vec__1521[1];
    let vec__1824 = idStr22.split(" ");
    let _game_25 = vec__1824[0];
    let idValStr26 = vec__1824[1];
    let id27 = lib.parseInt(idValStr26);
    let roundStrs28 = lib.strsplit(roundsStr23, ";");
    let rounds29 = _PLUS_.fmap(parse_round, roundStrs28);
    return [31, id27, rounds29];
});
var all_cubes = CubeNums(12, 13, 14);
var valid_round_QMARK_ = (function(val_123) {
    let var_red_12430 = val_123[1];
    let var_green_12531 = val_123[2];
    let var_blue_12632 = val_123[3];
    let var_red_12733 = all_cubes[1];
    let var_green_12834 = all_cubes[2];
    let var_blue_12935 = all_cubes[3];
    return ((var_red_12430 <= var_red_12733) && (var_green_12531 <= var_green_12834) && (var_blue_12632 <= var_blue_12935));
});
var valid_game_QMARK_ = (function(val_130) {
    let var_rounds_13136 = val_130[2];
    return _PLUS_.reduce((function(_anon_PERCENT_1_16, _anon_PERCENT_2_17) {
        return (_anon_PERCENT_1_16 && valid_round_QMARK_(_anon_PERCENT_2_17));
    }), true, var_rounds_13136);
});
var to_games = (function(input) {
    return _PLUS_.fmap(parse_game, _PLUS_.filter((function(_anon_PERCENT_1_18) {
        return !_PLUS_.is("", _anon_PERCENT_1_18.trim());
    }), lib.strsplit(input, "\n")));
});
var part1 = (function(input) {
    return _PLUS_.reduce((function(_anon_PERCENT_1_19, _anon_PERCENT_2_20) {
        return (_anon_PERCENT_1_19 + _anon_PERCENT_2_20);
    }), 0, _PLUS_.fmap((function(val_132) {
        let var_id_13337 = val_132[1];
        return var_id_13337;
    }), _PLUS_.filter(valid_game_QMARK_, to_games(input))));
});
var update_min_cubes = (function(acc, val_134) {
    let var_red_13538 = val_134[1];
    let var_green_13639 = val_134[2];
    let var_blue_13740 = val_134[3];
    let var_red_13841 = acc[1];
    let var_green_13942 = acc[2];
    let var_blue_14043 = acc[3];
    let red44 = Math.max(var_red_13841, var_red_13538);
    let green45 = Math.max(var_green_13942, var_green_13639);
    let blue46 = Math.max(var_blue_14043, var_blue_13740);
    return CubeNums(red44, green45, blue46);
});
var min_cubes = (function(val_141) {
    let var_rounds_14247 = val_141[2];
    return _PLUS_.reduce(update_min_cubes, CubeNums(0, 0, 0), var_rounds_14247);
});
var part2 = (function(input) {
    return _PLUS_.reduce((function(_anon_PERCENT_1_21, _anon_PERCENT_2_22) {
        return (_anon_PERCENT_1_21 + _anon_PERCENT_2_22);
    }), 0, _PLUS_.fmap(cubes_power, _PLUS_.fmap(min_cubes, to_games(input))));
});

export {
    parse_game,
    min_cubes,
    part2,
    all_cubes,
    valid_round_QMARK_,
    part1,
    CubeNums,
    CubeNumsT,
    to_games,
    addColorValFromColorStr,
    cubes_power,
    update_min_cubes,
    parse_round,
    valid_game_QMARK_,
    GameT
}
