import { ethers } from "ethers";

const base = 1000000000n;

console.log("小单位转大单位\n");
console.log(ethers.formatUnits(base, 9));
console.log(ethers.formatUnits(base, "gwei"));

console.log(ethers.formatUnits(base, 18));
console.log(ethers.formatUnits(base, "ether"));
console.log(ethers.formatEther(base));

console.log("\n大单位转小单位\n");
console.log(ethers.parseUnits("1", 9));
console.log(ethers.parseUnits("1", "gwei"));

console.log(ethers.parseUnits("1", 18));
console.log(ethers.parseUnits("1", "ether"));
console.log(ethers.parseEther("1"));
