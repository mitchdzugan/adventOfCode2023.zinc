import * as day1 from './../src/aoc/day1.mjs';
import * as day2 from './../src/aoc/day2.mjs';
import * as day3 from './../src/aoc/day3.mjs';
import * as day4 from './../src/aoc/day4.mjs';
import * as day5 from './../src/aoc/day5.mjs';
import * as day6 from './../src/aoc/day6.mjs';
import * as day7 from './../src/aoc/day7.mjs';
import * as day8 from './../src/aoc/day8.mjs';
import * as day9 from './../src/aoc/day9.mjs';
import * as day10 from './../src/aoc/day10.mjs';
import * as day11 from './../src/aoc/day11.mjs';
import * as day12 from './../src/aoc/day12.mjs';
import * as day13 from './../src/aoc/day13.mjs';
import * as day14 from './../src/aoc/day14.mjs';
import * as day15 from './../src/aoc/day15.mjs';
import * as day16 from './../src/aoc/day16.mjs';
import * as day17 from './../src/aoc/day17.mjs';
import * as lib from './../src/aoc/lib.mjs';
import * as _PLUS_ from './../src/+.mjs';
var dayModules = _PLUS_.Vec(day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17);
var toSolve = _PLUS_.Vec();
var rp1_QMARK_ = {
    r: true
};
var rp2_QMARK_ = {
    r: true
};
var rgetInput = {
    r: lib.getInput
};
var solve = (function(day) {
    let module1 = _PLUS_.or(({}), _PLUS_.at(dayModules, (day - 1)));
    _PLUS_.log(_PLUS_.str("❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ "));
    _PLUS_.log(_PLUS_.str("🎄 advent of code day ", day, " 🎄"));
    let input2 = rgetInput["r"](day);
    if (rp1_QMARK_["r"]) {
        _PLUS_.log(_PLUS_.str("❄ 🎄 part 1:🎄 ❄ 🎄 ❄ 🎄 ❄ "));
        _PLUS_.log(module1.part1(input2))
    };
    if (rp2_QMARK_["r"]) {
        _PLUS_.log(_PLUS_.str("❄ 🎄 part 2:🎄 ❄ 🎄 ❄ 🎄 ❄ "));
        _PLUS_.log(module1.part2(input2))
    };
    _PLUS_.log(_PLUS_.str("❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ "));
    return _PLUS_.log();
});
let n3 = 2;
let past_opts_QMARK_4 = false;
while (true) {
    if ((n3 < process.argv["length"])) {
        let push5 = (function(_anon_PERCENT_1_1) {
            let v6 = lib.parseInt(_anon_PERCENT_1_1);
            if (((v6 > 0) && (v6 <= _PLUS_.size(dayModules)))) {
                return _PLUS_.push(toSolve, v6);
            }
        });
        let arg7 = process.argv[n3];
        if (past_opts_QMARK_4) {
            push5(arg7);
            let G__8 = (n3 + 1);
            let G__9 = true;
            n3 = G__8;
            past_opts_QMARK_4 = G__9;
            continue;
        } else {
            if ((arg7 === "-n1")) {
                (rp1_QMARK_.r = false);
                let G__10 = (n3 + 1);
                let G__11 = false;
                n3 = G__10;
                past_opts_QMARK_4 = G__11;
                continue;
            } else {
                if ((arg7 === "-n2")) {
                    (rp2_QMARK_.r = false);
                    let G__12 = (n3 + 1);
                    let G__13 = false;
                    n3 = G__12;
                    past_opts_QMARK_4 = G__13;
                    continue;
                } else {
                    if ((arg7 === "-i")) {
                        let basename14 = process.argv[(n3 + 1)];
                        let getInput15 = (function() {
                            return lib.getRawInput(basename14);
                        });
                        (rgetInput.r = getInput15);
                        let G__16 = (n3 + 2);
                        let G__17 = false;
                        n3 = G__16;
                        past_opts_QMARK_4 = G__17;
                        continue;
                    } else {
                        if ("else") {
                            push5(arg7);
                            let G__18 = (n3 + 1);
                            let G__19 = true;
                            n3 = G__18;
                            past_opts_QMARK_4 = G__19;
                            continue;
                        } else {
                            undefined
                        }
                    }
                }
            }
        }
    };
    break;
};
if (_PLUS_.empty_QMARK_(toSolve)) {
    _PLUS_.for$(dayModules, (function(_anon_PERCENT_1_3, _anon_PERCENT_2_2) {
        return _PLUS_.push(toSolve, (1 + _anon_PERCENT_2_2));
    }))
};
_PLUS_.for$(toSolve, solve);

export {
    dayModules,
    toSolve,
    rp1_QMARK_,
    rp2_QMARK_,
    rgetInput,
    solve
}
