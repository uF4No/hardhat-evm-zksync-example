1. Init project with `npx hardhat init`
2. Setup `.env` file
3. Adds networks and etherscan settings to config


## hardhat-deploy

```ts
const { deployments, getNamedAccounts } = hre; 
const { deploy } = deployments;
const res = await deploy("ZeekMessages", {...})
```

1. Install `hardhat-deploy`, `dotenv` and `hardhat-zksync` and import them in config file
2. Write deploy script with `hardhat-deploy`
3. Deploy to sepolia `npx hardhat deploy --network sepolia`

### Migrate

1. Run same script, target ZKsync: `npx hardhat deploy --network zksyncSepolia`
2. Success! Deployed and verified


## hardhat-ethers

```ts
const contract = await hre.ethers.deployContract('ZeekMessages', []);
await contract.waitForDeployment();
```

1. Create script in `/scripts/hh-ethers-deploy.ts`
2. Run with `npx hardhat run scripts/hh-ethers-deploy.ts --network sepolia`

### Migrate

1. run targeting zksync. Success out-of-the-box.
2. Deployed to testnet and verified 0x1E41e03E5cDe9397Ac3c4c9A6080be38bd181dA4



## hardhat-ethers upgrades

1. Install `@openzeppelin/hardhat-upgrades` and import it.
2. Create script in `/scripts/deploy-transparent-proxy.ts`
3. 2. Run with `npx hardhat run scripts/deploy-transparent-proxy.ts --network sepolia`

```sh
Deploying proxy contract to sepolia
Proxy deployed to 0x4a4B76F49f42997C74B7bcEf5B1531f95825Ff93
```

### Migrate

1. Install `@matterlabs/hardhat-zksync-upgradable` and import it. 
2. Run same script targeting zksync. Success!

```sh
Implementation contract was deployed to 0x609ce1E914784a679d07f97cb4d7174B33Af74FE
Admin was deployed to 0xD1875Eff9bCbF9FD7f90C1E66DA685Ab73D0EEF7
Transparent proxy was deployed to 0xCd9E5c2F9DF8DC0174E0AEc2Ea4fc7f17A53D09e
Proxy deployed to 0xCd9E5c2F9DF8DC0174E0AEc2Ea4fc7f17A53D09e
```
