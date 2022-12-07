"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
//starter sequence is when four characters are all different
const contents = fs_1.default.readFileSync("input.txt").toString();
const line = contents.split("\r\n")[0];
let i = 0;
// I should use a queue here, but something with possible detection of duplicates
// Maybe I should have a set for duplicates, but then it doesn't have push pop and unshift capabilities
// Should I have a sliding window that increments start and end positions and evaluates string by string
let start = 0, end = 4;
for (i = 0; i < line.length - 4; i++) {
    let substr = line.substring(start, end);
    let set = new Set(substr);
    if (set.size === 4)
        break;
    start++;
    end++;
}
console.log(end);
