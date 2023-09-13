import { ethers } from "ethers";
import { provider, wallet } from "./constants";

const main = async () => {
  const balance = await provider.getBalance(wallet.address);
  console.log(ethers.formatEther(balance));
};
main();
