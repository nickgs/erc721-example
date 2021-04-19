require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    gasPrice: 75
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: process.env.GOERLI_ENDPOINT, // ex. Infura endpoint
      accounts: [process.env.PRIVATE_KEY, process.env.PRIVATE_KEY2] // Private key used to deploy to network.
    },
    mainnet: {
      url: process.env.MAINNET_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY] // Private key used to deploy to network.
    }
  }
};

