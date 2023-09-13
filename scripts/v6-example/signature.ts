import { ethers } from "ethers";
import { wallet } from "./constants";

const account = wallet.address;
const tokenId = 1;

const main = async () => {
  const msgHash = ethers.solidityPackedKeccak256(
    ["address", "uint256"],
    [account, tokenId]
  );
  console.log(msgHash);

  const messageHashBytes = ethers.getBytes(msgHash);
  // EIP191
  const signature = await wallet.signMessage(messageHashBytes);
  console.log(signature);
  // EIP721
  const domain = {
    name: "My App",
    version: "1",
    chainId: 1,
    verifyingContract: "0x1111111111111111111111111111111111111111",
  };
  const types = {
    Mail: [
      { name: "from", type: "Person" },
      { name: "to", type: "Person" },
      { name: "content", type: "string" },
    ],
    Person: [
      { name: "name", type: "string" },
      { name: "wallet", type: "address" },
    ],
  };
  const mail = {
    from: {
      name: "Alice",
      wallet: "0x2111111111111111111111111111111111111111",
    },
    to: {
      name: "Bob",
      wallet: "0x3111111111111111111111111111111111111111",
    },
    content: "Hello!",
  };
  const signature712 = await wallet.signTypedData(domain, types, mail);
  console.log(signature712);
  const expectedSignerAddress = wallet.address;
  const recoveredAddress = ethers.verifyTypedData(
    domain,
    types,
    mail,
    signature712
  );
  console.log(recoveredAddress);
  console.log(recoveredAddress === expectedSignerAddress);
};
main();
