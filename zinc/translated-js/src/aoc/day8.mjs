import * as lib from './lib.mjs';
import * as _PLUS_ from './../+.mjs';
var gcd = (function(a_, b_) {
    let a1 = a_;
    let b2 = b_;
    while (true) {
        if (_PLUS_.is(0, b2)) {
            return a1;
        } else {
            let G__3 = b2;
            let G__4 = _PLUS_.mod(a1, b2);
            a1 = G__3;
            b2 = G__4;
            continue;
        };
        break;
    }

});
var lcm = (function(a_, b_) {
    let a5 = _PLUS_.max(a_, b_);
    let b6 = _PLUS_.min(a_, b_);
    return ((a5 / gcd(a5, b6)) * b6);
});
undefined;
var DirectionT = 19;
var Left = [19, 1];
var Right = [19, 2];
var left_QMARK_ = (function(val_53) {
    let val_547 = val_53;
    let spec_558 = ({
        1: (function() {
            return true;
        }),
        0: (function() {
            return false;
        })
    });
    return (spec_558[val_547[1]] || spec_558[0])();
});
undefined;
var NodeT = 20;
var Node = (function(id, left, right) {
    return [20, id, left, right];
});
var left = (function(val_56) {
    let var_left_579 = val_56[2];
    return var_left_579;
});
var right = (function(val_58) {
    let var_right_5910 = val_58[3];
    return var_right_5910;
});
var nodeId = (function(val_60) {
    let var_id_6111 = val_60[1];
    return var_id_6111;
});
var parseLine = (function(line) {
    let vec__1215 = line.split("=");
    let idstr16 = vec__1215[0];
    let neighbors17 = vec__1215[1];
    let id18 = idstr16.trim();
    let left19 = neighbors17.split(",")[0].split("(")[1].trim();
    let right20 = neighbors17.split(",")[1].split(")")[0].trim();
    return Node(id18, left19, right20);
});
var parseNav = (function(line) {
    return _PLUS_.bind((function(_anon_PERCENT_1_72) {
        if ((_anon_PERCENT_1_72 === "L")) {
            return _PLUS_.Vec(Left);
        } else {
            if ((_anon_PERCENT_1_72 === "R")) {
                return _PLUS_.Vec(Right);
            } else {
                if ("else") {
                    return _PLUS_.Vec();
                } else {
                    return undefined;
                }
            }
        }
    }), lib.strsplit(line, ""));
});
undefined;
var NavInputT = 21;
var NavInput = (function(nav, nodes) {
    return [21, nav, nodes];
});
var parseInput = (function(input) {
    let lines21 = lib.strsplit(input, "\n");
    let navLine22 = _PLUS_.at_BANG_(lines21, 0);
    let nav23 = parseNav(navLine22);
    let nodes24 = _PLUS_.keyBy((function(val_62) {
        let var_id_6325 = val_62[1];
        return var_id_6325;
    }), _PLUS_.fmap(parseLine, _PLUS_.filter((function(_anon_PERCENT_1_73) {
        return _anon_PERCENT_1_73.includes("=");
    }), lines21)));
    return NavInput(nav23, nodes24);
});
var step = (function(val_64, steps, id) {
    let var_nodes_6526 = val_64[2];
    let var_nav_6627 = val_64[1];
    let node28 = _PLUS_.at_BANG_(var_nodes_6526, id);
    let dir29 = _PLUS_.at_BANG_(var_nav_6627, _PLUS_.mod(steps, _PLUS_.size(var_nav_6627)));
    return ((left_QMARK_(dir29)) ? (left) : (right))(node28);
});
var part1 = (function(input) {
    return (function(val_67) {
        let steps30 = 0;
        let id31 = "AAA";
        while (true) {
            if ((id31 === "ZZZ")) {
                return steps30;
            } else {
                let G__32 = (steps30 + 1);
                let G__33 = step(val_67, steps30, id31);
                steps30 = G__32;
                id31 = G__33;
                continue;
            };
            break;
        }

    })(parseInput(input));
});
undefined;
var PatternT = 32;
var Pattern = (function(initLength, loopLength, inits, loops) {
    return [32, initLength, loopLength, inits, loops];
});
var NullPattern = Pattern(0, 0, _PLUS_.Vec(), _PLUS_.Vec());
var nullPattern_QMARK_ = (function(val_68) {
    let var_initLength_6934 = val_68[1];
    let var_loopLength_7035 = val_68[2];
    return _PLUS_.is(0, (var_initLength_6934 + var_loopLength_7035));
});
var in_pattern_QMARK_ = (function(val_71, target) {
    let var_initLength_7236 = val_71[1];
    let var_loopLength_7337 = val_71[2];
    let var_inits_7438 = val_71[3];
    let var_loops_7539 = val_71[4];
    let offsetTarget40 = _PLUS_.mod((target - var_initLength_7236), var_loopLength_7337);
    let isTarget_QMARK_41 = (function(v) {
        return _PLUS_.is(target, v);
    });
    let isOffsetTarget_QMARK_42 = (function(v) {
        return _PLUS_.is(offsetTarget40, v);
    });
    if ((target < var_initLength_7236)) {
        return _PLUS_.any_QMARK_(isTarget_QMARK_41, var_inits_7438);
    } else {
        return _PLUS_.any_QMARK_(isOffsetTarget_QMARK_42, var_loops_7539);
    }
});
var gen_until = (function(val_76, stepCap_, genCap_) {
    let var_initLength_7743 = val_76[1];
    let var_loopLength_7844 = val_76[2];
    let var_inits_7945 = val_76[3];
    let var_loops_8046 = val_76[4];
    let stepCap47 = (stepCap_ || 0);
    let genCap48 = (genCap_ || 0);
    let res49 = _PLUS_.Vec();
    let loopStart50 = (function(i) {
        return (var_initLength_7743 + (i * var_loopLength_7844));
    });
    let validStep_QMARK_51 = (function(v) {
        return (_PLUS_.is(0, stepCap47) || (v < stepCap47));
    });
    let canGen_QMARK_52 = (function() {
        return (_PLUS_.is(0, genCap48) || (_PLUS_.size(res49) < genCap48));
    });
    let canPush_QMARK_53 = (function(v) {
        return (validStep_QMARK_51(v) && canGen_QMARK_52());
    });
    let push54 = (function(v) {
        if (canPush_QMARK_53(v)) {
            return _PLUS_.push(res49, v);
        }
    });
    let pushLoop55 = (function(i) {
        return function(v) {
            return push54((loopStart50(i) + v));
        };
    });
    let validIter_QMARK_56 = (function(i) {
        return validStep_QMARK_51(loopStart50(i));
    });
    _PLUS_.for$(var_inits_7945, push54);
    let i57 = 0;
    while (true) {
        if ((canGen_QMARK_52() && validIter_QMARK_56(i57))) {
            _PLUS_.for$(var_loops_8046, pushLoop55(i57));
            let G__58 = (i57 + 1);
            i57 = G__58;
            continue;
        } else {
            return res49;
        };
        break;
    }

});
var merge = (function(p1, p2) {
    if (nullPattern_QMARK_(p1)) {
        return p2;
    } else {
        if (nullPattern_QMARK_(p2)) {
            return p1;
        } else {
            if ("else") {
                let var_initLength_8159 = p1[1];
                let var_loopLength_8260 = p1[2];
                let var_initLength_8361 = p2[1];
                let var_loopLength_8462 = p2[2];
                let initLength63 = _PLUS_.max(var_initLength_8159, var_initLength_8361);
                let loopLength64 = lcm(var_loopLength_8260, var_loopLength_8462);
                let inits65 = _PLUS_.Vec();
                let loops66 = _PLUS_.Vec();
                let total67 = (initLength63 + loopLength64);
                _PLUS_.for$(gen_until(p1, total67), (function(v) {
                    if (in_pattern_QMARK_(p2, v)) {
                        if ((v < initLength63)) {
                            return _PLUS_.push(inits65, v);
                        } else {
                            return _PLUS_.push(loops66, (v - initLength63));
                        }
                    }
                }));
                return Pattern(initLength63, loopLength64, inits65, loops66);
            } else {
                return undefined;
            }
        }
    }
});
var fill_pattern = (function(val_85, startId, initLength, totalLength) {
    let loopLength68 = (totalLength - initLength);
    let inits69 = _PLUS_.Vec();
    let loops70 = _PLUS_.Vec();
    let steps71 = 0;
    let id72 = startId;
    while (true) {
        let loop_QMARK_73 = (steps71 >= initLength);
        let done_QMARK_74 = (steps71 >= (initLength + loopLength68));
        if (done_QMARK_74) {
            return Pattern(initLength, loopLength68, inits69, loops70);
        } else {
            if (id72.endsWith("Z")) {
                _PLUS_.push(((loop_QMARK_73) ? (loops70) : (inits69)), ((loop_QMARK_73) ? ((steps71 - initLength)) : (steps71)))
            };
            let G__75 = (steps71 + 1);
            let G__76 = step(val_85, steps71, id72);
            steps71 = G__75;
            id72 = G__76;
            continue;
        };
        break;
    }

});
var find_pattern = (function(val_86, startId) {
    let var_nav_8777 = val_86[1];
    let seen78 = _PLUS_.Map();
    let steps79 = 0;
    let id80 = startId;
    while (true) {
        let navPos81 = _PLUS_.mod(steps79, _PLUS_.size(var_nav_8777));
        let pos82 = _PLUS_.str(id80, ".", navPos81);
        if (_PLUS_.has_QMARK_(seen78, pos82)) {
            return fill_pattern(val_86, startId, _PLUS_.at_BANG_(seen78, pos82), steps79);
        } else {
            _PLUS_.put(seen78, pos82, steps79);
            let G__83 = (steps79 + 1);
            let G__84 = step(val_86, steps79, id80);
            steps79 = G__83;
            id80 = G__84;
            continue;
        };
        break;
    }

});
var part2 = (function(input) {
    return gen_until((function(val_88) {
        let var_nodes_8985 = val_88[2];
        return _PLUS_.reduce((function(acc, p) {
            return merge(acc, p);
        }), NullPattern, _PLUS_.fmap((function(id) {
            return find_pattern(val_88, id);
        }), _PLUS_.filter((function(id) {
            return id.endsWith("A");
        }), _PLUS_.fmap(nodeId, _PLUS_.vals(var_nodes_8985)))));
    })(parseInput(input)), 0, 1);
});

export {
    in_pattern_QMARK_,
    nullPattern_QMARK_,
    right,
    Left,
    NullPattern,
    NavInput,
    gen_until,
    parseNav,
    lcm,
    DirectionT,
    part2,
    find_pattern,
    nodeId,
    Pattern,
    fill_pattern,
    gcd,
    part1,
    parseInput,
    NavInputT,
    NodeT,
    Right,
    PatternT,
    merge,
    Node,
    left_QMARK_,
    left,
    step,
    parseLine
}
