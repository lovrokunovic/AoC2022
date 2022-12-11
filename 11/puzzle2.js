"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const contents = fs_1.default.readFileSync("test.txt").toString();
const lines = contents.split("\r\n");
class Monkey {
    constructor(id, items, operation, test, trunkey, falkey) {
        this.id = id;
        this.items = items;
        this.operation = operation;
        this.test = test;
        this.trunkey = trunkey;
        this.falkey = falkey;
    }
}
let c = 0;
let monkey = {};
let monkeyArr = [];
for (let line of lines) {
    const parts = line.trim().split(":");
    switch (c % 7) {
        case 0:
            //console.log();
            monkey = {};
            monkey.id = parseInt(parts[0].split(" ")[1]);
            monkey.inspect = 0;
            //console.log(monkey);
            break;
        case 1:
            monkey.items = [];
            const arr = parts[1].split(", ").map((v) => {
                monkey.items.push(parseInt(v));
            });
            //console.log(monkey.set);
            break;
        case 2:
            monkey.operation = parts[1].split("= old")[1];
            //console.log(monkey.operation);
            break;
        case 3:
            monkey.test = parseInt(parts[1].split("divisible by ")[1]);
            //console.log(monkey.test);
            break;
        case 4:
            monkey.trunkey = parseInt(parts[1].split("throw to monkey ")[1]);
            //console.log(monkey.trunkey);
            break;
        case 5:
            monkey.falkey = parseInt(parts[1].split("throw to monkey ")[1]);
            //console.log(monkey.falkey);
            monkeyArr.push(monkey);
            break;
    }
    c++;
}
//console.log(monkeyArr);
const noOfMonkeys = monkeyArr.length;
let i = 0;
let counter = 0;
for (let i = 0; counter < 10000; i++) {
    let currId = i % noOfMonkeys;
    if (currId === noOfMonkeys - 1) {
        counter++;
    }
    let monkey = monkeyArr[currId];
    while (monkey.items.length > 0) {
        let item = monkey.items.shift();
        monkey.inspect++;
        let opString = item.toString() + monkey.operation;
        let result = 0;
        try {
            result = eval(opString);
        }
        catch (err) {
            result = item * item;
        }
        let cond = result % monkey.test;
        //console.log(result);
        if (cond === 0) {
            monkeyArr[monkey.trunkey].items.push(cond);
        }
        else {
            monkeyArr[monkey.falkey].items.push(cond);
        }
    }
}
console.log(monkeyArr);
console.log(monkeyArr
    .sort((a, b) => (a.inspect > b.inspect ? -1 : 1))
    .slice(0, 2)
    .reduce((prev, curr) => prev.inspect * curr.inspect));
