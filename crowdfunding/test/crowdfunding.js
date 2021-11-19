const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Crowdfunding", function () {
  let base, owner, addr1;
  this.beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();
    const Crowdfunding = await ethers.getContractFactory("Crowdfunding", owner);

    base = await Crowdfunding.deploy(942382, 'my first contract', 1000);
    await base.deployed();
  })
  it("deploys correctly", async () => {
    expect(await crowdfunding.projectId()).to.equal(942382);
    expect(await crowdfunding.fundraisingGoal()).to.equal(1000);
    expect(await crowdfunding.projectName()).to.equal('My first contract');
  });
  it("fundProject add funds only if the funding goal was not reached", async () => {
    await crowdfunding.fundProject({ value: 1000 });

    const error = await crowdfunding.fundProject({ value: 1 }).catch(e => e)
    const errorIsCorrect = error.message.includes('Fundraising goal was already reached');
    expect(errorIsCorrect).to.equal(true)
    expect(await crowdfunding.funds()).to.equal(1000);
  });
  it("prevents self funding", async () => {
    const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
    const crowdfunding = await Crowdfunding.deploy(942382, 'my first contract', 1000);
    await crowdfunding.deployed();

    await crowdfunding.fundProject({ value: 1000 });
  })

});
