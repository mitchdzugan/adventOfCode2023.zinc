import * as lib from './lib.mjs';
import * as _PLUS_ from './../+.mjs';
var IGNORE_LEADING_0 = false;
var digitStrs = _PLUS_.Map([
    ["one", 1],
    ["two", 2],
    ["three", 3],
    ["four", 4],
    ["five", 5],
    ["six", 6],
    ["seven", 7],
    ["eight", 8],
    ["nine", 9]
]);
var digitStrLengths = (function() {
    let seenLengths1 = _PLUS_.Map();
    _PLUS_.each((function(_anon_PERCENT_1_58, _anon_PERCENT_2_57) {
        return _PLUS_.put(seenLengths1, _anon_PERCENT_2_57["length"], true);
    }), digitStrs);
    return _PLUS_.sort(_PLUS_.keys(seenLengths1));
})();
var getDigit = (function(src, index, useDigitStrs, exclude0) {
    let digit2 = lib.parseInt(src.substr(index, 1));
    if (((digit2 < 10) && (digit2 >= ((exclude0) ? (1) : (0))))) {
        return _PLUS_.Just(digit2);
    } else {
        let result3 = _PLUS_.None;
        let strLenIndex4 = 0;
        while (true) {
            if ((!useDigitStrs || !_PLUS_.empty_QMARK_(result3) || (strLenIndex4 > _PLUS_.size(digitStrLengths)))) {
                return result3;
            } else {
                let strLen5 = _PLUS_.or(0, _PLUS_.at(digitStrLengths, strLenIndex4));
                let substr6 = src.substr(index, strLen5);
                let G__7 = _PLUS_.at(digitStrs, substr6);
                let G__8 = (strLenIndex4 + 1);
                result3 = G__7;
                strLenIndex4 = G__8;
                continue;
            };
            break;
        }
    }
});
undefined;
var OriginT = 24;
var Front = [24, 1];
var Back = [24, 2];
var firstDigit = (function(src, origin, useDigitStrs) {
    let start9 = (function() {
        let val_9010 = origin;
        let spec_9111 = ({
            1: (function() {
                return 0;
            }),
            2: (function() {
                return (src["length"] - 1);
            })
        });
        return (spec_9111[val_9010[1]] || spec_9111[0])();
    })();
    let delta12 = (function() {
        let val_9213 = origin;
        let spec_9314 = ({
            1: (function() {
                return 1;
            }),
            2: (function() {
                return -1;
            })
        });
        return (spec_9314[val_9213[1]] || spec_9314[0])();
    })();
    let exclude015 = (function() {
        let val_9416 = origin;
        let spec_9517 = ({
            1: (function() {
                return IGNORE_LEADING_0;
            }),
            2: (function() {
                return false;
            })
        });
        return (spec_9517[val_9416[1]] || spec_9517[0])();
    })();
    let result18 = _PLUS_.None;
    let index19 = start9;
    while (true) {
        if ((!_PLUS_.empty_QMARK_(result18) || (index19 >= src["length"]) || (index19 < 0))) {
            return result18;
        } else {
            let G__20 = getDigit(src, index19, useDigitStrs, exclude015);
            let G__21 = (index19 + delta12);
            result18 = G__20;
            index19 = G__21;
            continue;
        };
        break;
    }

});
var getCalibrationValue = (function(src, useDigitStrs) {
    return (function(_anon_PERCENT_1_60, _anon_PERCENT_2_59) {
        return _PLUS_.bind(_anon_PERCENT_2_59, _anon_PERCENT_1_60);
    })(firstDigit(src, Front, useDigitStrs), (function(dTens) {
        return (function(_anon_PERCENT_1_62, _anon_PERCENT_2_61) {
            return _PLUS_.bind(_anon_PERCENT_2_61, _anon_PERCENT_1_62);
        })(firstDigit(src, Back, useDigitStrs), (function(dOnes) {
            return _PLUS_.Just(((10 * dTens) + dOnes));
        }));
    }));
});
var getCalibrationSum = (function(input, useDigitStrs) {
    return _PLUS_.reduce((function(_anon_PERCENT_1_64, _anon_PERCENT_2_65) {
        return (_anon_PERCENT_1_64 + _PLUS_.or(0, _anon_PERCENT_2_65));
    }), 0, _PLUS_.fmap((function(_anon_PERCENT_1_63) {
        return getCalibrationValue(_anon_PERCENT_1_63, useDigitStrs);
    }), lib.strsplit(input, "\n")));
});
var part1 = (function(input) {
    return getCalibrationSum(input, false);
});
var part2 = (function(input) {
    return getCalibrationSum(input, true);
});

export {
    Front,
    part2,
    Back,
    getDigit,
    getCalibrationSum,
    part1,
    getCalibrationValue,
    digitStrLengths,
    OriginT,
    digitStrs,
    IGNORE_LEADING_0,
    firstDigit
}
