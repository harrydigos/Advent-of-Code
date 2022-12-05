"use strict";
var _a;
exports.__esModule = true;
var fs = require("fs");
var file = fs.readFileSync("example.txt", "utf-8").split(/\r?\n/);
var containers = file.slice(0, file.indexOf(""));
var countContainers = (_a = containers.at(-1)) === null || _a === void 0 ? void 0 : _a.replace(/\s/g, "").length;
var moves = file.slice(file.indexOf("") + 1, file.length);
// const getStack = (containers: string[]): string[][] => {
//   let neww = containers
//     .map((container) => {
//       return container.split("   ").filter((x) => x.split(" "));
//     })
//     .map((x) =>
//       x
//         .map((y) => y.replace(/[ ]/g, "").replace(/[\]]+/g, "],").split(","))
//         .flat()
//     );
//   neww.pop();
//   neww.map((x) => x.pop());
//   return neww;
// };
// const oof = getStack(containers);
// console.log(oof);
containers.pop();
var stack = containers.reverse();
console.log(stack);
var stacks = [];
var _loop_1 = function (i) {
    stacks.push(
    // stack.map((x) => x.slice(i * 3, i * 3 + 3).replace(/\s/g, ""))
    i === 0
        ? stack.map(function (x) { return x.slice(0, 3).replace(/\s/g, ""); })
        : stack.map(function (x) { return x.slice(i * 3 + 1, i * 4 - 1).replace(/\s/g, ""); }));
};
for (var i = 0; i < countContainers; i++) {
    _loop_1(i);
}
// stack.map((x) => {
//   stacks.push([x.slice(0, 3).replace(/\s/g, "")]);
//   stacks.push([x.slice(3, 7).replace(/\s/g, "")]);
//   stacks.push([x.slice(7, 11).replace(/\s/g, "")]);
//   // stacks[2].push(x.slice(7, 11).replace(/\s/g, ""));
// });
console.log(stacks);
