import * as fs from "fs";

const file = fs.readFileSync("input.txt", "utf-8").split(/\r?\n/);

const containers = file.slice(0, file.indexOf(""));

const countContainers = containers.pop()?.replace(/\s/g, "").length;

const moves = file.slice(file.indexOf("") + 1, file.length);

const initStack = (
  containers: string[],
  totalContainers: number
): string[][] => {
  let stacks: string[][] = [];
  let stack = [...containers].reverse();

  for (let i = 0; i < totalContainers; i++) {
    i === 0
      ? stacks.push(stack.map((x) => x.slice(0, 3).replace(/\s/g, "")))
      : stacks.push(
          stack.map((x) => x.slice(i * 4 - 1, i * 4 + 3).replace(/\s/g, ""))
        );
  }
  return stacks.map((x) => x.filter((y) => y !== ""));
};

const initMoves = (moves: string[]): number[][] => {
  return moves.map((move) =>
    move
      .split(" ")
      .filter((x) => +x)
      .map(Number)
  );
};

const getResult = (stacks: string[][]): string => {
  return stacks.reduce((result, stack) => result + stack.at(-1)?.at(-2), "");
};

const solvePt1 = (stacks: string[][], moves: number[][]): string => {
  moves.forEach(([num, from, to]) => {
    for (let i = 0; i < num; i++) {
      stacks[to - 1].push(stacks[from - 1].pop()!);
    }
  });
  return getResult(stacks);
};

const solvePt2 = (stacks: string[][], moves: number[][]): string => {
  moves.forEach(([num, from, to]) => {
    let tmp: string[] = [];
    for (let i = 0; i < num; i++) {
      tmp.unshift(stacks[from - 1].pop()!);
    }
    stacks[to - 1].push(...tmp);
  });
  return getResult(stacks);
};

const movesArr: number[][] = initMoves(moves);
const s = initStack(containers, countContainers!);
const s2 = initStack(containers, countContainers!);

console.log("Part 1:", solvePt1(s, movesArr));
console.log("Part 2:", solvePt2(s2, movesArr));
