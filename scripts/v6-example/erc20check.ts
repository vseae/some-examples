import { ethers } from "ethers";
import { provider, wallet } from "./constants";
import DemoJson from "../../build/artifacts/contracts/Demo.sol/Demo.json";
const main = async () => {
  const contract = new ethers.Contract(
    "0x17bb37E2c6b45087E12424D642eBfD9be4483F52",
    DemoJson.abi,
    wallet
  );
  // 获取合约bytecode
  const implAddress = await provider.getStorage(
    "0x17bb37E2c6b45087E12424D642eBfD9be4483F52",
    "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
  );
  const coder = ethers.AbiCoder.defaultAbiCoder();
  const implAddressHex = coder.decode(["address"], implAddress)[0];
  console.log(implAddressHex);
  const code = await provider.getCode(implAddressHex);

  // 非合约地址的bytecode是0x
  if (code != "0x") {
    // 检查bytecode中是否包含transfer函数和totalSupply函数的selector
    const symbol = await contract.symbol();
    const name = await contract.name();
    console.log(symbol, name);
    if (
      code.includes("a9059cbb") &&
      code.includes("18160ddd") &&
      symbol != "" &&
      name != ""
    ) {
      // 如果有，则是ERC20
      console.log("ERC20");
    } else {
      // 如果没有，则不是ERC20
      console.log("Not ERC20");
    }
  } else {
    console.log("Not Contract");
  }
};

main();
