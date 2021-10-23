import { shortenAddress, useEthers } from "@usedapp/core";
import { useCallback } from "react";

const Connect = () => {
  const { activateBrowserWallet, account } = useEthers();

  const activateWallet = useCallback(() => {
    activateBrowserWallet();
  }, [activateBrowserWallet]);

  return (
    <div className="text-center">
      <button className="font-body text-l px-4" onClick={activateWallet}>
        {account ? shortenAddress(account) : "Connect"}
      </button>
    </div>
  );
};

export default Connect;
