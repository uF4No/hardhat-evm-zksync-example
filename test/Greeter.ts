import { expect } from "chai";
import hre from "hardhat";

// helper function to deploy the Greeter contract
async function deployGreeter() {
  const MESSAGE = "Hello, world!"; 

  // Contracts are deployed using the first signer/account by default
  const [owner, otherAccount] = await hre.ethers.getSigners();

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  greeter = await Greeter.deploy(MESSAGE);

  return { greeter, owner, otherAccount };
}

let greeter

describe("Greeter", function() {
 

  before(async function () {
    await deployGreeter();
  })
  it("Should set default message on deployment", async function () {
    expect(await greeter.greet()).to.equal("Hello, world!");
  });

  it("Should allow changing the message", async function () {
    await greeter.setGreeting("Hola, mundo!");
    expect(await greeter.greet()).to.equal("Hola, mundo!");
  })
   
});
