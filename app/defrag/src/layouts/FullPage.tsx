import Network from "../components/Network";
import Connect from "../components/Connect";
import Nav from "../components/Nav";
import Notifications from "../components/Notifications";
import { ChainId, useEthers } from "@usedapp/core";

interface Props {
  children: React.ReactNode;
}

const FullPage = ({ children }: Props) => {
  const { chainId } = useEthers();

  return (
    <div className="p-16 min-h-screen">
      <Notifications />
      <div className="window mb-4">
        <h1 className="title-bar">
          <span className="title-bar-text">
            <img
              src="img/defrag.png"
              alt="Defrag icon"
              className="w-6 mr-2 inline"
            />
            Defragment.art
          </span>
        </h1>
        <div className="window-body flex flex-col">
          <Connect />
          <div className="text-center mt-2">{ (chainId !== ChainId.Rinkeby) && "(Switch to Rinkeby to try the demo)"}</div>
          <Nav />
          {children}
          <Network />
        </div>
      </div>
    </div>
  );
};

export default FullPage;
