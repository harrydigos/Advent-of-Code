import { readFileSync } from "fs";

type Command = { type: "noop"; cycles: number } | { type: "addx"; value: number; cycles: number };

const readCommands = (): Command[] => {
  return readFileSync("input.prod", "utf-8")
    .split(/\r?\n/)
    .map((line) => {
      if (line.startsWith("noop")) return { type: "noop", cycles: 1 } as Command;
      else return { type: "addx", value: parseInt(line.split(" ")[1]), cycles: 2 } as Command;
    });
};

const execCycle = (command: Command, commands: Command[]) => {
  command.cycles--;
  if (!command.cycles) {
    if (command.type === "addx") registerX += command.value;
    commands.shift();
  }
};

const commands: Command[] = readCommands();
let registerX = 1;
let cycleCount = 1;
let result: number[] = [];

while (commands.length) {
  execCycle(commands[0], commands);
  cycleCount++;
  if (cycleCount === 20 || (cycleCount > 40 && (cycleCount - 20) % 40 === 0)) result.push(registerX * cycleCount);
}

console.log(
  "Part 1:",
  result.reduce((a, b) => a + b, 0)
);
