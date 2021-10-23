import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "ethers/lib/utils";
import React, { useEffect, useState } from "react";
import { Token } from "../hooks/contracts";

interface Props {
  tokens: Token[];
  onSelect: (tokenId: BigNumber) => void;
}

const SelectToken = ({ tokens, onSelect }: Props) => {
  const [defaultSet, setDefaultSet] = useState(false);

  useEffect(() => {
    if (tokens && tokens.length > 0 && !defaultSet) {
      setDefaultSet(true);
      onSelect(tokens[0].tokenId);
    }
  }, [tokens]);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(parseUnits(e.currentTarget.value, "wei"));
  };

  return (
    <div>
      <div>Select a token</div>
      <select onChange={onChange}>
        {tokens.map((token) => {
          return <option>{token.tokenId.toNumber()}</option>;
        })}
      </select>
    </div>
  );
};

export default SelectToken;
