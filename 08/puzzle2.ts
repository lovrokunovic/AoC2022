import fs from "fs";

const contents = fs.readFileSync("input.txt").toString();
const lines = contents.split("\r\n");

const xLen = lines[0].length;
const yLen = lines.length;

let count = 2 * xLen + 2 * (yLen - 2);

const calculate = (i: number, j: number) => {
  let result = 0;
  let top = 0;
  let right = 0;
  let bottom = 0;
  let left = 0;
  for (let a = i - 1; a >= 0; a--) {
    top++;
    if (lines[a][j] >= lines[i][j]) {
      break;
    }
  }
  for (let b = j + 1; b < xLen; b++) {
    right++;
    if (lines[i][b] >= lines[i][j]) {
      break;
    }
  }
  for (let c = i + 1; c < yLen; c++) {
    bottom++;
    if (lines[c][j] >= lines[i][j]) {
      break;
    }
  }
  for (let d = j - 1; d >= 0; d--) {
    left++;
    if (lines[i][d] >= lines[i][j]) {
      break;
    }
  }

  return top * right * bottom * left;
};

let max = 0;
for (let i = 1; i < yLen - 1; i++) {
  for (let j = 1; j < xLen - 1; j++) {
    let t = lines[i][j];

    let result = calculate(i, j);
    if (result > max) max = result;
  }
}

console.log(max);
