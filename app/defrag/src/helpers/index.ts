import { BigNumber } from "@ethersproject/bignumber";
import { formatEther } from "@ethersproject/units";

export const roundEther = (amount: BigNumber): string => {
  const remainder = amount.mod(1e14);
  return formatEther(amount.sub(remainder));
};
