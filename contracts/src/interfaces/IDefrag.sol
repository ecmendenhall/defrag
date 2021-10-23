//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IVault.sol";

interface IDefrag {
    function vault() external returns (IVault);

    function minMintAmount() external returns (uint256);
}
