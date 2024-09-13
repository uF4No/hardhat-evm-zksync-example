
async function main() {
  console.log(`Upgrading UUPS proxy contract on ${hre.network.name}`);
//   const PROXY_ADDRESS = "0xb846C065C9865f6F02DC3ac496F4877ec010eD8a" // ZKsync
  const PROXY_ADDRESS = "0xc6ECb2Edea7e343bda7D8c76e5b1e86528facaf0" // Sepolia
  const proxyFactory = await hre.ethers.getContractFactory("V2_UUPS");
  const fundingGoalInWei = hre.ethers.parseEther('0.1').toString();
  const campaignContract_v2 = await hre.upgrades.upgradeProxy(PROXY_ADDRESS, proxyFactory, [fundingGoalInWei]);
  await campaignContract_v2.waitForDeployment();

  const contractAddress = await campaignContract_v2.getAddress();
  console.log(`UUPS proxy upgraded on ${contractAddress}`);

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
