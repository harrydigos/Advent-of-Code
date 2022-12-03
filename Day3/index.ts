import * as fs from "fs";

const file = fs.readFileSync("input.txt", "utf-8");

const getRucksacks = (file: string): string[] => {
  let rucksack: string[] = [];
  file.split(/\r?\n/).forEach((line) => {
    rucksack.push(line);
  });
  return rucksack;
};

const translateToNumber = (letter: string): number => {
  const letterAscii = letter.charCodeAt(0);

  return letterAscii >= 65 && letterAscii <= 90
    ? letterAscii - 38
    : letterAscii - 96;
};

const calculatePrioritiesPt1 = (rucksacks: string[]): number => {
  let sum: number = 0;

  rucksacks.map((rucksack) => {
    let [half1, half2] = [
      new Set(rucksack.slice(0, Math.ceil(rucksack.length / 2))),
      new Set(rucksack.slice(Math.ceil(rucksack.length / 2))),
    ];

    [...half1]
      .filter((x) => half2.has(x))
      .forEach((letter: string) => (sum += translateToNumber(letter)));
  });

  return sum;
};

const splitInGroups = (rucksacks: string[]): string[][] => {
  let groups: string[][] = [];

  for (let i = 0; i < rucksacks.length; i += 3) {
    groups.push(rucksacks.slice(i, i + 3));
  }

  return groups;
};

const calculatePrioritiesPt2 = (groups: string[][]): number => {
  let sum: number = 0;

  groups.map((group) => {
    let [groupSet1, groupSet2, groupSet3] = [
      new Set(group[0]),
      new Set(group[1]),
      new Set(group[2]),
    ];

    [...groupSet1]
      .filter((x) => groupSet2.has(x) && groupSet3.has(x))
      .forEach((letter: string) => (sum += translateToNumber(letter)));
  });
  return sum;
};

const rucksacks: string[] = getRucksacks(file);
const groups: string[][] = splitInGroups(rucksacks);

console.log("Part 1:", calculatePrioritiesPt1(rucksacks));
console.log("Part 2:", calculatePrioritiesPt2(groups));
