import { ethers } from "ethers";

const regex = /.*888$/;

function generateWallet(): ethers.HDNodeWallet {
  let wallet: ethers.HDNodeWallet;

  do {
    wallet = ethers.Wallet.createRandom();
    console.log(`正在尝试地址：${wallet.address}`);
  } while (!regex.test(wallet.address));

  return wallet;
}

const numThreads = 4; // 设置线程数量
const workerPromises: Promise<ethers.HDNodeWallet>[] = [];

for (let i = 0; i < numThreads; i++) {
  const promise = Promise.resolve().then(() => generateWallet());
  workerPromises.push(promise);
}

Promise.race(workerPromises).then((result) => {
  console.log(`靓号地址：${result.address}`);
  console.log(`靓号私钥：${result.privateKey}`);
});
