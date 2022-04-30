// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.5.0/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts@4.5.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.5.0/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts@4.5.0/utils/Strings.sol";

contract IStandWithUkraine is ERC1155, Ownable, ERC1155Supply {

    uint256 public constant NFT0 = 0;
    uint256 public constant NFT1 = 1;
    uint256 public constant NFT2 = 2;

    event Donate(address indexed _from, uint256 time, uint256 _value);

    uint256 public totalRaised = 0 ether;

    address contractBeneficiary;

    /**
     * @param beneficiary: address of contractBeneficiary, required
     */
    constructor(address beneficiary) ERC1155("ipfs://QmcMyyfDURW55wbSebMArVradjbUrPQZ6qkq58zKPQ24qY/") {
        contractBeneficiary = beneficiary;
    }

    /**
     * @notice withdraw smart contract balance to contractBeneficiary's wallet
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(contractBeneficiary).transfer(balance);
    }

    /**
     * @notice get string uri by given id
     * @param _id: json metadata id
     * @return uri string in json extension
     */
    function uri(uint256 _id) public view override returns (string memory) {
        require(exists(_id), "URI: nonexistent token");
        return string(abi.encodePacked(super.uri(_id), Strings.toString(_id), ".json"));
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    /**
     * @notice mint NFT based on donation amount
     * @notice if you donate between 0.01 - 0.5 ETH = 1st NFT
     * @notice if you donate between 0.5 - 1 ETH = 2nd + 1st NFT
     * @notice if you donate between > 1 ETH = 3 NFTs
     * @dev tracks the totalRaised
     */
    function mint() public payable
    {
        require(msg.value >= 0.01 ether, "Please enter an amount greater than 0.01 ETH");

        if (msg.value >= 0.01 ether) {
            _mint(msg.sender, NFT0, 1, "");
        }

        if (msg.value >= 0.5 ether) {
            _mint(msg.sender, NFT1, 1, "");
        }

        if (msg.value >= 1 ether) {
            _mint(msg.sender, NFT2, 1, "");
        }

        totalRaised += msg.value;
        emit Donate(msg.sender, block.timestamp, msg.value);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    
}
