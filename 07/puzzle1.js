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
var nodeType;
(function (nodeType) {
    nodeType[nodeType["file"] = 0] = "file";
    nodeType[nodeType["folder"] = 1] = "folder";
})(nodeType || (nodeType = {}));
var CommandType;
(function (CommandType) {
    CommandType[CommandType["cd"] = 0] = "cd";
    CommandType[CommandType["ls"] = 1] = "ls";
})(CommandType || (CommandType = {}));
let commands = [];
let curDir = ".";
let nodeMap = new Map();
nodeMap.set(".", { path: curDir, children: [], size: null });
lineReader.on("line", (line) => {
    if (line.startsWith("$")) {
        let params = line.split(" ");
        let commandType = params[1] === "cd" ? CommandType.cd : CommandType.ls;
        if (commandType === CommandType.cd) {
            if (params[2] === "..") {
                curDir = curDir.substring(0, curDir.lastIndexOf("/"));
            }
            else if (params[2] === "/") {
            }
            else {
                curDir += `/${params[2]}`;
            }
        }
    }
    else {
        let params = line.split(" ");
        let size = null;
        let parent = nodeMap.get(curDir);
        let type = nodeType.file;
        if (params[0] === "dir") {
            type = nodeType.folder;
        }
        else {
            size = parseInt(params[0]);
        }
        let childNode = {
            path: curDir + `/${params[1]}`,
            children: [],
            //parent: curNode,
            size: size,
            type: type,
        };
        if (parent)
            parent.children.push(childNode);
        nodeMap.set(childNode.path, childNode);
    }
});
lineReader.on("close", () => {
    //console.log(commands);
    const folderSize = getNodeSize(nodeMap.get("."));
    const arr = Array.from(nodeMap.values()).filter((n) => n.type === nodeType.folder);
    const filtered = arr.filter((n) => n.size <= 100000).map((n) => n.size);
    //sconsole.log(filtered);
    const sum = filtered.reduce((prev, curr) => prev + curr);
    console.log(sum);
});
const getNodeSize = (node) => {
    var _a;
    let size = 0;
    //sconsole.log(node);
    if (!((_a = node.children) === null || _a === void 0 ? void 0 : _a.length))
        return node.size || 0;
    if (node.children)
        for (let ch of node.children) {
            const child = nodeMap.get(ch.path);
            const nodeSize = getNodeSize(child);
            child.size = nodeSize;
            size += nodeSize;
        }
    return size;
};
