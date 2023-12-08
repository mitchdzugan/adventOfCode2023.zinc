import * as lib from './lib.mjs';
import * as _PLUS_ from './../+.mjs';
undefined;
var HandTypeT = 25;
var type_val = (function(val_70) {
    let val_711 = val_70;
    let spec_722 = ({
        1: (function() {
            return 6;
        }),
        2: (function() {
            return 5;
        }),
        6: (function() {
            return 4;
        }),
        3: (function() {
            return 3;
        }),
        7: (function() {
            return 2;
        }),
        4: (function() {
            return 1;
        }),
        5: (function() {
            return 0;
        })
    });
    return (spec_722[val_711[1]] || spec_722[0])();
});
var Kind5 = [25, 1];
var Kind4 = [25, 2];
var FullHouse = [25, 6];
var Kind3 = [25, 3];
var TwoPair = [25, 7];
var Kind2 = [25, 4];
var Kind1 = [25, 5];
var card_val = (function(c, jokers_QMARK_) {
    if (_PLUS_.is(c, "2")) {
        return 1;
    } else {
        if (_PLUS_.is(c, "3")) {
            return 2;
        } else {
            if (_PLUS_.is(c, "4")) {
                return 3;
            } else {
                if (_PLUS_.is(c, "5")) {
                    return 4;
                } else {
                    if (_PLUS_.is(c, "6")) {
                        return 5;
                    } else {
                        if (_PLUS_.is(c, "7")) {
                            return 6;
                        } else {
                            if (_PLUS_.is(c, "8")) {
                                return 7;
                            } else {
                                if (_PLUS_.is(c, "9")) {
                                    return 8;
                                } else {
                                    if (_PLUS_.is(c, "T")) {
                                        return 9;
                                    } else {
                                        if (_PLUS_.is(c, "J")) {
                                            if (jokers_QMARK_) {
                                                return 0;
                                            } else {
                                                return 10;
                                            }
                                        } else {
                                            if (_PLUS_.is(c, "Q")) {
                                                return 11;
                                            } else {
                                                if (_PLUS_.is(c, "K")) {
                                                    return 12;
                                                } else {
                                                    if (_PLUS_.is(c, "A")) {
                                                        return 13;
                                                    } else {
                                                        if ("else") {
                                                            return 0;
                                                        } else {
                                                            return undefined;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});
var joker_QMARK_ = (function(c) {
    return _PLUS_.is(c, "J");
});
var get_type = (function(cards, jokers_QMARK_) {
    let card_counts3 = _PLUS_.Map();
    let rpairs4 = {
        r: 0
    };
    let rjokers5 = {
        r: 0
    };
    let rkind6 = {
        r: 0
    };
    _PLUS_.for$(cards, (function(_anon_PERCENT_1_15) {
        let card_count7 = (1 + _PLUS_.or(0, _PLUS_.at(card_counts3, _anon_PERCENT_1_15)));
        if ((!jokers_QMARK_ || !joker_QMARK_(_anon_PERCENT_1_15))) {
            (rkind6.r = Math.max(rkind6["r"], card_count7))
        };
        if (joker_QMARK_(_anon_PERCENT_1_15)) {
            (rjokers5.r = (_PLUS_.inc)(rjokers5.r))
        };
        if (_PLUS_.is(card_count7, 2)) {
            (rpairs4.r = (_PLUS_.inc)(rpairs4.r))
        };
        return _PLUS_.put(card_counts3, _anon_PERCENT_1_15, card_count7);
    }));
    let kind8 = (rkind6["r"] + ((jokers_QMARK_) ? (rjokers5["r"]) : (0)));
    let pairs_QMARK_9 = (rpairs4["r"] > 1);
    if ((_PLUS_.is(kind8, 5) && true)) {
        return Kind5;
    } else {
        if ((_PLUS_.is(kind8, 4) && true)) {
            return Kind4;
        } else {
            if ((_PLUS_.is(kind8, 3) && pairs_QMARK_9)) {
                return FullHouse;
            } else {
                if ((_PLUS_.is(kind8, 3) && true)) {
                    return Kind3;
                } else {
                    if ((_PLUS_.is(kind8, 2) && pairs_QMARK_9)) {
                        return TwoPair;
                    } else {
                        if ((_PLUS_.is(kind8, 2) && true)) {
                            return Kind2;
                        } else {
                            if ((_PLUS_.is(kind8, 1) && true)) {
                                return Kind1;
                            } else {
                                return undefined;
                            }
                        }
                    }
                }
            }
        }
    }
});
var get_val = (function(cards, jokers_QMARK_) {
    return _PLUS_.reduce((function(_anon_PERCENT_1_17, _anon_PERCENT_2_19, _anon_PERCENT_3_18) {
        return (_anon_PERCENT_1_17 + (Math.pow(14, (_PLUS_.size(cards) - 1 - _anon_PERCENT_3_18)) * _anon_PERCENT_2_19));
    }), 0, _PLUS_.fmap((function(_anon_PERCENT_1_16) {
        return card_val(_anon_PERCENT_1_16, jokers_QMARK_);
    }), cards));
});
undefined;
var HandStatsT = 26;
var hand_val = (function(val_73) {
    let var_val_7410 = val_73[2];
    return var_val_7410;
});
var hand_bid = (function(val_75) {
    let var_bid_7611 = val_75[3];
    return var_bid_7611;
});
var hand_type_val = (function(val_77) {
    let var_type_7812 = val_77[1];
    return type_val(var_type_7812);
});
var parse_line = (function(line, jokers_QMARK_) {
    let vec__1316 = line.trim().split(lib.rx_whitespace);
    let cardsstr17 = vec__1316[0];
    let bidstr18 = vec__1316[1];
    let cards19 = lib.strsplit(cardsstr17, "");
    let type20 = get_type(cards19, jokers_QMARK_);
    let val21 = get_val(cards19, jokers_QMARK_);
    let bid22 = lib.parseInt(bidstr18);
    return [26, type20, val21, bid22];
});
var sort_hands = (function(hands) {
    let by_type_val23 = _PLUS_.groupBy(hand_type_val, hands);
    return _PLUS_.bind((function(_anon_PERCENT_1_20) {
        return _PLUS_.sort_by(hand_val, _PLUS_.or(_PLUS_.Vec(), _PLUS_.at(by_type_val23, type_val(_anon_PERCENT_1_20))));
    }), _PLUS_.Vec(Kind1, Kind2, TwoPair, Kind3, FullHouse, Kind4, Kind5));
});
var get_total_winnings = (function(input, jokers_QMARK_) {
    return _PLUS_.reduce((function(_anon_PERCENT_1_23, _anon_PERCENT_2_25, _anon_PERCENT_3_24) {
        return (_anon_PERCENT_1_23 + ((1 + _anon_PERCENT_3_24) * hand_bid(_anon_PERCENT_2_25)));
    }), 0, sort_hands(_PLUS_.fmap((function(_anon_PERCENT_1_22) {
        return parse_line(_anon_PERCENT_1_22, jokers_QMARK_);
    }), _PLUS_.filter((function(_anon_PERCENT_1_21) {
        return !_PLUS_.is("", _anon_PERCENT_1_21.trim());
    }), lib.strsplit(input, "\n")))));
});
var part1 = (function(input) {
    return get_total_winnings(input, false);
});
var part2 = (function(input) {
    return get_total_winnings(input, true);
});

export {
    Kind4,
    get_total_winnings,
    joker_QMARK_,
    part2,
    HandTypeT,
    get_val,
    get_type,
    hand_bid,
    card_val,
    Kind1,
    sort_hands,
    TwoPair,
    HandStatsT,
    part1,
    Kind5,
    hand_type_val,
    hand_val,
    type_val,
    FullHouse,
    parse_line,
    Kind3,
    Kind2
}