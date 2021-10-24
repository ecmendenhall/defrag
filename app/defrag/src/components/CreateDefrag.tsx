import { useEthers } from "@usedapp/core";
import { useCallback, useState } from "react";
import { getConfig } from "../config/contracts";
import { useCreateDefrag } from "../hooks/contracts";
import Button from "./Button";

const CreateDefrag = () => {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const { state: sendDefragState, send: sendDefrag } = useCreateDefrag();

  const [vaultAddress, setVaultAddress] = useState("");
  const [minMintAmount, setMinMintAmount] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [metadataURI, setMetadataURI] = useState("");


  const onVaultAddressChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setVaultAddress(evt.target.value);
  };

  const onMinMintAmountChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMinMintAmount(evt.target.value);
  };

  const onTokenNameChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTokenName(evt.target.value);
  };

  const onTokenSymbolChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTokenSymbol(evt.target.value);
  };

  const onMetadataURIChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMetadataURI(evt.target.value);
  };

  const disableButton = () => {
    return [vaultAddress, minMintAmount, tokenName, tokenSymbol].includes("");
  };

  const defrag = useCallback(() => {
    const send = async () => {
      const res = await sendDefrag(
        vaultAddress,
        minMintAmount,
        tokenName,
        tokenSymbol,
        metadataURI
      );
      console.log(res);
    };
    send();
  }, [config, minMintAmount, tokenName, tokenSymbol, vaultAddress, sendDefrag]);

  return (
    <fieldset className="p-2">
      <legend>Create a Defrag from a Fractional vault:</legend>
      <div className="field-row-stacked">
        <label htmlFor="vault-contract">Vault address:</label>
        <input
          id="vault-contract"
          type="text"
          onChange={onVaultAddressChange}
        />
      </div>
      <div className="field-row-stacked">
        <label htmlFor="min-mint-amount">Minimum mint amount:</label>
        <input
          id="min-mint-amount"
          type="text"
          onChange={onMinMintAmountChange}
        />
      </div>
      <div className="field-row-stacked">
        <label htmlFor="name">Token name:</label>
        <input id="name" type="text" onChange={onTokenNameChange} />
      </div>
      <div className="field-row-stacked">
        <label htmlFor="symbol">Token symbol:</label>
        <input id="symbol" type="text" onChange={onTokenSymbolChange} />
      </div>
      <div className="field-row-stacked">
        <label htmlFor="metadata-uri">Metadata URI:</label>
        <input id="metadata-uri" type="text" onChange={onMetadataURIChange} />
      </div>
      <div className="my-2 flex flex-row justify-between">
        <Button disabled={disableButton()} onClick={defrag}>
          Defrag
        </Button>
        <div>
          {sendDefragState.status === "Exception" &&
            sendDefragState.errorMessage}
        </div>
      </div>
    </fieldset>
  );
};

export default CreateDefrag;
