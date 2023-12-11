import * as lib from './lib.mjs';
import * as _PLUS_ from './../+.mjs';
var zeros_QMARK_ = (function(history) {
    return _PLUS_.every_QMARK_((function(_anon_PERCENT_1_20) {
        return _PLUS_.is(0, _anon_PERCENT_1_20);
    }), history);
});
var next_value = (function(history) {
    let seqs1 = _PLUS_.Vec(history);
    let depth2 = 0;
    while (true) {
        let curr3 = _PLUS_.at_BANG_(seqs1, depth2);
        if (zeros_QMARK_(curr3)) {
            _PLUS_.push(curr3, 0);
            let depth4 = depth2;
            while (true) {
                if ((depth4 <= 0)) {
                    return _PLUS_.last_BANG_(history);
                } else {
                    let curr5 = _PLUS_.at_BANG_(seqs1, depth4);
                    let prev6 = _PLUS_.at_BANG_(seqs1, (depth4 - 1));
                    _PLUS_.push(prev6, (_PLUS_.last_BANG_(prev6) + _PLUS_.last_BANG_(curr5)));
                    let G__7 = (depth4 - 1);
                    depth4 = G__7;
                    continue;
                };
                break;
            }
        } else {
            let next8 = _PLUS_.Vec();
            _PLUS_.push(seqs1, next8);
            let ind9 = 1;
            while (true) {
                if ((ind9 < _PLUS_.size(curr3))) {
                    _PLUS_.push(next8, (_PLUS_.at_BANG_(curr3, ind9) - _PLUS_.at_BANG_(curr3, (ind9 - 1))));
                    let G__10 = (ind9 + 1);
                    ind9 = G__10;
                    continue;
                };
                break;
            };
            let G__11 = (depth2 + 1);
            depth2 = G__11;
            continue;
        };
        break;
    }

});
var process = (function(input, reverse_QMARK_) {
    return _PLUS_.reduce((function(_anon_PERCENT_1_24, _anon_PERCENT_2_25) {
        return (_anon_PERCENT_1_24 + _anon_PERCENT_2_25);
    }), 0, _PLUS_.fmap(next_value, _PLUS_.fmap(((reverse_QMARK_) ? (_PLUS_.reverse) : (_PLUS_.id)), _PLUS_.fmap((function(_anon_PERCENT_1_23) {
        return _PLUS_.fmap(lib.parseInt, _anon_PERCENT_1_23);
    }), _PLUS_.fmap((function(_anon_PERCENT_1_22) {
        return lib.strsplit(_anon_PERCENT_1_22.trim(), lib.rx_whitespace);
    }), _PLUS_.filter((function(_anon_PERCENT_1_21) {
        return !_PLUS_.is("", _anon_PERCENT_1_21.trim());
    }), lib.strsplit(input, "\n")))))));
});
var part1 = (function(input) {
    return process(input, false);
});
var part2 = (function(input) {
    return process(input, true);
});

export {
    zeros_QMARK_,
    next_value,
    process,
    part1,
    part2
}
