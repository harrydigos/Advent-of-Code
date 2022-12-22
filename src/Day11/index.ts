import { readLines, splitOn } from "../utils";

type Monkey = {
  id: number;
  items: number[];
};

const main = () => {
  const file = readLines("src/Day11/input.test");
  const lines = splitOn(file, (line) => line === "");

  const monkeys: Monkey[] = lines.map((line) => {
    const numbers = /\d+/g;
    const operator = /[*+]/;
    return {
      id: parseInt(line[0].match(numbers)![0]),
      items: line[1].match(numbers)!.map((n) => parseInt(n)),
    };
  });
  console.log(lines);
  console.log(monkeys);
};

main();
