// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Proxy.sol";
import "./interfaces/IVault.sol";

contract DefragFactory {
    uint256 public defragCount;
    mapping(uint256 => address) public defrags;

    address public immutable logic;

    constructor(address _logic) {
        logic = _logic;
    }

    function defrag(
        address _vault,
        uint256 _minMintAmount,
        string calldata _name,
        string calldata _symbol
    ) public returns (uint256) {
        IVault vault = IVault(_vault);
        require(vault.curator() == address(msg.sender), "!curator");
        require(
            vault.totalSupply() > _minMintAmount,
            "minMintAmount>=totalSupply"
        );
        bytes memory _initializeCalldata = abi.encodeWithSignature(
            "initialize(address,uint256,string,string)",
            _vault,
            _minMintAmount,
            _name,
            _symbol
        );
        address _defrag = address(new Proxy(logic, _initializeCalldata));
        defragCount++;
        defrags[defragCount] = _defrag;
        return defragCount;
    }
}
