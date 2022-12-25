import { readFileSync, writeFileSync } from "fs";

export const readLines = (path: string): string[] => readFileSync(path, "utf8").split(/\r?\n/);

export const writeLines = <T>(path: string, lines: T[][]) =>
  writeFileSync(path, lines.map((row) => row.map((cell) => cell).join("")).join("\n"));
