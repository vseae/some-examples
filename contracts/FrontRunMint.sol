// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract FrontRunMint is ERC721 {
    constructor() ERC721("FrontRunMint", "FRM") {}

    uint256 public totalSupply;

    function mint() external {
        _mint(msg.sender, totalSupply);
        totalSupply++;
    }
}
