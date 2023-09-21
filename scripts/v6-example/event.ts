import { EventLog, ethers } from "ethers";
import { wallet, provider, wsProvider } from "./constants";
import DemoJson from "../../build/artifacts/contracts/Demo.sol/Demo.json";
const main = async () => {
  const contract = new ethers.Contract(
    "0x17bb37E2c6b45087E12424D642eBfD9be4483F52",
    DemoJson.abi,
    wallet
  );
  // event Transfer(address indexed from, address indexed to, uint256 value);
  const block = await provider.getBlockNumber();
  // 检索事件
  const transferEvents = (await contract.queryFilter(
    "Transfer",
    block - 100000,
    block
  )) as EventLog[];
  console.log(transferEvents.length);
  //解析事件
  const amount = ethers.formatEther(transferEvents[1].args?.value);
  console.log(amount);

  //监听事件(on/once)
  contract.once("Transfer", (from, to, value) => {
    console.log(from, to, value);
  });

  //事件过滤器
  const filter = contract.filters.Transfer(
    null,
    "0x17bb37E2c6b45087E12424D642eBfD9be4483F52",
    null
  );
  contract.once(filter, (from, to, value) => {
    console.log(from, to, value);
  });
};

main();
