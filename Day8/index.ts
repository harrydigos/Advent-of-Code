import { readFileSync } from "fs";

let scenicScoreHorizontal: number[] = [];
let scenicScoreVertical: number[] = [];

const calculateScenicScore = (value: number, d1: number[], d2: number[]): number => {
  let sumD1: number = 0;
  let sumD2: number = 0;
  const d1R = d1.reverse();
  for (let elem of d1R) {
    sumD1++;
    if (elem >= value) break;
  }
  for (let elem of d2) {
    sumD2++;
    if (elem >= value) break;
  }
  return sumD1 * sumD2;
};

const isVisibleHorizontal = (grid: number[][], posX: number, posY: number): boolean => {
  let row = grid[posY];
  let left = row.slice(0, posX);
  let right = row.slice(posX + 1);

  scenicScoreHorizontal.push(calculateScenicScore(row[posX], left, right));

  left = left.filter((cell) => cell >= row[posX]);
  right = right.filter((cell) => cell >= row[posX]);
  if (left.length === 0 || right.length === 0) return true;
  return false;
};

const isVisibleVertical = (grid: number[][], posX: number, posY: number): boolean => {
  let column = grid.map((row) => row[posX]);
  let top = column.slice(0, posY);
  let bottom = column.slice(posY + 1);

  scenicScoreVertical.push(calculateScenicScore(column[posY], top, bottom));

  top = top.filter((cell) => cell >= column[posY]);
  bottom = bottom.filter((cell) => cell >= column[posY]);
  if (top.length === 0 || bottom.length === 0) return true;
  return false;
};

const grid: number[][] = readFileSync("input.txt", "utf8")
  .split(/\r?\n/)
  .map((line) => line.split("").map(Number));

let countVisibleTrees = 0;

grid.forEach((row, y) => {
  row.forEach((cell, x) => {
    let hor = isVisibleHorizontal(grid, x, y);
    let ver = isVisibleVertical(grid, x, y);
    hor || ver ? countVisibleTrees++ : null;
  });
});
console.log("Part 1 (Count visible trees):", countVisibleTrees);

console.log(
  "Part 2 (Max scenic score):",
  scenicScoreHorizontal.map((cell, index) => cell * scenicScoreVertical[index]).reduce((max, value) => Math.max(max, value))
);
