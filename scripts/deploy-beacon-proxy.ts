
async function main() {
  console.log(`Deploying beacon proxy contract to ${hre.network.name}`);
  const proxyFactory = await hre.ethers.getContractFactory("Beacon");
  const fundingGoalInWei = hre.ethers.parseEther('0.1').toString();
  const campaignContract = await hre.upgrades.deployBeacon(proxyFactory, [fundingGoalInWei]);
  await campaignContract.waitForDeployment();

  const contractAddress = await campaignContract.getAddress();
  console.log(`Beacon proxy deployed to ${contractAddress}`);

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
