
// import { ethers } from "ethers";

async function main() {
  console.log(`Upgrading beacon proxy contract in ${hre.network.name}`);
//   const PROXY_ADDRESS = "0xed9320e18899105E51ACC27Bb019027d79754aEd" // ZKsync
  const PROXY_ADDRESS = "0xd5682f38AE9ab803B57970E2a5524Ea442820DC6" // Sepolia
  const proxyFactory = await hre.ethers.getContractFactory("V2_Beacon");
  const fundingGoalInWei = hre.ethers.parseEther('0.1').toString();
  const campaignContract_v2 = await hre.upgrades.upgradeProxy(PROXY_ADDRESS, proxyFactory, [fundingGoalInWei]);
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
