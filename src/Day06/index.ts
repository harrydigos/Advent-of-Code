import * as fs from "fs";

const letters: string[] = fs.readFileSync("input.txt", "utf-8").split("");

const lettersPt1: string[] = [...letters];
const lettersPt2: string[] = [...letters];
const totalLetters: number = letters.length;

const getNextLetter = (from: string[], to: string[], limit: number): number => {
  if (from.length === 0) return 0;
  if (to.length === limit) to.shift();
  to.push(from.shift()!);
  return 1;
};

const checkForDouble = (packet: string[], limit: number): boolean => {
  if (packet.length < limit) return true;
  // Check if any two elements in the array are equal to each other
  return packet.some((char, index) => packet.indexOf(char, index + 1) !== -1);
};

const getSolution = (
  letters: string[],
  totalLetters: number,
  limit: number
): number => {
  let counter: number = 0;
  let packet: string[] = [];
  for (let i = 0; i < totalLetters; i++) {
    counter += getNextLetter(letters, packet, limit);
    if (!checkForDouble(packet, limit)) break;
  }
  return counter;
};

console.log("Part 1:", getSolution(lettersPt1, totalLetters, 4));
console.log("Part 2:", getSolution(lettersPt2, totalLetters, 14));
