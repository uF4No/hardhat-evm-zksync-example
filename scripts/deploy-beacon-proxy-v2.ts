
async function main() {
  console.log(`Upgrading beacon proxy contract in ${hre.network.name}`);
    // const PROXY_ADDRESS = "0xf47ccc15A0e7003fb800Db0Ce552d23818Ee6C75" // Sepolia
  const PROXY_ADDRESS = "0xE6EedAeb287Ad5f04C5F3515F988CFfbFdBec7c2" // ZKsync
  const proxyFactory = await hre.ethers.getContractFactory("V2_Beacon");
  const campaignContract_v2 = await hre.upgrades.upgradeBeacon(PROXY_ADDRESS, proxyFactory);
  await campaignContract_v2.waitForDeployment();

  const contractAddress = await campaignContract_v2.getAddress();
  console.log(`Beacon proxy upgrade deployed to ${contractAddress}`);

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
