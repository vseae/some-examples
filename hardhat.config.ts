import { HttpNetworkUserConfig, HardhatUserConfig } from "hardhat/types";
import "hardhat-deploy";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";
import "hardhat-contract-sizer";
import "hardhat-abi-exporter";
import "hardhat-tracer";
import "hardhat-storage-layout";
import "hardhat-gas-reporter";
import dotenv from "dotenv";
import yargs from "yargs";
import "./scripts/tasks/deploy-verify";

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
  ["mainnet", "rinkeby", "goerli"].includes(argv.network) &&
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
  },
  solidity: {
    version: "0.8.20",
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
      url: `https://polygon-testnet.public.blastapi.io`,
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
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: false,
    strict: true,
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    gasPrice: 21,
  },
  mocha: {
    timeout: 20000000,
  },
};
if (NODE_URL) {
  config.networks!.custom = {
    ...userNetworkConfig,
    url: NODE_URL,
  };
}
export default config;
