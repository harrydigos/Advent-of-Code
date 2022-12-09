import { readFileSync } from "fs";

const WIDTH: number = 1000;
const HEIGHT: number = 1000;

type Move = {
  direction: "U" | "D" | "L" | "R";
  steps: number;
};

type Cell = {
  x: number;
  y: number;
};

const moves: Move[] = readFileSync("input.prod", "utf8")
  .split(/\r?\n/)
  .map((line) => {
    const [direction, steps] = line.split(" ");
    return {
      direction,
      steps: parseInt(steps, 10),
    } as Move;
  });

const grid: string[][] = [];

for (let row = 0; row < HEIGHT; row++) {
  grid[row] = new Array(WIDTH).fill(".");
}

const center: Cell = {
  x: Math.floor(WIDTH / 2),
  y: Math.floor(HEIGHT / 2),
};

grid[center.y][center.x] += "#sTH";

var head: Cell = Object.assign({}, center);
var tail: Cell = Object.assign({}, center);

const moveTail = (prevHeadPos: Cell, tail: Cell): Cell => {
  let neighbors: Cell[] = [
    { x: tail.x - 1, y: tail.y - 1 },
    { x: tail.x, y: tail.y - 1 },
    { x: tail.x + 1, y: tail.y - 1 },
    { x: tail.x - 1, y: tail.y },
    { x: tail.x, y: tail.y },
    { x: tail.x + 1, y: tail.y },
    { x: tail.x - 1, y: tail.y + 1 },
    { x: tail.x, y: tail.y + 1 },
    { x: tail.x + 1, y: tail.y + 1 },
  ];

  for (let neighbor of neighbors) if (grid[neighbor.y][neighbor.x].includes("H")) return tail;

  grid[tail.y][tail.x] = grid[tail.y][tail.x].slice(0, -1);
  if (grid[prevHeadPos.y][prevHeadPos.x].includes("#")) grid[prevHeadPos.y][prevHeadPos.x] += "T";
  else grid[prevHeadPos.y][prevHeadPos.x] += "#T";
  return prevHeadPos;
};

const makeMove = (move: Move): void => {
  let movement = {
    U: { x: 0, y: -1 },
    D: { x: 0, y: 1 },
    L: { x: -1, y: 0 },
    R: { x: 1, y: 0 },
  };

  for (let i = 0; i < move.steps; i++) {
    let prev = Object.assign({}, head);
    grid[head.y][head.x] = grid[head.y][head.x].slice(0, -1);
    head.x += movement[move.direction].x;
    head.y += movement[move.direction].y;
    grid[head.y][head.x] += "H";
    tail = moveTail(prev, tail);
  }
};

moves.forEach((move) => {
  makeMove(move);
});

console.log("Part 1:", grid.flat().filter((x) => x.includes("#")).length);
