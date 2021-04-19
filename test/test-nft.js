const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT", function() {

  before(async function() {
    this.accounts = await ethers.getSigners();
  })

  it("Allow for minting of tokens", async function() {
    const NFT = await ethers.getContractFactory("NFT");
    const contract = await NFT.deploy("Test Contract", "TEST", "https://sampletoken.surge.sh/contract.json");
    
    await contract.deployed();

    const tx1 = await contract.mint(this.accounts[0].address, "https://nickgs.com");

    const owner = await contract.ownerOf(1);
  
    // Ensure owner is correct.
    expect(owner).to.equal(this.accounts[0].address);

    // Ensure URI is set.
    const tokenURI = await contract.tokenURI(1);
    console.log(tokenURI);

    // Ensure contract URI is set:
    const contractURI = await contract.contractURI();
    console.log(contractURI);

  });
  
});
