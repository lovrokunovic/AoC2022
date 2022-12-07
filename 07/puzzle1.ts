import readline from "readline";
import fs from "fs";

const readStream = fs.createReadStream(`input.txt`);
const lineReader = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity,
});

enum nodeType {
  file,
  folder,
}
type Node = {
  path: string;
  //parent: Node | null;
  children: Node[] | null;
  size: number | null;
  type: nodeType;
};

enum CommandType {
  cd,
  ls,
}

type Command = {
  commandType: CommandType;
  param: string;
};

let commands: any[] = [];
let curDir = ".";

let nodeMap = new Map();
nodeMap.set(".", { path: curDir, children: [], size: null });

lineReader.on("line", (line) => {
  if (line.startsWith("$")) {
    let params = line.split(" ");
    let commandType: CommandType =
      params[1] === "cd" ? CommandType.cd : CommandType.ls;
    if (commandType === CommandType.cd) {
      if (params[2] === "..") {
        curDir = curDir.substring(0, curDir.lastIndexOf("/"));
      } else if (params[2] === "/") {
      } else {
        curDir += `/${params[2]}`;
      }
    }
  } else {
    let params = line.split(" ");
    let size = null;
    let parent = nodeMap.get(curDir);
    let type = nodeType.file;
    if (params[0] === "dir") {
      type = nodeType.folder;
    } else {
      size = parseInt(params[0]);
    }

    let childNode: Node = {
      path: curDir + `/${params[1]}`,
      children: [],
      //parent: curNode,
      size: size,
      type: type,
    };
    if (parent) parent.children.push(childNode);
    nodeMap.set(childNode.path, childNode);
  }
});

lineReader.on("close", () => {
  //console.log(commands);

  const folderSize = getNodeSize(nodeMap.get("."));
  const arr = Array.from(nodeMap.values()).filter(
    (n) => n.type === nodeType.folder
  );
  const filtered = arr.filter((n) => n.size <= 100000).map((n) => n.size);
  //sconsole.log(filtered);
  const sum = filtered.reduce((prev, curr) => prev + curr);
  console.log(sum);
});

const getNodeSize = (node: Node) => {
  let size = 0;
  //sconsole.log(node);
  if (!node.children?.length) return node.size || 0;
  if (node.children)
    for (let ch of node.children) {
      const child = nodeMap.get(ch.path);
      const nodeSize = getNodeSize(child);
      child.size = nodeSize;
      size += nodeSize;
    }
  return size;
};
