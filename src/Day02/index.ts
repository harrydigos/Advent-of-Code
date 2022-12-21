import * as fs from "fs";

type Player = Record<string, number>;

const handScore: Player = {
  X: 1,
  Y: 2,
  Z: 3,
};

const turnScore: Record<string, Player> = {
  A: { X: 3, Y: 6, Z: 0 },
  B: { X: 0, Y: 3, Z: 6 },
  C: { X: 6, Y: 0, Z: 3 },
};

const cheatStrategy: Player = {
  X: 0,
  Y: 3,
  Z: 6,
};

const file = fs.readFileSync("input.txt", "utf-8");

const getRounds = (file: string): string[][] => {
  let turn: string[][] = [];
  file.split(/\r?\n/).forEach((line) => {
    turn.push([line.split(" ")[0], line.split(" ")[1]]);
  });

  return turn;
};

const calculateScorePt1 = (round: string[][]): number => {
  return round
    .map(([a, b]) => turnScore[a][b] + handScore[b])
    .reduce((a, b) => a + b, 0);
};

const calculateScorePt2 = (round: string[][]): number => {
  return round
    .map(([a, b]) => {
      let cheatB = Object.entries(turnScore[a])
        .filter(([key, value]) => value === cheatStrategy[b])
        .flat()[0] as string;
      return turnScore[a][cheatB] + handScore[cheatB];
    })
    .reduce((a, b) => a + b, 0);
};

const rounds: string[][] = getRounds(file);

console.log("Part 1:", calculateScorePt1(rounds));
console.log("Part 2:", calculateScorePt2(rounds));
