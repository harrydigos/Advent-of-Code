import { readFileSync } from "fs";

export const readLines = (path: string): string[] => readFileSync(path, "utf8").split(/\r?\n/);
