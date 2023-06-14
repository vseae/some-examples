// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleAirDrop20 {
    // 分发代币
    address public immutable token;
    // 默克尔树根节点
    bytes32 public immutable merkleRoot;
    // 是否claim过
    mapping(address => bool) public isClaimed;
    uint256 public constant LIMIT = 5;

    constructor(address token_, bytes32 merkleRoot_) {
        token = token_;
        merkleRoot = merkleRoot_;
    }

    function claim(address account, uint256 amount, bytes32[] calldata merkleProof) external {
        require(amount <= LIMIT, "Exceeds limit.");
        require(!isClaimed[account], "Already claimed.");
        // 拼接出一个树节点
        bytes32 node = keccak256(abi.encodePacked(account, amount));
        // 校验proof，根据树节点，根节点和证明，验证是否是有效的证明
        bool isValidProof = MerkleProof.verifyCalldata(merkleProof, merkleRoot, node);
        require(isValidProof, "Invalid proof.");
        isClaimed[account] = true;
        require(IERC20(token).transfer(account, amount), "Transfer failed.");
    }
}
