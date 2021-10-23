import { ChainId } from "@usedapp/core";
import { Interface } from "ethers/lib/utils";

const config = {
  [ChainId.Hardhat]: {
    defrag: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: new Interface([]),
    },
    defragFactory: {
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      abi: new Interface([
        "function defrag(address _vault, uint256 _minMintAmount, string calldata _name, string calldata _symbol)"
      ]),
    },
  },
  [ChainId.Rinkeby]: {
    defrag: {
      address: "0x6634422E07C8C140449f03314c4F2a506bc0715F",
      abi: new Interface([]),
    },
    defragFactory: {
      address: "0x1F03E9c264EE5D69538A7eAf2c204C0c7e7a9aE8",
      abi: new Interface([
        "function defrag(address _vault, uint256 _minMintAmount, string calldata _name, string calldata _symbol)"
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
