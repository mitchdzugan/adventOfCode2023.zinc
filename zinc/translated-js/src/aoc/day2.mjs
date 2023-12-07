import * as lib from './lib.mjs';
import * as _PLUS_ from './../+.mjs';
undefined;
var CubeNumsT = 14;
var CubeNums = (function(red, green, blue) {
    return [14, red, green, blue];
});
undefined;
var GameT = 15;
var cubes_power = (function(val_82) {
    let var_red_831 = val_82[1];
    let var_green_842 = val_82[2];
    let var_blue_853 = val_82[3];
    return (var_red_831 * var_green_842 * var_blue_853);
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
    _PLUS_.each((function(_anon_PERCENT_1_74) {
        return addColorValFromColorStr(colorVals13, _anon_PERCENT_1_74);
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
    return [15, id27, rounds29];
});
var all_cubes = CubeNums(12, 13, 14);
var valid_round_QMARK_ = (function(val_86) {
    let var_red_8730 = val_86[1];
    let var_green_8831 = val_86[2];
    let var_blue_8932 = val_86[3];
    let var_red_9033 = all_cubes[1];
    let var_green_9134 = all_cubes[2];
    let var_blue_9235 = all_cubes[3];
    return ((var_red_8730 <= var_red_9033) && (var_green_8831 <= var_green_9134) && (var_blue_8932 <= var_blue_9235));
});
var valid_game_QMARK_ = (function(val_93) {
    let var_rounds_9436 = val_93[2];
    return _PLUS_.reduce((function(_anon_PERCENT_1_75, _anon_PERCENT_2_76) {
        return (_anon_PERCENT_1_75 && valid_round_QMARK_(_anon_PERCENT_2_76));
    }), true, var_rounds_9436);
});
var to_games = (function(input) {
    return _PLUS_.fmap(parse_game, _PLUS_.filter((function(_anon_PERCENT_1_77) {
        return !_PLUS_.is("", _anon_PERCENT_1_77.trim());
    }), lib.strsplit(input, "\n")));
});
var part1 = (function(input) {
    return _PLUS_.reduce((function(_anon_PERCENT_1_78, _anon_PERCENT_2_79) {
        return (_anon_PERCENT_1_78 + _anon_PERCENT_2_79);
    }), 0, _PLUS_.fmap((function(val_95) {
        let var_id_9637 = val_95[1];
        return var_id_9637;
    }), _PLUS_.filter(valid_game_QMARK_, to_games(input))));
});
var update_min_cubes = (function(acc, val_97) {
    let var_red_9838 = val_97[1];
    let var_green_9939 = val_97[2];
    let var_blue_10040 = val_97[3];
    let var_red_10141 = acc[1];
    let var_green_10242 = acc[2];
    let var_blue_10343 = acc[3];
    let red44 = Math.max(var_red_10141, var_red_9838);
    let green45 = Math.max(var_green_10242, var_green_9939);
    let blue46 = Math.max(var_blue_10343, var_blue_10040);
    return CubeNums(red44, green45, blue46);
});
var min_cubes = (function(val_104) {
    let var_rounds_10547 = val_104[2];
    return _PLUS_.reduce(update_min_cubes, CubeNums(0, 0, 0), var_rounds_10547);
});
var part2 = (function(input) {
    return _PLUS_.reduce((function(_anon_PERCENT_1_80, _anon_PERCENT_2_81) {
        return (_anon_PERCENT_1_80 + _anon_PERCENT_2_81);
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
