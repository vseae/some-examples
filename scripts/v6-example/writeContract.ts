import { ethers } from "ethers";
import { wallet } from "./constants";
import DemoJson from "../build/artifacts/contracts/Demo.sol/Demo.json";
const main = async () => {
  const contract = new ethers.Contract(
    "0x17bb37E2c6b45087E12424D642eBfD9be4483F52",
    DemoJson.abi,
    wallet
  );
  console.log(await contract.getValue());
  let tx = await contract.transfer(
    "0x48285c33E2d0bCe2628E1b9B137613909e1e2411",
    ethers.parseEther("5")
  );
  await tx.wait();
  tx = await contract.transfer(
    "0x48285c33E2d0bCe2628E1b9B137613909e1e2411",
    ethers.parseEther("10")
  );
  await tx.wait();
  tx = await contract.transfer(
    "0x48285c33E2d0bCe2628E1b9B137613909e1e2411",
    ethers.parseEther("15")
  );
  await tx.wait();
};
main();
