import { findTopNMax, multiplyArray, readLines, splitOn } from "../utils";

const ROUNDS = 20;

type Monkey = {
  id: number;
  items: number[];
  new: string;
  test: { divBy: number; trueMonkey: number; falseMonkey: number };
  inspections: number;
};

const calcNew = (line: string, item: number) => {
  const calculation = {
    "*": (a: number, b: number) => a * b,
    "+": (a: number, b: number) => a + b,
  };

  const isOld = (line: string) => line.match(/[old]/) !== null;
  const operator = line.match(/[*+]/)![0] as "*" | "+";

  const [left, right] = line.split(operator);
  const isLeftOld = isOld(left);
  const isRightOld = isOld(right);

  if (isLeftOld && isRightOld) return calculation[operator](item, item);
  else if (isLeftOld && !isRightOld) return calculation[operator](item, parseInt(right));
  else if (!isLeftOld && isRightOld) return calculation[operator](parseInt(left), item);
  else return calculation[operator](parseInt(left), parseInt(right));
};

const main = () => {
  const file = readLines("src/Day11/input.prod");
  const lines = splitOn(file, (line) => line === "");

  const monkeys: Monkey[] = lines.map((line) => {
    const numbers = /\d+/g;
    const operator = /[*+]/;
    return {
      id: parseInt(line[0].match(numbers)![0]),
      items: line[1].match(numbers)!.map((n) => parseInt(n)),
      new: line[2],
      test: {
        divBy: parseInt(line[3].match(numbers)![0]),
        trueMonkey: parseInt(line[4].match(numbers)![0]),
        falseMonkey: parseInt(line[5].match(numbers)![0]),
      },
      inspections: 0,
    };
  });

  for (let i = 0; i < ROUNDS; i++) {
    monkeys.forEach((monkey) => {
      while (monkey.items.length > 0) {
        const item = monkey.items.shift();
        if (item === undefined) break;

        const newMonkey = Math.floor(calcNew(monkey.new, item) / 3);
        console.log(newMonkey);
        const isDivisible = (dividend: number, divisor: number) => dividend % divisor === 0;

        if (isDivisible(newMonkey, monkey.test.divBy)) {
          monkeys.find((m) => m.id === monkey.test.trueMonkey)!.items.push(newMonkey);
        } else {
          monkeys.find((m) => m.id === monkey.test.falseMonkey)!.items.push(newMonkey);
        }
        monkey.inspections++;
      }
    });
  }
  const monkeyBussiness = findTopNMax(
    monkeys.map((m) => m.inspections),
    2
  );
  console.log("Part 1:", multiplyArray(monkeyBussiness));
  // console.log(lines);
  // console.log(monkeys);
};

main();
