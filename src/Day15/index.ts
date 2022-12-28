import { extractNumbers, readLines } from "../utils";

type Position = { x: number; y: number };

const getRadar = (): { sensor: Position; beacon: Position; distance: number }[] => {
  const file = readLines("src/Day15/input.prod");
  const getPosition = (str: string) => extractNumbers(str);

  return file.map((line) => {
    const [signal, beacon] = line.split(":");
    const [sX, sY] = getPosition(signal);
    const [bX, bY] = getPosition(beacon);

    return {
      sensor: { x: sX, y: sY },
      beacon: { x: bX, y: bY },
      distance: Math.abs(sX - bX) + Math.abs(sY - bY),
    };
  });
};

const part1 = (row: number) => {
  let count = 0;
  const seenX = new Set<number>();

  for (const { sensor, beacon, distance } of getRadar()) {
    if (sensor.y === row) seenX.add(sensor.x);
    if (beacon.y === row) seenX.add(beacon.x);

    for (let x = sensor.x - distance; x <= sensor.x + distance; x++) {
      if (!seenX.has(x) && Math.abs(sensor.x - x) + Math.abs(sensor.y - row) <= distance) {
        seenX.add(x);
        count++;
      }
    }
  }
  return count;
};

const start = () => {
  console.log(part1(2000000)); // 4737567
};

start();
