import { readFileSync } from "fs";

// const TAIL_COUNT = 1; // Part 1 
const TAIL_COUNT = 9; // Part 2

type Move = {
  direction: "U" | "D" | "L" | "R";
  steps: number;
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

let hX = 0;
let hY = 0;

let visited = new Set(["0/0"]);
let tails: number[][] = [];

for (let i = 0; i < TAIL_COUNT; i++) {
  tails.push([0, 0]);
}

const movement = {
  U: { x: 0, y: -1 },
  D: { x: 0, y: 1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
};

const moveHeadTo = (move: Move) => {
  hY = movement[move.direction].y + hY;
  hX = movement[move.direction].x + hX;

  for (let i = 0; i < TAIL_COUNT; i++) {
    moveTail(i);

    if (i === TAIL_COUNT - 1) {
      let [lasttX, lasttY] = tails[TAIL_COUNT - 1];
      visited.add(lasttX + "/" + lasttY);
    }
  }
};

const moveTail = (i: number) => {
  let [tX, tY] = tails[i];
  let refX = 0;
  let refY = 0;

  if (i > 0) {
    let [prevtX, prevtY] = tails[i - 1];
    refX = prevtX;
    refY = prevtY;
  } else {
    refX = hX;
    refY = hY;
  }

  let diffX = Math.abs(refX - tX);
  let diffY = Math.abs(refY - tY);

  if (diffX < 2 && diffY < 2) return;

  if (diffX > 1 && !diffY) tX += refX - tX > 0 ? 1 : -1;
  else if (diffY > 1 && !diffX) tY += refY - tY > 0 ? 1 : -1;
  else {
    tX += refX - tX > 0 ? 1 : -1;
    tY += refY - tY > 0 ? 1 : -1;
  }

  tails[i] = [tX, tY];
};

for (const move of moves) for (let n = 0; n < move.steps; n++) moveHeadTo(move);

console.log(visited.size);
