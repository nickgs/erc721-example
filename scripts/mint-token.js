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
  const instance = new hre.ethers.Contract("0x407812AAc538fccf70225533c5942376609d1b2D", interface, accounts[0]);


  
    const tokenTx = await instance.mint("0x92Ce0aC59ACCA8Ec7BdC5085AA17866a5D133a6A", "https://sampletoken.surge.sh/token2.json", {from: accounts[0].address, gasLimit: 5000000 });
    const { gasUsed, events } = await tokenTx.wait();
    const { address } = events.find(Boolean);

    console.log("New Token deployed to:", address);
    console.log(`Gas Used: ${gasUsed} `);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
