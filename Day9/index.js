"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var WIDTH = 1000;
var HEIGHT = 1000;
var moves = (0, fs_1.readFileSync)("input.prod", "utf8")
    .split(/\r?\n/)
    .map(function (line) {
    var _a = line.split(" "), direction = _a[0], steps = _a[1];
    return {
        direction: direction,
        steps: parseInt(steps, 10)
    };
});
var grid = [];
for (var row = 0; row < HEIGHT; row++) {
    grid[row] = new Array(WIDTH).fill(".");
}
var center = {
    x: Math.floor(WIDTH / 2),
    y: Math.floor(HEIGHT / 2)
};
grid[center.y][center.x] += "#sTH";
var head = Object.assign({}, center);
var tail = Object.assign({}, center);
var moveTail = function (prevHeadPos, tail) {
    var neighbors = [
        { x: tail.x - 1, y: tail.y - 1 },
        { x: tail.x, y: tail.y - 1 },
        { x: tail.x + 1, y: tail.y - 1 },
        { x: tail.x - 1, y: tail.y },
        { x: tail.x, y: tail.y },
        { x: tail.x + 1, y: tail.y },
        { x: tail.x - 1, y: tail.y + 1 },
        { x: tail.x, y: tail.y + 1 },
        { x: tail.x + 1, y: tail.y + 1 },
    ];
    for (var _i = 0, neighbors_1 = neighbors; _i < neighbors_1.length; _i++) {
        var neighbor = neighbors_1[_i];
        if (grid[neighbor.y][neighbor.x].includes("H"))
            return tail;
    }
    grid[tail.y][tail.x] = grid[tail.y][tail.x].slice(0, -1);
    if (grid[prevHeadPos.y][prevHeadPos.x].includes("#"))
        grid[prevHeadPos.y][prevHeadPos.x] += "T";
    else
        grid[prevHeadPos.y][prevHeadPos.x] += "#T";
    return prevHeadPos;
};
var makeMove = function (move) {
    var movement = {
        U: { x: 0, y: -1 },
        D: { x: 0, y: 1 },
        L: { x: -1, y: 0 },
        R: { x: 1, y: 0 }
    };
    for (var i = 0; i < move.steps; i++) {
        var prev = Object.assign({}, head);
        grid[head.y][head.x] = grid[head.y][head.x].slice(0, -1);
        head.x += movement[move.direction].x;
        head.y += movement[move.direction].y;
        grid[head.y][head.x] += "H";
        tail = moveTail(prev, tail);
    }
};
moves.forEach(function (move) {
    makeMove(move);
});
console.log("Part 1:", grid.flat().filter(function (x) { return x.includes("#"); }).length);
