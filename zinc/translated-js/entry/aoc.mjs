import * as day1 from './../src/aoc/day1.mjs';import * as lib from './../src/aoc/lib.mjs';
import * as _PLUS_ from './../src/+.mjs';
var dayModules = _PLUS_.Vec(day1)
;
var solve = (function (day) {
let module1 = _PLUS_.or(({  }), _PLUS_.at(dayModules, (day - 1)));
_PLUS_.log(_PLUS_.str("❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ "));
_PLUS_.log(_PLUS_.str("🎄 advent of code day ", day, " 🎄"));
let solution2 = module1.solve();
_PLUS_.log(_PLUS_.str("❄ 🎄 part 1:🎄 ❄ 🎄 ❄ 🎄 ❄ "));
_PLUS_.log(lib.part1(solution2));
_PLUS_.log(_PLUS_.str("❄ 🎄 part 2:🎄 ❄ 🎄 ❄ 🎄 ❄ "));
_PLUS_.log(lib.part2(solution2));
_PLUS_.log(_PLUS_.str("❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ 🎄 ❄ "));
return _PLUS_.log();
})
;
let toSolve3 = parseInt(_PLUS_.dig(process, ["argv", 2]), 10);
if (((toSolve3 > 0) && (toSolve3 <= _PLUS_.size(dayModules)))) {
solve(toSolve3)} else {
_PLUS_.each((function (_, index) {
return solve((index + 1));
}), dayModules)};

export { dayModules, solve }
