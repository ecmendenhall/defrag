import { useEthers, getExplorerAddressLink } from "@usedapp/core";
import { formatEther } from "@usedapp/core/node_modules/ethers/lib/utils";
import { useDefrag } from "../hooks/contracts";
import MintTokenForm from "./MintTokenForm";

interface Props {
  address: string;
}

const MintToken = ({ address }: Props) => {
  const { chainId } = useEthers();
  const { vaultAddress, minMintAmount, parentTokenAddress } =
    useDefrag(address);

  return (
    <fieldset>
      <legend>Mint an NFT from fractions</legend>
      {chainId && vaultAddress && minMintAmount && parentTokenAddress && (
        <>
          <div>
            {parentTokenAddress && (
              <p>
                <span>Parent token: </span>
                <a href={getExplorerAddressLink(parentTokenAddress, chainId)}>
                  {parentTokenAddress}
                </a>
              </p>
            )}
            {vaultAddress && (
              <p>
                <span>Fractional vault: </span>
                <a href={getExplorerAddressLink(vaultAddress, chainId)}>
                  {vaultAddress}
                </a>
              </p>
            )}
            {minMintAmount && (
              <p>
                <span>Min mint amount: </span>
                {formatEther(minMintAmount)} fractions
              </p>
            )}
          </div>
          <MintTokenForm defragAddress={address} vaultAddress={vaultAddress} />
        </>
      )}
    </fieldset>
  );
};

export default MintToken;
