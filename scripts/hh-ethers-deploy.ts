// scripts/hh-ethers-deploy.js

async function main() {
  console.log(`Deploying basic contract to ${hre.network.name}`);
    const contract = await hre.ethers.deployContract('ZeekMessages', []);
    await contract.waitForDeployment();
    const contractAddress = await contract.getAddress();
    console.log("Contract deployed to:", contractAddress);

    await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
