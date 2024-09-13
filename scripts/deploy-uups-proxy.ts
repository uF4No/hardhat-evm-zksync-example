
async function main() {
  console.log(`Deploying UUPS proxy contract to ${hre.network.name}`);
  const proxyFactory = await hre.ethers.getContractFactory("UUPS");
  const initializerFunctionName = 'initialize'
  const fundingGoalInWei = hre.ethers.parseEther('0.1').toString();
  const campaignContract = await hre.upgrades.deployProxy(proxyFactory, [fundingGoalInWei], {
    initializer: initializerFunctionName,
  });
  await campaignContract.waitForDeployment();

  const contractAddress = await campaignContract.getAddress();
  console.log(`UUPS Proxy deployed to ${contractAddress}`);

  await hre.run("verify:verify", {
      address: contractAddress,
  });
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
