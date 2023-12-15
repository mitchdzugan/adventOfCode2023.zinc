((() => {
  const problems = `
`
  const sample = `
  rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7
`
  const sum = (a, f = (a => a)) => a.map(f).reduce((acc, el) => acc + el, 0);

  const cacheFn = (impl, makeKey_) => {
    const cache = {};
    const makeKey = makeKey_ || ((...args) => JSON.stringify(args));
    return (...args) => (
      cache[makeKey(...args)] ||= impl(...args)
    );
  };

  const hash = (s) => {
    let curr = 0;
    for (let i = 0; i < s.length; i++) {
      curr += s.charCodeAt(i);
      curr *= 17;
      curr %= 256;
    }
    return curr;
  };

  const newLHM = () => ({ data: {} });

  const put = (lhm, label, focal) => {
    if (lhm.data[label]) {
      lhm.data[label].v = focal;
    } else if (lhm.ends) {
      lhm.data[label] = { v: focal, p: lhm.ends.r };
      lhm.data[lhm.ends.r].n = label;
      lhm.ends.r = label;
    } else {
      lhm.data[label] = { v: focal };
      lhm.ends = { r: label, l: label };
    }
  };

  const pull = (lhm, label) => {
    if (!lhm.data[label]) { return; }
    if (lhm.data[label].p) {
      lhm.data[lhm.data[label].p].n = lhm.data[label].n;
    } else {
      if (!lhm.data[label].n) { delete lhm.ends; lhm.data = {}; return; }
      lhm.ends.l = lhm.data[label].n;
    }
    if (lhm.data[label].n) {
      lhm.data[lhm.data[label].n].p = lhm.data[label].p;
    } else {
      lhm.ends.r = lhm.data[label].p;
    }
    delete lhm.data[label];
  }

  const toArray = (lhm) => {
    let res = [];
    let curr = lhm.ends && lhm.ends.l;
    while (curr) {
      res.push(lhm.data[curr].v);
      curr = lhm.data[curr].n;
    }
    return res;
  };

  const Ops = { Put: 1, Pull: 2 };

  const toOp = (str) => {
    const byEq = str.split("=");
    if (byEq.length === 2) {
      return {
        label: byEq[0],
        focal: parseInt(byEq[1], 10),
        op: Ops.Put,
      };
    } else {
      return {
        label: str.split("-")[0],
        op: Ops.Pull,
      }
    }
  };

  return {
    part1: (input) => {
      const steps = input.split(",").map(s => s.trim());
      return sum(steps, hash);
    },
    part2: (input) => {
      const boxes = [];
      for (let i = 0; i < 256; i++) {
        boxes.push({ factor: i + 1, lhm: newLHM() });
      }
      const ops_strs = input.split(",").map(s => s.trim());
      const ops = ops_strs.map(toOp);
      for (const op of ops) {
        const box = boxes[hash(op.label)];
        if (op.op === Ops.Put) {
          put(box.lhm, op.label, op.focal);
        } else {
          pull(box.lhm, op.label);
        }
      }
      let total = 0;
      for (const box of boxes) {
        for (const [slotInd, focal] of toArray(box.lhm).entries()) {
          total += (box.factor * (slotInd + 1) * focal);
        }
      }
      return total;
    },
  };
})())
