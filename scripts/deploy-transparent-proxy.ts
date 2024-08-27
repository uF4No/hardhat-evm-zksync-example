
// import { ethers } from "ethers";

async function main() {
  console.log(`Deploying proxy contract to ${hre.network.name}`);
  const proxyFactory = await hre.ethers.getContractFactory("CrowdfundingCampaign");
  const initializerFunctionName = 'initialize'
  const fundingGoalInWei = hre.ethers.parseEther('0.1').toString();
  const campaignContract = await hre.upgrades.deployProxy(proxyFactory, [fundingGoalInWei], {
    initializer: initializerFunctionName,
  });
  await campaignContract.waitForDeployment();

  const contractAddress = await campaignContract.getAddress();
  console.log(`Proxy deployed to ${contractAddress}`);

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
