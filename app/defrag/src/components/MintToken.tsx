import {
  useEthers,
  getExplorerAddressLink,
  shortenAddress,
} from "@usedapp/core";
import { formatEther } from "@usedapp/core/node_modules/ethers/lib/utils";
import { useDefrag } from "../hooks/contracts";
import MintTokenForm from "./MintTokenForm";

interface Props {
  address: string;
}

const MintToken = ({ address }: Props) => {
  const { chainId } = useEthers();
  const {
    vaultAddress,
    vaultName,
    vaultSymbol,
    minMintAmount,
    parentTokenAddress,
    parentTokenName,
    parentTokenSymbol,
    parentTokenMetadata,
  } = useDefrag(address);

  return (
    <fieldset className="p-2">
      <legend>Mint an NFT from fractions</legend>
      {chainId && vaultAddress && (
        <div>
          <div className="flex flex-row justify-between">
            <div>
              {parentTokenAddress && parentTokenName && parentTokenSymbol && (
                <div className="mb-2">
                  <div>Parent token: </div>
                  <div>
                    {parentTokenName} ({parentTokenSymbol}) -{" "}
                    <a
                      href={getExplorerAddressLink(parentTokenAddress, chainId)}
                    >
                      {shortenAddress(parentTokenAddress)}
                    </a>
                  </div>
                </div>
              )}
              {vaultAddress && vaultName && vaultSymbol && (
                <div className="mb-2">
                  <div>Fractional vault: </div>
                  <div>
                    {vaultName} ({vaultSymbol}) -{" "}
                    <a href={getExplorerAddressLink(vaultAddress, chainId)}>
                      {shortenAddress(vaultAddress)}
                    </a>
                  </div>
                </div>
              )}
              {minMintAmount && (
                <div className="mb-2">
                  <div>Min mint amount: </div>
                  <div>{formatEther(minMintAmount)} fractions</div>
                </div>
              )}
            </div>
            {parentTokenMetadata && (
              <div className="w-64 p-2">
                <img
                  src={parentTokenMetadata.image}
                  className="border-dotted border border-black"
                />
              </div>
            )}
          </div>
          <MintTokenForm defragAddress={address} vaultAddress={vaultAddress} />
        </div>
      )}
    </fieldset>
  );
};

export default MintToken;
