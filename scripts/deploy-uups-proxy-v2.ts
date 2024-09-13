
async function main() {
  console.log(`Upgrading UUPS proxy contract on ${hre.network.name}`);
  const PROXY_ADDRESS = "0xE6EedAeb287Ad5f04C5F3515F988CFfbFdBec7c2" // ZKsync
  // const PROXY_ADDRESS = "0xc6ECb2Edea7e343bda7D8c76e5b1e86528facaf0" // Sepolia
  const proxyFactory = await hre.ethers.getContractFactory("V2_UUPS");
  const campaignContract_v2 = await hre.upgrades.upgradeProxy(PROXY_ADDRESS, proxyFactory);
  await campaignContract_v2.waitForDeployment();

  const contractAddress = await campaignContract_v2.getAddress();
  console.log(`UUPS proxy upgraded on ${contractAddress}`);

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
