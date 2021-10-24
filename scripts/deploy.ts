import { Contract, ethers } from "ethers";
import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { parseEther } from "ethers/lib/utils";
import { Network } from "hardhat/types";

type Ethers = typeof ethers & HardhatEthersHelpers;

interface Contracts {
  nft: Contract;
  defrag: Contract;
  defragFactory: Contract;
}

const setEtherBalance = async (
  account: string,
  amount: string,
  network: Network
) => {
  await network.provider.send("hardhat_setBalance", [account, amount]);
};

async function deployMockNFT(ethers: Ethers) {
  const MockERC721Factory = await ethers.getContractFactory("MockERC721");
  const nft = await MockERC721Factory.deploy("Doge", "DOGE");
  await nft.deployed();

  console.log("NFT deployed to:", nft.address);
  return { nft };
}

async function deployCoreContracts(ethers: Ethers) {
  const DefragFactory = await ethers.getContractFactory("Defrag");
  const defrag = await DefragFactory.deploy();
  await defrag.deployed();

  console.log("Defrag deployed to:", defrag.address);

  const DefragFactoryFactory = await ethers.getContractFactory("DefragFactory");
  const defragFactory = await DefragFactoryFactory.deploy(defrag.address);
  await defragFactory.deployed();

  console.log("DefragFactory deployed to:", defragFactory.address);
  return { defrag, defragFactory };
}

export async function deployTestnet(ethers: Ethers) {
  const { nft } = await deployMockNFT(ethers);
  //const { defrag, defragFactory } = await deployCoreContracts(ethers);
}

export async function deployLocal(ethers: Ethers, network: Network) {
  const { defrag, defragFactory } = await deployCoreContracts(ethers);

  console.log("Setting Ether balance...");
  await setEtherBalance(
    "0xBA713FE0Cf19B0CEa404b9c1E805cB2f95bE04FF",
    parseEther("10").toHexString(),
    network
  );
}
