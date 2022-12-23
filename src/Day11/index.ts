import { findTopNMax, mult, readLines, splitOn } from "../utils";

const ROUNDS_PART1 = 20;
const ROUNDS_PART2 = 10000;

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

const getMonkeys = (lines: string[][]): Monkey[] => {
  return lines.map((line) => {
    const numbers = /\d+/g;

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
  }) as Monkey[];
};

const rounds = (rounds: number, monkeys: Monkey[], part: 1 | 2) => {
  const isDivisible = (dividend: number, divisor: number) => dividend % divisor === 0;
  const allDivisors = monkeys.map((monkey) => monkey.test.divBy).reduce((a, b) => a * b, 1);

  for (let i = 0; i < rounds; i++) {
    monkeys.forEach((monkey) => {
      while (monkey.items.length > 0) {
        const item = monkey.items.shift();

        if (item === undefined) break;
        monkey.inspections++;

        let newMonkey = calcNew(monkey.new, item);
        newMonkey = part === 1 ? Math.floor(newMonkey / 3) : Math.floor(newMonkey % allDivisors);

        if (isDivisible(newMonkey, monkey.test.divBy)) {
          monkeys.find((m) => m.id === monkey.test.trueMonkey)!.items.push(newMonkey);
        } else {
          monkeys.find((m) => m.id === monkey.test.falseMonkey)!.items.push(newMonkey);
        }
      }
    });
  }
};

const main = () => {
  const file = readLines("src/Day11/input.prod");
  const lines = splitOn(file, (line) => line === "");

  const monkeysPt1 = getMonkeys(lines);
  const monkeysPt2 = getMonkeys(lines);

  rounds(ROUNDS_PART1, monkeysPt1, 1);
  rounds(ROUNDS_PART2, monkeysPt2, 2);

  const monkeyBussinessPt1 = mult(
    findTopNMax(
      monkeysPt1.map((m) => m.inspections),
      2
    )
  );

  const monkeyBussinessPt2 = mult(
    findTopNMax(
      monkeysPt2.map((m) => m.inspections),
      2
    )
  );

  console.log("Part 1:", monkeyBussinessPt1); // 108240
  console.log("Part 2:", monkeyBussinessPt2); // 25712998901
};

main();
