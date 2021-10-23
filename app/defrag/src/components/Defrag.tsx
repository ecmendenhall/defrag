import MintToken from "./MintToken";

interface Props {
  address?: string;
}

const Defrag = ({ address }: Props) => {
  return <div>{address && <MintToken address={address} />}</div>;
};

export default Defrag;
