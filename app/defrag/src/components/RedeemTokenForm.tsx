import { BigNumber } from "@ethersproject/bignumber";
import { useEthers } from "@usedapp/core";
import { formatEther, parseEther, parseUnits } from "ethers/lib/utils";
import { useCallback, useState } from "react";
import { getConfig } from "../config/contracts";
import {
  useDefragTokensByAccount,
  useERC721Approve,
  useFractionsFor,
  useRedeemToken,
} from "../hooks/contracts";
import Button from "./Button";
import SelectToken from "./SelectToken";

interface Props {
  defragAddress: string;
}

type ActionState = "start" | "approve" | "confirm";

const RedeemTokenForm = ({ defragAddress }: Props) => {
  const { chainId, account } = useEthers();
  const config = getConfig(chainId);
  const { data, loading, error } = useDefragTokensByAccount(
    defragAddress,
    account,
    []
  );
  const { state: sendApproveState, send: sendApprove } =
    useERC721Approve(defragAddress);
  const { state: sendRedeemTokenState, send: sendRedeemToken } =
    useRedeemToken(defragAddress);
  const [actionState, setActionState] = useState<ActionState>("start");
  const [selectedTokenId, setSelectedTokenId] = useState<BigNumber>(
    parseUnits("0", "wei")
  );
  const fractions = useFractionsFor(defragAddress, selectedTokenId);
  const selectedToken = data?.find((t) => t.tokenId.eq(selectedTokenId));

  const onSelect = (tokenId: BigNumber) => {
    console.log("token Id:");
    console.log(tokenId);
    if (tokenId) {
      setSelectedTokenId(tokenId);
    }
  };

  const redeem = useCallback(() => {
    const send = async () => {
      setActionState("approve");
      const approveRes = await sendApprove(defragAddress, selectedTokenId);
      console.log(approveRes);
      setActionState("confirm");
      const redeemTokenRes = await sendRedeemToken(selectedTokenId);
      console.log(redeemTokenRes);
      setActionState("start");
    };
    send();
  }, [config, selectedTokenId, defragAddress, sendApprove, sendRedeemToken]);

  const buttonText = () => {
    switch (actionState) {
      case "start":
        return "Redeem NFT";
      case "approve":
        return "Approve";
      case "confirm":
        return "Confirm";
    }
  };

  return (
    <div>
      <div className="my-2">
        <div className="flex flex-row justify-between">
          <SelectToken tokens={data || []} onSelect={onSelect} />
          <div>
            <div>Underlying fractions</div>
            <div>{formatEther(fractions)}</div>
          </div>
          {selectedToken && selectedToken.image && (
            <div className="w-64 p-2">
              <img
                src={selectedToken.image}
                className="border-dotted border border-black"
              />
            </div>
          )}
        </div>
        <Button disabled={false} onClick={redeem}>
          {buttonText()}
        </Button>
      </div>
    </div>
  );
};

export default RedeemTokenForm;
