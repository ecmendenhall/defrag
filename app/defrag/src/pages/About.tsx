import Contracts from "../components/Contracts";
import FullPage from "../layouts/FullPage";

const About = () => {
  return (
    <FullPage>
      <div>
        <div className="flex flex-col justify-evenly">
          <div className="flex flex-col">
            <div>
              <Contracts />
            </div>
            <div className="mb-2">
              <h4 className="text-xs font-black">Code</h4>
              <ul>
                <li>
                  <a
                    href="https://github.com/ecmendenhall/defrag"
                    target="_blank"
                  >
                    Github
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-2">
            <h4 className="text-xs font-black">How it works</h4>
            <p>Fill in some information about how this works here.</p>
          </div>
        </div>
      </div>
    </FullPage>
  );
};

export default About;
