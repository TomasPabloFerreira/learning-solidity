const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Crowdfunding", function () {
  let base, owner, addr1, addr2;
  this.beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Crowdfunding = await ethers.getContractFactory("Crowdfunding", owner);
    base = await Crowdfunding.deploy(942382, 'My first contract', 1000);
    await base.deployed();
  })
  it("deploys correctly", async () => {
    expect(await base.projectId()).to.equal(942382);
    expect(await base.fundraisingGoal()).to.equal(1000);
    expect(await base.projectName()).to.equal('My first contract');
  });
  it("fundProject add funds only if the funding goal was not reached", async () => {
    await base.connect(addr1).fundProject({ value: 1000 });

    const error = await base.connect(addr1).fundProject({ value: 1 }).catch(e => e)
    const errorIsCorrect = error.message.includes('Fundraising goal was already reached');

    expect(errorIsCorrect).to.equal(true)
    expect(await base.funds()).to.equal(1000);
  });
  it("prevents self funding", async () => {
    const error = await base.fundProject({ value: 1000 }).catch(e => e);
    const errorIsCorrect = error.message.includes('Project receiver cannot fund himself');
    expect(errorIsCorrect).to.equal(true)
    expect(await base.funds()).to.equal(0);
  })
});
