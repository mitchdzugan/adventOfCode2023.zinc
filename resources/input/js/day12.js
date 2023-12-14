((() => {
  const sample = `
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`
  const sum = (a, f = (a => a)) => a.map(f).reduce((acc, el) => acc + el, 0);

  const chain = (init) => {
    let proxy;
    const val = [init];
    const proc = (newVal) => { val[0] = newVal; return proxy; };
    const ig = () => { return proxy; };
    return proxy = new Proxy(val, {
      get(target, prop) {
        if (prop === 'done') { return () => val[0]; }
        if (prop === 'fst') {
          return new Proxy({}, {
            get(_, prop) {
              return (...args) => proc(eval(prop)(val[0], ...args))
            }
          });
        }
        if (prop === 'lst') {
          return new Proxy({}, {
            get(_, prop) {
              return (...args) => proc(eval(prop)(...args, val[0]))
            }
          });
        }
        if (prop === 'at') {
          return new Proxy(
            {}, { get(_, prop) { return proc(val[0][prop]); } }
          );
        }
        if (prop === 'ig') {
          return new Proxy(
            {}, { get(_, prop) { return (...args) => ig(val[0][prop](...args)); } }
          );
        }
        return (...args) => proc(val[0][prop](...args));
      }
    });
  };

  const cacheFn = (impl, makeKey_) => {
    const cache = {};
    const makeKey = makeKey_ || ((...args) => JSON.stringify(args));
    return (...args) => (
      cache[makeKey(...args)] ||= impl(...args)
    );
  };

  const possibleSpacings = cacheFn((space, numSpacers) => {
    if (!numSpacers) { return 0; }
    if (!space) { return 1; }
    if (numSpacers === 1) { return 1; }
    let useSpace = 0;
    const usedSpaces = [];
    while (useSpace <= space) {
      usedSpaces.push(useSpace);
      useSpace++;
    }
    return sum(usedSpaces, (usedSpace) => (
      possibleSpacings(space - usedSpace, numSpacers - 1)
    ));
  });
  const getChunks = (src, repeatedChar) => {
    const chunks = [];
    let inChunk = false;
    let chunkStart = [0, "."];
    let prev = ".";
    for (const [i, c] of src.split("").entries()) {
      if (false) {
      } else if (c === repeatedChar && !inChunk) {
        inChunk = true;
        chunkStart = [i, prev];
      } else if (c !== repeatedChar &&  inChunk) {
        inChunk = false;
        const [start, prev] = chunkStart;
        chunks.push({ start, length: i - start, prev, hasSameEnds: prev === c });
      }
      prev = c;
    }
    return chunks;
  };

  const _odd = (i) => !!(i % 2);

  const _q = (c) => c === '?';
  const _p = (c) => c === '.';
  const _h = (c) => c === '#';

  const op = (c) => _p(c) ? '#' : '.';
  const id = (a) => a;


  const parseLine = (line, expand) => {
    const [conditions__, groups__] = line.split(/\s+/);
    let conditions_ = conditions__;
    let groups_ = groups__;
    if (expand) {
      let i = 0;
      while (i < 4) {
        conditions_ += '?' + conditions__;
        groups_ += ',' + groups__;
        i++;
      }
    }
    const conditions = `.${conditions_}.`;
    console.log(conditions, conditions.length);
    const groups = groups_.split(",").map(s => parseInt(s, 10));
    const unsures = getChunks(conditions, "?");
    return { conditions, groups, unsures };
  };
  const getNumArrangements = (line, expand) => {
    const row = parseLine(line, expand);
    const totalBars = row.groups.length * 2;
    let unsureBars = totalBars;
    let prev = ".";
    for (const c of row.conditions) {
      if (_h(c) && _p(prev)) { unsureBars--; }
      if (_p(c) && _h(prev)) { unsureBars--; }
      prev = c;
    }

    const getMaxBarCount = (unsureId) => {
      const unsure = row.unsures[unsureId];
      const cap = unsure.length + 1;
      const i = unsure.hasSameEnds ? 0 : 1;
      return (cap % 2) === i ? cap : (cap - 1);
    };

    const maxBarsByUnsure = row.unsures.map((_, id) => getMaxBarCount(id));
    const maxBarsRemainingByUnsure = row.unsures.map(() => 0);
    for (const [idInv, maxBars] of [...maxBarsByUnsure].reverse().entries()) {
      const id = row.unsures.length - 1 - idInv;
      if (id > 0) {
        maxBarsRemainingByUnsure[id-1] = maxBarsRemainingByUnsure[id] + maxBars;
      }
    }

    // console.log(maxBarsRemainingByUnsure);
    // console.log(row);
    // console.log(unsureBars);


    // console.log({unsureBars,totalBars})
    const reject = () => { throw 'reject'; };
    const ensure = (b) => !b ? reject() : b;
    const withRejections = (fn) => (...args) => {
      try { return fn(...args); }
      catch (e) { if (e === 'reject') { return 0; } throw e; }
    };

    const countValidsImpl = (unsureBars, unsureId, groups) => {
      const unsure = row.unsures[unsureId];
      // console.log('countValidsImpl entry', {unsureId,groups,prevSured});
      const [start, end, prevSured] = (() => {
        const prev = row.unsures[unsureId - 1];
        const curr = row.unsures[unsureId];
        const next = row.unsures[unsureId + 1];
        const getEndChar = (u) => u.hasSameEnds ? u.prev : op(u.prev);
        if (!unsureId) {
          return [1, curr.start, '.'];
        }
        if (!curr) {
          return [prev.start + prev.length + 1, row.conditions.length, getEndChar(prev)];
        }
        return [prev.start + prev.length + 1, curr.start, getEndChar(prev)];
      })();
      let prev = prevSured;
      for (const c of row.conditions.substring(start, end)) {
        const _same = prev === c;
        if (_h(c)) { ensure(groups[0]); groups[0]--; }
        if (_p(c) && !_same) { ensure(!groups[0]); groups.shift(); }
        prev = c;
      }
      if (!unsure) {
        // console.log('!unsure', {groups,prevSured,unsureBars});
        return !groups.length ? 1 : 0;
      }
      const maxRemaining = maxBarsRemainingByUnsure[unsureId];
      const barCounts = [maxBarsByUnsure[unsureId]];
      while (unsureBars - barCounts[barCounts.length-1] <= maxRemaining) {
        if (barCounts[barCounts.length-1] < 2) { break; }
        barCounts.push(barCounts[barCounts.length-1] - 2);
      }
      // console.log({unsureId,barCounts})

      let totalPossible = 0;
      for (const possibleBars of barCounts) {
        totalPossible += withRejections(() => {
          // unsureId === 1 && console.log('for possBar of barCs', {unsureId,unsureBars, possibleBars,groups})
          let localGroups = [...groups];
          ensure(possibleBars <= unsureBars);
          if (!possibleBars) {
            if (_p(unsure.prev)) {
              return countValidsImpl(unsureBars, unsureId+1, [...localGroups]);
            } else {
              // console.log('#?# 0', {localGroups,s:unsure.length,unsureId})
              // console.log({unsureId,localGroups0:localGroups[0]})
              localGroups[0] -= (unsure.length + 1);
              ensure(localGroups[0] >= 0);
              return countValidsImpl(unsureBars, unsureId+1, [...localGroups]);
            }
          }
          const hasLeading   = _h(unsure.prev);
          const space        = unsure.length + 1;
          const hasTrailing  = _odd(possibleBars) === _p(unsure.prev);
          if (possibleBars === 1) {
            if (_p(unsure.prev)) {
              let subtotal = 0;
              // console.log('.?#', {localGroups,space,unsureId})
              for (let i=0; i < localGroups[0] && i < space; i++) {
                const sublocalGroups = [...localGroups];
                sublocalGroups[0] -= (i + 1);
                subtotal += countValids(unsureBars - 1, unsureId + 1, sublocalGroups);
              }
              return subtotal;
            } else {
              // console.log('#?.', {localGroups,space,unsureId})
              ensure(localGroups[0] < space);
              return countValids(unsureBars - 1, unsureId + 1, localGroups.slice(1));
            }
          }
          if (possibleBars === 2 && _h(unsure.prev)) {
            const subspace = space - groups[0] - 1;
            let subtotal = 0;
            // console.log('#?# 2', {localGroups,subspace,space,unsureId})
            for (let i=0; i < localGroups[1] && i < subspace; i++) {
              const sublocalGroups = [...localGroups.slice(1)];
              sublocalGroups[0] -= (i + 1);
              subtotal += countValids(unsureBars - 2, unsureId + 1, sublocalGroups);
            }
            return subtotal;
          }

          // let hasTrailing = false;
          let usedGroups = _h(unsure.prev) ? 1 : 0;
          let required = _h(unsure.prev) ? 1 : 0;
          for (let i = 0; i<possibleBars; i++) {
            if (i % 2) {
              ensure(usedGroups < localGroups.length);
              required += localGroups[usedGroups] + 1;
              usedGroups++;
              // hasTrailing = true;
            }
          }
          // console.log({ unsureId, hasTrailing })
          if (possibleBars === 6) {
            // console.log({localGroups,hasTrailing,usedGroups,space,required})
          }
          if (hasTrailing) {
            required -= localGroups[usedGroups - 1];
            const subspace = space - required;
            let subtotal = 0;
            const bins = unsure.hasSameEnds ? (usedGroups - 1) : usedGroups;
            for (let i=0; i < localGroups[usedGroups - 1] && i < subspace; i++) {
              const sublocalGroups = [...localGroups.slice(usedGroups - 1)];
              sublocalGroups[0] -= (i + 1);
              if (possibleBars === 6) {
                // console.log({sublocalGroups,hasTrailing,usedGroups,subspace,i})
              }
              const combos = possibleSpacings(subspace - i, bins);
              // console.log({ug:usedGroups, combos,i,subspace,bins, sl0:sublocalGroups[0]})
              subtotal += combos * countValids(
                unsureBars - possibleBars,
                unsureId + 1,
                sublocalGroups,
              );
            }
            return subtotal;
          }
          const extra = space - required;
          const bins = (() => {
            if (unsure.hasSameEnds) {
              return usedGroups + 1;
            } else {
              return usedGroups;
            }
          })();
          const combos = possibleSpacings(extra, bins);
          if (hasLeading) {
            // unsureId > 3 && console.log({ usedGroups, space, bins, required, extra, combos })
          }
          // console.log({ unsureId, possibleBars, usedGroups, space, bins, required, extra, combos,groups })
          ensure(required <= space);
          return combos * countValids(
            unsureBars - possibleBars,
            unsureId + 1,
            localGroups.slice(usedGroups),
          );
          return 0;

          /*
          let bars = possibleBars;
          let bins = 0;
          let space = unsure.length + 1;
          const handleBin = () => { localGroups.shift(); space--; bins++; };
          if (_p(unsure.prev)) {
            bins++;
          } else if (_h(unsure.prev)) {
            if (!localGroups[0]) {
              handleBin();
              bars--;
            } else if (unsure.hasSameEnds) {
              bins--;
            }
          }

          const relbars = bars;
          const isBin = () => (relbars % 2) !== (bars % 2)
          for (;bars > 1;bars--) {
            if (isBin()) {
              handleBin();
            } else {
              space -= localGroups[0];
              ensure(space >= 0);
            }
          }
          if (isBin()) { handleBin(); }
          const hasTrailing = _odd(possibleBars) === _p(unsure.prev);
          if (hasTrailing) {
            let subtotal = 0;
            for (let i=0; i < localGroups[0] && i <= space; i++) {
              const sublocalGroups = [...localGroups];
              sublocalGroups[0] -= i;
              const ps = possibleSpacings(space - i, bins);
              const scv = countValids(unsureBars - possibleBars, unsureId + 1, sublocalGroups, '#');
              subtotal += (ps * scv);
            }
            return subtotal;
          } else {
            const ps = possibleSpacings(space, bins);
            const gcv = countValids(unsureBars - possibleBars, unsureId + 1, localGroups, '.');
            return (ps * gcv);
          }
          */
        })();
      }

      return totalPossible
    };
    // console.log(row.unsures.length);
    const countValids = cacheFn(withRejections(countValidsImpl));
    return countValids(unsureBars, 0, [...row.groups]);
  };

  const doIt = (input, expand = false) => {
    return chain(input)
      .split("\n")
      .filter(s => "" !== s.trim())
      // .slice(0,1)
      .map((s) => getNumArrangements(s, expand))
      .fst.sum()
      .done();
  };
  return {
    part1: (input) => {
      console.log(doIt(input, false));
    },
    part2: () => 2,
  };
})())
