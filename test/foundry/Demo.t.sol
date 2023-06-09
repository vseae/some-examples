// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test, console2} from "forge-std/Test.sol";
import {Demo} from "../../contracts/Demo.sol";

contract DemoTest is Test {
    Demo public demo;

    function setUp() public {
        demo = new Demo();
    }

    function testvSetValue() public {
        demo.setValue(2023);
        assertEq(demo.getValue(), 2023);
    }

    function testFailSetValue(uint256 x) public {
        demo.setValue(x);
        assertEq(demo.getValue(), x + 1);
    }
}
