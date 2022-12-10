"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const contents = fs_1.default.readFileSync("input.txt").toString();
const lines = contents.split("\r\n");
let cycle = 1;
let X = 1;
let result = 0;
for (let line of lines) {
    if ((cycle - 20) % 40 === 0)
        result += cycle * X;
    if (line === "noop")
        cycle++;
    else {
        const [comm, amount] = line.split(" ");
        cycle++;
        if ((cycle - 20) % 40 === 0)
            result += cycle * X;
        X += parseInt(amount);
        cycle++;
    }
}
console.log(result);
