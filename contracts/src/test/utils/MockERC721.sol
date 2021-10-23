// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MockERC721 is ERC721 {
    constructor(string memory name_, string memory symbol_)
        ERC721(name_, symbol_)
    {}

    function tokenURI(uint256) public view override returns (string memory) {
        return
            "https://ipfs.fleek.co/ipfs/bafybeie5df476mgk7bf4uk667jbunr2ebjiv6bi3w6z3pasaoijgvtmybe";
    }

    function mint(address to_, uint256 tokenId_) public {
        _mint(to_, tokenId_);
    }
}
