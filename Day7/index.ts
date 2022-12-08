import * as fs from "fs";

type TreeNode = {
  name: string;
  parent: TreeNode | null;
} & ({ type: "dir"; children: TreeNode[] } | { type: "file"; size: number });

const commands = fs.readFileSync("input.txt", "utf8").split(/\r?\n/);
const root: TreeNode = { type: "dir", name: "/", children: [], parent: null };

const navigateTree = (curr: TreeNode, arg: string): TreeNode => {
  if (arg === "/") return root;
  if (arg === ".." && curr.parent !== null) return curr.parent;
  if (curr.type === "file") throw new Error("Cannot navigate into a file");
  return curr.children?.find((child) => child.name === arg) as TreeNode;
};

const parseLine = (line: string, currentDir: TreeNode): TreeNode => {
  let args: string[] = line.split(" ");
  if (args[0] === "$") {
    if (args[1] === "ls") return currentDir;
    currentDir = navigateTree(currentDir, args[2]);
    return currentDir;
  }
  const [name, action] = line.split(" ").reverse();
  if (action === "dir" && currentDir.type === "dir") {
    currentDir.children.push({
      type: "dir",
      name,
      children: [],
      parent: currentDir,
    });
  } else if (action !== "dir" && currentDir.type === "dir") {
    currentDir.children.push({
      type: "file",
      name,
      size: parseInt(action),
      parent: currentDir,
    });
  }
  return currentDir;
};

let totalPt1 = 0;

let directories: number[] = [];

const totalSize = (node: TreeNode, sum: number = 0): number => {
  if (node.type === "file") return sum + node.size;

  if (node.children) {
    sum = node.children.reduce((acc, child) => {
      return acc + totalSize(child, sum);
    }, sum);
  }

  directories.push(sum);
  return sum;
};

let currentDir: TreeNode = root;

commands.forEach((line) => {
  currentDir = parseLine(line, currentDir);
});

totalSize(root);
console.log(
  "Part 1:",
  directories.reduce((acc, curr) => (curr <= 100000 ? acc + curr : acc), 0)
);

const totalSpace = 70000000;
const spaceToDelete = 30000000;
const spaceRequired = Math.max(...directories) - totalSpace + spaceToDelete;

console.log(
  "Part 2:",
  directories
    .sort((a, b) => a - b)
    .filter((size) => size > spaceRequired)
    .shift()
);
