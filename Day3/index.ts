import * as fs from "fs";

const file = fs.readFileSync("input.txt", "utf-8");

const getRucksacks = (file: string): string[] => {
  let rucksack: string[] = [];
  file.split(/\r?\n/).forEach((line) => {
    rucksack.push(line);
  });

  return rucksack;
};

const splitInHalf = (rucksack: string): [string, string] => {
  return [
    rucksack.slice(0, Math.ceil(rucksack.length / 2)),
    rucksack.slice(Math.ceil(rucksack.length / 2)),
  ];
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
    let [half1, half2] = splitInHalf(rucksack);

    [...half1].map((letter) => {
      if (half2.includes(letter)) {
        half2 = half2.replace(RegExp(letter, "g"), "");
        sum += translateToNumber(letter);
      }
    });
  });

  return sum;
};

const splitInGroups = (rucksacks: string[]): string[][] => {
  let groups: string[][] = [];
  let i = 0;
  while (i < rucksacks.length) {
    groups.push(rucksacks.slice(i, i + 3));
    i += 3;
  }

  return groups;
};

const calculatePrioritiesForGroupsPt2 = (groups: string[][]): number => {
  let sum: number = 0;

  for (let i = 0; i < groups.length; i++) {
    let group1 = groups[i][0];
    let group2 = groups[i][1];
    let group3 = groups[i][2];

    [...group1].map((letter) => {
      if (group2.includes(letter) && group3.includes(letter)) {
        group2 = group2.replace(RegExp(letter, "g"), "");
        group3 = group3.replace(RegExp(letter, "g"), "");
        sum += translateToNumber(letter);
      }
    });
  }

  return sum;
};

const rucksacks: string[] = getRucksacks(file);
const groups: string[][] = splitInGroups(rucksacks);

console.log("Part 1:", calculatePrioritiesPt1(rucksacks));
console.log("Part 2:", calculatePrioritiesForGroupsPt2(groups));
