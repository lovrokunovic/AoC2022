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
let sum = 0;
let charSetA = new Set();
let charSetB = new Set();
let lineCounter = 0;
lineReader.on("line", (line) => {
    lineCounter++;
    //console.log(charSetA);
    //console.log(charSetB);
    for (let i = 0; i < line.length; i++) {
        if (lineCounter % 3 === 1) {
            charSetA.add(line[i]);
        }
        else if (lineCounter % 3 === 2) {
            if (charSetA.has(line[i])) {
                charSetB.add(line[i]);
                continue;
            }
        }
        else if (lineCounter % 3 === 0) {
            if (charSetB.has(line[i])) {
                let value = line[i].charCodeAt(0);
                //65-27=38 for uppercase letters
                if (value >= 65 && value <= 90)
                    value = value - 38;
                else
                    value = value - 96;
                sum += value;
                charSetA = new Set();
                charSetB = new Set();
                break;
            }
        }
    }
});
lineReader.on("close", () => {
    console.log(sum);
});
