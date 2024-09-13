
// import { ethers } from "ethers";

async function main() {
  console.log(`Upgrading beacon proxy contract in ${hre.network.name}`);
  const PROXY_ADDRESS = "0x476d58a53773d60C27f00c0979236416d5718718" // ZKsync
//   const PROXY_ADDRESS = "0xe9afA85be1c4656a1320FC43beCbBe63Bbf33e9E" // Sepolia
  const proxyFactory = await hre.ethers.getContractFactory("V2_Beacon");
  const fundingGoalInWei = hre.ethers.parseEther('0.1').toString();
  const campaignContract_v2 = await hre.upgrades.upgradeBeacon(PROXY_ADDRESS, proxyFactory, [fundingGoalInWei]);
  await campaignContract_v2.waitForDeployment();

  const contractAddress = await campaignContract_v2.getAddress();
  console.log(`Beacon proxy upgrade deployed to ${contractAddress}`);

  await hre.run("verify", {
      address: contractAddress,
      constructorArguments: [fundingGoalInWei],
  });
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
