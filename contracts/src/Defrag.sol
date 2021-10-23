// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";
import "./interfaces/IVault.sol";

contract Defrag is ERC721BurnableUpgradeable {
    IVault public vault;
    IERC721Metadata public parentToken;
    uint256 public minMintAmount;

    mapping(uint256 => uint256) internal underlyingFractions;
    uint256 internal nextId;

    function initialize(
        address _vault,
        uint256 _minMintAmount,
        string memory _name,
        string memory _symbol
    ) external initializer {
        __ERC721_init(_name, _symbol);
        vault = IVault(_vault);
        parentToken = IERC721Metadata(vault.token());
        minMintAmount = _minMintAmount;
    }

    function mint(uint256 amount) public returns (uint256) {
        require(amount >= minMintAmount, "amount<minMintAmount");
        nextId++;
        underlyingFractions[nextId] = amount;
        vault.transferFrom(address(msg.sender), address(this), amount);
        _safeMint(address(msg.sender), nextId);
        return nextId;
    }

    function redeem(uint256 tokenId) public returns (uint256) {
        require(address(msg.sender) == ownerOf(tokenId), "!owner");
        uint256 amount = underlyingFractions[tokenId];
        delete underlyingFractions[tokenId];
        _burn(tokenId);
        vault.transfer(address(msg.sender), amount);
        return amount;
    }

    function fractionsFor(uint256 tokenId) public view returns (uint256) {
        return underlyingFractions[tokenId];
    }

    function tokenURI(uint256) public view override returns (string memory) {
        return parentToken.tokenURI(vault.id());
    }
}
