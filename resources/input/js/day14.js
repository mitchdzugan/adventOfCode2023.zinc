((() => {
  const problems = `
`
  const sample = `
OOOO.#.O..
OO..#....#
OO..O##..O
O..#.OO...
........#.
..#....#.#
..O..#.O.O
..O.......
#....###..
#....#....
`
  const sum = (a, f = (a => a)) => a.map(f).reduce((acc, el) => acc + el, 0);

  const cacheFn = (impl, makeKey_) => {
    const cache = {};
    const makeKey = makeKey_ || ((...args) => JSON.stringify(args));
    return (...args) => (
      cache[makeKey(...args)] ||= impl(...args)
    );
  };

  const calcNorthLoad = (rows) => {
    let load = 0;
    for (const [col] of rows[0].entries()) {
      let nextLoad = rows.length;
      for (const [row] of rows.entries()) {
        if (rows[row][col] === 'O') {
          load += nextLoad;
          nextLoad--;
        } else if (rows[row][col] === '#') {
          nextLoad = rows.length - row - 1;
        }
      }
    }
    return load;
  };

  const calcLoad = (rows) => {
    let load = 0;
    for (const [col] of rows[0].entries()) {
      for (const [row] of rows.entries()) {
        if (rows[row][col] === 'O') {
          load += rows.length - row;
        }
      }
    }
    return load;
  };

  const Dir = { NORTH:1, EAST:2, SOUTH:3, WEST:4 };
  const isVert = (d) => (d === Dir.NORTH) || (d === Dir.SOUTH);
  const isRev  = (d) => (d === Dir.EAST ) || (d === Dir.SOUTH);

  const tilt = (rows, dir) => {
    const [outer, inner] = isVert(dir) ?
      [rows[0], rows] :
      [rows, rows[0]];
    const _norm = (src, n) => isRev(dir) ? (src.length - 1 - n) : n;
    const norm = (n) => _norm(inner, n);

    const chAt = (o, i) => isVert(dir) ? rows[i][o] : rows[o][i]
    const setAt = (o, i, c) => isVert(dir) ? ( rows[i][o] = c ) : ( rows[o][i] = c );
    const step = (n) => isRev(dir) ? (n - 1) : (n + 1)
    const earlier = (a, b) => isRev(dir) ? b < a : a < b;

    for (const [o] of outer.entries()) {
      let nextId = norm(0);
      for (const [_i] of inner.entries()) {
        const i = norm(_i);
        if (chAt(o, i) === 'O') {
          setAt(o, i, '.');
          setAt(o, nextId, 'O');
          nextId = step(nextId);
        } else if (chAt(o, i) === '#') {
          for (let fillId = nextId; earlier(fillId, i); fillId = step(fillId)) {
            setAt(o, fillId, '.');
          }
          nextId = step(i);
        }
      }
    }
  }

  const toRows = (input) => (
    input.split("\n").filter((s) => s.trim() !== "").map((s) => s.split(""))
  );

  const plog = (rs) => console.log() || rs.forEach((row) => console.log(row.join("")));

  const cycle1 = (rows) => {
    tilt(rows, Dir.NORTH);
    tilt(rows, Dir.WEST);
    tilt(rows, Dir.SOUTH);
    tilt(rows, Dir.EAST);
  };

  return {
    part1: (input) => {
      return calcNorthLoad(toRows(input));
    },
    part2: (input) => {
      const rows = toRows(input);

      const getDataConsts = () => {
        const Data = { Os: 0, hashLocations: [] };
        for (const [rowId, row] of rows.entries()) {
          for (const [colId, c] of row.entries()) {
            if (c === 'O') {
              Data.Os += 1;
            } else if (c === '#') {
              Data.hashLocations.push([rowId, colId]);
            }
          }
        }
        return Data;
      }

      const Laws = getDataConsts();

      const verify = () => {
        const Curr = getDataConsts();
        if (Curr.Os !== Laws.Os) {
          throw `Os not equal - Currs ${Curr.Os} - Laws ${Laws.Os}`;
        }
        const currLength = Curr.hashLocations.length;
        const lawsLength = Laws.hashLocations.length;
        if (Curr.hashLocations.length !== Laws.hashLocations.length) {
          throw `Different hash amounts - Curr ${currLength} - Laws ${lawsLength}`;
        }
        for (let i = 0; i < currLength; i++) {
          const curr = Curr.hashLocations[i];
          const laws = Laws.hashLocations[i];
          if ((curr[0] !== laws[0]) || (curr[1] !== laws[1])) {
            throw `Hash missing: ${laws[0]} ${laws[1]}`;
          }
        }
      }

      verify();

      const vals = [];
      while (vals.length < 168) {
        cycle1(rows);
        const nextLoad = calcLoad(rows);
        if (nextLoad === 105620) {
          console.log(vals.length);
        }
        vals.push(calcLoad(rows));
      }
      const cycle = vals.slice(103);
      return cycle[(1000000000 - 102) % 65];
      // plog(rows);
      // tilt(rows, Dir.NORTH);
      // plog(rows);
      // tilt(rows, Dir.WEST);
      // plog(rows);
      // tilt(rows, Dir.SOUTH);
      // plog(rows);
      // tilt(rows, Dir.EAST);
      // plog(rows);
      /*
      let lastI = 0;
      let i = 0;
      const vals = {};
      while (true) {
        cycle1(rows);
        const nextLoad = calcLoad(rows);
        if (i > 300) { vals[nextLoad] = true }
        if (nextLoad === 113903) {
          console.log(i - lastI, '\t', i, '\t', Object.values(vals).length);
          lastI = i;
        }
        i++;
        // vals.push(nextLoad);
      }
      */
      // const cycle = vals.slice(134);
      // console.log(cycle.slice(0, 65));
      // return cycle[(1000000000 - 134) % 65];
    },
  };
})())
