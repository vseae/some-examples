import { HttpNetworkUserConfig, HardhatUserConfig } from "hardhat/types";
import dotenv from "dotenv";
import yargs from "yargs";
// tasks
import "./scripts/tasks/deploy-verify";

// hardhat-deploy
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
// hardhat-plugins
import "@nomicfoundation/hardhat-foundry";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-network-helpers";
import "@nomicfoundation/hardhat-verify";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-abi-exporter";
import "hardhat-storage-layout-changes";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-contract-sizer";
//load environment variables from .env file
dotenv.config();
const { NODE_URL, INFURA_KEY, MNEMONIC, ETHERSCAN_API_KEY } = process.env;
const PK = process.env.PK?.split(",");
const argv = yargs
  .option("network", {
    type: "string",
    default: "hardhat",
  })
  .help(false)
  .version(false).argv;
const DEFAULT_MNEMONIC = "";
const userNetworkConfig: HttpNetworkUserConfig = {};
if (PK) {
  userNetworkConfig.accounts = PK;
} else {
  userNetworkConfig.accounts = {
    mnemonic: MNEMONIC || DEFAULT_MNEMONIC,
  };
}
if (
  ["mainnet", "sepolia", "goerli"].includes(argv.network) &&
  INFURA_KEY === undefined
) {
  throw new Error(
    `Could not find Infura key in env, unable to connect to network ${argv.network}`
  );
}

// hardhat config
const config: HardhatUserConfig = {
  paths: {
    artifacts: "build/artifacts",
    cache: "build/cache",
    tests: "test",
    deploy: "deploy",
    sources: "contracts",
    storageLayouts: "storageLayout",
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10000,
      },
      outputSelection: {
        "*": {
          "*": ["storageLayout"],
        },
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
      blockGasLimit: 100000000,
      gas: 100000000,
    },
    mainnet: {
      ...userNetworkConfig,
      chainId: 1,
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    },
    goerli: {
      ...userNetworkConfig,
      chainId: 5,
      url: `https://goerli.infura.io/v3/${INFURA_KEY}`,
      // gas: 10000000,
      // gasPrice: 1e8,
    },
    sepolia: {
      ...userNetworkConfig,
      chainId: 11155111,
      url: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
    },
    fantomTest: {
      ...userNetworkConfig,
      chainId: 4002,
      url: `https://fantom-testnet.public.blastapi.io`,
    },
    mumbai: {
      ...userNetworkConfig,
      chainId: 80001,
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
    },
  },
  namedAccounts: {
    deployer: 0,
    bob: 1,
    alice: 2,
  },
  verify: {
    etherscan: {
      apiKey: ETHERSCAN_API_KEY,
    },
  },
  abiExporter: {
    path: "./build/abi",
    runOnCompile: true,
    clear: true,
    flat: false,
    spacing: 2,
    pretty: true,
  },
  mocha: {
    timeout: 20000000,
  },
  deterministicDeployment: {
    "11155111": {
      factory: "0x914d7Fec6aaC8cd542e72Bca78B30650d45643d7",
      deployer: "0xE1CB04A0fA36DdD16a06ea828007E35e1a3cBC37",
      funding: "10000000000000000",
      signedTx:
        "0xf8a98085174876e800830186a08080b853604580600e600039806000f350fe7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe03601600081602082378035828234f58015156039578182fd5b8082525050506014600cf38401546d71a0d44a4cabccdad4ddfe22d499326d14b70841c51344d42e4bb2bea361a32c0145a02624a8b59c8af43360245d71fcaa7cea2bf1c74b3fad101c6c2ce3e21daedaf9",
    },
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  tenderly: {
    project: "Project",
    username: "7Levy",
  },
};
if (NODE_URL) {
  config.networks!.custom = {
    ...userNetworkConfig,
    url: NODE_URL,
  };
}
export default config;
