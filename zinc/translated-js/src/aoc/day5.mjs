import * as lib from './lib.mjs';
import * as _PLUS_ from './../+.mjs';
undefined;
var InputDataT = 14;
var InputData = (function(initials, category_maps) {
    return [14, initials, category_maps];
});
undefined;
var GuideT = 15;
var Guide = (function(id, offset) {
    return [15, id, offset];
});
var guide_id = (function(val_23) {
    let var_id_241 = val_23[1];
    return var_id_241;
});
var offset = (function(val_25) {
    let var_offset_262 = val_25[2];
    return var_offset_262;
});
undefined;
var InitialT = 16;
var Item = (function(category, id) {
    return [16, 1, category, id];
});
var Range = (function(category, start, length) {
    return [16, 2, category, start, length];
});
undefined;
var CategoryMapT = 17;
var init_category_map = (function(src, dst) {
    return [17, src, dst, _PLUS_.Vec()];
});
var destination = (function(val_27) {
    let var_dst_283 = val_27[2];
    return var_dst_283;
});
var guides = (function(val_29) {
    let var_guides_304 = val_29[3];
    return var_guides_304;
});
var push_guide = (function(val_31, guide) {
    let var_guides_325 = val_31[3];
    return _PLUS_.push(var_guides_325, guide);
});
undefined;
var InputLineT = 18;
var parse_initial_seeds = (function(line) {
    let vec__69 = line.split(":");
    let _seeds10 = vec__69[0];
    let ids_str11 = vec__69[1];
    let $12 = ids_str11.trim();
    let $13 = lib.strsplit($12, lib.rx_whitespace);
    let $14 = _PLUS_.fmap(lib.parseInt, $13);
    return [18, 2, $14];
});
var parse_map_header = (function(line) {
    let vec__1521 = line.split(lib.rx_whitespace);
    let categories_str22 = vec__1521[0];
    let vec__1823 = categories_str22.split("-");
    let from24 = vec__1823[0];
    let _to_25 = vec__1823[1];
    let to26 = vec__1823[2];
    return [18, 3, from24, to26];
});
var parse_map_entry = (function(line) {
    let vec__2730 = line.split(lib.rx_whitespace).map(lib.parseInt);
    let dst31 = vec__2730[0];
    let src32 = vec__2730[1];
    let length33 = vec__2730[2];
    return [18, 4, dst31, src32, length33];
});
var parse_line = (function(line) {
    if (("" === line.trim())) {
        return [18, 1];
    } else {
        if (line.startsWith("seeds:")) {
            return parse_initial_seeds(line);
        } else {
            if (line.trim().endsWith("map:")) {
                return parse_map_header(line);
            } else {
                if ("else") {
                    return parse_map_entry(line);
                } else {
                    return undefined;
                }
            }
        }
    }
});
let get_guide_ind_impl_2334 = (function(id, guides) {
    let get_id35 = (function(_anon_PERCENT_1_63) {
        return guide_id(_PLUS_.at_BANG_(guides, _anon_PERCENT_1_63));
    });
    let lbound36 = 0;
    let rbound37 = (_PLUS_.size(guides) - 1);
    while (true) {
        if ((id < get_id35(lbound36))) {
            return _PLUS_.None;
        } else {
            if ((id >= get_id35(rbound37))) {
                return _PLUS_.Just(rbound37);
            } else {
                if (((rbound37 - lbound36) <= 1)) {
                    return _PLUS_.Just(lbound36);
                } else {
                    if ("else") {
                        let mbound38 = (lbound36 + _PLUS_.floor(((rbound37 - lbound36) / 2)));
                        if (_PLUS_.is(id, get_id35(mbound38))) {
                            return _PLUS_.Just(mbound38);
                        } else {
                            if ((id < get_id35(mbound38))) {
                                let G__39 = lbound36;
                                let G__40 = mbound38;
                                lbound36 = G__39;
                                rbound37 = G__40;
                                continue;
                            } else {
                                if ("else") {
                                    let G__41 = mbound38;
                                    let G__42 = rbound37;
                                    lbound36 = G__41;
                                    rbound37 = G__42;
                                    continue;
                                } else {
                                    return undefined;
                                }
                            }
                        }
                    } else {
                        return undefined;
                    }
                }
            }
        };
        break;
    }

});
let get_guide_ind_memo_2543 = _PLUS_.Map();
var get_guide_ind = (function() {
    let f44 = (function(var_args) {
        let args4548 = [];
        let len__24440__auto__49 = arguments["length"];
        let i4650 = 0;
        while (true) {
            if ((i4650 < len__24440__auto__49)) {
                args4548.push((arguments[i4650]));
                let G__51 = (i4650 + 1);
                i4650 = G__51;
                continue;
            };
            break;
        };
        let argseq__24702__auto__52 = (((0 < args4548["length"])) ? (args4548.slice(0)) : (undefined));
        return f44.cljs$core$IFn$_invoke$arity$variadic(argseq__24702__auto__52);
    });
    f44["cljs$core$IFn$_invoke$arity$variadic"] = (function(get_guide_ind_args_24) {
        let get_guide_ind_mkey_2253 = _PLUS_.encode(_PLUS_.fmap(_PLUS_.forcedKey, _PLUS_.apply(_PLUS_.Vec, get_guide_ind_args_24)));
        let get_guide_ind_rtrn_2154 = _PLUS_.or_((function() {
            return _PLUS_.apply(get_guide_ind_impl_2334, get_guide_ind_args_24);
        }), _PLUS_.at(get_guide_ind_memo_2543, get_guide_ind_mkey_2253));
        _PLUS_.put(get_guide_ind_memo_2543, get_guide_ind_mkey_2253, get_guide_ind_rtrn_2154);
        return get_guide_ind_rtrn_2154;
    });
    f44["cljs$lang$maxFixedArity"] = 0;
    f44["cljs$lang$applyTo"] = (function(seq47) {
        let self__24463__auto__55 = this;
        return self__24463__auto__55.cljs$core$IFn$_invoke$arity$variadic(seq(seq47));
    });
    return f44;
})();
var get_offset = (function(id, guides) {
    return _PLUS_.or(0, _PLUS_.fmap((function(_anon_PERCENT_1_64) {
        return offset(_PLUS_.at_BANG_(guides, _anon_PERCENT_1_64));
    }), get_guide_ind(id, guides)));
});
var get_associated_item = (function(category_maps, category, id) {
    let cat_map56 = _PLUS_.at_BANG_(category_maps, category);
    return Item(destination(cat_map56), (id + get_offset(id, guides(cat_map56))));
});
var get_associated_ranges = (function(category_maps, category, start, length) {
    let cat_map57 = _PLUS_.at_BANG_(category_maps, category);
    let cat_guides58 = guides(cat_map57);
    let dst59 = destination(cat_map57);
    let mk_range60 = (function(_anon_PERCENT_1_65, _anon_PERCENT_2_66) {
        return Range(dst59, _anon_PERCENT_1_65, _anon_PERCENT_2_66);
    });
    let get_id61 = (function(_anon_PERCENT_1_67) {
        return guide_id(_PLUS_.at_BANG_(cat_guides58, _anon_PERCENT_1_67));
    });
    let get_offset62 = (function(_anon_PERCENT_1_68) {
        return offset(_PLUS_.at_BANG_(cat_guides58, _anon_PERCENT_1_68));
    });
    let results63 = _PLUS_.Vec();
    let end64 = (start + length);
    let oob_QMARK_65 = (function(_anon_PERCENT_1_69) {
        return (_anon_PERCENT_1_69 >= end64);
    });
    let id66 = start;
    let m_ind67 = get_guide_ind(start, cat_guides58);
    while (true) {
        let off68 = _PLUS_.or(0, _PLUS_.fmap(get_offset62, m_ind67));
        let ind69 = _PLUS_.or(0, _PLUS_.fmap(_PLUS_.inc, m_ind67));
        if (((ind69 >= _PLUS_.size(cat_guides58)) || oob_QMARK_65(get_id61(ind69)))) {
            _PLUS_.push(results63, mk_range60((id66 + off68), (end64 - id66)))
        } else {
            let next_id70 = get_id61(ind69);
            _PLUS_.push(results63, mk_range60((id66 + off68), (next_id70 - id66)));
            let G__71 = next_id70;
            let G__72 = _PLUS_.Just(ind69);
            id66 = G__71;
            m_ind67 = G__72;
            continue;
        };
        break;
    };
    return results63;
});
var get_location = (function(category_maps, val_33) {
    let val_3473 = val_33;
    let spec_3574 = ({
        1: (function() {
            let var_category_3675 = val_3473[2];
            let var_id_3776 = val_3473[3];
            if (_PLUS_.is("location", var_category_3675)) {
                return var_id_3776;
            } else {
                return get_location(category_maps, get_associated_item(category_maps, var_category_3675, var_id_3776));
            }
        }),
        2: (function() {
            let var_category_3877 = val_3473[2];
            let var_start_3978 = val_3473[3];
            let var_length_4079 = val_3473[4];
            if (_PLUS_.is("location", var_category_3877)) {
                return var_start_3978;
            } else {
                return min_location(category_maps, get_associated_ranges(category_maps, var_category_3877, var_start_3978, var_length_4079));
            }
        })
    });
    return (spec_3574[val_3473[1]] || spec_3574[0])();
});
var min_location = (function(category_maps, initials) {
    return _PLUS_.unwrap_BANG_(_PLUS_.reduce((function(acc, loc) {
        return _PLUS_.Just(_PLUS_.min(_PLUS_.or(loc, acc), loc));
    }), _PLUS_.None, _PLUS_.fmap((function(initial) {
        return get_location(category_maps, initial);
    }), initials)));
});
var min_location_for_input = (function(val_41) {
    let var_category_maps_4280 = val_41[2];
    let var_initials_4381 = val_41[1];
    return min_location(var_category_maps_4280, var_initials_4381);
});
var parse_input = (function(input, ranges_QMARK_) {
    let rsrc82 = {
        r: ""
    };
    let rmap83 = {
        r: _PLUS_.Map()
    };
    let rinitials84 = {
        r: _PLUS_.Vec()
    };
    let category_maps85 = _PLUS_.Map();
    let inputs86 = _PLUS_.fmap(parse_line, lib.strsplit(input, "\n"));
    let finalize_category_map87 = (function() {
        _PLUS_.each((function(cat_map) {
            return _PLUS_.each((function(_anon_PERCENT_1_72) {
                return push_guide(cat_map, _anon_PERCENT_1_72);
            }), _PLUS_.sort_by(guide_id, _PLUS_.vals(_PLUS_.fmap((function(_anon_PERCENT_1_71, _anon_PERCENT_2_70) {
                return Guide(_anon_PERCENT_2_70, _anon_PERCENT_1_71);
            }), rmap83["r"]))));
        }), _PLUS_.at(category_maps85, rsrc82["r"]));
        return (rmap83.r = _PLUS_.Map());
    });
    _PLUS_.each((function(val_44) {
        let val_4588 = val_44;
        let spec_4689 = ({
            2: (function() {
                let var_seeds_4790 = val_4588[2];
                return (rinitials84.r = ((ranges_QMARK_) ? (_PLUS_.fmap((function(n) {
                    return Range("seed", _PLUS_.at_BANG_(var_seeds_4790, (0 + (2 * n))), _PLUS_.at_BANG_(var_seeds_4790, (1 + (2 * n))));
                }), _PLUS_.Range(_PLUS_.floor((_PLUS_.size(var_seeds_4790) / 2))))) : (_PLUS_.fmap((function(id) {
                    return Item("seed", id);
                }), var_seeds_4790))));
            }),
            3: (function() {
                let var_from_4891 = val_4588[2];
                let var_to_4992 = val_4588[3];
                finalize_category_map87();
                _PLUS_.put(category_maps85, var_from_4891, init_category_map(var_from_4891, var_to_4992));
                return (rsrc82.r = var_from_4891);
            }),
            4: (function() {
                let var_dst_5093 = val_4588[2];
                let var_src_5194 = val_4588[3];
                let var_length_5295 = val_4588[4];
                let offset96 = (var_dst_5093 - var_src_5194);
                let end97 = (var_src_5194 + var_length_5295);
                _PLUS_.put(rmap83["r"], var_src_5194, offset96);
                return _PLUS_.put(rmap83["r"], end97, _PLUS_.or(0, _PLUS_.at(rmap83["r"], end97)));
            }),
            0: (function() {
                return undefined;
            })
        });
        return (spec_4689[val_4588[1]] || spec_4689[0])();
    }), inputs86);
    finalize_category_map87();
    return InputData(rinitials84["r"], category_maps85);
});
var part1 = (function(input) {
    return min_location_for_input(parse_input(input, false));
});
var part2 = (function(input) {
    return min_location_for_input(parse_input(input, true));
});

export {
    parse_map_header,
    init_category_map,
    InitialT,
    destination,
    offset,
    GuideT,
    min_location_for_input,
    guide_id,
    parse_map_entry,
    part2,
    parse_initial_seeds,
    Range,
    parse_input,
    part1,
    InputData,
    InputDataT,
    get_associated_item,
    push_guide,
    get_offset,
    get_location,
    get_guide_ind,
    InputLineT,
    min_location,
    parse_line,
    CategoryMapT,
    guides,
    Item,
    get_associated_ranges,
    Guide
}
