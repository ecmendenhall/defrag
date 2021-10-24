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
      <a className="text-blue-700" href={getExplorerAddressLink(address, chainId)}>
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
        <div className="mb-2">
          <h4 className="text-xs underline">Contracts</h4>
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
        <div className="mb-2">
          <h4 className="text-xs underline">Helpers</h4>
          <div className="status-bar">
            <ContractItem
              name="Doge"
              address="0x86Fd7f8e4D9f99587Ec6D6dc8CC97A5A568D93ed"
              chainId={chainId}
            />
            <ContractItem
              name="Punk"
              address="0x191F4f138f3990880EBcD70eB20CA87e73E51601"
              chainId={chainId}
            />
            <ContractItem
              name="Rock"
              address="0xa9Cb12e5D3CE210c97F2a9609d1912E5467e0305"
              chainId={chainId}
            />
            <ContractItem
              name="Fractional VaultFactory"
              address="0x458556c097251f52ca89cB81316B4113aC734BD1"
              chainId={chainId}
            />
          </div>
        </div>
        </div>
      )}
    </>
  );
};

export default Contracts;
