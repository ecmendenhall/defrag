import {
  useContractCall,
  useContractCalls,
  useContractFunction,
  useEthers,
} from "@usedapp/core";
import { Contract } from "@usedapp/core/node_modules/ethers";
import { getConfig } from "../config/contracts";

const range = (i: number) => {
  return Array.from({ length: i }, (_x, i) => i);
};

export function useDefrags() {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const [defragCount] =
    useContractCall({
      abi: config.defragFactory.abi,
      address: config.defragFactory.address,
      method: "defragCount",
      args: [],
    }) ?? [];

  const defragsCalls = range(defragCount)
    .map((id) => id + 1)
    .map((id) => {
      return {
        abi: config.defragFactory.abi,
        address: config.defragFactory.address,
        method: "defrags",
        args: [id],
      };
    });
  const defragsResponse = (useContractCalls(defragsCalls) ?? []) as string[][];
  const defragAddresses = defragsResponse.map((res) => {
    if (res && res.length > 0) {
      const [address] = res;
      return address;
    }
  });
  return defragAddresses;
}

export function useDefrag(address: string) {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const defragsResponse =
    useContractCalls([
      {
        abi: config.defrag.abi,
        address: address,
        method: "vault",
        args: [],
      },
      {
        abi: config.defrag.abi,
        address: address,
        method: "minMintAmount",
        args: [],
      },
      {
        abi: config.defrag.abi,
        address: address,
        method: "parentToken",
        args: [],
      },
    ]) ?? [];
  const [vaultRes, minMintAmountRes, parentTokenRes] = defragsResponse;
  const [vaultAddress] = vaultRes ?? [];
  const [minMintAmount] = minMintAmountRes ?? [];
  const [parentTokenAddress] = parentTokenRes ?? [];
  return { vaultAddress, minMintAmount, parentTokenAddress };
}

export function useCreateDefrag() {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const contract = new Contract(
    config.defragFactory.address,
    config.defragFactory.abi
  );
  return useContractFunction(contract, "defrag", { transactionName: "Defrag" });
}

export function useApprove(vaultAddress: string) {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const contract = new Contract(vaultAddress, config.fractionalVault.abi);
  return useContractFunction(contract, "approve", {
    transactionName: "Approve",
  });
}

export function useMintToken(address: string) {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const contract = new Contract(address, config.defrag.abi);
  return useContractFunction(contract, "mint", { transactionName: "Mint" });
}
