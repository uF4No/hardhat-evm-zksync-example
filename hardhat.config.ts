import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import "@nomicfoundation/hardhat-ethers";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
// import "@openzeppelin/hardhat-upgrades"

// Step 1: import ZKsync plugin
// import "@matterlabs/hardhat-zksync";
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-ethers";
import "@matterlabs/hardhat-zksync-node";
import "@matterlabs/hardhat-zksync-verify";
import "@matterlabs/hardhat-zksync-upgradable";




import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  zksolc: {
    version: "1.5.2",
    settings:{
    }
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      zksync: true
    },
    sepolia:{
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      accounts:[process.env.DEPLOYER as any],
      zksync: false,
    },
    // Step 2: Add ZKsync testnet network
    zksyncSepolia:{
      url: "https://sepolia.era.zksync.dev",
      ethNetwork: "sepolia",
      accounts:[process.env.DEPLOYER as any],
      zksync: true,
      verifyURL: "https://explorer.sepolia.era.zksync.dev/contract_verification"

    }
  },
  namedAccounts: {
    deployer:{
      default: 0,
    }
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY as any,
    },
  },
};

export default config;
