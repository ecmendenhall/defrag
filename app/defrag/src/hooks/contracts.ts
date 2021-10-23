import {
  useContractFunction,
  useEthers,
} from "@usedapp/core";
import { Contract } from "@usedapp/core/node_modules/ethers";
import { getConfig } from "../config/contracts";

export function useDefrag() {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const contract = new Contract(config.defragFactory.address, config.defragFactory.abi);
  return useContractFunction(contract, "defrag", {transactionName: "Defrag"});
}