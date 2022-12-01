import * as fs from "fs";

const file = fs.readFileSync("input.txt", "utf-8");

const countCalories = (file: string): number[] => {
  let elves: number[] = [];
  let calories: number = 0;

  file.split(/\r?\n/).forEach((line) => {
    if (line === "") {
      elves.push(calories);
      calories = 0;
    } else {
      calories += parseInt(line, 10);
    }
  });

  elves.push(calories); // Add the last one

  return elves;
};

// Get Elf carrying the most Calories
const getAnswerPartOne = (elves: number[]): number => {
  return elves.reduce((a, b) => Math.max(a, b));
};

// Get top N Elves carrying the most Calories
const getAnswerPartTwo = (elves: number[], n: number): number => {
  let topN: number[] = [];
  for (let i = 0; i < n; i++) {
    let answer: number = elves.reduce((a, b) => Math.max(a, b));
    topN.push(answer);
    elves.splice(elves.indexOf(answer), 1);
  }
  return topN.reduce((a, b) => a + b);
};

const elves: number[] = countCalories(file);

console.log("Elf with the most Calories:", getAnswerPartOne(elves));
console.log("Top 3 Elves with the most Calories:", getAnswerPartTwo(elves, 3));
