import { file, start, end } from "./parse";

type Position = { y: number; x: number };

type GridNode = {
  position: Position;
  value: string;
  weight: number;
  visited: boolean;
};

const getWeight = (letter: string): number => {
  if (letter === "S") return 0;
  if (letter === "E") return 25;
  return letter.charCodeAt(0) - 97;
};

const getNeighbours = (grid: GridNode[][], position: Position): Position[] => {
  let neighbours = [
    { x: position.x, y: position.y - 1 },
    { x: position.x, y: position.y + 1 },
    { x: position.x - 1, y: position.y },
    { x: position.x + 1, y: position.y },
  ];

  // Don't go out of bounds
  neighbours = neighbours.filter((neighbour) => {
    return grid[neighbour.y]?.[neighbour.x] !== undefined;
  });

  return neighbours;
};

const dijkstra = (grid: GridNode[][], queue: Position[], distances: number[][]): void => {
  while (queue.length > 0) {
    const current = queue.shift();

    grid[current!.y][current!.x].visited = true;

    const neighbours = getNeighbours(grid, current!);

    neighbours.forEach((neighbour) => {
      const currWeight = grid[current!.y][current!.x].weight;
      const nextWeight = grid[neighbour.y][neighbour.x].weight;

      const isValidNeighbour = () => currWeight >= nextWeight - 1;
      const canGoToNewNeighbour = () => !grid[neighbour.y][neighbour.x].visited && currWeight <= nextWeight + 1;

      if (isValidNeighbour()) {
        const shortestDist = distances[neighbour.y][neighbour.x] + 1;
        const currShortestDist = distances[current!.y][current!.x];

        distances[current!.y][current!.x] = Math.min(currShortestDist, shortestDist);
      }

      if (canGoToNewNeighbour()) {
        queue.push(neighbour);
        grid[neighbour.y][neighbour.x].visited = true;
      }
    });
  }
};

const grid: GridNode[][] = Array.from(file).map((row, y) => {
  return row.map((letter, x) => {
    return {
      position: { y, x },
      value: letter,
      weight: getWeight(letter),
      visited: false,
    };
  });
});

const distances: number[][] = grid.map((row) => row.map(() => Infinity));
distances[end.y][end.x] = 0; // Because it's faster that way

const queue: Position[] = [end];

dijkstra(grid, queue, distances);

console.log("Part 1:", distances[start.y][start.x]);

const result = grid.map((row) => row.filter((x) => x.weight === 0)).flat();
console.log("Part 2:", Math.min(...result.map((x) => distances[x.position.y][x.position.x])));
