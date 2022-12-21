import { zip, isNumber, isArray, readLines, splitOn } from "../utils";

const COMPARISON = {
  Correct: -1,
  Equal: 0,
  Incorrect: 1,
} as const;

type Packet = (number[] | number)[];
type Comparison = typeof COMPARISON[keyof typeof COMPARISON];

const comparePackets = (l: Packet, r: Packet): Comparison => {
  for (const [left, right] of zip(l, r)) {
    if (left === undefined) return COMPARISON.Correct;
    if (right === undefined) return COMPARISON.Incorrect;

    if (isNumber(left) && isNumber(right)) {
      if (left === right) continue;
      return left < right ? COMPARISON.Correct : COMPARISON.Incorrect;
    }

    const result = comparePackets(isArray(left) ? left : [left], isArray(right) ? right : [right]);

    if (result !== COMPARISON.Equal) return result;
  }
  return COMPARISON.Equal;
};

const main = () => {
  const file = readLines("input.prod");
  const lines = file.map((line) => (line !== "" ? JSON.parse(line) : ""));

  const separatorPackets: Packet[] = [[[2]], [[6]]];
  const separatorStrings: string[] = separatorPackets.map((p) => JSON.stringify(p));

  const pairs = splitOn(lines, (l) => l === "") as [Packet, Packet][];
  const allPackets = [...pairs.flatMap((p) => p), ...separatorPackets];

  const sum = pairs
    .map(([left, right]) => comparePackets(left, right))
    .reduce((sum: number, result, i) => sum + (result === COMPARISON.Correct ? i + 1 : 0), 0);

  const decoderKey = allPackets
    .sort(comparePackets)
    .reduce((result, packet, i) => result * (separatorStrings.includes(JSON.stringify(packet)) ? i + 1 : 1), 1);

  console.log("Part 1:", sum);
  console.log("Part 2:", decoderKey);
};

main();
