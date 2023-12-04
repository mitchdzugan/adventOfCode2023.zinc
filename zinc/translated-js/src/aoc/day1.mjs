import * as lib from './lib.mjs';import * as _PLUS_ from './../+.mjs';
var IGNORE_LEADING_0 = false
;
var digitStrs = _PLUS_.Map([["one", 1], ["two", 2], ["three", 3], ["four", 4], ["five", 5], ["six", 6], ["seven", 7], ["eight", 8], ["nine", 9]])
;
var digitStrLengths = (function () {
let seenLengths1 = _PLUS_.Map();
_PLUS_.each((function (_anon_PERCENT_1_52, _anon_PERCENT_2_51) {
return _PLUS_.put(seenLengths1, _anon_PERCENT_2_51["length"], true);
}), digitStrs);
return _PLUS_.sort(_PLUS_.keys(seenLengths1));
})()
;
var getDigit = (function (src, index, useDigitStrs, exclude0) {
let digit2 = parseInt(src.substr(index, 1), 10);
if (((digit2 < 10) && (digit2 >= ((exclude0) ? (1) : (0))))) {
return _PLUS_.Just(digit2);} else {
let result3 = _PLUS_.None;
let strLenIndex4 = 0;
while(true){
if ((!useDigitStrs || !_PLUS_.empty_QMARK_(result3) || (strLenIndex4 > _PLUS_.size(digitStrLengths)))) {
return result3;} else {
let strLen5 = _PLUS_.or(0, _PLUS_.at(digitStrLengths, strLenIndex4));
let substr6 = src.substr(index, strLen5);
let G__7 = _PLUS_.at(digitStrs, substr6);
let G__8 = (strLenIndex4 + 1);
result3 = G__7;
strLenIndex4 = G__8;
continue;
};break;
}
}
})
;
_PLUS_.qt_store[13] = "OriginT";
_PLUS_.bury(_PLUS_.prop_store, [13, 1], ({ 0: ({ "idname": "+", "fullname": "%+", "ind": 0 }) }));
_PLUS_.bury(_PLUS_.prop_store, [13, 2], ({ 0: ({ "idname": "+", "fullname": "%+", "ind": 0 }) }));
_PLUS_.bury(_PLUS_.variant_store, [13, 1], "Front");
_PLUS_.bury(_PLUS_.variant_store, [13, 2], "Back");
var OriginT = 13
;
var Front = [13, 1]
;
var Back = [13, 2]
;
var firstDigit = (function (src, origin, useDigitStrs) {
let start9 = (function () {
 let val_1810 = origin;
let spec_1911 = ({ 1: (function () {
return 0;
}), 2: (function () {
return (src["length"] - 1);
}) });
return (spec_1911[val_1810[1]] || spec_1911[0])();
})();
let delta12 = (function () {
 let val_2013 = origin;
let spec_2114 = ({ 1: (function () {
return 1;
}), 2: (function () {
return -1;
}) });
return (spec_2114[val_2013[1]] || spec_2114[0])();
})();
let exclude015 = (function () {
 let val_2216 = origin;
let spec_2317 = ({ 1: (function () {
return IGNORE_LEADING_0;
}), 2: (function () {
return false;
}) });
return (spec_2317[val_2216[1]] || spec_2317[0])();
})();
let result18 = _PLUS_.None;
let index19 = start9;
while(true){
if ((!_PLUS_.empty_QMARK_(result18) || (index19 >= src["length"]) || (index19 < 0))) {
return result18;} else {
let G__20 = getDigit(src, index19, useDigitStrs, exclude015);
let G__21 = (index19 + delta12);
result18 = G__20;
index19 = G__21;
continue;
};break;
}

})
;
var getCalibrationValue = (function (src, useDigitStrs) {
return (function (_anon_PERCENT_1_54, _anon_PERCENT_2_53) {
return _PLUS_.bind(_anon_PERCENT_2_53, _anon_PERCENT_1_54);
})(firstDigit(src, Front, useDigitStrs), (function (dTens) {
return (function (_anon_PERCENT_1_56, _anon_PERCENT_2_55) {
return _PLUS_.bind(_anon_PERCENT_2_55, _anon_PERCENT_1_56);
})(firstDigit(src, Back, useDigitStrs), (function (dOnes) {
return _PLUS_.Just(((10 * dTens) + dOnes));
}));
}));
})
;
var getCalibrationSum = (function (input, useDigitStrs) {
return _PLUS_.reduce((function (_anon_PERCENT_1_58, _anon_PERCENT_2_59) {
return (_anon_PERCENT_1_58 + _PLUS_.or(0, _anon_PERCENT_2_59));
}), 0, _PLUS_.fmap((function (_anon_PERCENT_1_57) {
return getCalibrationValue(_anon_PERCENT_1_57, useDigitStrs);
}), lib.strsplit(input, "\n")));
})
;
var part1 = (function (input) {
return getCalibrationSum(input, false);
})
;
var part2 = (function (input) {
return getCalibrationSum(input, true);
})
;

export { Front, part2, Back, getDigit, getCalibrationSum, part1, getCalibrationValue, digitStrLengths, OriginT, digitStrs, IGNORE_LEADING_0, firstDigit }
