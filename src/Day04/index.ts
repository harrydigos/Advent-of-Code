import * as fs from "fs";

const file = fs.readFileSync("input.txt", "utf-8");

const getPairs = (file: string): string[][] => {
  let pairs: string[][] = [];
  file.split(/\r?\n/).forEach((line) => {
    pairs.push([line.split(",")[0], line.split(",")[1]]);
  });
  return pairs;
};

const containsPt1 = (one: number[], two: number[]): boolean => {
  return one[0] <= two[0] && one[1] >= two[1];
};

const containsPt2 = (one: number[], two: number[]): boolean => {
  return (
    (one[0] <= two[0] && one[1] >= two[0]) ||
    (one[1] >= two[1] && one[0] <= two[1])
  );
};

const splitPairs = (pair: string[]): number[][] => {
  return [pair[0].split("-").map((x) => +x), pair[1].split("-").map((x) => +x)];
};

const findOverlapsPt1 = (pairs: string[][]): number => {
  return pairs
    .map((pair) => {
      let [left, right] = splitPairs(pair);
      return containsPt1(left, right) || containsPt1(right, left);
    })
    .filter((x) => x).length;
};

const findOverlapsPt2 = (pairs: string[][]): number => {
  return pairs
    .map((pair) => {
      let [left, right] = splitPairs(pair);
      return containsPt2(left, right) || containsPt2(right, left);
    })
    .filter((x) => x).length;
};

const pairs: string[][] = getPairs(file);
console.log(findOverlapsPt1(pairs), findOverlapsPt2(pairs));
