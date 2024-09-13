
async function main() {
  const PROXY_ADDRESS = "0xb140C8B66dEa59Fa5197D04d10e76a02547b89DF"// sepolia
  // const PROXY_ADDRESS = "0xb67bE61D48615154b8746DF0464Bffc02fFa506F" // ZKsync
  // Fixed implementation slot for transparent proxy as per EIP-1967
  const IMPLEMENTATION_SLOT = "0x360894A13BA1A3210667C828492DB98DCA3E2076CC3735A920A3CA505D382BBC";
  console.log(`Upgrading transparent proxy contract on ${hre.network.name}`);
  const proxyFactory = await hre.ethers.getContractFactory("V2_Transparent");
  const campaignContract_v2 = await hre.upgrades.upgradeProxy(PROXY_ADDRESS, proxyFactory);
  await campaignContract_v2.waitForDeployment();

  const contractAddress = await campaignContract_v2.getAddress();

  const implAddressHex = await hre.ethers.provider.getStorage(contractAddress, IMPLEMENTATION_SLOT);
  const implAddress = "0x" + implAddressHex.slice(-40); 

  console.log(`New implementation address deployed to ${implAddress}`);

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
