export const isNumber = (value: unknown): value is number => typeof value === "number";

export const extractNumbers = (str: string): number[] => {
  const matches = str.match(/-?\d+/g);
  return matches ? matches.map(Number) : [];
};
