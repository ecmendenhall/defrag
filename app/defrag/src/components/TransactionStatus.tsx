import { TransactionStatus as TxStatus } from "@usedapp/core";

interface Props {
  txState: TxStatus;
  miningMessage: string;
  successMessage: string;
}

const TransactionStatus = ({
  txState,
  miningMessage,
  successMessage,
}: Props) => {
  return (
    <>
      {["Mining"].includes(txState.status) && (
        <div className="text-center">
          <p>{miningMessage}</p>
        </div>
      )}
      {["Success"].includes(txState.status) && (
        <div className="text-center">
          <p>{successMessage}</p>
        </div>
      )}
      {["Fail", "Exception"].includes(txState.status) && (
        <div className="text-center">
          <p className="text-red-500">{txState.errorMessage}</p>
        </div>
      )}
    </>
  );
};

export default TransactionStatus;
