// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MockERC721 is ERC721 {
    constructor(string memory name_, string memory symbol_)
        ERC721(name_, symbol_)
    {}

    function _baseURI() internal view override returns (string memory) {
        return "https://api.example.com/metadata/";
    }

    function mint(address to_, uint256 tokenId_) public {
        _mint(to_, tokenId_);
    }
}
