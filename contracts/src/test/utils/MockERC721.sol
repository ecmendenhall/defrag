// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MockERC721 is ERC721 {
    string internal _tokenURI;
    constructor(string memory name_, string memory symbol_, string memory tokenURI_)
        ERC721(name_, symbol_)
    {
        _tokenURI = tokenURI_;
    }

    function tokenURI(uint256) public view override returns (string memory) {
        return
            _tokenURI;
    }

    function mint(address to_, uint256 tokenId_) public {
        _mint(to_, tokenId_);
    }
}
