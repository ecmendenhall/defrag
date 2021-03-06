import { useEthers } from "@usedapp/core";
import React, { useState } from "react";
import DefragMint from "../components/DefragMint";
import SelectDefrag from "../components/SelectDefrag";
import FullPage from "../layouts/FullPage";

const Mint = () => {
  const [selectedAddress, setSelectedAddress] = useState<string>();

  const onSelect = (address: string) => {
    console.log(address);
    if (address) {
      setSelectedAddress(address);
    }
  };

  return (
    <FullPage>
      <div className="font-body text-l">
        <div className="flex flex-col mb-2">
          <SelectDefrag onSelect={onSelect} />
          <DefragMint address={selectedAddress} />
        </div>
      </div>
    </FullPage>
  );
};

export default Mint;
