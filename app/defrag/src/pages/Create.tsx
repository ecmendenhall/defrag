import { useEthers } from "@usedapp/core";
import Button from "../components/Button";
import CreateDefrag from "../components/CreateDefrag";
import FullPage from "../layouts/FullPage";

const Create = () => {
  const { account } = useEthers();

  return (
    <FullPage>
      <div className="font-body text-l">
        <div className="flex flex-col mb-2">
          <CreateDefrag />
        </div>
      </div>
    </FullPage>
  );
};

export default Create;
