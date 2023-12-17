((() => {
  const problems = `
`
  const sample = `
2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533
`
  const idh = (x, y) => `h.${x}.${y}`;
  const idv = (x, y) => `v.${x}.${y}`;

  const dijkstra = (nodes, start, end) => {
    const total = Object.keys(nodes).length;
    let completed = 0;
    let visited = {};
    let bests = {};
    let currCost = 0;
    let currId = start;
    while (!visited[end]) {
      console.log({ total, completed })
      completed += 1;
      const node = nodes[currId];
      visited[currId] = true;
      for (const id in node.edges) {
        const nextCost = currCost + node.edges[id];
        const currBest = bests[id];
        if (currBest === undefined || nextCost < currBest) {
          bests[id] = nextCost;
        }
      }
      currId = undefined;
      for (const id in bests) {
        if (visited[id]) { continue; }
        if (currId === undefined || bests[id] < bests[currId]) {
          currId = id;
          currCost = bests[id];
        }
      }
    }

    return bests[end];
  };

  const getShortestDistance = (input, minStep, maxStep) => {
    const nodes = {};
    const costs = input.trim().split("\n")
      .map(l => l.split("").map(d => parseInt(d, 10)));
    const costAt = (x, y) => (costs[y] || [])[x];
    for (const [y, row] of costs.entries()) {
      for (const [x] of row.entries()) {
        nodes[idh(x, y)] = { edges: {} };
        nodes[idv(x, y)] = { edges: {} };
      };
    }
    for (const [y, row] of costs.entries()) {
      for (const [x] of row.entries()) {
        let costD = 0;
        let costU = 0;
        let costR = 0;
        let costL = 0;
        for (let off = 1; off < maxStep + 1; off++) {
          if (costAt(x, y + off)) {
            costD += costAt(x, y + off);
            if (off >= minStep) {
              nodes[idh(x, y)].edges[idv(x, y + off)] = costD;
            }
          }
          if (costAt(x, y - off)) {
            costU += costAt(x, y - off);
            if (off >= minStep) {
              nodes[idh(x, y)].edges[idv(x, y - off)] = costU;
            }
          }
          if (costAt(x + off, y)) {
            costR += costAt(x + off, y);
            if (off >= minStep) {
              nodes[idv(x, y)].edges[idh(x + off, y)] = costR;
            }
          }
          if (costAt(x - off, y)) {
            costL += costAt(x - off, y);
            if (off >= minStep) {
              nodes[idv(x, y)].edges[idh(x - off, y)] = costL;
            }
          }
        }
      };
    }
    nodes['start'] = { edges: { 'v.0.0': 0, 'h.0.0': 0 } };
    nodes['end'] = { edges: {} };
    const xmax = costs[0].length - 1;
    const ymax = costs.length - 1;
    nodes[idh(xmax, ymax)].edges['end'] = 0;
    nodes[idv(xmax, ymax)].edges['end'] = 0;
    return dijkstra(nodes, 'start', 'end');
  };

  return {
    part1: (input) => {
      return getShortestDistance(sample, 1, 3);
    },
    part2: (input) => {
      return getShortestDistance(input, 4, 10);
    },
  };
})())
