export const isArray = <T>(value: unknown): value is T[] => Array.isArray(value);

export const lastItem = <T>(array: T[]): T => array[array.length - 1];

export const sum = (values: number[]): number => values.reduce((a, b) => a + b, 0);

export const createArray = <T = undefined>(size: number): T[] => Array.from({ length: size });

/**
 * Get the maximum length of an array of arrays.
 * @param arrays The arrays to get the maximum length of.
 * @returns The maximum length of the given arrays.
 * @example maxLength([[1, 2, 3], [1, 2, 3, 4, 5], [1, 2]]); // 5
 */
export const maxLength = <T>(arrays: T[][]): number => Math.max(...arrays.map((array) => array.length));

/**
 * Zip two arrays together.
 * @param arr1 The first array to zip.
 * @param arr2 The second array to zip.
 * @returns An array of tuples containing the items from the given arrays.
 * @example zip([1, 2, 3], [4, 5, 6]); // [[1, 4], [2, 5], [3, 6]]
 */
export const zip = <T>(arr1: T[], arr2: T[]): [T | undefined, T | undefined][] => {
  const max = maxLength([arr1, arr2]);
  return createArray(max).map((_, i) => [arr1[i], arr2[i]]);
};

/**
 * Split arrays based on a predicate.
 * @param array The array to split.
 * @param predicate Receives the current item and returns true if the split should happen at that item.
 */
export const splitOn = <T>(array: T[], predicate: (v: T, i: number) => boolean): T[][] =>
  array
    .reduce(
      (chunks: T[][], item: T, index: number) => {
        if (predicate(item, index)) chunks.push([]);
        else lastItem(chunks).push(item);
        return chunks;
      },
      [[]] as T[][]
    )
    .filter((a) => a.length > 0);
