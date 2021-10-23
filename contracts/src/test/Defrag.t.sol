// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./utils/DefragTest.sol";

contract TestInitializer is DefragTest {
    function test_has_vault_address() public {
        assertEq(address(defrag.vault()), address(vault));
    }

    function test_has_min_min_amount() public {
        assertEq(defrag.minMintAmount(), MIN_MINT_AMOUNT);
    }

    function test_has_name() public {
        assertEq(defrag.name(), "Test Defrag");
    }

    function test_has_symbol() public {
        assertEq(defrag.symbol(), "DEFRAG");
    }
}

contract TestMint is DefragTest {
    function test_transfers_out_fractions_on_mint() public {
        transfer_fractions(MIN_MINT_AMOUNT);
        uint256 balanceBefore = vault.balanceOf(address(user));

        user.call_mint(MIN_MINT_AMOUNT);

        uint256 balanceAfter = vault.balanceOf(address(user));

        assertEq(balanceAfter, balanceBefore - MIN_MINT_AMOUNT);
    }

    function test_transfers_in_fractions_on_mint() public {
        transfer_fractions(MIN_MINT_AMOUNT);

        vault.transfer(address(user), MIN_MINT_AMOUNT);
        uint256 balanceBefore = vault.balanceOf(address(defrag));

        user.call_approve(address(vault), address(defrag), MIN_MINT_AMOUNT);
        user.call_mint(MIN_MINT_AMOUNT);

        uint256 balanceAfter = vault.balanceOf(address(defrag));

        assertEq(balanceAfter, balanceBefore + MIN_MINT_AMOUNT);
    }

    function testFail_must_meet_min_mint_amount() public {
        vault.transfer(address(user), MIN_MINT_AMOUNT);

        user.call_approve(address(vault), address(defrag), MIN_MINT_AMOUNT);
        user.call_mint(MIN_MINT_AMOUNT - 1);
    }

    function test_can_mint_with_larger_amount() public {
        uint256 amount = 2 * MIN_MINT_AMOUNT;
        transfer_fractions(amount);

        uint256 balanceBefore = vault.balanceOf(address(user));

        user.call_mint(amount);

        uint256 balanceAfter = vault.balanceOf(address(user));

        assertEq(balanceAfter, balanceBefore - amount);
    }

    function test_returns_token_on_mint() public {
        transfer_fractions(MIN_MINT_AMOUNT);

        assertEq(defrag.balanceOf(address(user)), 0);

        user.call_approve(address(vault), address(defrag), MIN_MINT_AMOUNT);
        user.call_mint(MIN_MINT_AMOUNT);

        assertEq(defrag.balanceOf(address(user)), 1);
    }

    function test_increments_token_id() public {
        uint256 amount = 2 * MIN_MINT_AMOUNT;
        transfer_fractions(amount);

        user.call_mint(MIN_MINT_AMOUNT);
        user.call_mint(MIN_MINT_AMOUNT);

        assertEq(defrag.ownerOf(2), address(user));
    }
}

contract TestFractionsFor is DefragTest {
    function test_tracks_underlying_fractions() public {
        uint256 amount = 3 * MIN_MINT_AMOUNT + 1100;
        transfer_fractions(amount);

        uint256 id1 = user.call_mint(MIN_MINT_AMOUNT);
        uint256 id2 = user.call_mint(MIN_MINT_AMOUNT + 100);
        uint256 id3 = user.call_mint(MIN_MINT_AMOUNT + 1000);

        assertEq(defrag.fractionsFor(id1), MIN_MINT_AMOUNT);
        assertEq(defrag.fractionsFor(id2), MIN_MINT_AMOUNT + 100);
        assertEq(defrag.fractionsFor(id3), MIN_MINT_AMOUNT + 1000);
    }
}

contract TestRedeem is DefragTest {
    function test_transfers_fractions_to_owner_on_redeem() public {
        transfer_fractions(MIN_MINT_AMOUNT);

        uint256 tokenId = user.call_mint(MIN_MINT_AMOUNT);

        assertEq(vault.balanceOf(address(user)), 0);
        assertEq(defrag.balanceOf(address(user)), 1);

        user.call_redeem(tokenId);

        assertEq(vault.balanceOf(address(user)), MIN_MINT_AMOUNT);
        assertEq(defrag.balanceOf(address(user)), 0);
    }

    function test_deletes_underlying_fraction_balance_on_redeem() public {
        transfer_fractions(MIN_MINT_AMOUNT);

        uint256 tokenId = user.call_mint(MIN_MINT_AMOUNT);
        assertEq(defrag.fractionsFor(tokenId), MIN_MINT_AMOUNT);

        user.call_redeem(tokenId);

        assertEq(defrag.fractionsFor(tokenId), 0);
    }

    function testFail_user_cannot_burn_unowned_token() public {
        transfer_fractions(MIN_MINT_AMOUNT);

        uint256 tokenId = user.call_mint(MIN_MINT_AMOUNT);
        assertEq(defrag.fractionsFor(tokenId), MIN_MINT_AMOUNT);

        user2.call_redeem(tokenId);
    }

    function test_returns_fractions() public {
        transfer_fractions(MIN_MINT_AMOUNT);

        uint256 tokenId = user.call_mint(MIN_MINT_AMOUNT);
        uint256 transferred = user.call_redeem(tokenId);

        assertEq(transferred, MIN_MINT_AMOUNT);
    }
}

contract TestTokenURI is DefragTest {
    function test_delegates_uri_to_vault_token() public {
        transfer_fractions(MIN_MINT_AMOUNT);

        uint256 tokenId = user.call_mint(MIN_MINT_AMOUNT);

        assertEq(defrag.tokenURI(tokenId), nft.tokenURI(1));
    }

    function test_all_tokens_share_parent_metadata() public {
        transfer_fractions(3 * MIN_MINT_AMOUNT);

        uint256 token1 = user.call_mint(MIN_MINT_AMOUNT);
        uint256 token2 = user.call_mint(MIN_MINT_AMOUNT);
        uint256 token3 = user.call_mint(MIN_MINT_AMOUNT);

        assertEq(defrag.tokenURI(token1), nft.tokenURI(1));
        assertEq(defrag.tokenURI(token2), nft.tokenURI(1));
        assertEq(defrag.tokenURI(token3), nft.tokenURI(1));
    }
}
