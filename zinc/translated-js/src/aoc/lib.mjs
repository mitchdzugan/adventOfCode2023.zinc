import * as path from 'path';
import fs from 'fs';
import * as _PLUS_ from './../+.mjs';
var rx_whitespace = new RegExp("\\s+");
var strsplit = (function(src, split) {
    return _PLUS_.apply(_PLUS_.Vec, src.split(split));
});
var parseInt = (function(s) {
    return global.parseInt(s, 10);
});
var getInput = (function(n) {
    let basename1 = _PLUS_.str("day", n);
    let filename2 = path.join(__dirname, "..", "resources", "input", basename1);
    return fs.readFileSync(filename2, "utf8");
});

export {
    rx_whitespace,
    strsplit,
    parseInt,
    getInput
}
