import * as lib from './lib.mjs';
import * as _PLUS_ from './../+.mjs';
_PLUS_.qt_store[29] = "RaceT";
_PLUS_.bury(_PLUS_.prop_store, [29, undefined], ({
    0: ({
        "idname": "time",
        "fullname": "%time",
        "ind": 0
    }),
    1: ({
        "idname": "record",
        "fullname": "%record",
        "ind": 1
    })
}));
var RaceT = 29;
var Race = (function(time, record) {
    return [29, time, record];
});
var count_possibilities = (function(val_161) {
    let var_time_1621 = val_161[1];
    let var_record_1632 = val_161[2];
    let qdrtc_root3 = (Math.sqrt(((var_time_1621 * var_time_1621) - (4 * var_record_1632))) / 2);
    let qdrtc_b_2a4 = (var_time_1621 / 2);
    let bound_h5 = _PLUS_.floor((qdrtc_b_2a4 + qdrtc_root3));
    let bound_l6 = _PLUS_.floor((qdrtc_b_2a4 - qdrtc_root3));
    return (bound_h5 - bound_l6);
});
var part1 = (function() {
    return _PLUS_.reduce((function(_anon_PERCENT_1_26, _anon_PERCENT_2_27) {
        return (_anon_PERCENT_1_26 * _anon_PERCENT_2_27);
    }), 1, _PLUS_.fmap(count_possibilities, _PLUS_.Vec(Race(52, 426), Race(94, 1374), Race(75, 1279), Race(94, 1216))));
});
var part2 = (function() {
    let time7 = 52947594;
    let record8 = 426137412791216;
    return count_possibilities(Race(time7, record8));
});

export {
    RaceT,
    Race,
    count_possibilities,
    part1,
    part2
}
