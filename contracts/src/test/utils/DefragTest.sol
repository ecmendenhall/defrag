// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "../../../lib/ds-test/src/test.sol";
import "../../../lib/fractional/src/ERC721VaultFactory.sol";

import "./MockERC721.sol";
import "./Hevm.sol";

import "../../Defrag.sol";
import "../../DefragFactory.sol";

contract User is ERC721Holder {
    DefragFactory public defragFactory;
    Defrag internal defrag;
    Defrag internal defragCustomMetadata;

    constructor(
        address _defrag,
        address _defragCustomMetadata,
        address _defragFactory
    ) {
        defrag = Defrag(_defrag);
        defragCustomMetadata = Defrag(_defragCustomMetadata);
        defragFactory = DefragFactory(_defragFactory);
    }

    function call_defrag(
        address _vault,
        uint256 _minMintAmount,
        string calldata _name,
        string calldata _symbol,
        string calldata _metadataBaseURI
    ) public returns (uint256) {
        return
            defragFactory.defrag(
                _vault,
                _minMintAmount,
                _name,
                _symbol,
                _metadataBaseURI
            );
    }

    function call_mint(uint256 amount) public returns (uint256) {
        return defrag.mint(amount);
    }

    function call_mint_custom_metadata(uint256 amount)
        public
        returns (uint256)
    {
        return defragCustomMetadata.mint(amount);
    }

    function call_redeem(uint256 tokenId) public returns (uint256) {
        return defrag.redeem(tokenId);
    }

    function call_approve(
        address _vault,
        address spender,
        uint256 amount
    ) public {
        IVault vault = IVault(_vault);
        vault.approve(spender, amount);
    }
}

contract Curator {
    TokenVault public vault;
    DefragFactory public defragFactory;

    constructor(address _vault, address _defragFactory) {
        vault = TokenVault(_vault);
        defragFactory = DefragFactory(_defragFactory);
    }

    function call_defrag(
        address _vault,
        uint256 _minMintAmount,
        string calldata _name,
        string calldata _symbol,
        string calldata _metadataBaseURI
    ) public returns (uint256) {
        return
            defragFactory.defrag(
                _vault,
                _minMintAmount,
                _name,
                _symbol,
                _metadataBaseURI
            );
    }
}

abstract contract DefragTest is DSTest {
    Hevm internal constant hevm = Hevm(HEVM_ADDRESS);

    // contracts
    Settings internal settings;
    ERC721VaultFactory internal vaultFactory;
    MockERC721 internal nft;
    TokenVault internal vault;
    DefragFactory internal defragFactory;
    Defrag internal defrag;
    Defrag internal defragCustomMetadata;

    // users
    Curator internal curator;
    User internal user;
    User internal user2;

    // constants
    uint256 public constant MIN_MINT_AMOUNT = 100e18;

    function setUp() public virtual {
        settings = new Settings();
        vaultFactory = new ERC721VaultFactory(address(settings));
        nft = new MockERC721(
            "Test NFT",
            "NFT",
            "https://api.example.com/metadata"
        );

        nft.mint(address(this), 1);
        nft.setApprovalForAll(address(vaultFactory), true);
        vaultFactory.mint(
            "Test Fractions",
            "FRX",
            address(nft),
            1,
            1000e18,
            1 ether,
            50
        );

        vault = TokenVault(vaultFactory.vaults(0));
        defrag = new Defrag();
        defragFactory = new DefragFactory(address(defrag));
        defrag.initialize(
            address(vault),
            MIN_MINT_AMOUNT,
            "Test Defrag",
            "DEFRAG",
            ""
        );
        defragCustomMetadata = new Defrag();
        defragCustomMetadata.initialize(
            address(vault),
            MIN_MINT_AMOUNT,
            "Test Defrag with Custom Metadata",
            "DEFRAG-METADATA",
            "https://other-api.example.com/metadata/"
        );
        user = new User(
            address(defrag),
            address(defragCustomMetadata),
            address(defragFactory)
        );
        user2 = new User(
            address(defrag),
            address(defragCustomMetadata),
            address(defragFactory)
        );

        curator = new Curator(address(vaultFactory), address(defragFactory));
        vault.updateCurator(address(curator));
    }

    function transfer_fractions(uint256 amount) public {
        vault.transfer(address(user), amount);
        user.call_approve(address(vault), address(defrag), amount);
    }
}
