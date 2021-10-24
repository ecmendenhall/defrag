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
  const doge = await MockERC721Factory.deploy(
    "Doge",
    "DOGE",
    "https://ipfs.fleek.co/ipfs/bafybeie5df476mgk7bf4uk667jbunr2ebjiv6bi3w6z3pasaoijgvtmybe"
  );
  await doge.deployed();
  console.log("Doge deployed to:", doge.address);

  const punk = await MockERC721Factory.deploy(
    "CryptoPunks",
    "PUNKS",
    "https://wrappedpunks.com:3000/api/punks/metadata/916"
  );
  await punk.deployed();

  console.log("Punk deployed to:", punk.address);

  const rock = await MockERC721Factory.deploy(
    "EtherRocks",
    "ROCKS",
    "https://api.emblemvault.io/s:evmetadata/meta/8682831"
  );
  await rock.deployed();

  console.log("Rock deployed to:", rock.address);

  const penguin = await MockERC721Factory.deploy(
    "Pudgy Penguins",
    "PPG",
    "https://api.pudgypenguins.io/penguin/4477"
  );
  await penguin.deployed();

  console.log("Penguin deployed to:", penguin.address);

  const fidenza = await MockERC721Factory.deploy(
    "Art Blocks",
    "BLOCKS",
    "https://api.artblocks.io/token/78000900"
  );
  await fidenza.deployed();

  console.log("Fidenza deployed to:", fidenza.address);
  
  return { doge, punk, rock, penguin, fidenza };
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
  const { doge, rock, punk, penguin, fidenza } = await deployMockNFT(ethers);
  const { defrag, defragFactory } = await deployCoreContracts(ethers);
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
