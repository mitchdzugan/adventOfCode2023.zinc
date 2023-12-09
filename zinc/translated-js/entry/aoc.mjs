import * as day1 from './../src/aoc/day1.mjs';
import * as day2 from './../src/aoc/day2.mjs';
import * as day3 from './../src/aoc/day3.mjs';
import * as day4 from './../src/aoc/day4.mjs';
import * as day5 from './../src/aoc/day5.mjs';
import * as day6 from './../src/aoc/day6.mjs';
import * as day7 from './../src/aoc/day7.mjs';
import * as day8 from './../src/aoc/day8.mjs';
import * as day9 from './../src/aoc/day9.mjs';
import * as lib from './../src/aoc/lib.mjs';
import * as _PLUS_ from './../src/+.mjs';
var dayModules = _PLUS_.Vec(day1, day2, day3, day4, day5, day6, day7, day8, day9);
var solve = (function(day) {
    let module1 = _PLUS_.or(({}), _PLUS_.at(dayModules, (day - 1)));
    _PLUS_.log(_PLUS_.str("❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ "));
    _PLUS_.log(_PLUS_.str("🎄 advent of code day ", day, " 🎄"));
    let input2 = lib.getInput(day);
    _PLUS_.log(_PLUS_.str("❄ 🎄 part 1:🎄 ❄ 🎄 ❄ 🎄 ❄ "));
    _PLUS_.log(module1.part1(input2));
    _PLUS_.log(_PLUS_.str("❄ 🎄 part 2:🎄 ❄ 🎄 ❄ 🎄 ❄ "));
    _PLUS_.log(module1.part2(input2));
    _PLUS_.log(_PLUS_.str("❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ "));
    return _PLUS_.log();
});
let toSolve3 = lib.parseInt(_PLUS_.dig(process, ["argv", 2]));
if (((toSolve3 > 0) && (toSolve3 <= _PLUS_.size(dayModules)))) {
    solve(toSolve3)
} else {
    _PLUS_.each((function(_, index) {
        return solve((index + 1));
    }), dayModules)
};

export {
    dayModules,
    solve
}
