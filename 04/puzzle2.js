const fs = require('fs');
const rl = require('readline');

const readStream = fs.createReadStream('input.txt');
const lineReader = rl.createInterface({input: readStream, crlfDelay: Infinity});

let count = 0;

lineReader.on("line", (line)=>{
    const [one, two] = line.split(",");
    const [oneL, oneH] = one.split("-");
    const [twoL, twoH] = two.split("-");

    if(!(oneH-twoL<0 || oneL-twoH>0)){
        console.log(line);
        count++;
    };



});
lineReader.on("close", ()=>{
    console.log(count);
});