"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const contents = fs_1.default.readFileSync("input.txt").toString();
const lines = contents.split("\r\n");
class Point {
    constructor(i, j) {
        this.i = i;
        this.j = j;
    }
    equals(pointA, pointB) {
        return pointA.i === pointB.i && pointA.j === pointB.j;
    }
    toString() {
        return this.i + ", " + this.j;
    }
}
let visited = [];
let head = new Point(0, 0);
let tail = new Point(0, 0);
visited.push(tail.toString());
const moveTail = (head, tail) => {
    const iDiff = head.i - tail.i;
    const jDiff = head.j - tail.j;
    if (Math.abs(iDiff) > 1 || Math.abs(jDiff) > 1) {
        if (Math.abs(iDiff) === 2) {
            tail.i += iDiff / 2;
            if (Math.abs(jDiff) === 1)
                tail.j += jDiff;
        }
        if (Math.abs(jDiff) === 2) {
            tail.j += jDiff / 2;
            if (Math.abs(iDiff) === 1)
                tail.i += iDiff;
        }
        visited.push(tail.toString());
    }
    return tail;
};
const applyMovesOneByOne = (head, tail, direction, amount) => {
    const v = parseInt(amount);
    for (let c = 0; c < v; c++) {
        switch (direction) {
            case "U":
                head.i += 1;
                break;
            case "R":
                head.j += 1;
                break;
            case "D":
                head.i -= 1;
                break;
            case "L":
                head.j -= 1;
                break;
        }
        tail = moveTail(head, tail);
    }
    return [head, tail];
};
for (let line of lines) {
    const [direction, amount] = line.split(" ");
    [head, tail] = applyMovesOneByOne(head, tail, direction, amount);
}
let uniques = [];
visited = visited.filter((el) => {
    const isDuplicate = uniques.includes(el);
    if (isDuplicate)
        return false;
    if (!isDuplicate)
        uniques.push(el);
    return true;
});
console.log(visited.length);
