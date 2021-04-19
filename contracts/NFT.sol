// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  string _contractURI;

  constructor(string memory _name, string memory _symbol, string memory _contractMeta) ERC721(_name, _symbol) public {
      _contractURI = _contractMeta;
  }

  function contractURI() public view returns (string memory) {
        return _contractURI;
  }
  

  function mint(address owner, string memory tokenURI) public returns(uint256) {
      _tokenIds.increment();

      uint256 newItemId = _tokenIds.current();
      _mint(owner, newItemId);
      _setTokenURI(newItemId, tokenURI);

      return newItemId;
  }
}