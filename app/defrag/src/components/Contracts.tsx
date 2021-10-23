import {
  ChainId,
  getExplorerAddressLink,
  useEthers,
  shortenAddress,
} from "@usedapp/core";
import { getConfig } from "../config/contracts";

interface Props {
  name: string;
  address: string;
  chainId: ChainId;
}

const ContractItem = ({ name, address, chainId }: Props) => {
  return (
    <p key={name} className="status-bar-field my-2">
      {name}:{" "}
      <a href={getExplorerAddressLink(address, chainId)}>
        {shortenAddress(address)}
      </a>
    </p>
  );
};

const Contracts = () => {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  return (
    <>
      {chainId && (
        <div>
          <h4 className="text-xs font-black">Contracts</h4>
          <div className="status-bar">
            <ContractItem
              name="Defrag"
              address={config.defrag.address}
              chainId={chainId}
            />
            <ContractItem
              name="DefragFactory"
              address={config.defragFactory.address}
              chainId={chainId}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Contracts;
