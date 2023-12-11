import * as path from 'path';
import fs from 'fs';
import * as _PLUS_ from './../+.mjs';
var rx_whitespace = new RegExp("\\s+");
var strsplit = (function(src, split) {
    return _PLUS_.apply(_PLUS_.Vec, src.split(split));
});
var parseInt = (function(s) {
    return Number.parseInt(s, 10);
});
var getRawInput = (function(basename) {
    let filename1 = ((basename.startsWith(".")) ? (basename) : (path.join(__dirname, "..", "resources", "input", basename)));
    return fs.readFileSync(filename1, "utf8");
});
var getInput = (function(n) {
    return getRawInput(_PLUS_.str("day", n));
});

export {
    rx_whitespace,
    strsplit,
    parseInt,
    getRawInput,
    getInput
}
