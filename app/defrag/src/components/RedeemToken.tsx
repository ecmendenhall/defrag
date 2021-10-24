import { useEthers, getExplorerAddressLink } from "@usedapp/core";
import { formatEther } from "@usedapp/core/node_modules/ethers/lib/utils";
import { useDefrag } from "../hooks/contracts";
import RedeemTokenForm from "./RedeemTokenForm";

interface Props {
  address: string;
}

const RedeemToken = ({ address }: Props) => {
  const { chainId } = useEthers();
  const { vaultAddress, minMintAmount, parentTokenAddress } =
    useDefrag(address);

  return (
    <fieldset className="p-2">
      <legend>Redeem an NFT and get back fractions</legend>
      <RedeemTokenForm defragAddress={address} />
    </fieldset>
  );
};

export default RedeemToken;
