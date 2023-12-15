import * as lib from './lib.mjs';
import * as _PLUS_ from './../+.mjs';
var emptyXs = (function(line) {
    let res1 = _PLUS_.Set();
    _PLUS_.for$(lib.strsplit(line, ""), (function(_anon_PERCENT_1_45, _anon_PERCENT_2_46) {
        if (("." === _anon_PERCENT_1_45)) {
            return _PLUS_.push(res1, _anon_PERCENT_2_46);
        }
    }));
    return res1;
});
var make_grid = (function(input) {
    let rmemptyCols2 = {
        r: _PLUS_.None
    };
    let joinEmptyXs3 = (function(xs) {
        return (rmemptyCols2.r = ((function(memptyCols) {
            return _PLUS_.or(_PLUS_.Just(xs), _PLUS_.fmap((function(_anon_PERCENT_1_47) {
                return _PLUS_.Just(_PLUS_.intersection(xs, _anon_PERCENT_1_47));
            }), memptyCols));
        }))(rmemptyCols2.r));
    });
    let emptyCols4 = (function() {
        return _PLUS_.unwrap_BANG_(rmemptyCols2["r"]);
    });
    return _PLUS_.fmap((function(line) {
        return _PLUS_.fmap((function(_anon_PERCENT_1_51, _anon_PERCENT_2_50) {
            if (_PLUS_.has_QMARK_(emptyCols4(), _anon_PERCENT_2_50)) {
                return "x";
            } else {
                return _anon_PERCENT_1_51;
            }
        }), lib.strsplit(line, ""));
    }), _PLUS_.fmap((function(_anon_PERCENT_1_49) {
        let xs5 = emptyXs(_anon_PERCENT_1_49);
        joinEmptyXs3(xs5);
        if (!(_anon_PERCENT_1_49["length"] === _PLUS_.size(xs5))) {
            return _anon_PERCENT_1_49;
        } else {
            return _anon_PERCENT_1_49.replaceAll(".", "x");
        }
    }), _PLUS_.filter((function(_anon_PERCENT_1_48) {
        return (_anon_PERCENT_1_48.trim() !== "");
    }), lib.strsplit(input, "\n"))));
});
_PLUS_.qt_store[36] = "GalaxyT";
_PLUS_.bury(_PLUS_.prop_store, [36, undefined], ({
    0: ({
        "idname": "id",
        "fullname": "%id",
        "ind": 0
    }),
    1: ({
        "idname": "x",
        "fullname": "%x",
        "ind": 1
    }),
    2: ({
        "idname": "y",
        "fullname": "%y",
        "ind": 2
    })
}));
var GalaxyT = 36;
var Galaxy = (function(id, x, y) {
    return [36, id, x, y];
});
var gx = (function(val_148) {
    let var_x_1496 = val_148[2];
    return var_x_1496;
});
var gy = (function(val_150) {
    let var_y_1517 = val_150[3];
    return var_y_1517;
});
var distance = (function(g1, g2) {
    return (Math.abs((gx(g1) - gx(g2))) + Math.abs((gy(g1) - gy(g2))));
});
var get_galaxies = (function(grid, expandBy) {
    let galaxies8 = _PLUS_.Vec();
    let nextId9 = (function() {
        return _PLUS_.size(galaxies8);
    });
    let j10 = 0;
    let y11 = 0;
    while (true) {
        if ((j10 < _PLUS_.size(grid))) {
            let row12 = _PLUS_.at_BANG_(grid, j10);
            let G__13 = (j10 + 1);
            let G__14 = (function() {
                let i15 = 0;
                let x16 = 0;
                let allX_QMARK_17 = true;
                while (true) {
                    if ((i15 >= _PLUS_.size(row12))) {
                        return (y11 + 1 + ((allX_QMARK_17) ? (expandBy) : (0)));
                    } else {
                        let c18 = _PLUS_.at_BANG_(row12, i15);
                        if (("#" === c18)) {
                            _PLUS_.push(galaxies8, Galaxy(nextId9(), x16, y11));
                            let G__19 = (i15 + 1);
                            let G__20 = (x16 + 1);
                            let G__21 = false;
                            i15 = G__19;
                            x16 = G__20;
                            allX_QMARK_17 = G__21;
                            continue;
                        } else {
                            if (("." === c18)) {
                                let G__22 = (i15 + 1);
                                let G__23 = (x16 + 1);
                                let G__24 = false;
                                i15 = G__22;
                                x16 = G__23;
                                allX_QMARK_17 = G__24;
                                continue;
                            } else {
                                if (("x" === c18)) {
                                    let G__25 = (i15 + 1);
                                    let G__26 = (x16 + 1 + expandBy);
                                    let G__27 = allX_QMARK_17;
                                    i15 = G__25;
                                    x16 = G__26;
                                    allX_QMARK_17 = G__27;
                                    continue;
                                } else {
                                    return undefined;
                                }
                            }
                        }
                    };
                    break;
                }

            })();
            j10 = G__13;
            y11 = G__14;
            continue;
        };
        break;
    };
    return galaxies8;
});
var calc_sum = (function(input, expandBy) {
    let grid28 = make_grid(input);
    let galaxies29 = get_galaxies(grid28, expandBy);
    return _PLUS_.reduce((function(_anon_PERCENT_1_54, _anon_PERCENT_2_55) {
        return (_anon_PERCENT_1_54 + _anon_PERCENT_2_55);
    }), 0, _PLUS_.bind((function(_anon_PERCENT_1_52, _anon_PERCENT_2_53) {
        return _PLUS_.fmap((function(g2) {
            return distance(_anon_PERCENT_1_52, g2);
        }), _PLUS_.slice(galaxies29, (1 + _anon_PERCENT_2_53)));
    }), galaxies29));
});
var part1 = (function(input) {
    return calc_sum(input, 1);
});
var part2 = (function(input) {
    return calc_sum(input, (1000000 - 1));
});

export {
    Galaxy,
    emptyXs,
    calc_sum,
    part2,
    gx,
    part1,
    distance,
    make_grid,
    GalaxyT,
    get_galaxies,
    gy
}
