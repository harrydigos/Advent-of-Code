import * as fs from "fs";

const file = fs.readFileSync("input.txt", "utf-8");

const getRounds = (file: string): string[][] => {
  let turn: string[][] = [];
  file.split(/\r?\n/).forEach((line) => {
    turn.push([line.split(" ")[0], line.split(" ")[1]]);
  });

  return turn;
};

const getRoundWinnerPt1 = (round: string[]): number[] => {
  if (round[0] === "A") {
    if (round[1] === "X") return [3, 3];
    else if (round[1] === "Y") return [0, 6];
    else if (round[1] === "Z") return [6, 0];
  } else if (round[0] === "B") {
    if (round[1] === "X") return [6, 0];
    else if (round[1] === "Y") return [3, 3];
    else if (round[1] === "Z") return [0, 6];
  } else {
    if (round[1] === "X") return [0, 6];
    else if (round[1] === "Y") return [6, 0];
    else if (round[1] === "Z") return [3, 3];
  }
  return [0, 0];
};

const getRoundWinnerPt2 = (round: string[]): number[] => {
  if (round[1] === "X") return [6, 0];
  else if (round[1] === "Y") return [3, 3];
  else if (round[1] === "Z") return [0, 6];
  return [0, 0];
};

const calculateScorePt1 = (rounds: string[][]): number[] => {
  let player1Score: number = 0;
  let player2Score: number = 0;

  rounds.map((round) => {
    if (round[0] === "A") player1Score += 1;
    else if (round[0] === "B") player1Score += 2;
    else if (round[0] === "C") player1Score += 3;

    if (round[1] === "X") player2Score += 1;
    else if (round[1] === "Y") player2Score += 2;
    else if (round[1] === "Z") player2Score += 3;

    const roundWinner: number[] = getRoundWinnerPt1(round);
    player1Score += roundWinner[0];
    player2Score += roundWinner[1];
  });

  return [player1Score, player2Score];
};

const calculateScorePt2 = (rounds: string[][]): number[] => {
  let player1Score: number = 0;
  let player2Score: number = 0;

  rounds.map((round) => {
    if (round[0] === "A") {
      player1Score += 1;
      if (round[1] === "X") player2Score += 3;
      else if (round[1] === "Y") player2Score += 1;
      else if (round[1] === "Z") player2Score += 2;
    } else if (round[0] === "B") {
      player1Score += 2;
      if (round[1] === "X") player2Score += 1;
      else if (round[1] === "Y") player2Score += 2;
      else if (round[1] === "Z") player2Score += 3;
    } else {
      player1Score += 3;
      if (round[1] === "X") player2Score += 2;
      else if (round[1] === "Y") player2Score += 3;
      else if (round[1] === "Z") player2Score += 1;
    }

    const roundWinner: number[] = getRoundWinnerPt2(round);
    player1Score += roundWinner[0];
    player2Score += roundWinner[1];
  });

  return [player1Score, player2Score];
};

const roundsPt1: string[][] = getRounds(file);
const roundsPt2: string[][] = getRounds(file);

console.log("Part 1: ", calculateScorePt1(roundsPt1));
console.log("Part 2: ", calculateScorePt2(roundsPt2));

