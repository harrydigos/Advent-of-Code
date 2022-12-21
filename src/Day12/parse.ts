import { readFileSync } from "fs";

export const file: string[][] = readFileSync("input.prod", "utf8")
  .split(/\r?\n/)
  .map((line) => line.split(""));

export const findStart = (grid: string[][]): { y: number; x: number } => {
  let result = { y: -1, x: -1 };
  grid.forEach((y) =>
    y.forEach((x) => {
      if (x === "S") result = { y: grid.indexOf(y), x: y.indexOf(x) };
    })
  );
  return result;
};

export const findEnd = (grid: string[][]): { y: number; x: number } => {
  let result = { y: -1, x: -1 };
  grid.forEach((y) =>
    y.forEach((x) => {
      if (x === "E") result = { y: grid.indexOf(y), x: y.indexOf(x) };
    })
  );
  return result;
};

export const start = findStart(file);
export const end = findEnd(file);
