"use strict";
exports.__esModule = true;
var fs = require("fs");
var file = fs.readFileSync("input.txt", "utf-8");
var getRounds = function (file) {
    var turn = [];
    file.split(/\r?\n/).forEach(function (line) {
        turn.push([line.split(" ")[0], line.split(" ")[1]]);
    });
    return turn;
};
var getRoundWinnerPt1 = function (round) {
    if (round[0] === "A") {
        if (round[1] === "X")
            return [3, 3];
        else if (round[1] === "Y")
            return [0, 6];
        else if (round[1] === "Z")
            return [6, 0];
    }
    else if (round[0] === "B") {
        if (round[1] === "X")
            return [6, 0];
        else if (round[1] === "Y")
            return [3, 3];
        else if (round[1] === "Z")
            return [0, 6];
    }
    else {
        if (round[1] === "X")
            return [0, 6];
        else if (round[1] === "Y")
            return [6, 0];
        else if (round[1] === "Z")
            return [3, 3];
    }
    return [0, 0];
};
var getRoundWinnerPt2 = function (round) {
    if (round[1] === "X")
        return [6, 0];
    else if (round[1] === "Y")
        return [3, 3];
    else if (round[1] === "Z")
        return [0, 6];
    return [0, 0];
};
var calculateScorePt1 = function (rounds) {
    var player1Score = 0;
    var player2Score = 0;
    rounds.map(function (round) {
        if (round[0] === "A")
            player1Score += 1;
        else if (round[0] === "B")
            player1Score += 2;
        else if (round[0] === "C")
            player1Score += 3;
        if (round[1] === "X")
            player2Score += 1;
        else if (round[1] === "Y")
            player2Score += 2;
        else if (round[1] === "Z")
            player2Score += 3;
        var roundWinner = getRoundWinnerPt1(round);
        player1Score += roundWinner[0];
        player2Score += roundWinner[1];
    });
    return [player1Score, player2Score];
};
var calculateScorePt2 = function (rounds) {
    var player1Score = 0;
    var player2Score = 0;
    rounds.map(function (round) {
        if (round[0] === "A") {
            player1Score += 1;
            if (round[1] === "X")
                player2Score += 3;
            else if (round[1] === "Y")
                player2Score += 1;
            else if (round[1] === "Z")
                player2Score += 2;
        }
        else if (round[0] === "B") {
            player1Score += 2;
            if (round[1] === "X")
                player2Score += 1;
            else if (round[1] === "Y")
                player2Score += 2;
            else if (round[1] === "Z")
                player2Score += 3;
        }
        else {
            player1Score += 3;
            if (round[1] === "X")
                player2Score += 2;
            else if (round[1] === "Y")
                player2Score += 3;
            else if (round[1] === "Z")
                player2Score += 1;
        }
        var roundWinner = getRoundWinnerPt2(round);
        player1Score += roundWinner[0];
        player2Score += roundWinner[1];
    });
    return [player1Score, player2Score];
};
var roundsPt1 = getRounds(file);
var roundsPt2 = getRounds(file);
console.log("Part 1: ", calculateScorePt1(roundsPt1));
console.log("Part 2: ", calculateScorePt2(roundsPt2));
