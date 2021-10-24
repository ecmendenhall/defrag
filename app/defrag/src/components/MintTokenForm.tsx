import { useEthers } from "@usedapp/core";
import { parseEther } from "ethers/lib/utils";
import { useCallback, useState } from "react";
import { getConfig } from "../config/contracts";
import { useERC20Approve, useMintToken } from "../hooks/contracts";
import Button from "./Button";

interface Props {
  defragAddress: string;
  vaultAddress: string;
}

type ActionState = "start" | "approve" | "confirm";

const MintTokenForm = ({ defragAddress, vaultAddress }: Props) => {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const { state: sendApproveState, send: sendApprove } =
    useERC20Approve(vaultAddress);
  const { state: sendMintTokenState, send: sendMintToken } =
    useMintToken(defragAddress);
  const [amount, setAmount] = useState<string>("0");
  const [actionState, setActionState] = useState<ActionState>("start");

  const onAmountChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAmount(evt.target.value);
  };

  const mint = useCallback(() => {
    const send = async () => {
      const amountWei = parseEther(amount);
      setActionState("approve");
      const approveRes = await sendApprove(defragAddress, amountWei);
      console.log(approveRes);
      setActionState("confirm");
      const mintTokenRes = await sendMintToken(amountWei);
      console.log(mintTokenRes);
      setActionState("start");
    };
    send();
  }, [config, amount, defragAddress, sendApprove, sendMintToken]);

  const buttonText = () => {
    switch (actionState) {
      case "start":
        return "Mint NFT";
      case "approve":
        return "Approve";
      case "confirm":
        return "Confirm";
    }
  };

  return (
    <div>
      <div className="field-row-stacked">
        <label htmlFor="fractions-amount">Fractions:</label>
        <input id="fractions-amount" type="text" onChange={onAmountChange} />
      </div>
      <div className="my-2 flex flex-row justify-between">
        <Button disabled={amount === "0"} onClick={mint}>
          {buttonText()}
        </Button>
        <div>
        <div>{(sendApproveState.status !== 'None') && sendApproveState.status}</div>
          <div>
          {sendApproveState.status === "Exception" &&
            sendApproveState.errorMessage}
            </div>
          <div>{(sendMintTokenState.status !== 'None') && sendMintTokenState.status}</div>
          <div>
          {sendMintTokenState.status === "Exception" &&
            sendMintTokenState.errorMessage}
            </div>
        </div>
      </div>
    </div>
  );
};

export default MintTokenForm;
