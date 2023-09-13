import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
const rpc = process.env.MUMBAI_RPC_URL;
const pk = process.env.PK!;
const ws = process.env.MUMBAI_WS_URL!;
const provider = new ethers.JsonRpcProvider(rpc);
const wsProvider = new ethers.WebSocketProvider(ws);
const wallet = new ethers.Wallet(pk, wsProvider);

export { rpc, pk, provider, wallet, wsProvider };
