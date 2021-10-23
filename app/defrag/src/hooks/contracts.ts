import {
  addressEqual,
  useContractCall,
  useContractCalls,
  useContractFunction,
  useEthers,
} from "@usedapp/core";
import { BigNumber, Contract, ethers } from "@usedapp/core/node_modules/ethers";
import { useEffect, useState } from "react";
import { getConfig } from "../config/contracts";

export interface Token {
  tokenId: BigNumber;
  name?: string;
  description?: string;
  image?: string;
}

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
  const isAddress = (address: string | undefined): address is string => {
    return !!address;
  };
  const addresses = defragAddresses.filter(isAddress);

  const namesCalls = addresses.map((address) => {
    return {
      abi: config.defrag.abi,
      address: address,
      method: "name",
      args: [],
    };
  });
  const namesResponse = (useContractCalls(namesCalls) ?? []) as string[][];
  const names = namesResponse.map((res) => {
    if (res && res.length > 0) {
      const [name] = res;
      return name;
    }
  });

  const symbolsCalls = addresses.map((address) => {
    return {
      abi: config.defrag.abi,
      address: address,
      method: "symbol",
      args: [],
    };
  });
  const symbolsResponse = (useContractCalls(symbolsCalls) ?? []) as string[][];
  const symbols = symbolsResponse.map((res) => {
    if (res && res.length > 0) {
      const [name] = res;
      return name;
    }
  });

  const defrags = addresses.map((address, i) => {
    return {
      address: address,
      name: names[i] || "",
      symbol: symbols[i] || "",
    };
  });

  return defrags;
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

  const [vaultName] =
    useContractCall(
      vaultAddress && {
        abi: config.fractionalVault.abi,
        address: vaultAddress,
        method: "name",
        args: [],
      }
    ) ?? [];

  const [vaultSymbol] =
    useContractCall(
      vaultAddress && {
        abi: config.fractionalVault.abi,
        address: vaultAddress,
        method: "symbol",
        args: [],
      }
    ) ?? [];

  const [parentTokenName] =
    useContractCall(
      parentTokenAddress && {
        abi: config.parentToken.abi,
        address: parentTokenAddress,
        method: "name",
        args: [],
      }
    ) ?? [];

  const [parentTokenSymbol] =
    useContractCall(
      parentTokenAddress && {
        abi: config.parentToken.abi,
        address: parentTokenAddress,
        method: "symbol",
        args: [],
      }
    ) ?? [];

  const huh = {
    vaultAddress,
    vaultName,
    vaultSymbol,
    minMintAmount,
    parentTokenAddress,
    parentTokenName,
    parentTokenSymbol,
  };
  console.log("huh");
  console.log(huh);
  return huh;
}

const loadTokenMetadata = async (metadataURI: string, id: BigNumber) => {
  try {
    const response = await fetch(metadataURI);
    const data = await response.json();
    return { tokenId: id, ...data };
  } catch {
    return { tokenId: id };
  }
};

export function useDefragTokens(address: string, ids: BigNumber[]) {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const [data, setData] = useState<Token[] | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const tokensCalls = ids.map((id: BigNumber) => {
    return {
      abi: config.defrag.abi,
      address: address,
      method: "tokenURI",
      args: [id],
    };
  });
  const tokensResponse = (useContractCalls(tokensCalls) ?? []) as string[][];

  useEffect(() => {
    const loadData = async () => {
      if (tokensResponse.find((i) => i !== undefined)) {
        try {
          const metadata = await Promise.all(
            tokensResponse.map(async (res, i) => {
              const [tokenURI] = res;
              return await loadTokenMetadata(tokenURI, ids[i]);
            })
          );
          setData(metadata);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setError(true);
        }
      }
    };
    if (ids.length > 0) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [
    JSON.stringify(ids),
    JSON.stringify(tokensResponse),
    setData,
    setLoading,
    setError,
  ]);
  return { data, loading, error };
}

export function useDefragTokensByAccount(
  address: string,
  account: string | null | undefined,
  dependencies: any[]
) {
  const { library, chainId } = useEthers();
  const config = getConfig(chainId);
  const [tokenIds, setTokenIds] = useState<BigNumber[] | undefined>();

  const tokens = useDefragTokens(address, tokenIds || []);

  useEffect(() => {
    const loadTokenIds = async () => {
      if (account && library) {
        const token = new ethers.Contract(address, config.defrag.abi, library);
        const sentLogs = await token.queryFilter(
          token.filters.Transfer(account, null)
        );
        const receivedLogs = await token.queryFilter(
          token.filters.Transfer(null, account)
        );
        const logs = sentLogs
          .concat(receivedLogs)
          .sort(
            (a, b) =>
              a.blockNumber - b.blockNumber ||
              a.transactionIndex - b.transactionIndex
          );
        const owned = new Set<string>();
        for (const log of logs) {
          if (log.args) {
            const { from, to, tokenId } = log.args;
            if (addressEqual(to, account)) {
              owned.add(tokenId.toString());
            } else if (addressEqual(from, account)) {
              owned.delete(tokenId.toString());
            }
          }
        }
        const tokenIds = Array.from(owned).map((id) => BigNumber.from(id));
        setTokenIds(tokenIds);
      }
    };
    loadTokenIds();
  }, [account, library, ...dependencies]);

  return tokens;
}

export function useFractionsFor(address: string, tokenId: BigNumber) {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const [fractionsFor] = useContractCall({
    abi: config.defrag.abi,
    address: address,
    method: "fractionsFor",
    args: [tokenId],
  }) ?? [BigNumber.from(0)];
  return fractionsFor;
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

export function useERC20Approve(vaultAddress: string) {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const contract = new Contract(vaultAddress, config.fractionalVault.abi);
  return useContractFunction(contract, "approve", {
    transactionName: "Approve",
  });
}

export function useERC721Approve(defragAddress: string) {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const contract = new Contract(defragAddress, config.defrag.abi);
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

export function useRedeemToken(address: string) {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const contract = new Contract(address, config.defrag.abi);
  return useContractFunction(contract, "redeem", { transactionName: "Redeem" });
}
