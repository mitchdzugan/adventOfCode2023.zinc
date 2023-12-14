((() => {
  const sample = `
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`
  const _possibleFills = (bins, items) => {
    // console.log({ bins, items })
    if (!items) { return 1; }
    if (!bins) { return 1; }
    if (bins === 1) { return 1; }
    let total = 0;
    let i = 0;
    const nextItems = [];
    while (i <= items) {
      nextItems.push(i);
      i++;
    }
    return nextItems.reduce((acc, i) => acc + possibleFills(bins - 1, items - i), 0);
  };
  const _fc = {};
  const possibleFills = (...args) => {
    const id = JSON.stringify(args);
    return _fc[id] ||= _possibleFills(...args);
  };
  const asum = (array) => array.reduce((a, b) => a + b, 0);
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

  const opp = (c) => (c === '.') ? '#' : '.';

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
    const groups = groups_.split(",").map(s => parseInt(s, 10));
    console.log(conditions, groups);
    // console.log('?#?#?#?#?#?#?#? 1,3,1,6')
    // console.log('_#_#x#_#_#x#x#x 1,3,1,6')
    // console.log('1 2 0 2 2 0 0 0 1,3,1,6')

    const unknowns = getChunks(conditions, "?");
    const _genLegalGroupCombos = (unknownId, totalBars, ingroups) => {
      const unknown = unknowns[unknownId];
      const { prev, length, hasSameEnds } = unknown;
      // console.log({ unknownId, totalBars, ingroups, prev, length })
      let bars = totalBars;
      let groups = [...ingroups];
      let bins = 0;
      let space = length + 1;

      if (prev === '.') {
        bins += 1;
      }
      if (prev === '#') {
        if (!groups[0]) {
          groups.shift();
          bars -= 1;
          space -= 1;
          bins += 1;
        }
      }

      // console.log({ unknownId, bins, space, bars, groups, prev })
      let isGroup = false;
      while (bars > 0) {
        isGroup = !isGroup;
        if (isGroup) {
          if (bars === 1) {
            let groupCombos = [];
            let i = 0;
            // console.log({g:groups[0],space,bins})
            if (prev === '#') {
              space -= groups[0];
              if (!groups.length || space < 0) { return [] }
              // console.log("DO THE THING");
              // console.log({groups,unknownId,bins,space,pf:possibleFills(bins+1,space)});
              return [[groups.slice(1), possibleFills(bins+1,space)]];
            } else {
              while (i < groups[0] && i < space) {
                groupCombos.push([
                  [groups[0] - i - 1, ...groups.slice(1)],
                  possibleFills(bins, space - i)
                ]);
                i++;
              }
              // console.log('omg.mug', groupCombos)
              return groupCombos;
            }
          }
          space -= groups[0];
        } else {
          space -= 1;
          bins += 1;
          groups.shift();
        }
        bars--;
      }


      isGroup = (prev === '#' &&  hasSameEnds)
             || (prev !== '#' && !hasSameEnds)
      // console.log({ bins, space, bars, groups, isGroup })
      if (space < 0) { return []; }

      if (!isGroup) {
        console.log('PFILL',{unknownId, groups,bins,space}, possibleFills(bins, space));
        return [[groups, possibleFills(bins, space)]]
      } else {
        if (groups[0] <= space) { return []; }
        groups[0] -= space;
        return [[[...groups], 1]];
      }

      throw "UNHANLED";
    };
    const _genLegalUnknowns = (unknownId, totalBars, ingroups) => {
      // console.log({ unknownId, totalBars, ingroups, prev: unknowns[unknownId].prev })
      const unknown = unknowns[unknownId];
      const gen = (groups, bars, pos, prev, str = "") => {
        // console.log({ unknownId, groups, bars, totalBars, prev })
        // console.log({ groups, bars, pos, prev, str })
        if (bars === 0) {
          let rest = "";
          let i = pos;
          while (i < unknown.length + 1 - bars) {
            rest += prev;
            i++;
          }
          return [str + rest];
        }
        let i = pos;
        let inits = [];
        let init = "";
        if (prev === '.') {
          while (i < unknown.length + 2 - bars) {
            inits.push(init);
            init += prev;
            i++;
          }
          if (!groups[0]) { groups.shift(); }
          groups[0] -= 1;
        }
        if (prev === '#') {
          if (!groups[0]) {
            groups.shift();
            inits = [''];
          } else {
            const total = Math.min(groups[0], unknown.length + 1 - pos);
            const initLength = total;
            // console.log('debug', { inits, unknownId, groups, bars, pos, initLength })
            // if (initLength >= unknown.length + 2 - bars) { return []; }
            let i = 0;
            let init = "";
            groups[0] -= total;
            while (i < initLength) { i++; init += "#"; }
            inits = [init];
            // console.log({inits})
          }
        }
        return inits.flatMap((init) => (
          gen([...groups], bars - 1, pos + 1 + init.length, opp(prev), str + init + opp(prev))
        ))
      }
      return gen([...ingroups], totalBars, 0, unknown.prev)
    };
    const _genUnknowns = (unknownId, totalBars) => {
      const unknown = unknowns[unknownId];
      const gen = (bars, pos, prev, str = "") => {
        if (bars === 0) {
          let rest = "";
          let i = pos;
          while (i < unknown.length + 1 - bars) {
            rest += prev;
            i++;
          }
          return [str + rest];
        }
        let i = pos;
        const inits = [];
        let init = "";
        while (i < unknown.length + 2 - bars) {
          inits.push(init);
          init += prev;
          i++;
        }
        return inits.flatMap((init) => (
          gen(bars - 1, pos + 1 + init.length, opp(prev), str + init + opp(prev))
        ))
      }
      return gen(totalBars, 0, unknown.prev)
    };
    const _c = {};
    const genUnknowns = (unknownId, totalBars) => {
      const id = `${unknownId}.${totalBars}`;
      return _c[id] = _c[id] || _genUnknowns(unknownId, totalBars);
    };
    const genLegalUnknowns = (...args) => {
      const id = JSON.stringify(args);
      return _c[id] = _c[id] || _genLegalUnknowns(...args);
    };
    const genLegalGroupCombos = (...args) => {
      const id = JSON.stringify(args);
      return _c[id] = _c[id] || _genLegalGroupCombos(...args);
    };
    const testUnknowns = (possibles) => {
      let full = "";
      for (const [uId, possible] of possibles.entries()) {
        const offset = unknowns[uId].start;
        full += conditions.substr(full.length, offset) + possible;
      }
      full += conditions.substr(full.length);
      const lengths = getChunks(full, "#").map(chunk => chunk.length);
      let areEq = lengths.length === groups.length;
      for (const i in lengths) {
        areEq = areEq && (lengths[i] === groups[i]);
      }
      return areEq;
    };
    return {
      conditions, groups, unknowns, testUnknowns, genUnknowns,
      genLegalUnknowns, genLegalGroupCombos
    };
  };
  const getNumArrangements = (line, expand) => {
    // console.log(line)
    // console.log('??????????');
    // if (line === '?????????? 1,1,1' && expand) { return 0; }
    // if (line === '??????#???????????? 1,1,1,5,1,1') { return 0; }
    const springRow = parseLine(line, expand);
    let totalBars = springRow.groups.length * 2;
    const trimOuterBars = (s) => {
      let prev = ".";
      for (const c of s) {
        if (c === "#" && prev === ".") { totalBars--; }
        if (c === "." && prev === "#") { totalBars--; }
        prev = c;
      }
    };
    trimOuterBars(springRow.conditions);

    const getLegalBarCounts = (bars, unknownId) => {
      const unknown = springRow.unknowns[unknownId];
      const res = [];
      let i = unknown.hasSameEnds ? 0 : 1;
      while ((i <= bars) && (i <= (unknown.length + 1))) {
        res.push(i);
        i += 2;
      }
      return res;
    };

    const getMaxBarCount = (unknownId) => {
      const unknown = springRow.unknowns[unknownId];
      const cap = unknown.length + 1;
      const i = unknown.hasSameEnds ? 0 : 1;
      return (cap % 2) === i ? cap : (cap - 1);
    };

    const getMinBarCount = (unknownId) => {
      const unknown = springRow.unknowns[unknownId];
      return unknown.hasSameEnds ? 0 : 1;
    };

    let maxByUnknown = springRow.unknowns.map((_, id) => getMaxBarCount(id));
    const maxRemainingByUnknown = springRow.unknowns.map(() => 0);
    for (const [idInv, maxBars] of maxByUnknown.reverse().entries()) {
      const id = maxByUnknown.length - 1 - idInv;
      if (id > 0) {
        maxRemainingByUnknown[id-1] = maxRemainingByUnknown[id] + maxBars;
      }
    }
    // console.log(maxRemainingByUnknown)
    maxByUnknown = springRow.unknowns.map((_, id) => getMaxBarCount(id));
    const maxBar = maxByUnknown.reduce((a, b) => Math.max(a, b), 0);
    // console.log({ maxBar })

    let maxDepth = 0;
    const addDigit = (curr, unknownId, bars) => {
      return curr += (bars * Math.pow(maxBar+1, unknownId ));
    };
    const impl_getPossibleBarsByUnknown = (bars, unknownId = 0) => {
      const maxRemaining = maxRemainingByUnknown[unknownId];
      // const minRemaining = minRemainingByUnknown[unknownId];
      // console.log({ unknownId, maxRemaining, bars, maxBar })
      if (unknownId > maxDepth) { maxDepth = unknownId; console.log({ maxDepth }); }
      if (unknownId >= springRow.unknowns.length) { return [0]; }
      /*
      if (maxRemaining === bars) {
        return [maxByUnknown.slice(unknownId)]
      }
      */
      // console.log({ p: 1, unknownId, maxRemaining, bars })
      const legalBars = getLegalBarCounts(bars, unknownId)
      const myBarCounts = legalBars
        .filter((bc) => (bars - bc <= maxRemaining) && (
          true // (totalBars - bars) + bc >= minRemaining
        ));
      console.log({unknownId,myBarCounts})
      // console.log({ p: 2, unknownId, maxRemaining, bars, myBarCounts })
      // !(unknownId - 5) && console.log({ maxRemaining, bars, myBarCounts });
      // console.log({ unknownId, totalBars, bars, minRemaining, maxRemaining, legalBars, myBarCounts })
      return myBarCounts.flatMap((myBars) => (
        cached_getPossibleBarsByUnknown(bars - myBars, unknownId + 1)
          .map((restBars) => addDigit(restBars, unknownId, myBars))
      ));
    };

    const _c = {};
    const cached_getPossibleBarsByUnknown = (bars, unknownId = 0) => {
      // console.log('cache1', { bars, unknownId });
      const id = `${unknownId}.${bars}`;
      const res = _c[id] = _c[id] || impl_getPossibleBarsByUnknown(bars, unknownId);
      // console.log('cache2', { bars, unknownId });
      // console.log(res);
      return res;
    };

    const getPossibleBarsByUnknown = (bars, unknownId = 0) => {
      // console.log('poss', { bars, unknownId });
      const res = [];
      const numEncodeds = cached_getPossibleBarsByUnknown(bars, unknownId);
      for (let numEncoded of numEncodeds) {
        const curr = [];
        for (const _ in springRow.unknowns) {
          curr.push(numEncoded % (maxBar + 1))
          numEncoded = Math.floor(numEncoded / (maxBar + 1));
        }
        res.push(curr);
      }
      // console.log(numEncodeds, maxBar);
      // console.log({res})
      return res;
    }


    const trimTo = (unknownId, groups) => {
      const src = springRow.conditions;
      const bkup = {
        [-1]: { start: -1, length: 0 },
        [springRow.unknowns.length]: { start: src.length, length: 0 }
      };
      const getU = (id) => springRow.unknowns[id] || bkup[id];

      const prevUnkn = getU(unknownId - 1);
      const currUnkn = getU(unknownId);

      const start = prevUnkn.start + prevUnkn.length + 1;
      let prev = src[start-1];
      let count = 0;
      // console.log('HELLO', { start, sp: currUnkn.start });
      for (const c of src.substring(start, currUnkn.start)) {
        if (c === '#') { count += 1; }
        if (prev === '#' && c !== '#') {
          // console.log({ unknownId, count, g0: groups[0] });
          if (count !== groups[0]) { return false; }
          groups.shift();
          count = 0;
        }
        prev = c;
      }
      if (count) {
        // console.log({ unknownId, count, g0: groups[0] });
        if (count > groups[0]) { return false; }
        groups[0] -= count;
      }
      return true;
    };
    const trimLeft = (src, unknownId, groups, inprev=false, pos = 0) => {
      const endSection = { start: springRow.conditions.length };
      const unknown = springRow.unknowns[unknownId] || endSection;
      let prev = inprev ? "#" : ".";
      let count = 0;
      // console.log({inprev}, src.substring(pos, unknown.start))
      for (const c of src.substring(pos, unknown.start)) {
        if (c === '#') { count += 1; }
        if (prev === '#' && c !== '#') {
          if (count !== groups[0]) { return false; }
          groups.shift();
          count = 0;
        }
        prev = c;
      }
      if (count) {
        if (count > groups[0]) { return false; }
        groups[0] -= count;
      }
      return prev;
    };
    const mkincount = (prev) => prev === "#" ? 1 : 0;
    const doLegals3 = () => {
      const legalBarCounts = (
        getPossibleBarsByUnknown(totalBars)
        .filter((barCounts) => totalBars === asum(barCounts))
      );
      // console.log({lbc: legalBarCounts.length});
      // console.log(springRow)
      // console.log(legalBarCounts);
      // console.log({ totalBars });
      // console.log(getPossibleBarsByUnknown(totalBars));
      // console.log(springRow);
      const legalArrangements = legalBarCounts.flatMap((barCounts) => {
        const getLegals = (unknownId, prev, groups) => {
          // console.log('')
          // console.log({ unknownId, prev}, groups);
          const unknown = springRow.unknowns[unknownId];
          if (!unknown) { return !(groups.length) ? [true] : []; }
          // console.log({bc:barCounts[unknownId]})
          const possibles = springRow.genUnknowns(unknownId, barCounts[unknownId]);
          return possibles.flatMap((possible) => {
            const localGroups = [...groups];
            // console.log(...localGroups, {possible});
            const afterPossible = trimLeft(possible, -1, localGroups, mkincount(prev));
            // console.log(...localGroups, {afterPossible});
            if (!afterPossible) { return []; }
            const next = trimLeft(
              springRow.conditions,
              unknownId + 1,
              localGroups,
              mkincount(afterPossible),
              unknown.start + possible.length
            );
            // console.log(...localGroups, {next});
            if (!next) { return []; }
            return getLegals(unknownId + 1, next, localGroups);
          });
        };
        const initialGroups = [...springRow.groups];
        return getLegals(
          0,
          trimLeft(springRow.conditions, 0, initialGroups),
          initialGroups
        );
      });
      return legalArrangements.length;
    }
    const doLegals = (() => {
      const _getLegals = (bars, unknownId, prev, groups) => {
        // console.log({ bars, unknownId, prev, groups });
        // console.log('')
        // console.log({ unknownId, prev}, groups);
        const unknown = springRow.unknowns[unknownId];
        if (!unknown) { return !(groups.length) ? 1 : 0; }
        const maxRemaining = maxRemainingByUnknown[unknownId];
        // console.log({bc:barCounts[unknownId]})
        const legalBars = getLegalBarCounts(bars, unknownId)
        const myBarCounts = legalBars
          .filter((bc) => (bars - bc <= maxRemaining) && (
            true // (totalBars - bars) + bc >= minRemaining
          ));
        // console.log({ unknownId, legalBars, myBarCounts, maxRemaining, bars });
        return myBarCounts.reduce((acc, myBarCount) => {
          // !unknownId && console.log('a');
          const possibles = springRow.genLegalUnknowns(unknownId, myBarCount, groups);
          // !unknownId && console.log('b', possibles.length);
          return acc + possibles.reduce((acc, possible) => {
            const localGroups = [...groups];
            // console.log(...localGroups, {possible});
            const afterPossible = trimLeft(possible, -1, localGroups, mkincount(prev));
            // console.log(...localGroups, {afterPossible});
            if (!afterPossible) { return acc; }
            const next = trimLeft(
              springRow.conditions,
              unknownId + 1,
              localGroups,
              mkincount(afterPossible),
              unknown.start + possible.length
            );
            // console.log(...localGroups, {next});
            if (!next) { return acc; }
            return acc + getLegals(bars - myBarCount, unknownId + 1, next, localGroups);
          }, 0);
        }, 0);
      };
      const _lc = {};
      const getLegals = (...args) => {
        const id = JSON.stringify(args);
        return _lc[id] = _lc[id] || _getLegals(...args);
      };
      const initialGroups = [...springRow.groups];
      return getLegals(
        totalBars,
        0,
        trimLeft(springRow.conditions, 0, initialGroups),
        initialGroups
      );
    });
    const doLegals2 = (() => {
      const _getLegals = (bars, unknownId, groups) => {
        // console.log({ p:1,unknownId, groups })
        if (!trimTo(unknownId, groups)) { return 0; }
        const unknown = springRow.unknowns[unknownId];
        // console.log({ p:2,unknownId, groups, unknown })
        // console.log({ unknownId, groups });
        if (!unknown) {
          // console.log({bars, unknownId, groups});
        }
        if (!unknown) { return (!(groups.length) || groups.length === 1 && !groups[0]) ? 1 : 0; }
        const maxRemaining = maxRemainingByUnknown[unknownId];
        // console.log({bc:barCounts[unknownId]})
        const legalBars = getLegalBarCounts(bars, unknownId)
        const myBarCounts = legalBars
          .filter((bc) => (bars - bc <= maxRemaining) && (
            true // (totalBars - bars) + bc >= minRemaining
          ));
        // console.log({unknownId,myBarCounts})
        // console.log({ myBarCounts });
        // console.log({ unknownId, legalBars, myBarCounts, maxRemaining, bars });
        return myBarCounts.reduce((acc, myBarCount) => {
          // !unknownId && console.log('a');
          const possibles = springRow.genLegalGroupCombos(unknownId, myBarCount, groups);
          // !unknownId && console.log('b', possibles.length);
          // console.log({ myBarCount, unknownId, acc, possibles });
          return acc + possibles.reduce((acc, [nextGroups, combos]) => {
            const nextLegals = getLegals(bars - myBarCount, unknownId + 1, nextGroups)
            console.log({ unknownId, myBarCount, acc, nextGroups, combos, nextLegals })
            return acc + (combos * nextLegals);
          }, 0);
        }, 0);
      };
      const _lc = {};
      const getLegals = (...args) => {
        const id = JSON.stringify(args);
        return _lc[id] = _lc[id] || _getLegals(...args);
      };
      const initialGroups = [...springRow.groups];
      return getLegals(
        totalBars,
        0,
        initialGroups
      );
    });
    return doLegals2();
  };
  const lasum = (data) => {
    console.log({data});
    return asum(data);
  }
  const doIt = (input, expand = false) => {
    return lasum(
      input
        .split("\n")
        .filter(s => "" !== s.trim())
        .slice(1, 2)
        .map((s) => getNumArrangements(s, expand))
    );
  };
  return {
    part1: (input) => {
      // console.log(possibleFills(16, 39));
      return doIt(input, false);
    },
    part2: () => 2,
  };
})())
