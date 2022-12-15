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
var placeSandInLeft = function (y, x) {
    var placeSand;
    for (var i = y; i < cave.length; i++) {
        if (cave[i][x] === "#")
            break;
        if (cave[i][x] === ".")
            placeSand = { y: i, x: x };
        x--;
    }
    return placeSand;
};
var pourSand = function () {
    cave[0][500] = "+";
    while (cave[1][500] === ".") {
        for (var y = 0; y < cave.length; y++) {
            var nextIsRock = cave[y + 1][500] === "#";
            var nextIsSand = cave[y + 1][500] === "o";
            if (nextIsRock) {
                cave[y][500] = "o";
                break;
            }
            else if (nextIsSand) {
                var left = placeSandInLeft(y, 500);
                if (!left) {
                    cave[y][500] = "o";
                }
                else if (left) {
                    cave[left.y][left.x] = "o";
                }
                break;
            }
        }
    }
};
var SIZE = 1000;
var cave = Array.from({ length: 20 }, function () { return Array.from({ length: SIZE }, function () { return "."; }); });
var file = (0, fs_1.readFileSync)("input.test", "utf8").split(/\r?\n/);
var rocks = file.map(function (line) { return line.split(" -> ").map(function (rock) { return +rock.replace(",", "."); }); });
initRocks();
pourSand();
(0, fs_1.writeFileSync)("output.test", cave.map(function (row) { return row.map(function (cell) { return cell; }).join(""); }).join("\n"));
