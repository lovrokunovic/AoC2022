"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const contents = fs_1.default.readFileSync("input.txt").toString();
const lines = contents.split("\r\n");
const xLen = lines[0].length;
const yLen = lines.length;
let count = 2 * xLen + 2 * (yLen - 2);
const calculate = (i, j) => {
    let result = 0;
    let top = 0;
    let right = 0;
    let bottom = 0;
    let left = 0;
    for (let a = 0; a < i; a++) {
        if (lines[a][j] >= lines[i][j]) {
            top = 0;
            break;
        }
        top = 1;
    }
    for (let b = j + 1; b < xLen; b++) {
        if (lines[i][b] >= lines[i][j]) {
            right = 0;
            break;
        }
        right = 1;
    }
    for (let c = i + 1; c < yLen; c++) {
        if (lines[c][j] >= lines[i][j]) {
            bottom = 0;
            break;
        }
        bottom = 1;
    }
    for (let d = 0; d < j; d++) {
        if (lines[i][d] >= lines[i][j]) {
            left = 0;
            break;
        }
        left = 1;
    }
    if (top | right | bottom | left)
        result = 1;
    return result;
};
for (let i = 1; i < yLen - 1; i++) {
    for (let j = 1; j < xLen - 1; j++) {
        let t = lines[i][j];
        let result = calculate(i, j);
        count += result;
    }
}
console.log(count);
