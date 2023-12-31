import * as lib from './lib.mjs';
import * as _PLUS_ from './../+.mjs';
_PLUS_.qt_store[27] = "HandTypeT";
_PLUS_.bury(_PLUS_.prop_store, [27, 1], ({
    0: ({
        "idname": "+",
        "fullname": "%+",
        "ind": 0
    })
}));
_PLUS_.bury(_PLUS_.prop_store, [27, 2], ({
    0: ({
        "idname": "+",
        "fullname": "%+",
        "ind": 0
    })
}));
_PLUS_.bury(_PLUS_.prop_store, [27, 3], ({
    0: ({
        "idname": "+",
        "fullname": "%+",
        "ind": 0
    })
}));
_PLUS_.bury(_PLUS_.prop_store, [27, 4], ({
    0: ({
        "idname": "+",
        "fullname": "%+",
        "ind": 0
    })
}));
_PLUS_.bury(_PLUS_.prop_store, [27, 5], ({
    0: ({
        "idname": "+",
        "fullname": "%+",
        "ind": 0
    })
}));
_PLUS_.bury(_PLUS_.prop_store, [27, 6], ({
    0: ({
        "idname": "+",
        "fullname": "%+",
        "ind": 0
    })
}));
_PLUS_.bury(_PLUS_.prop_store, [27, 7], ({
    0: ({
        "idname": "+",
        "fullname": "%+",
        "ind": 0
    })
}));
_PLUS_.bury(_PLUS_.variant_store, [27, 1], "Kind5");
_PLUS_.bury(_PLUS_.variant_store, [27, 2], "Kind4");
_PLUS_.bury(_PLUS_.variant_store, [27, 3], "Kind3");
_PLUS_.bury(_PLUS_.variant_store, [27, 4], "Kind2");
_PLUS_.bury(_PLUS_.variant_store, [27, 5], "Kind1");
_PLUS_.bury(_PLUS_.variant_store, [27, 6], "FullHouse");
_PLUS_.bury(_PLUS_.variant_store, [27, 7], "TwoPair");
var HandTypeT = 27;
var type_val = (function(val_152) {
    let val_1531 = val_152;
    let spec_1542 = ({
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
    return (spec_1542[val_1531[1]] || spec_1542[0])();
});
var Kind5 = [27, 1];
var Kind4 = [27, 2];
var FullHouse = [27, 6];
var Kind3 = [27, 3];
var TwoPair = [27, 7];
var Kind2 = [27, 4];
var Kind1 = [27, 5];
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
    _PLUS_.for$(cards, (function(_anon_PERCENT_1_34) {
        let card_count7 = (1 + _PLUS_.or(0, _PLUS_.at(card_counts3, _anon_PERCENT_1_34)));
        if ((!jokers_QMARK_ || !joker_QMARK_(_anon_PERCENT_1_34))) {
            (rkind6.r = Math.max(rkind6["r"], card_count7))
        };
        if (joker_QMARK_(_anon_PERCENT_1_34)) {
            (rjokers5.r = (_PLUS_.inc)(rjokers5.r))
        };
        if (_PLUS_.is(card_count7, 2)) {
            (rpairs4.r = (_PLUS_.inc)(rpairs4.r))
        };
        return _PLUS_.put(card_counts3, _anon_PERCENT_1_34, card_count7);
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
    return _PLUS_.reduce((function(_anon_PERCENT_1_36, _anon_PERCENT_2_38, _anon_PERCENT_3_37) {
        return (_anon_PERCENT_1_36 + (Math.pow(14, (_PLUS_.size(cards) - 1 - _anon_PERCENT_3_37)) * _anon_PERCENT_2_38));
    }), 0, _PLUS_.fmap((function(_anon_PERCENT_1_35) {
        return card_val(_anon_PERCENT_1_35, jokers_QMARK_);
    }), cards));
});
_PLUS_.qt_store[28] = "HandStatsT";
_PLUS_.bury(_PLUS_.prop_store, [28, undefined], ({
    0: ({
        "idname": "type",
        "fullname": "%type",
        "ind": 0
    }),
    1: ({
        "idname": "val",
        "fullname": "%val",
        "ind": 1
    }),
    2: ({
        "idname": "bid",
        "fullname": "%bid",
        "ind": 2
    })
}));
var HandStatsT = 28;
var hand_val = (function(val_155) {
    let var_val_15610 = val_155[2];
    return var_val_15610;
});
var hand_bid = (function(val_157) {
    let var_bid_15811 = val_157[3];
    return var_bid_15811;
});
var hand_type_val = (function(val_159) {
    let var_type_16012 = val_159[1];
    return type_val(var_type_16012);
});
var parse_line = (function(line, jokers_QMARK_) {
    let vec__1316 = line.trim().split(lib.rx_whitespace);
    let cardsstr17 = vec__1316[0];
    let bidstr18 = vec__1316[1];
    let cards19 = lib.strsplit(cardsstr17, "");
    let type20 = get_type(cards19, jokers_QMARK_);
    let val21 = get_val(cards19, jokers_QMARK_);
    let bid22 = lib.parseInt(bidstr18);
    return [28, type20, val21, bid22];
});
var sort_hands = (function(hands) {
    let by_type_val23 = _PLUS_.groupBy(hand_type_val, hands);
    return _PLUS_.bind((function(_anon_PERCENT_1_39) {
        return _PLUS_.sort_by(hand_val, _PLUS_.or(_PLUS_.Vec(), _PLUS_.at(by_type_val23, type_val(_anon_PERCENT_1_39))));
    }), _PLUS_.Vec(Kind1, Kind2, TwoPair, Kind3, FullHouse, Kind4, Kind5));
});
var get_total_winnings = (function(input, jokers_QMARK_) {
    return _PLUS_.reduce((function(_anon_PERCENT_1_42, _anon_PERCENT_2_44, _anon_PERCENT_3_43) {
        return (_anon_PERCENT_1_42 + ((1 + _anon_PERCENT_3_43) * hand_bid(_anon_PERCENT_2_44)));
    }), 0, sort_hands(_PLUS_.fmap((function(_anon_PERCENT_1_41) {
        return parse_line(_anon_PERCENT_1_41, jokers_QMARK_);
    }), _PLUS_.filter((function(_anon_PERCENT_1_40) {
        return !_PLUS_.is("", _anon_PERCENT_1_40.trim());
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
