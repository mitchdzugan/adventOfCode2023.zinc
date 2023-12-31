import * as lib from './lib.mjs';
import * as _PLUS_ from './../+.mjs';
_PLUS_.qt_store[13] = "CardT";
_PLUS_.bury(_PLUS_.prop_store, [13, undefined], ({
    0: ({
        "idname": "id",
        "fullname": "%id",
        "ind": 0
    }),
    1: ({
        "idname": "winning",
        "fullname": "%winning",
        "ind": 1,
        "type": [_PLUS_.SetT, _PLUS_.NumT]
    }),
    2: ({
        "idname": "my",
        "fullname": "%my",
        "ind": 2,
        "type": [_PLUS_.SetT, _PLUS_.NumT]
    })
}));
var CardT = 13;
var cardId = (function(val_18) {
    let var_id_191 = val_18[1];
    return var_id_191;
});
var parseCard = (function(line) {
    let vec__211 = line.split(":");
    let idLabelStr12 = vec__211[0];
    let numDataStr13 = vec__211[1];
    let vec__514 = idLabelStr12.trim().split(lib.rx_whitespace);
    let _cardStr15 = vec__514[0];
    let idStr16 = vec__514[1];
    let id17 = lib.parseInt(idStr16);
    let vec__818 = numDataStr13.trim().split("|");
    let winningNumStr19 = vec__818[0];
    let myNumStr20 = vec__818[1];
    let toSet21 = (function(numStr) {
        let $22 = numStr;
        let $23 = $22.trim().split(lib.rx_whitespace);
        let $24 = $23.map(lib.parseInt);
        return _PLUS_.apply(_PLUS_.Set, $24);
    });
    let winning25 = toSet21(winningNumStr19);
    let my26 = toSet21(myNumStr20);
    return [13, id17, winning25, my26];
});
var myWinCount = (function(val_20) {
    let var_winning_2127 = val_20[2];
    let var_my_2228 = val_20[3];
    return _PLUS_.size(_PLUS_.intersection(var_winning_2127, var_my_2228));
});
var cardValue = (function(card) {
    return Math.floor(Math.pow(2, (-1 + myWinCount(card))));
});
var parseCards = (function(input) {
    return _PLUS_.fmap(parseCard, _PLUS_.filter((function(_anon_PERCENT_1_108) {
        return !_PLUS_.is("", _anon_PERCENT_1_108.trim());
    }), lib.strsplit(input, "\n")));
});
var part1 = (function(input) {
    return _PLUS_.reduce((function(_anon_PERCENT_1_109, _anon_PERCENT_2_110) {
        return (_anon_PERCENT_1_109 + _anon_PERCENT_2_110);
    }), 0, _PLUS_.fmap(cardValue, parseCards(input)));
});
var scratchCardsWonByCard = (function(card, cardsById) {
    return _PLUS_.reduce((function(_anon_PERCENT_1_112, _anon_PERCENT_2_113) {
        return (_anon_PERCENT_1_112 + _anon_PERCENT_2_113);
    }), 1, _PLUS_.fmap((function(_anon_PERCENT_1_111) {
        return scratchCardsWonById((cardId(card) + 1 + _anon_PERCENT_1_111), cardsById);
    }), _PLUS_.Range(myWinCount(card))));
});
let scratchCardsWonById_impl_1829 = (function(id, cardsById) {
    return _PLUS_.or(0, _PLUS_.fmap((function(_anon_PERCENT_1_114) {
        return scratchCardsWonByCard(_anon_PERCENT_1_114, cardsById);
    }), _PLUS_.at(cardsById, id)));
});
let scratchCardsWonById_memo_2030 = _PLUS_.Map();
var scratchCardsWonById = (function() {
    let f31 = (function(var_args) {
        let args3235 = [];
        let len__24440__auto__36 = arguments["length"];
        let i3337 = 0;
        while (true) {
            if ((i3337 < len__24440__auto__36)) {
                args3235.push((arguments[i3337]));
                let G__38 = (i3337 + 1);
                i3337 = G__38;
                continue;
            };
            break;
        };
        let argseq__24702__auto__39 = (((0 < args3235["length"])) ? (args3235.slice(0)) : (undefined));
        return f31.cljs$core$IFn$_invoke$arity$variadic(argseq__24702__auto__39);
    });
    f31["cljs$core$IFn$_invoke$arity$variadic"] = (function(scratchCardsWonById_args_19) {
        let scratchCardsWonById_mkey_1740 = _PLUS_.encode(_PLUS_.fmap(_PLUS_.forcedKey, _PLUS_.apply(_PLUS_.Vec, scratchCardsWonById_args_19)));
        let scratchCardsWonById_rtrn_1641 = _PLUS_.or_((function() {
            return _PLUS_.apply(scratchCardsWonById_impl_1829, scratchCardsWonById_args_19);
        }), _PLUS_.at(scratchCardsWonById_memo_2030, scratchCardsWonById_mkey_1740));
        _PLUS_.put(scratchCardsWonById_memo_2030, scratchCardsWonById_mkey_1740, scratchCardsWonById_rtrn_1641);
        return scratchCardsWonById_rtrn_1641;
    });
    f31["cljs$lang$maxFixedArity"] = 0;
    f31["cljs$lang$applyTo"] = (function(seq34) {
        let self__24463__auto__42 = this;
        return self__24463__auto__42.cljs$core$IFn$_invoke$arity$variadic(seq(seq34));
    });
    return f31;
})();
var part2 = (function(input) {
    let cards43 = parseCards(input);
    let cardsById44 = _PLUS_.keyBy(cardId, cards43);
    return _PLUS_.reduce((function(_anon_PERCENT_1_116, _anon_PERCENT_2_117) {
        return (_anon_PERCENT_1_116 + _anon_PERCENT_2_117);
    }), 0, _PLUS_.fmap((function(_anon_PERCENT_1_115) {
        return scratchCardsWonById(_anon_PERCENT_1_115, cardsById44);
    }), _PLUS_.keys(cardsById44)));
});

export {
    cardId,
    myWinCount,
    cardValue,
    part2,
    part1,
    parseCards,
    scratchCardsWonByCard,
    scratchCardsWonById,
    parseCard,
    CardT
}
