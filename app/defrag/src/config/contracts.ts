import { ChainId } from "@usedapp/core";
import { Interface } from "ethers/lib/utils";

const config = {
  [ChainId.Hardhat]: {
    defrag: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: new Interface([
        "function name() returns (string memory)",
        "function symbol() returns (string memory)",
        "function vault() returns (address)",
        "function minMintAmount() returns (uint256)",
        "function parentToken() returns (address)",
        "function mint(uint256 amount) returns (uint256)",
        "function redeem(uint256 tokenId) returns (uint256)",
        "function fractionsFor(uint256 tokenId) returns (uint256)",
        "function tokenURI(uint256 tokenId) returns (string memory)",
        "function approve(address to, uint256 tokenId)",
        "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
        "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
      ]),
    },
    defragFactory: {
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      abi: new Interface([
        "function defrag(address _vault, uint256 _minMintAmount, string calldata _name, string calldata _symbol)",
        "function defragCount() returns (uint256)",
        "function defrags(uint256 id) returns (address)",
      ]),
    },
    fractionalVault: {
      abi: new Interface([
        "function name() returns (string memory)",
        "function symbol() returns (string memory)",
        "function approve(address spender, uint256 amount) returns (bool)",
        "event Transfer(address indexed from, address indexed to, uint256 value)",
        "event Approval(address indexed owner, address indexed spender, uint256 value)",
      ]),
    },
    parentToken: {
      abi: new Interface([
        "function name() returns (string memory)",
        "function symbol() returns (string memory)",
      ]),
    },
  },
  [ChainId.Rinkeby]: {
    defrag: {
      address: "0x375F972316CC40619C2B4FF03a2839141974B549",
      abi: new Interface([
        "function name() returns (string memory)",
        "function symbol() returns (string memory)",
        "function vault() returns (address)",
        "function minMintAmount() returns (uint256)",
        "function parentToken() returns (address)",
        "function mint(uint256 amount) returns (uint256)",
        "function redeem(uint256 tokenId) returns (uint256)",
        "function fractionsFor(uint256 tokenId) returns (uint256)",
        "function tokenURI(uint256 tokenId) returns (string memory)",
        "function approve(address to, uint256 tokenId)",
        "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
        "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
      ]),
    },
    defragFactory: {
      address: "0xBdac36d657Be0E625aCeC3771cF9d896500Ca3A1",
      abi: new Interface([
        "function defrag(address _vault, uint256 _minMintAmount, string calldata _name, string calldata _symbol)",
        "function defragCount() returns (uint256)",
        "function defrags(uint256 id) returns (address)",
      ]),
    },
    fractionalVault: {
      abi: new Interface([
        "function name() returns (string memory)",
        "function symbol() returns (string memory)",
        "function approve(address spender, uint256 amount) returns (bool)",
        "event Transfer(address indexed from, address indexed to, uint256 value)",
        "event Approval(address indexed owner, address indexed spender, uint256 value)",
      ]),
    },
    parentToken: {
      abi: new Interface([
        "function name() returns (string memory)",
        "function symbol() returns (string memory)",
      ]),
    },
  },
};

export const getConfig = (chainId: ChainId | undefined) => {
  switch (chainId) {
    case ChainId.Hardhat:
      return config[ChainId.Hardhat];
    case ChainId.Rinkeby:
      return config[ChainId.Rinkeby];
    default:
      return config[ChainId.Hardhat];
  }
};

export default config;
