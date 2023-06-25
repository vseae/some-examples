// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MerkleAirDrop721 is ERC721 {
    // 默克尔树根节点
    bytes32 public immutable merkleRoot;
    // 是否claim过
    mapping(address => bool) public minted;

    constructor(bytes32 _root) ERC721("MerkleAirDrop721", "MA721") {
        merkleRoot = _root;
    }

    function mint(address to, uint256 amount, bytes32[] calldata merkleProof) internal virtual {
        require(!minted[to] && _verifyClaim(to, amount, merkleProof));
        minted[to] = true;
        _mint(to, amount);
    }

    function _verifyClaim(address account, uint256 amount, bytes32[] calldata merkleProof) internal view returns (bool) {
        bytes32 node = keccak256(abi.encodePacked(account, amount));
        return MerkleProof.verifyCalldata(merkleProof, merkleRoot, node);
    }
}
