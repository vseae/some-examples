import { ethers } from "ethers";
import { wallet, provider } from "./constants";

const main = async () => {
  const wallet1 = ethers.Wallet.createRandom();
  const privateKey = wallet1.privateKey;
  const mnemonic = wallet1.mnemonic!;
  const wallet2 = new ethers.Wallet(privateKey, provider);
  const wallet3 = ethers.HDNodeWallet.fromMnemonic(mnemonic);
  console.log(wallet1.address, wallet2.address, wallet3.address);

  const nonce = await wallet.getNonce();
  console.log(nonce);

  const txReq = {
    to: wallet1.address,
    value: ethers.parseEther("0.00001"),
  };
  const tx = await wallet.sendTransaction(txReq);
  await tx.wait();
  console.log(tx);
};

main();
