import { extractNumbers, readLines } from "../utils";

type Position = { y: number; x: number };

type Signal = "#" | "S" | "B";

const getRadar = (): Map<Position, Signal> => {
  const file = readLines("src/Day15/input.test");
  const radar: Map<Position, Signal> = new Map();

  const getPosition = (str: string) => extractNumbers(str);

  file.forEach((line) => {
    const [signal, beacon] = line.split(":");
    const [sX, sY] = getPosition(signal);
    const [bX, bY] = getPosition(beacon);

    radar.set({ x: sX, y: sY }, "S");
    radar.set({ x: bX, y: bY }, "B");
  });

  return radar;
};

const expandSensor = (radar: Map<Position, Signal>, sensor: Position, expandBy: number): boolean => {
  let foundBeacon = false;

  const placeSignal = (position: Position) => {
    if (!radar.has(position)) radar.set(position, "#");
    else if (radar.get(position) === "B") return true;

    return false;
  };

  foundBeacon = placeSignal({ x: sensor.x - expandBy, y: sensor.y });

  let start = { x: sensor.x - expandBy, y: sensor.y };

  for (let i = 1; i <= expandBy; i++) placeSignal({ x: ++start.x, y: --start.y });
  for (let i = 1; i <= expandBy; i++) placeSignal({ x: ++start.x, y: ++start.y });
  for (let i = 1; i <= expandBy; i++) placeSignal({ x: --start.x, y: ++start.y });
  for (let i = 1; i <= expandBy - 1; i++) placeSignal({ x: --start.x, y: --start.y });

  console.log(radar);
  return foundBeacon;
};

const sensorBeat = (radar: Map<Position, Signal>, sensor: Position) => {
  let i = 1;
  while (!expandSensor(radar, sensor, i)) i++;

  return radar;
};

const start = () => {
  const radar: Map<Position, Signal> = getRadar();

  // sensorBeat(radar, { x: 8, y: 7 });
  sensorBeat(radar, { x: 14, y: 3 });

  console.log(radar);
};

start();
