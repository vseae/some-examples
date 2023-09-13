// scripts/upgrade-box.js
import { ethers, upgrades } from "hardhat";
async function main() {
  const DemoV2 = await ethers.getContractFactory("Demo");
  await upgrades.upgradeProxy(
    "0x53244cfE47Af1f28a4f33f9b92A615Dd18f7b951",
    DemoV2
  );
  console.log("Demo upgraded");
}

main();
