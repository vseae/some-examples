import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
const provider = new ethers.JsonRpcProvider(process.env.MAINNET_RPC_URL);
const main = async () => {
  const BAYC = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
  const abiERC721 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function supportsInterface(bytes4) public view returns(bool)",
  ];
  const contractERC721 = new ethers.Contract(BAYC, abiERC721, provider);
  const selectorERC721 = "0x80ac58cd";
  const isERC721 = await contractERC721.supportsInterface(selectorERC721);
  console.log("isERC721", isERC721);
};

main();
