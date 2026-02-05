// hardhat.config.ts
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    staging: {
      url: process.env.STAGING_RPC_URL || "",
      accounts: process.env.STAGING_DEPLOYER_KEY ? [process.env.STAGING_DEPLOYER_KEY] : [],
    },
    prod: {
      url: process.env.PROD_RPC_URL || "",
      accounts: process.env.PROD_DEPLOYER_KEY ? [process.env.PROD_DEPLOYER_KEY] : [],
    },
  },
};

export default config;
