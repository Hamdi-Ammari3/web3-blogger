/** @type import('hardhat/config').HardhatUserConfig */
require ('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

const WALLET_PRIVATE_KEY = //wallet PRIVATE_KEY
const ALCHEMY_API_KEY = // node provider API_Key

module.exports = {
  solidity: "0.8.19",
  defaultNetwork:"sepolia",
  networks:{
    hardhat:{},
    sepolia:{
      url:`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts:[WALLET_PRIVATE_KEY]
    }
  }
};
