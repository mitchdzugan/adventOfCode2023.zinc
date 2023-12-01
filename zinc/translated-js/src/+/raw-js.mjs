
// #_("
const _dig = (o, ks) => {
  let i = 0;
  let res = o;
  while (i < ks.length && res) {
    res = res[ks[i]]
    i++;
  }
  return res;
}
const _bury = (o, ks, v) => {
  let i = 0;
  let curr = o;
  while (i < ks.length - 1) {
    const k = ks[i]
    curr = curr[k] = curr[k] || {}
    i++;
  }
  curr[ks[i]] = v
}
const _log = (...args) => console.log(...args.map(a => a && a.P));
const _jlog = (...args) => console.log(...args.map(a => a && a.J));
const _rlog = (...args) => console.log(...args);
const _inc = (i) => i + 1
const _dec = (i) => i - 1
const _id = a => a
const _const = (a) => () => a
const _apply = (f, ...args) => {
  const [last, ...rest] = args.reverse();
  const correct = [...rest.reverse(), ...last];
  return f.apply(null, correct);
}
const _str = (...args) => args.join("");
const _argv = (...args) => args;
const _is = Object.is;
const _isNil = v => _is(v, undefined) || _is(v, null);
const _null = null;
const _isArray = Array.isArray
const _isFunction = (s) => _is(typeof(s), 'function');
const _isStr = (s) => _is(typeof(s), 'string');
const _arrayFrom = (it, a1, a2) => Array.from(!(a1 || a2) ? it : (function* () {
  const pre = _isArray(a1) ? a1 : (_isArray(a2) ? a2 : []);
  const f = _isFunction(a1) ? a1 : (_isFunction(a2) ? a2 : _id);
  for (const el of pre) { yield el; }
  for (const el of it) { yield f(el); }
})())
const _flatArrayFrom = (it, a1, a2) => Array.from(!(a1 || a2) ? it : (function* () {
  const pre = _isArray(a1) ? a1 : (_isArray(a2) ? a2 : []);
  const f = _isFunction(a1) ? a1 : (_isFunction(a2) ? a2 : _id);
  for (const el of pre) { yield el; }
  for (const v of it) {
    for (const el of f(v)) { yield el; }
  }
})())
const _length = a => a.length
const _not = (v) => !v
const _partial = (f, ...initArgs) => (...restArgs) => f(...initArgs, ...restArgs)
const _mod = (a, b) => a % b
const _etc = (vs) => Array.from(function*() {
  if (!vs.length) { return }
  let curr = vs[0];
  for (const next of vs.slice(1)) {
    yield curr;
    curr = next;
  }
  for (const el of curr) {
    yield el;
  }
})
const _max = (a, b) => Math.max(a, b);
const _min = (a, b) => Math.min(a, b);
const _ceil = (a) => Math.ceil(a);
const _floor = (a) => Math.floor(a);
const _round = (a) => Math.round(a);
const _div = (a, b) => (a / b)
const _pow = (a, b) => Math.pow(a, b);
const _abs = (a) => Math.abs(a);
const _random = () => Math.random();
// ")
;
var id = _id
;
var const$ = _const
;
var apply = _apply
;
var dig = _dig
;
var bury = _bury
;
var log = (_log || _log || (function () {
return undefined;
}))
;
var jlog = (_jlog || _jlog || (function () {
return undefined;
}))
;
var rlog = (_rlog || _rlog || (function () {
return undefined;
}))
;
var inc = _inc
;
var dec = _dec
;
var str = _str
;
var argv = _argv
;
var is = _is
;
var nil_QMARK_ = _isNil
;
var null$ = _null
;
var js_array_QMARK_ = _isArray
;
var js_function_QMARK_ = _isFunction
;
var js_str_QMARK_ = _isStr
;
var js_array_from = _arrayFrom
;
var js_flat_array_from = _flatArrayFrom
;
var js_length = _length
;
var not = _not
;
var partial = _partial
;
var mod = _mod
;
var MapClass = Map
;
var max = _max
;
var min = _min
;
var ceil = _ceil
;
var floor = _floor
;
var round = _round
;
var div = _div
;
var pow = _pow
;
var abs = _abs
;
var random = _random
;

export { partial, floor, ceil, random, min, null$, not, str, is, rlog, js_array_QMARK_, max, id, pow, MapClass, log, jlog, apply, inc, js_length, bury, nil_QMARK_, mod, js_str_QMARK_, dig, div, abs, js_array_from, const$, argv, js_function_QMARK_, round, dec, js_flat_array_from }
