import { readFileSync, writeFileSync } from "fs";

const initRocks = () => {
  for (let i = 0; i < rocks.length; i++) {
    for (let j = 0; j < rocks[i].length; j++) {
      const getXAxis = (x: number) => parseInt(x.toString().split(".")[0]);
      const getYAxis = (y: number) => parseFloat(y.toString().split(".")[1]);

      const from = rocks[i][j];
      const to = rocks[i][j + 1];
      if (!to) break;

      const [xAxisFrom, yAxisFrom] = [getXAxis(from), getYAxis(from)];
      const [xAxisTo, yAxisTo] = [getXAxis(to), getYAxis(to)];

      const vertical = xAxisFrom === xAxisTo;
      const horizontal = yAxisFrom === yAxisTo;

      const placeRock = (y: number, x: number) => (cave[y][x] !== "#" ? (cave[y][x] = "#") : null);

      if (vertical) {
        for (let y = yAxisFrom; y <= yAxisTo; y++) placeRock(y, xAxisFrom);
        for (let y = yAxisTo; y <= yAxisFrom; y++) placeRock(y, xAxisFrom);
      }
      if (horizontal) {
        for (let x = xAxisFrom; x <= xAxisTo; x++) placeRock(yAxisFrom, x);
        for (let x = xAxisTo; x <= xAxisFrom; x++) placeRock(yAxisFrom, x);
      }
    }
  }
};

const isInBounds = (y: number, x: number) => y >= 0 && y < cave.length && x >= 0 && x < cave[0].length;

const placeSandInLeft = () => {
  let fall = fallSand();
  while (isInBounds(fall.y + 1, fall.x - 1) && cave[fall.y + 1][fall.x - 1] === ".") {
    fall = { y: fall.y + 1, x: fall.x - 1 };
  }
  return fall;
};

const placeSandInRight = () => {
  let fall = fallSand();
  while (isInBounds(fall.y + 1, fall.x + 1) && cave[fall.y + 1][fall.x + 1] === ".") {
    fall = { y: fall.y + 1, x: fall.x + 1 };
  }
  return fall;
};

const fallSand = () => {
  let y = 1;
  while (isInBounds(y + 1, 500) && cave[y + 1][500] === ".") {
    y++;
  }
  return { y, x: 500 };
};

const pourSand = () => {
  cave[0][500] = "+";

  while (cave[2][500] === ".") {
    // Go straight down
    // Go left diagonal
    // Go right diagonal
    const fall = fallSand();
    const left = placeSandInLeft();
    const right = placeSandInRight();

    console.log("Fall sand", fall);
    if (cave[fall.y + 1][fall.x - 1] !== "." && cave[fall.y + 1][fall.x + 1] !== "." && cave[fall.y + 1][fall.x] !== ".") {
      cave[fall.y][fall.x] = "o";
    }
    if (left) cave[left.y][left.x] = "o";
    if (right) cave[right.y][right.x] = "o";
  }
};

const SIZE = 1000;

const cave = Array.from({ length: 20 }, () => Array.from({ length: SIZE }, () => "."));

const file = readFileSync("input.test", "utf8").split(/\r?\n/);

const rocks: number[][] = file.map((line) => line.split(" -> ").map((rock) => +rock.replace(",", ".")));

initRocks();

pourSand();

writeFileSync("output.test", cave.map((row) => row.map((cell) => cell).join("")).join("\n"));
