// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./utils/DefragTest.sol";
import "../interfaces/IDefrag.sol";

contract TestDefragFactory is DefragTest {
    function test_stores_logic_address() public {
        assertEq(defragFactory.logic(), address(defrag));
    }

    function test_curator_can_call_defrag() public {
        curator.call_defrag(
            address(vault),
            MIN_MINT_AMOUNT,
            "Test Defrag",
            "DEFRAG"
        );
    }

    function testFail_user_cannot_call_defrag() public {
        user.call_defrag(
            address(vault),
            MIN_MINT_AMOUNT,
            "Test Defrag",
            "DEFRAG"
        );
    }

    function test_increments_defrag_id() public {
        curator.call_defrag(
            address(vault),
            MIN_MINT_AMOUNT,
            "Test Defrag",
            "DEFRAG"
        );
        assertEq(defragFactory.defragCount(), 1);
    }

    function test_returns_defrag_id() public {
        assertEq(
            curator.call_defrag(
                address(vault),
                MIN_MINT_AMOUNT,
                "Test Defrag",
                "DEFRAG"
            ),
            1
        );
    }

    function test_stores_defrag_address() public {
        assertEq(defragFactory.defrags(1), address(0x0));
        curator.call_defrag(
            address(vault),
            MIN_MINT_AMOUNT,
            "Test Defrag",
            "DEFRAG"
        );
        assertEq(
            defragFactory.defrags(1),
            address(0x44BE86DCe657787bEdeA647c166b3cAd9f83ff38)
        );
    }

    function test_creates_defrag_with_vault_address() public {
        curator.call_defrag(
            address(vault),
            MIN_MINT_AMOUNT,
            "Test Defrag",
            "DEFRAG"
        );
        IDefrag created = IDefrag(defragFactory.defrags(1));

        assertEq(address(created.vault()), address(vault));
    }

    function test_creates_defrag_with_min_mint_amount() public {
        curator.call_defrag(
            address(vault),
            MIN_MINT_AMOUNT,
            "Test Defrag",
            "DEFRAG"
        );
        IDefrag created = IDefrag(defragFactory.defrags(1));

        assertEq(created.minMintAmount(), MIN_MINT_AMOUNT);
    }

    function testFail_min_mint_amount_must_be_less_than_total_supply() public {
        curator.call_defrag(
            address(vault),
            vault.totalSupply(),
            "Test Defrag",
            "DEFRAG"
        );
    }

    function test_creates_defrag_with_name() public {
        curator.call_defrag(
            address(vault),
            MIN_MINT_AMOUNT,
            "Test Defrag",
            "DEFRAG"
        );
        IDefrag created = IDefrag(defragFactory.defrags(1));

        assertEq(created.minMintAmount(), MIN_MINT_AMOUNT);
    }
}
