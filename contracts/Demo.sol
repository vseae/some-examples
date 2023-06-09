// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Demo is ERC20 {
    uint256 internal value;

    constructor() ERC20("Demo", "DEMO") {}

    function setValue(uint256 _value) public {
        value = _value;
    }

    function getValue() public view returns (uint256) {
        return value;
    }
}
