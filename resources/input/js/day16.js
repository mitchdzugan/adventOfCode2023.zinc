((() => {
  const problems = `
`
  const sample = `
.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....
`
  const sum = (a, f = (a => a)) => a.map(f).reduce((acc, el) => acc + el, 0);

  const cacheFn = (impl, makeKey_) => {
    const cache = {};
    const makeKey = makeKey_ || ((...args) => JSON.stringify(args));
    return (...args) => (
      cache[makeKey(...args)] ||= impl(...args)
    );
  };

  const Dir = { Up: 11, Down: 12, Left: 13, Right: 14 }
  const Op = { Split: 21, Rotate: 22, Pass: 23 };

  const fullThruDirs = {};
  fullThruDirs[Dir.Up]    = true;
  fullThruDirs[Dir.Down]  = true;
  fullThruDirs[Dir.Left]  = true;
  fullThruDirs[Dir.Right] = true;

  const cellAt = (grid, x, y) => {
    const row = grid[y] || [];
    return row[x] || { thruDirs: fullThruDirs };
  };

  const isVert = (dir) => (dir === Dir.Up) || (dir === Dir.Down);

  const nextDirs = (cell, dir) => {
    if (cell.op === Op.Pass) { return [dir]; }
    if (cell.op === Op.Rotate) {
      return [({
        [true]: {
          [Dir.Up]   : Dir.Right,
          [Dir.Right]: Dir.Up,
          [Dir.Left] : Dir.Down,
          [Dir.Down] : Dir.Left,
        },
        [false]: {
          [Dir.Up]   : Dir.Left,
          [Dir.Right]: Dir.Down,
          [Dir.Left] : Dir.Up,
          [Dir.Down] : Dir.Right,
        },
      })[cell.isForward][dir]]
    }
    // cell.op == Op.Split
    if (!cell.isVert ^ isVert(dir)) { return [dir]; }
    if (isVert(dir)) { return [Dir.Left, Dir.Right]; }
    return [Dir.Up, Dir.Down];
  };

  const proc = (grid, dir, cell) => {
    if (cell.thruDirs[dir]) { return; }
    cell.thruDirs[dir] = true;
    for (const nextDir of nextDirs(cell, dir)) {
      const nextProc = (x, y) => proc(grid, nextDir, cellAt(grid, x, y));
      if (nextDir === Dir.Up   ) { nextProc(cell.x    , cell.y - 1); }
      if (nextDir === Dir.Right) { nextProc(cell.x + 1, cell.y    ); }
      if (nextDir === Dir.Left ) { nextProc(cell.x - 1, cell.y    ); }
      if (nextDir === Dir.Down ) { nextProc(cell.x    , cell.y + 1); }
    }
  };

  const initCell = (c, x, y) => {
    const res = { x, y, thruDirs: {} };
    if (c === '|') {
      res.op = Op.Split;
      res.isVert = true;
    } else if (c === '-') {
      res.op = Op.Split;
      res.isVert = false;
    } else if (c === '/') {
      res.op = Op.Rotate;
      res.isForward = true;
    } else if (c === '\\') {
      res.op = Op.Rotate;
      res.isForward = false;
    } else if (c === '.') {
      res.op = Op.Pass;
    } else {
      throw `unrecognized op: [${c}]`;
    }
    return res;
  };

  const toGrid = (input) => {
    return input.trim().split("\n").map((line, y) => (
      line.split("").map((c, x) => initCell(c, x, y))
    ));
  };

  const calcEnergyFromEntry = (grid, dir, cell) => {
    proc(grid, dir, cell);
    let energized = 0;
    for (const row of grid) {
      for (const cell of row) {
        const isEnergized = Object.keys(cell.thruDirs).length > 0;
        isEnergized && (energized++);
        cell.thruDirs = {};
      }
    }
    return energized;
  };

  return {
    part1: (input) => {
      const grid = toGrid(input);
      return calcEnergyFromEntry(grid, Dir.Right, cellAt(grid, 0, 0));
    },
    part2: (input) => {
      const grid = toGrid(input);
      const ys = grid.map((_, i) => i);
      const xs = grid[0].map((_, i) => i);
      const xmax = xs[xs.length - 1];
      const ymax = ys[ys.length - 1];
      let maxEnergy = 0;
      for (const x of xs) {
        const topCell    = cellAt(grid, x, 0   );
        const bottomCell = cellAt(grid, x, ymax);
        const fromTop    = calcEnergyFromEntry(grid, Dir.Down , topCell   );
        const fromBottom = calcEnergyFromEntry(grid, Dir.Up   , bottomCell);
        maxEnergy = Math.max(maxEnergy, fromTop, fromBottom);
      }
      for (const y of ys) {
        const leftCell   = cellAt(grid, 0   , y);
        const rightCell  = cellAt(grid, xmax, y);
        const fromLeft   = calcEnergyFromEntry(grid, Dir.Right, leftCell  );
        const fromRight  = calcEnergyFromEntry(grid, Dir.Left , rightCell );
        maxEnergy = Math.max(maxEnergy, fromLeft, fromRight);
      }
      return maxEnergy;
    },
  };
})())
