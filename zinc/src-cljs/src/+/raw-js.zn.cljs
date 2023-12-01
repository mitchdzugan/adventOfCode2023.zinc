#zinc/preprocess
(def prod? (= "production" (.. js/process -env -NODE_ENV)))

#zinc/preprocess
(defmacro dev-only [v] (when-not prod? v))

```
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
```

(def id js/_id)
(def const js/_const)
(def apply js/_apply)
(def dig js/_dig)
(def bury js/_bury)
(def log (or (dev-only js/_log) js/_log (fn [])))
(def jlog (or (dev-only js/_jlog) js/_jlog (fn [])))
(def rlog (or (dev-only js/_rlog) js/_rlog (fn [])))
(def inc js/_inc)
(def dec js/_dec)
(def str js/_str)
(def argv js/_argv)
(def is js/_is)
(def nil? js/_isNil)
(def null js/_null)
(def js-array? js/_isArray)
(def js-function? js/_isFunction)
(def js-str? js/_isStr)
(def js-array-from js/_arrayFrom)
(def js-flat-array-from js/_flatArrayFrom)
(def js-length js/_length)
(def not js/_not)
(def partial js/_partial)
(def mod js/_mod)
(def MapClass js/Map)
(def max js/_max)
(def min js/_min)
(def ceil js/_ceil)
(def floor js/_floor)
(def round js/_round)
(def div js/_div)
(def pow js/_pow)
(def abs js/_abs)
(def random js/_random)
