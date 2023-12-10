import * as lib from './lib.mjs';
import * as _PLUS_ from './../+.mjs';
undefined;
var CubeNumsT = 30;
var CubeNums = (function(red, green, blue) {
    return [30, red, green, blue];
});
undefined;
var GameT = 31;
var cubes_power = (function(val_160) {
    let var_red_1611 = val_160[1];
    let var_green_1622 = val_160[2];
    let var_blue_1633 = val_160[3];
    return (var_red_1611 * var_green_1622 * var_blue_1633);
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
    _PLUS_.each((function(_anon_PERCENT_1_83) {
        return addColorValFromColorStr(colorVals13, _anon_PERCENT_1_83);
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
var valid_round_QMARK_ = (function(val_164) {
    let var_red_16530 = val_164[1];
    let var_green_16631 = val_164[2];
    let var_blue_16732 = val_164[3];
    let var_red_16833 = all_cubes[1];
    let var_green_16934 = all_cubes[2];
    let var_blue_17035 = all_cubes[3];
    return ((var_red_16530 <= var_red_16833) && (var_green_16631 <= var_green_16934) && (var_blue_16732 <= var_blue_17035));
});
var valid_game_QMARK_ = (function(val_171) {
    let var_rounds_17236 = val_171[2];
    return _PLUS_.reduce((function(_anon_PERCENT_1_84, _anon_PERCENT_2_85) {
        return (_anon_PERCENT_1_84 && valid_round_QMARK_(_anon_PERCENT_2_85));
    }), true, var_rounds_17236);
});
var to_games = (function(input) {
    return _PLUS_.fmap(parse_game, _PLUS_.filter((function(_anon_PERCENT_1_86) {
        return !_PLUS_.is("", _anon_PERCENT_1_86.trim());
    }), lib.strsplit(input, "\n")));
});
var part1 = (function(input) {
    return _PLUS_.reduce((function(_anon_PERCENT_1_87, _anon_PERCENT_2_88) {
        return (_anon_PERCENT_1_87 + _anon_PERCENT_2_88);
    }), 0, _PLUS_.fmap((function(val_173) {
        let var_id_17437 = val_173[1];
        return var_id_17437;
    }), _PLUS_.filter(valid_game_QMARK_, to_games(input))));
});
var update_min_cubes = (function(acc, val_175) {
    let var_red_17638 = val_175[1];
    let var_green_17739 = val_175[2];
    let var_blue_17840 = val_175[3];
    let var_red_17941 = acc[1];
    let var_green_18042 = acc[2];
    let var_blue_18143 = acc[3];
    let red44 = Math.max(var_red_17941, var_red_17638);
    let green45 = Math.max(var_green_18042, var_green_17739);
    let blue46 = Math.max(var_blue_18143, var_blue_17840);
    return CubeNums(red44, green45, blue46);
});
var min_cubes = (function(val_182) {
    let var_rounds_18347 = val_182[2];
    return _PLUS_.reduce(update_min_cubes, CubeNums(0, 0, 0), var_rounds_18347);
});
var part2 = (function(input) {
    return _PLUS_.reduce((function(_anon_PERCENT_1_89, _anon_PERCENT_2_90) {
        return (_anon_PERCENT_1_89 + _anon_PERCENT_2_90);
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
