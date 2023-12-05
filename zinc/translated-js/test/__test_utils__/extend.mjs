import * as _PLUS_ from './+.mjs';
import * as jd from 'jest-diff';
expect.extend(({
    "to_be_within_range": (function(actual, min, max) {
        let pass1 = ((actual >= min) && (actual <= max));
        return ({
            "pass": pass1,
            "message": (function() {
                return _PLUS_.str("expected ", actual, ((pass1) ? (" not") : ("")), " to be within range (", min, "..", max, ")");
            })
        });
    }),
    "to_eq": (function(actual_zn, expected_zn) {
        let actual2 = _PLUS_.pretty(actual_zn);
        let expected3 = _PLUS_.pretty(expected_zn);
        let eq_diff4 = jd.diff(({}), ({}));
        let test_diff5 = jd.diff(expected3, actual2);
        let pass6 = _PLUS_.is(eq_diff4, test_diff5);
        return ({
            "pass": pass6,
            "message": (function() {
                if (pass6) {
                    return "expected not to be equal";
                } else {
                    return _PLUS_.str("expected to be equal:\n", test_diff5);
                }
            })
        });
    }),
    "to_raw_eq": (function(actual, expected) {
        let eq_diff7 = jd.diff(({}), ({}));
        let test_diff8 = jd.diff(expected, actual);
        let pass9 = _PLUS_.is(eq_diff7, test_diff8);
        return ({
            "pass": pass9,
            "message": (function() {
                if (pass9) {
                    return "expected not to be equal";
                } else {
                    return _PLUS_.str("expected to be equal:\n", test_diff8);
                }
            })
        });
    })
}));
