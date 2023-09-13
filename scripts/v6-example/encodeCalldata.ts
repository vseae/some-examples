import { ethers } from "ethers";
import TokenJson from "../build/artifacts/contracts/Token.sol/Token.json";
const main = async () => {
  const iface = new ethers.Interface(TokenJson.abi);
  const selector = iface.getFunction("transfer")?.selector;
  console.log(selector);
  // encode constructor
  console.log(iface.encodeDeploy(["Demo", "DEMO"]));
  // encode function
  console.log(
    iface.encodeFunctionData("transfer", [
      "0x48285c33E2d0bCe2628E1b9B137613909e1e2411",
      ethers.parseEther("10000"),
    ])
  );
  // decode input data
  console.log(
    iface.parseTransaction({
      data: "0xa9059cbb00000000000000000000000028c797f1b6674077f1589b430a1a185b47e38a6b0000000000000000000000000000000000000000000000008ac7230489e80000",
    })
  );
};

main();
