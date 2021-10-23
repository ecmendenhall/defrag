import MintToken from "./MintToken";

interface Props {
  address?: string;
}

const DefragMint = ({ address }: Props) => {
  return <div>{address && <MintToken address={address} />}</div>;
};

export default DefragMint;
