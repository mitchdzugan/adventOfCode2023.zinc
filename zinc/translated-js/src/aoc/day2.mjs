import * as lib from './lib.mjs';
import * as _PLUS_ from './../+.mjs';
undefined;
var CubeNumsT = 30;
var CubeNums = (function(red, green, blue) {
    return [30, red, green, blue];
});
undefined;
var GameT = 31;
var cubes_power = (function(val_157) {
    let var_red_1581 = val_157[1];
    let var_green_1592 = val_157[2];
    let var_blue_1603 = val_157[3];
    return (var_red_1581 * var_green_1592 * var_blue_1603);
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
var valid_round_QMARK_ = (function(val_161) {
    let var_red_16230 = val_161[1];
    let var_green_16331 = val_161[2];
    let var_blue_16432 = val_161[3];
    let var_red_16533 = all_cubes[1];
    let var_green_16634 = all_cubes[2];
    let var_blue_16735 = all_cubes[3];
    return ((var_red_16230 <= var_red_16533) && (var_green_16331 <= var_green_16634) && (var_blue_16432 <= var_blue_16735));
});
var valid_game_QMARK_ = (function(val_168) {
    let var_rounds_16936 = val_168[2];
    return _PLUS_.reduce((function(_anon_PERCENT_1_16, _anon_PERCENT_2_17) {
        return (_anon_PERCENT_1_16 && valid_round_QMARK_(_anon_PERCENT_2_17));
    }), true, var_rounds_16936);
});
var to_games = (function(input) {
    return _PLUS_.fmap(parse_game, _PLUS_.filter((function(_anon_PERCENT_1_18) {
        return !_PLUS_.is("", _anon_PERCENT_1_18.trim());
    }), lib.strsplit(input, "\n")));
});
var part1 = (function(input) {
    return _PLUS_.reduce((function(_anon_PERCENT_1_19, _anon_PERCENT_2_20) {
        return (_anon_PERCENT_1_19 + _anon_PERCENT_2_20);
    }), 0, _PLUS_.fmap((function(val_170) {
        let var_id_17137 = val_170[1];
        return var_id_17137;
    }), _PLUS_.filter(valid_game_QMARK_, to_games(input))));
});
var update_min_cubes = (function(acc, val_172) {
    let var_red_17338 = val_172[1];
    let var_green_17439 = val_172[2];
    let var_blue_17540 = val_172[3];
    let var_red_17641 = acc[1];
    let var_green_17742 = acc[2];
    let var_blue_17843 = acc[3];
    let red44 = Math.max(var_red_17641, var_red_17338);
    let green45 = Math.max(var_green_17742, var_green_17439);
    let blue46 = Math.max(var_blue_17843, var_blue_17540);
    return CubeNums(red44, green45, blue46);
});
var min_cubes = (function(val_179) {
    let var_rounds_18047 = val_179[2];
    return _PLUS_.reduce(update_min_cubes, CubeNums(0, 0, 0), var_rounds_18047);
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
