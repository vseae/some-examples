import { ethers } from "ethers";

import { wallet } from "./constants";
import DemoJson from "../build/artifacts/contracts/Demo.sol/Demo.json";
const main = async () => {
  const contractFactory = new ethers.ContractFactory(
    DemoJson.abi,
    DemoJson.bytecode,
    wallet
  );
  const contract = await contractFactory.deploy();
  await contract.waitForDeployment();
};
main();
