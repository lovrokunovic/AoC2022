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
let maxAmountCalories = 0;
const elfCaloriesMap = new Map();
let currentElfCaloriesCount = 0;
let currentElf = 1;
lineReader.on("line", (line) => {
    if (line === "") {
        elfCaloriesMap.set(currentElf, currentElfCaloriesCount);
        currentElf += 1;
        if (currentElfCaloriesCount > maxAmountCalories)
            maxAmountCalories = currentElfCaloriesCount;
        currentElfCaloriesCount = 0;
    }
    else {
        const calories = parseInt(line);
        currentElfCaloriesCount += calories;
    }
});
lineReader.on("close", () => {
    const sorted = Array.from(elfCaloriesMap.values()).sort((a, b) => {
        return a < b ? 1 : -1;
    });
    const top3 = sorted.slice(0, 3);
    const sum = top3.reduce((prev, curr) => {
        return prev + curr;
    });
    console.log(sum);
});
