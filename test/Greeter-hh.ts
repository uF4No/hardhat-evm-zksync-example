import { expect } from "chai";
import hre from "hardhat";

// this test file uses network-helpers
import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";


describe("Greeter Hardhat network-helpers", function() {

  async function deployGreeterFixture() {
 
    const message = "yayyyyy!";

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Greeter = await hre.ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy(message);

    return { greeter, message, owner, otherAccount };
  }

 

  // before(async function () {
  //   await deployGreeter();
  // })
  it("Should set default message on deployment", async function () {
    const {greeter, message} = await loadFixture(deployGreeterFixture);
    expect(await greeter.greet()).to.equal(message);
  });

  it("Should allow changing the message", async function () {
    const {greeter, message,} = await loadFixture(deployGreeterFixture);
    
    await greeter.setGreeting("Hola, mundo!");
    expect(await greeter.greet()).to.equal("Hola, mundo!");
    expect(await greeter.greet()).to.not.equal(message);


  })
   
});
