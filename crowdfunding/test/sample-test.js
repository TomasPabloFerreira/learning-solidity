const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Crowdfunding", function () {
  it("deploys correctly", async () => {
    const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
    const crowdfunding = await Crowdfunding.deploy(942382, 'My first contract', 1000);
    await crowdfunding.deployed();

    expect(await crowdfunding.projectId()).to.equal(942382);
    expect(await crowdfunding.fundraisingGoal()).to.equal(1000);
    expect(await crowdfunding.projectName()).to.equal('My first contract');
  });
  it("fundProject add funds only if the funding goal was not reached", async () => {
    const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
    const crowdfunding = await Crowdfunding.deploy(942382, 'my first contract', 1000);
    await crowdfunding.deployed();

    await crowdfunding.fundProject({ value: 1000 });

    await crowdfunding.fundProject({ value: 1 });
    expect(await crowdfunding.funds()).to.equal(1000);
  });
});
