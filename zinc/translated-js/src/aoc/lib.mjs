import * as path from 'path';import fs from 'fs';
import * as _PLUS_ from './../+.mjs';
_PLUS_.qt_store[16] = "SolutionT";
_PLUS_.bury(_PLUS_.prop_store, [16, undefined], ({ 0: ({ "idname": "part1", "fullname": "%part1", "ind": 0 }), 1: ({ "idname": "part2", "fullname": "%part2", "ind": 1 }) }));
var SolutionT = 16
;
var Solution = (function (part1, part2) {
return [16, part1, part2];
})
;
var part1 = (function (val_22) {
let var_part1_231 = val_22[1];
return var_part1_231;
})
;
var part2 = (function (val_24) {
let var_part2_252 = val_24[2];
return var_part2_252;
})
;
var strsplit = (function (src, split) {
return _PLUS_.apply(_PLUS_.Vec, src.split(split));
})
;
var getInput = (function (n) {
let basename3 = _PLUS_.str("day", n);
let filename4 = path.join(__dirname, "..", "resources", "input", basename3);
return fs.readFileSync(filename4, "utf8");
})
;

export { SolutionT, Solution, part1, part2, strsplit, getInput }
