# Hardhat EVM-ZKsync example project

This is a sample project showcasing different contracts and scripts to deploy them to both Sepolia (or other EVM equivalent chain) and ZKsync Era reusing the same scripts.

## Project structure

- `/contracts`: contains a basic smart contract and different proxies.
- `/deploy`: contains a `hardhat-deploy` script to deploy a basic contract `ZeekMessages.sol`.
- `/scripts`: contains scripts to deploy all contracts with `hardhat-ethers`.

## EVM / ZKsync target networks

The networks section of the `hardhat.config.ts` file contains both ZKsync and Sepolia networks. All scripts can be used in both Sepolia and ZKsync, showcasing compatibility between chains.

To target a specific network use the `--network sepolia` or `--network zksyncSepolia` flag.

## Run deployment scripts

### hardhat-ethers scripts

Examples:

- `npx hardhat run scripts/deploy-uups-proxy.ts --network sepolia`
- `npx hardhat run scripts/deploy-transparent-proxy-v2.ts --network zksyncSepolia`

### hardhat-deploy script

Example:

`npx hardhat deploy --network sepolia`

## Tests

| Contract | Type | EVM | ZKsync |
|----|--|--|----|
|Basic contract | `hardhat-deploy`| ✅ |✅ |
|Basic contract | `hardhat-ethers`| ✅ |✅ |
|Transparent proxy | `hardhat-ethers`| ✅ |✅ |
|Transparent proxy upgrade | `hardhat-ethers`| ✅ | ✅ |
|Beacon proxy | `hardhat-ethers`| ✅ | ✅ |
|Beacon proxy upgrade | `hardhat-ethers`| ✅ | ✅ |
|UUPS proxy | `hardhat-ethers`| ✅ |✅ |
|UUPS proxy upgrade | `hardhat-ethers`| ✅ |✅ |
