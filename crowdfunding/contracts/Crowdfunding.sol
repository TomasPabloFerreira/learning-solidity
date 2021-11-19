//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Crowdfunding {
    uint public projectId;
    string public projectName;
    uint public funds;
    uint public fundraisingGoal;
    address payable public receiver;

    constructor(uint _projectId, string memory _projectName, uint _fundraisingGoal) {
        projectId = _projectId;
        projectName = _projectName;
        fundraisingGoal = _fundraisingGoal;
        funds = 0;
        receiver = payable(msg.sender);
    }

    function canReceive() private view returns (bool) {
        return (funds < fundraisingGoal);
    }

    function fundProject() public payable {
        if(canReceive()){
            funds += msg.value;
            receiver.transfer(msg.value);
        }
    }
}
