import readline from "readline";
import fs from "fs";

const readStream = fs.createReadStream(`input.txt`);
const lineReader = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity,
});

let sum = 0;

lineReader.on("line", (line) => {
  const charSet = new Set();
  for (let i = 0; i < line.length; i++) {
    if (i < line.length / 2) {
      charSet.add(line[i]);
    } else {
      const alreadyExists = charSet.has(line[i]);
      if (alreadyExists) {
        let value = line[i].charCodeAt(0);
        //65-27=38 for uppercase letters
        if (value >= 65 && value <= 90) value = value - 38;
        else value = value - 96;
        sum += value;
        break;
      }
    }
  }
});

lineReader.on("close", () => {
  console.log(sum);
});
