// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const hardhatConfig = require("../hardhat.config");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const { interface } = await hre.ethers.getContractFactory('NFT');
  const accounts = await hre.ethers.getSigners();

  // @TODO Assuming testnet (goerli) address of factory.
  const instance = new hre.ethers.Contract("0x18E508D9a5a0724fC2473A6D977fE7fbBFFBAa89", interface, accounts[0]);


  const metadata = await instance.tokenURI(3);

  console.log(metadata);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
