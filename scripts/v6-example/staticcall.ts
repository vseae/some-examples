import { ethers } from "ethers";
import { wallet, provider } from "./constants";
import DemoJson from "../build/artifacts/contracts/Demo.sol/Demo.json";
const main = async () => {
  const contract = new ethers.Contract(
    "0x17bb37E2c6b45087E12424D642eBfD9be4483F52",
    DemoJson.abi,
    provider
  );
  await contract.transfer
    .staticCall(
      "0x48285c33E2d0bCe2628E1b9B137613909e1e2411",
      ethers.parseEther("10000"),
      {
        from: wallet.address,
      }
    )
    .catch((err) => {
      console.log(err.reason);
    });
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
