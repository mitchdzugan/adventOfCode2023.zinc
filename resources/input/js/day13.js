((() => {
  const problems = `
`
  const sample = `
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
`
  const sum = (a, f = (a => a)) => a.map(f).reduce((acc, el) => acc + el, 0);

  const cacheFn = (impl, makeKey_) => {
    const cache = {};
    const makeKey = makeKey_ || ((...args) => JSON.stringify(args));
    return (...args) => (
      cache[makeKey(...args)] ||= impl(...args)
    );
  };

  const countDigits = (n) => {
    let count = 0;
    do { count += (n % 2) } while ( (n = Math.floor(n / 2)) > 0)
    return count;
  };

  const getReflectionNum = (section) => {
    const { rows, cols } = section;
    const isRelection = (groups, beforeIndex, targetWrong = 1) => {
      if (!beforeIndex || beforeIndex > groups.length) { return false; }
      const toCheck = Math.min(beforeIndex, groups.length - beforeIndex);
      let wrongDigits = 0;
      for (let i = 0; i < toCheck; i++) {
        wrongDigits += countDigits(
          groups[beforeIndex - 1 - i] ^ groups[beforeIndex + i]
        );
        if (wrongDigits > targetWrong) { return false; }
      }
      return wrongDigits === targetWrong;
    };
    let res = [];
    const checkAllForGroups = (groups) => {
      for (let i = 1; i < groups.length && !res.length; i++) {
        if (isRelection(groups, i)) { res = [i]; }
      }
    }
    checkAllForGroups(cols);
    if (res.length) { return res[0] };
    checkAllForGroups(rows);
    return 100 * res[0];
  };

  const toNum = (s) => {
    let res = 0;
    for (const [nth, c] of s.split("").entries()) {
      res += (c === '.' ? 1 : 0) * (Math.pow(2, nth));
    }
    return res;
  }

  return {
    part1: (input) => {
      return (input
        .split("\n\n")
        .filter(s => s.trim() !== "")
        .map((section) => {
          const rows = section.split("\n").filter(s => s.trim() !== "");
          const cols = [];
          for (let i = 0; i < rows[0].length; i++) {
            let col = "";
            for (let rowId = 0; rowId < rows.length; rowId++) {
              col += rows[rowId][i];
            }
            cols.push(col);
          }
          return { rows: rows.map(toNum), cols: cols.map(toNum) };
        })
        .map(getReflectionNum) )
        .reduce((a, b) => a + b, 0);
    },
    part2: () => 2,
  };
})())
