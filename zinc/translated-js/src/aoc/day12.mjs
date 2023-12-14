import * as lib from './lib.mjs';
import * as _PLUS_ from './../+.mjs';
var part1 = (function(input) {
    return eval(lib.getRawInput("js/day12.js")).part1(input);
});
var part2 = (function(input) {
    return eval(lib.getRawInput("js/day12.js")).part2(input);
});

export {
    part1,
    part2
}
