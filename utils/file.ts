import { readFileSync } from "fs";

export const readLines = (filename: string): string[] => readFileSync(filename, "utf8").split(/\r?\n/);
