import { ethers } from "ethers";
import { rpc } from "./constants";
const provider = new ethers.JsonRpcProvider(rpc);
const main = async () => {
  console.log(await provider.getBlockNumber());
  // https://github.com/ethers-io/ethers.js/discussions/3977
  console.log((await provider.getNetwork()).toJSON());
  console.log(
    await provider.getCode("0x17bb37E2c6b45087E12424D642eBfD9be4483F52")
  );
  console.log(await provider.getBlock(0));
};

main();
