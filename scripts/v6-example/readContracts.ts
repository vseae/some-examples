import { ethers } from "ethers";
import { provider } from "./constants";
import DemoJson from "../build/artifacts/contracts/Demo.sol/Demo.json";
const main = async () => {
  const contract = new ethers.Contract(
    "0x17bb37E2c6b45087E12424D642eBfD9be4483F52",
    DemoJson.abi,
    provider
  );
  console.log(await contract.name());
};
main();
