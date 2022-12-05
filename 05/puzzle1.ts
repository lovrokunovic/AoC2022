import fs from "fs";

const contents = fs.readFileSync("input.txt").toString();
const lines = contents.split("\r\n");

let stacks = new Map();

let instr = false;
//load stacks
for (let line of lines) {
  if (line === "") {
    instr = true;
    console.log(stacks);
    continue;
  }
  if (!instr) {
    if (line.startsWith(" 1")) continue;
    for (let i = 1; ; i = i + 4) {
      //console.log(i);
      const char = line[i];

      if (char === undefined) break;
      if (char === " ") continue;

      const index = Math.round(i / 4) + 1;

      let stack = stacks.get(index);
      if (!stack) stack = [];
      stack.unshift(char);
      stacks.set(index, stack);
    }
    console.log();
  } else {
    const instruction = line
      .replace("move ", "")
      .replace("from ", "")
      .replace("to ", "");

    const [count, from, to] = instruction
      .split(" ")
      .map((num) => parseInt(num));
    const stackFrom = stacks.get(from);
    //console.log(stackFrom);
    //break;
    const stackTo = stacks.get(to);
    for (let i = 0; i < count; i++) {
      const toPush = stackFrom.pop();
      //if (toPush === undefined) console.log(stackFrom);
      stackTo.push(toPush);
    }
  }
}

let string = "";
for (let i = 0; i < Array.from(stacks.keys()).length; i++) {
  string += stacks.get(i + 1).pop();
}

// console.log();
// console.log(stacks);
console.log(string);
