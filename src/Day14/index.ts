import { count2DArray, createArray2D, readLines } from "../utils";

type Value = "#" | "o" | undefined;

const initRocks = (floor = false): [Value[][], number] => {
  const file = readLines("src/Day14/input.prod");
  const cave: Value[][] = createArray2D(1000, 1000);

  let greatestY = -Infinity;

  file.forEach((line) => {
    const coords = line.split(" -> ").map((rawCoord) => rawCoord.split(",").map(Number));
    let [x, y] = coords[0];

    cave[y][x] = "#";
    for (const [x2, y2] of coords.slice(1)) {
      if (y2 > greatestY) greatestY = y2;

      while (x !== x2 || y !== y2) {
        if (x !== x2) x += x < x2 ? 1 : -1;
        else if (y !== y2) y += y < y2 ? 1 : -1;
        cave[y][x] = "#";
      }
    }
  });

  if (floor) {
    greatestY += 2;
    for (let x = -1000; x < 1000; x++) cave[greatestY][x] = "#";
  }

  return [cave, greatestY];
};

const sandFall = (cave: Value[][], greatestY: number) => {
  sandFalling: while (true) {
    let [x, y] = [500, 0];
    if (cave[y][x] === "o") break;
    while (true) {
      if (y >= greatestY) {
        cave[y][x] = undefined;
        break sandFalling;
      } else if (cave[y][x] === undefined) {
        cave[y][x] = "o";
      } else if (cave[y + 1][x] === undefined) {
        cave[y][x] = undefined;
        y++;
        cave[y][x] = "o";
      } else if (cave[y + 1][x - 1] === undefined) {
        cave[y][x] = undefined;
        x--;
        y++;
        cave[y][x] = "o";
      } else if (cave[y + 1][x + 1] === undefined) {
        cave[y][x] = undefined;
        x++;
        y++;
        cave[y][x] = "o";
      } else break;
    }
  }

  return count2DArray(cave, (v) => v === "o");
};

console.log("Part 1:", sandFall(...initRocks(false))); // 994
console.log("Part 2:", sandFall(...initRocks(true))); // 26283
