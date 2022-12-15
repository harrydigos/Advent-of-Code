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

const placeSandInLeft = (y: number, x: number) => {
  let placeSand;
  for (let i = y; i < cave.length; i++) {
    if (cave[i][x] === "#") break;
    if (cave[i][x] === ".") placeSand = { y: i, x };
    x--;
  }
  return placeSand;
};

const pourSand = () => {
  cave[0][500] = "+";

  while (cave[1][500] === ".") {
    for (let y = 0; y < cave.length; y++) {
      const nextIsRock = cave[y + 1][500] === "#";
      const nextIsSand = cave[y + 1][500] === "o";

      if (nextIsRock) {
        cave[y][500] = "o";
        break;
      } else if (nextIsSand) {
        let left = placeSandInLeft(y, 500);
        if (!left) {
          cave[y][500] = "o";
        } else if (left) {
          cave[left.y][left.x] = "o";
        }
        break;
      }
    }
  }
};

const SIZE = 1000;

const cave = Array.from({ length: 20 }, () => Array.from({ length: SIZE }, () => "."));

const file = readFileSync("input.test", "utf8").split(/\r?\n/);

const rocks: number[][] = file.map((line) => line.split(" -> ").map((rock) => +rock.replace(",", ".")));

initRocks();

pourSand();

writeFileSync("output.test", cave.map((row) => row.map((cell) => cell).join("")).join("\n"));
