"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var initRocks = function () {
    for (var i = 0; i < rocks.length; i++) {
        for (var j = 0; j < rocks[i].length; j++) {
            var getXAxis = function (x) { return parseInt(x.toString().split(".")[0]); };
            var getYAxis = function (y) { return parseFloat(y.toString().split(".")[1]); };
            var from = rocks[i][j];
            var to = rocks[i][j + 1];
            if (!to)
                break;
            var _a = [getXAxis(from), getYAxis(from)], xAxisFrom = _a[0], yAxisFrom = _a[1];
            var _b = [getXAxis(to), getYAxis(to)], xAxisTo = _b[0], yAxisTo = _b[1];
            var vertical = xAxisFrom === xAxisTo;
            var horizontal = yAxisFrom === yAxisTo;
            var placeRock = function (y, x) { return (cave[y][x] !== "#" ? (cave[y][x] = "#") : null); };
            if (vertical) {
                for (var y = yAxisFrom; y <= yAxisTo; y++)
                    placeRock(y, xAxisFrom);
                for (var y = yAxisTo; y <= yAxisFrom; y++)
                    placeRock(y, xAxisFrom);
            }
            if (horizontal) {
                for (var x = xAxisFrom; x <= xAxisTo; x++)
                    placeRock(yAxisFrom, x);
                for (var x = xAxisTo; x <= xAxisFrom; x++)
                    placeRock(yAxisFrom, x);
            }
        }
    }
};
var isInBounds = function (y, x) { return y >= 0 && y < cave.length && x >= 0 && x < cave[0].length; };
var placeSandInLeft = function () {
    var fall = fallSand();
    while (isInBounds(fall.y + 1, fall.x - 1) && cave[fall.y + 1][fall.x - 1] === ".") {
        fall = { y: fall.y + 1, x: fall.x - 1 };
    }
    return fall;
};
var placeSandInRight = function () {
    var fall = fallSand();
    while (isInBounds(fall.y + 1, fall.x + 1) && cave[fall.y + 1][fall.x + 1] === ".") {
        fall = { y: fall.y + 1, x: fall.x + 1 };
    }
    return fall;
};
var fallSand = function () {
    var y = 1;
    while (isInBounds(y + 1, 500) && cave[y + 1][500] === ".") {
        y++;
    }
    return { y: y, x: 500 };
};
var pourSand = function () {
    cave[0][500] = "+";
    while (cave[2][500] === ".") {
        // Go straight down
        // Go left diagonal
        // Go right diagonal
        var fall = fallSand();
        var left = placeSandInLeft();
        var right = placeSandInRight();
        console.log("Fall sand", fall);
        if (cave[fall.y + 1][fall.x - 1] !== "." && cave[fall.y + 1][fall.x + 1] !== "." && cave[fall.y + 1][fall.x] !== ".") {
            cave[fall.y][fall.x] = "o";
        }
        if (left)
            cave[left.y][left.x] = "o";
        if (right)
            cave[right.y][right.x] = "o";
    }
};
var SIZE = 1000;
var cave = Array.from({ length: 20 }, function () { return Array.from({ length: SIZE }, function () { return "."; }); });
var file = (0, fs_1.readFileSync)("input.test", "utf8").split(/\r?\n/);
var rocks = file.map(function (line) { return line.split(" -> ").map(function (rock) { return +rock.replace(",", "."); }); });
initRocks();
pourSand();
(0, fs_1.writeFileSync)("output.test", cave.map(function (row) { return row.map(function (cell) { return cell; }).join(""); }).join("\n"));
