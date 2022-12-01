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
let currentElfCaloriesCount = 0;
lineReader.on("line", (line) => {
    if (line === "") {
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
    console.log(maxAmountCalories);
});
