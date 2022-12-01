import readline from "readline";
import fs from "fs";

const readStream = fs.createReadStream(`input.txt`);
const lineReader = readline.createInterface({
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
  } else {
    const calories = parseInt(line);
    currentElfCaloriesCount += calories;
  }
});

lineReader.on("close", () => {
  console.log(maxAmountCalories);
});
