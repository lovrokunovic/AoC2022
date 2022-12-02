import readline from "readline";
import fs from "fs";

const readStream = fs.createReadStream(`input.txt`);
const lineReader = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity,
});

let score = 0;
//A opponent rock, B opponent paper, C oponnent scissors
//X I lose, Y I draw, Z I win, scores still the same for rock, paper, scissors
//lose, win, draw 0, 3, 6

const scoreMapping: { [key: string]: number } = {
  AX: 3 + 0,
  AY: 1 + 3,
  AZ: 2 + 6,
  BX: 1 + 0,
  BY: 2 + 3,
  BZ: 3 + 6,
  CX: 2 + 0,
  CY: 3 + 3,
  CZ: 1 + 6,
};

lineReader.on("line", (line) => {
  score += scoreMapping[line.replace(" ", "")];
});

lineReader.on("close", () => {
  console.log(score);
});
