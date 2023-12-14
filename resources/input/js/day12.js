((() => {
  const problems = `
.???.###????.###????.###????.###????.###. 1,1,3,1,1,3,1,1,3,1,1,3,1,1,3
.???#.????#??. 1,1,1,1
?????????? 1,1,1
  `
  const sample = `
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`
  const sum = (a, f = (a => a)) => a.map(f).reduce((acc, el) => acc + el, 0);

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
    console.log(conditions, groups_);
    const groups = groups_.split(",").map(s => parseInt(s, 10));
    const unsures = getChunks(conditions, "?");
    return { conditions, groups, unsures };
  };
  const getNumArrangements = (line, expand, totalLines, lineNumber) => {
    console.log({ totalLines, lineNumber });
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
      // console.log({unsureId,barCounts,maxRemaining,unsureBars})

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

          const idiv = (n,d) => Math.floor(n / d);
          const [groupSlice, usedSpace, bins, range] = ((() => {
            if (unsure.hasSameEnds) {
              if (_h(unsure.prev)) {
                // console.log('# ?? #');
                const usedGroups = idiv(possibleBars, 2);
                const groupSlice = localGroups.slice(usedGroups);
                const usedSpace = usedGroups + sum(localGroups.slice(0, usedGroups));
                const bins = usedGroups;
                const range = localGroups[usedGroups];
                return [groupSlice, usedSpace, bins, range];
              } else {
                // console.log('. ?? .');
                const usedGroups = idiv(possibleBars, 2);
                const groupSlice = localGroups.slice(usedGroups);
                const usedSpace = usedGroups + sum(localGroups.slice(0, usedGroups)) - 1;
                const bins = usedGroups + 1;
                const range = 0;
                return [groupSlice, usedSpace, bins, range];
              }
            } else {
              if (_h(unsure.prev)) {
                // console.log('# ?? .');
                const usedGroups = idiv(possibleBars, 2) + 1;
                const groupSlice = localGroups.slice(usedGroups);
                const usedSpace = usedGroups + sum(localGroups.slice(0, usedGroups)) - 1;
                const bins = usedGroups;
                const range = 0;
                return [groupSlice, usedSpace, bins, range];
              } else {
                // console.log('. ?? #');
                const usedGroups = idiv(possibleBars, 2);
                const groupSlice = localGroups.slice(usedGroups);
                const usedSpace = usedGroups + sum(localGroups.slice(0, usedGroups));
                const bins = usedGroups + 1;
                const range = localGroups[usedGroups];
                return [groupSlice, usedSpace, bins, range];
              }
            }
          })());

          let subtotal = 0;
          const subspace = space - usedSpace;
          ensure(usedSpace < space);
          for (let i=0; i < Math.max(1, range) && i < subspace; i++) {
            const sublocalGroups = [...groupSlice];
            range && ((() => {
              ensure( sublocalGroups.length);
              sublocalGroups[0] -= (i + 1);
            })())
            const combos = possibleSpacings(subspace - i - 1, bins);
            const valids = countValids(unsureBars - possibleBars, unsureId + 1, sublocalGroups);
            subtotal += combos * valids;
          }
          // console.log({uId:unsureId,bars:possibleBars,groups:groupSlice,used:usedSpace,bins,range})
          return subtotal;
        })();
      }

      return totalPossible
    };
    // console.log(row.unsures.length);
    const countValids = cacheFn(withRejections(countValidsImpl));
    return countValids(unsureBars, 0, [...row.groups]);
  };

  const doIt = (input, expand = false) => {
    const usedLines = input.split("\n").filter(s => "" !== s.trim());
    const totalLines = usedLines.length;
    return usedLines.map((line, lineNumber) => (
      getNumArrangements(line, expand, totalLines, lineNumber)
    ));
  };
  return {
    part1: (input) => {
      console.log(doIt(problems, true));
    },
    part2: () => 2,
  };
})())
