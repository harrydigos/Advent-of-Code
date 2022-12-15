import { readFileSync } from "fs";

type Packet = number | number[] | undefined;

const file = readFileSync("input.test", "utf8").split(/\r?\n/);

const input = [];

for (let i = 0; i < file.length; i += 3) {
  input.push([file[i], file[i + 1]]);
}

let pairs: Packet[][] = input.map(([left, right]) => {
  return [JSON.parse(left), JSON.parse(right)];
});

const isOrdered = (left: Packet, right: Packet, ordered: boolean = true): boolean => {
  if (!ordered) return false;

  const isNumber = (item: Packet): item is number => typeof item === "number";
  const isArray = (item: Packet): item is number[] => Array.isArray(item);
  const isUndefined = (item: Packet): item is undefined => item === undefined;

  const bothAreNumbers = isNumber(left) && isNumber(right);
  const bothAreArrays = isArray(left) && isArray(right);
  const oneNumber = (isNumber(left) && !isNumber(right)) || (!isNumber(left) && isNumber(right));
  const oneArray = (isArray(left) && !isArray(right)) || (!isArray(left) && isArray(right));

  if (bothAreNumbers) {
    ordered = left <= right;
    console.log("bothAreNumbers", left, "<=", right, ordered);
  } else if (bothAreArrays) {
    console.log("bothAreArrays", left, right);
    for (let i = 0; i < left.length; i++) {
      ordered = isOrdered(left[i], right[i], ordered);
      if (!ordered) return false;
    }
  } else if (oneNumber) {
    console.log("oneNumber", left, right);
    const leftArray = isNumber(left) ? [left] : isArray(left) ? left : [];
    const rightArray = isNumber(right) ? [right] : isArray(right) ? right : [];

    if (!isUndefined(left) && !isUndefined(right)) ordered = leftArray[0] <= rightArray[0];
    else if (isUndefined(left) && !isUndefined(right)) ordered = true;
    else if (isNumber(left) && isUndefined(right)) ordered = false;
  } else if (oneArray) {
    console.log("oneArray", left, right);
    if (isUndefined(right)) ordered = false;
  }

  return ordered;
};

let count: number[] = [];
pairs.forEach(([left, right], index) => {
  console.log("Index", index + 1);
  if (isOrdered(left, right)) {
    console.log("Index", index + 1, "right order");
    count.push(index + 1);
  }
});

console.log(count.reduce((a, b) => a + b, 0));
