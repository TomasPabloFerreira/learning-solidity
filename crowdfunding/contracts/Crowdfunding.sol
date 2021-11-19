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

    modifier onlyIfGoalWasNotReached() {
        require(
            funds < fundraisingGoal,
            'Fundraising goal was already reached'
        );
        _;
    }

    modifier receiverCannotFundHisOwnProject() {
        require(msg.sender != receiver, 'Project receiver cannot fund himself');
        _;
    }

    function fundProject() public payable
        receiverCannotFundHisOwnProject
        onlyIfGoalWasNotReached
    {
        funds += msg.value;
        payable(receiver).transfer(msg.value);
    }
}
