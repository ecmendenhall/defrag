import { ChainId, useBlockNumber, useEthers } from "@usedapp/core";

const Network = () => {
  const blockNumber = useBlockNumber();
  const { account, chainId } = useEthers();

  return (
    <div className="status-bar">
      <div className="status-bar-field">ChainId: {chainId}</div>
      <div className="status-bar-field">Block: {blockNumber}</div>
      <div className="status-bar-field">Account: {account}</div>
    </div>
  );
};

export default Network;
