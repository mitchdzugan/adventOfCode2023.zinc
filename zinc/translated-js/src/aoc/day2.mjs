import * as lib from './lib.mjs';
import * as _PLUS_ from './../+.mjs';
undefined;
var CubeNumsT = 30;
var CubeNums = (function(red, green, blue) {
    return [30, red, green, blue];
});
undefined;
var GameT = 31;
var cubes_power = (function(val_164) {
    let var_red_1651 = val_164[1];
    let var_green_1662 = val_164[2];
    let var_blue_1673 = val_164[3];
    return (var_red_1651 * var_green_1662 * var_blue_1673);
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
    _PLUS_.each((function(_anon_PERCENT_1_110) {
        return addColorValFromColorStr(colorVals13, _anon_PERCENT_1_110);
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
var valid_round_QMARK_ = (function(val_168) {
    let var_red_16930 = val_168[1];
    let var_green_17031 = val_168[2];
    let var_blue_17132 = val_168[3];
    let var_red_17233 = all_cubes[1];
    let var_green_17334 = all_cubes[2];
    let var_blue_17435 = all_cubes[3];
    return ((var_red_16930 <= var_red_17233) && (var_green_17031 <= var_green_17334) && (var_blue_17132 <= var_blue_17435));
});
var valid_game_QMARK_ = (function(val_175) {
    let var_rounds_17636 = val_175[2];
    return _PLUS_.reduce((function(_anon_PERCENT_1_111, _anon_PERCENT_2_112) {
        return (_anon_PERCENT_1_111 && valid_round_QMARK_(_anon_PERCENT_2_112));
    }), true, var_rounds_17636);
});
var to_games = (function(input) {
    return _PLUS_.fmap(parse_game, _PLUS_.filter((function(_anon_PERCENT_1_113) {
        return !_PLUS_.is("", _anon_PERCENT_1_113.trim());
    }), lib.strsplit(input, "\n")));
});
var part1 = (function(input) {
    return _PLUS_.reduce((function(_anon_PERCENT_1_114, _anon_PERCENT_2_115) {
        return (_anon_PERCENT_1_114 + _anon_PERCENT_2_115);
    }), 0, _PLUS_.fmap((function(val_177) {
        let var_id_17837 = val_177[1];
        return var_id_17837;
    }), _PLUS_.filter(valid_game_QMARK_, to_games(input))));
});
var update_min_cubes = (function(acc, val_179) {
    let var_red_18038 = val_179[1];
    let var_green_18139 = val_179[2];
    let var_blue_18240 = val_179[3];
    let var_red_18341 = acc[1];
    let var_green_18442 = acc[2];
    let var_blue_18543 = acc[3];
    let red44 = Math.max(var_red_18341, var_red_18038);
    let green45 = Math.max(var_green_18442, var_green_18139);
    let blue46 = Math.max(var_blue_18543, var_blue_18240);
    return CubeNums(red44, green45, blue46);
});
var min_cubes = (function(val_186) {
    let var_rounds_18747 = val_186[2];
    return _PLUS_.reduce(update_min_cubes, CubeNums(0, 0, 0), var_rounds_18747);
});
var part2 = (function(input) {
    return _PLUS_.reduce((function(_anon_PERCENT_1_116, _anon_PERCENT_2_117) {
        return (_anon_PERCENT_1_116 + _anon_PERCENT_2_117);
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
