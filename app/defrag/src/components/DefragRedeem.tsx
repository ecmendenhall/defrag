import RedeemToken from "./RedeemToken";

interface Props {
  address?: string;
}

const DefragMint = ({ address }: Props) => {
  return <div>{address && <RedeemToken address={address} />}</div>;
};

export default DefragMint;
