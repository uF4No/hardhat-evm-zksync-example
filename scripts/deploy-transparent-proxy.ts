
async function main() {
  console.log(`Deploying transparent proxy contract to ${hre.network.name}`);
  
  // Fixed implementation slot for transparent proxy as per EIP-1967
  const IMPLEMENTATION_SLOT = "0x360894A13BA1A3210667C828492DB98DCA3E2076CC3735A920A3CA505D382BBC";
  
  const proxyFactory = await hre.ethers.getContractFactory("Transparent");
  const initializerFunctionName = 'initialize'
  const fundingGoalInWei = hre.ethers.parseEther('0.1').toString();
  const campaignContract = await hre.upgrades.deployProxy(proxyFactory, [fundingGoalInWei], {
    initializer: initializerFunctionName,
  });
  await campaignContract.waitForDeployment();

  const contractAddress = await campaignContract.getAddress();
  console.log(`Transparent proxy deployed to ${contractAddress}`);

  const implAddressHex = await hre.ethers.provider.getStorage(contractAddress, IMPLEMENTATION_SLOT);
  const implAddress = "0x" + implAddressHex.slice(-40); 

  console.log(`Implementation address: ${implAddress}`);

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
