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
              <h4 className="text-xs underline">Code</h4>
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
            <div className="mb-2">
              <h4 className="text-xs underline">How it works</h4>
              <p>
                Fractionalizing NFTs is cool, but wouldn't you rather have a fun
                JPEG in your wallet instead of 30,000 ERC20 tokens?
                Defragment.art allows Fractional vault curators to create new
                derivative NFTs mintable by fraction holders.
              </p>
            </div>
            <div className="mb-2">
              <p className="underline">For vault curators:</p>
              <ul>
                <li>
                  To create a new Defrag token contract, select "Create Defrag"
                  above.
                </li>
                <li>
                  Provide a Fractional Vault address and the minimum number of
                  fractions required to mint a derivative NFT.
                </li>
                <li>Provide a name and symbol for the derivative token.</li>
                <li>Click "Defrag" to deploy the derivative NFT contract.</li>
              </ul>
            </div>
            <div className="mb-2">
              <p className="underline">For fraction holders:</p>
              <ul>
                <li>
                  To mint a Defrag token from your fractions, select "Mint"
                  above, and choose a Defrag token.
                </li>
                <li>
                  Provide the number of fractions you'd like to use to mint the
                  token.
                </li>
                <li>
                  Your fractions will be bundled inside your Defrag token,
                  giving it an underlying value.
                </li>
                <li>
                  You can redeem it at any time to get back the bundled
                  fractions.
                </li>
                <li>
                  To redeem your Defrag token for the underlying fractions,
                  select "Redeem" above.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </FullPage>
  );
};

export default About;
