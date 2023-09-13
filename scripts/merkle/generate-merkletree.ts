import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import * as fs from "fs";

import * as readline from "readline";

// read csv file and return array of array
async function readCSVToArray(file_path: string): Promise<string[][]> {
  const data: string[][] = [];

  const stream = fs.createReadStream(file_path, "utf-8");
  const rl = readline.createInterface({ input: stream });

  for await (const line of rl) {
    const values = line
      .split(",")
      .map((value) => value.trim().replace(/"/g, ""));
    data.push(values);
  }

  return data;
}
// generate merkle tree from csv file
async function generateTree() {
  const filePath = "scripts/merkle/whitelist.csv";
  const data = await readCSVToArray(filePath);
  console.log(data);
  // ======== Generate Merkle Tree ========

  const tree = StandardMerkleTree.of(data, ["address", "uint256"]);
  console.log("Merkle Root:", tree.root);
  fs.writeFileSync("scripts/merkle/tree.json", JSON.stringify(tree.dump()));
  return tree;
}
// main function
async function main() {
  // ======== Generate Merkle Proof ========
  const tree = await generateTree();
  for (const [i, v] of tree.entries()) {
    const proof = tree.getProof(i);
    const root = tree.root;
    // console.log("Tree:", tree);
    console.log("Index:", i);
    console.log("Value:", v);
    console.log("Proof:", proof);
    console.log("Root:", root);
  }
}
main();
