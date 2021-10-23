import { ethers } from "ethers";
import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";
import { parseEther } from "ethers/lib/utils";

type Ethers = typeof ethers & HardhatEthersHelpers;

export async function generateBytecode(ethers: Ethers) {
  let ABI = ["function initialize(address,uint256,string,string)"];
  let iface = new ethers.utils.Interface(ABI);
  let bytecode = iface.encodeFunctionData("initialize", [
    "0x114eaa9743f85df1d1a8610c962c60b0b39ee7fe",
    parseEther("1000"),
    "Defrag Test",
    "DFRG",
  ]);
  console.log(bytecode);
}
