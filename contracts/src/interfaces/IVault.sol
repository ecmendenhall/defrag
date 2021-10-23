//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IVault is IERC20 {
    function curator() external view returns (address);

    function token() external view returns (address);

    function id() external view returns (uint256);
}
