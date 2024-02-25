//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {ERC404} from "./ERC404/ERC404.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract Pandora is ERC404 {
    string public dataURI;
    string public baseTokenURI;

    // 初始化(name,symbol,decimals,totalSupply,owner)
    constructor(address _owner) ERC404("Pandora", "PANDORA", 18, 10000, _owner) {
        balanceOf[_owner] = 10000 * 10 ** 18;
    }

    // 设置dataURI
    function setDataURI(string memory _dataURI) public onlyOwner {
        dataURI = _dataURI;
    }

    // 设置baseTokenURI
    function setTokenURI(string memory _tokenURI) public onlyOwner {
        baseTokenURI = _tokenURI;
    }

    function setNameSymbol(string memory _name, string memory _symbol) public onlyOwner {
        _setNameSymbol(_name, _symbol);
    }

    // nft tokenURI 根据id计算一个255以内随机数，根据随机数返回不同的图片和颜色
    // 1(0-100) Green 2(101-160) Blue 3(161-210) Purple 4(211-240) Orange 5(241-255) Red
    function tokenURI(uint256 id) public view override returns (string memory) {
        if (bytes(baseTokenURI).length > 0) {
            return string.concat(baseTokenURI, Strings.toString(id));
        } else {
            uint8 seed = uint8(bytes1(keccak256(abi.encodePacked(id))));
            string memory image;
            string memory color;

            if (seed <= 100) {
                image = "1.gif";
                color = "Green";
            } else if (seed <= 160) {
                image = "2.gif";
                color = "Blue";
            } else if (seed <= 210) {
                image = "3.gif";
                color = "Purple";
            } else if (seed <= 240) {
                image = "4.gif";
                color = "Orange";
            } else if (seed <= 255) {
                image = "5.gif";
                color = "Red";
            }

            // 拼接字符串 "{"name": "Pandora #{id}", "description":"A collection of 10,000 Replicants enabled by ERC404, an experimental token standard.","external_url":"https://pandora.build","image":"图片链接"}
            string memory jsonPreImage = string.concat(
                string.concat(
                    string.concat('{"name": "Pandora #', Strings.toString(id)),
                    '","description":"A collection of 10,000 Replicants enabled by ERC404, an experimental token standard.","external_url":"https://pandora.build","image":"'
                ),
                string.concat(dataURI, image)
            );
            // 属性值
            string memory jsonPostImage = string.concat('","attributes":[{"trait_type":"Color","value":"', color);
            string memory jsonPostTraits = '"}]}';
            // 生成NFT标准metadata的json文本
            return string.concat("data:application/json;utf8,", string.concat(string.concat(jsonPreImage, jsonPostImage), jsonPostTraits));
        }
    }
}
