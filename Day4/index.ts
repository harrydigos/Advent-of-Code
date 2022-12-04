import * as fs from "fs";

const file = fs.readFileSync("input.txt", "utf-8");

const getPairs = (file: string): string[][] => {
  let pairs: string[][] = [];
  file.split(/\r?\n/).forEach((line) => {
    pairs.push([line.split(",")[0], line.split(",")[1]]);
  });
  return pairs;
};

const getHoursSets = (pairs: string[]): Set<Number>[] => {
  let hours: Set<Number> = new Set();
  let hours2: Set<Number> = new Set();

  let [hourStart, hourEnd] = [
    parseInt(pairs[0].slice(0, pairs[0].indexOf("-"))),
    parseInt(pairs[0].slice(pairs[0].indexOf("-") + 1)),
  ];
  let [hourStart2, hourEnd2] = [
    parseInt(pairs[1].slice(0, pairs[1].indexOf("-"))),
    parseInt(pairs[1].slice(pairs[1].indexOf("-") + 1)),
  ];

  for (let i = hourStart; i <= hourEnd; i++) hours.add(i);
  for (let i = hourStart2; i <= hourEnd2; i++) hours2.add(i);

  return [hours, hours2];
};

const intersection = (setA: Set<Number>, setB: Set<Number>): Set<Number> => {
  const _intersection = new Set<Number>();
  setB.forEach((x) => {
    setA.has(x) && _intersection.add(x);
  });
  return _intersection;
};

const findHourOverlaps = (pairs: string[][]): [number, number] => {
  let overlapCountPt1: number = 0;
  let overlapCountPt2: number = 0;

  pairs.map((pair) => {
    const [hours, hours2]: Set<Number>[] = getHoursSets(pair);
    const intersectionSet: Set<Number> = intersection(hours, hours2);

    if (
      intersectionSet.size === hours.size ||
      intersectionSet.size === hours2.size
    )
      overlapCountPt1++;

    if (intersectionSet.size > 0) overlapCountPt2++; // Part 2
  });

  return [overlapCountPt1, overlapCountPt2];
};

const pairs: string[][] = getPairs(file);
console.log(findHourOverlaps(pairs));
