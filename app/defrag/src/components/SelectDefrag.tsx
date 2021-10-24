import { shortenAddress } from "@usedapp/core";
import React, { useState } from "react";
import { useDefrags } from "../hooks/contracts";

interface Props {
  onSelect: (address: string) => void;
}

const SelectDefrag = ({ onSelect }: Props) => {
  const defrags = useDefrags();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.currentTarget.value);
  };

  return (
    <fieldset className="p-2">
      <legend>Select a Defrag</legend>
      <select onChange={onChange} className="px-2 w-48 min-w-max">
        {defrags.map((defrag) => {
          return (
            <option value={defrag.address}>
              {defrag.name} - {shortenAddress(defrag.address)}
            </option>
          );
        })}
      </select>
    </fieldset>
  );
};

export default SelectDefrag;
