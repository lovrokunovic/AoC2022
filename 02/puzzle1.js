"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const fs_1 = __importDefault(require("fs"));
const readStream = fs_1.default.createReadStream(`input.txt`);
const lineReader = readline_1.default.createInterface({
    input: readStream,
    crlfDelay: Infinity,
});
let score = 0;
//A opponent rock, B opponent paper, C oponnent scissors
//X I am rock, Y I am paper , Z I am scissors 1, 2, 3
//lose, win, draw 0, 3, 6
const scoreMapping = {
    AX: 1 + 3,
    AY: 2 + 6,
    AZ: 3 + 0,
    BX: 1 + 0,
    BY: 2 + 3,
    BZ: 3 + 6,
    CX: 1 + 6,
    CY: 2 + 0,
    CZ: 3 + 3,
};
lineReader.on("line", (line) => {
    score += scoreMapping[line.replace(" ", "")];
});
lineReader.on("close", () => {
    console.log(score);
});
