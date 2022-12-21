import { readFileSync, writeFileSync } from "fs";

type Command = { type: "noop"; cycles: number } | { type: "addx"; value: number; cycles: number };

type Crt = "." | "#" | "";

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

const selectCrtRow = (cycle: number): number => {
  return Math.floor((cycle - 1) / 40);
};

const commands: Command[] = readCommands();
let registerX = 1;
let cycleCount = 1;
let result: number[] = [];

var crt: Crt[][] = Array.from({ length: 6 }, () => new Array(40));

while (commands.length) {
  let row = selectCrtRow(cycleCount);
  let currCycle = cycleCount % 40;
  let spritePos = registerX;

  if ([spritePos, spritePos + 1, spritePos + 2].includes(currCycle)) crt[row].push("#");
  else crt[row].push(".");

  cycleCount++;
  execCycle(commands[0], commands);
  if (cycleCount === 20 || (cycleCount > 40 && (cycleCount - 20) % 40 === 0)) result.push(registerX * cycleCount);
}

// Part 1
console.log(result.reduce((a, b) => a + b, 0));

// Part 2
writeFileSync("output.prod", crt.map((row) => row.join("")).join("\n"));
