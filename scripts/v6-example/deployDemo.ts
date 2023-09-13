import { ethers, upgrades } from "hardhat";

async function main() {
  const Demo = await ethers.getContractFactory("Demo");
  const demo = await upgrades.deployProxy(Demo, ["Demo", "Demo"]);
  await demo.waitForDeployment();
  console.log("Demo deployed to:", await demo.getAddress());
}

main();
