
// import { ethers } from "ethers";

async function main() {
  console.log(`Upgrading proxy contract to ${hre.network.name}`);
  const PROXY_ADDRESS = "0x71Baca0893D0523B75DD692F89a99e7D59D5dAf5" // ZKsync
  // const PROXY_ADDRESS = "0x4799284b3554050b601E5ac0868760783d675b13" // Sepolia
  const proxyFactory = await hre.ethers.getContractFactory("V2_UUPS");
  // const initializerFunctionName = 'initialize'
  const fundingGoalInWei = hre.ethers.parseEther('0.1').toString();
  const campaignContract_v2 = await hre.upgrades.upgradeProxy(PROXY_ADDRESS, proxyFactory, [fundingGoalInWei]);
  await campaignContract_v2.waitForDeployment();

  const contractAddress = await campaignContract_v2.getAddress();
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
