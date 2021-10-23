import { task } from "hardhat/config";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-solhint";
import "hardhat-gas-reporter";
import "solidity-coverage";
import dotenv from "dotenv";
import { generateBytecode } from "./scripts/abi";
import { deployLocal, deployTestnet } from "./scripts/deploy";

dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("abi", "Generate bytecode for proxy verification", async (args, hre) => {
  await generateBytecode(hre.ethers);
});

task("deploy:local", "Deploys contracts", async (args, hre) => {
  await deployLocal(hre.ethers, hre.network);
});

task("deploy:testnet", "Deploys contracts", async (args, hre) => {
  await deployTestnet(hre.ethers);
});

export default {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      forking: {
        enabled: false,
        url: process.env.ALCHEMY_API_KEY,
      },
      mining: {
        auto: true,
        interval: 500,
      },
      allowUnlimitedContractSize: true,
      initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts: { mnemonic: process.env.RINKEBY_MNEMONIC },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
