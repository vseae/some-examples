import { ethers } from "ethers";

import { provider, wallet } from "./constants";
import FrontRunMintJson from "../build/artifacts/contracts/FrontRunMint.sol/FrontRunMint.json";
const main = async () => {
  const iface = new ethers.Interface(FrontRunMintJson.abi);

  provider.on("pending", async (txHash) => {
    if (txHash) {
      // 获取tx详情
      const tx = await provider.getTransaction(txHash);
      if (tx) {
        // filter pendingTx.data
        if (
          tx.data.indexOf(iface.getFunction("mint").selector) !== -1 &&
          tx.from != wallet.address
        ) {
          // 打印txHash
          console.log(
            `\n[${new Date().toLocaleTimeString()}] 监听Pending交易: ${txHash} \r`
          );
          const parsedTx = iface.parseTransaction(tx);
          // 打印tx详情
          console.log(parsedTx);
          const txFrontrun = {
            to: tx.to,
            value: tx.value,
            maxPriorityFeePerGas: tx.maxPriorityFeePerGas * 2n,
            maxFeePerGas: tx.maxFeePerGas * 2n,
            gasLimit: tx.gasLimit * 2n,
            data: tx.data,
          };
          // 发送抢跑交易
          const txResponse = await wallet.sendTransaction(txFrontrun);
          console.log(`正在frontrun交易`);
          await txResponse.wait();
          console.log(`frontrun 交易成功`);
        }
      }
    }
  });
};

main();
