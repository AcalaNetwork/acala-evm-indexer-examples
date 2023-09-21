import { ethers } from "hardhat";
import { EVM as EVM_ADDR } from '@acala-network/contracts/utils/Predeploy';
import { EVM__factory } from '@acala-network/contracts/typechain';

async function main() {
  const GravatarRegistry = await ethers.getContractFactory("GravatarRegistry");
  const registry = await GravatarRegistry.deploy();

  await registry.deployed();
  const deployedBlockNumber = (await ethers.provider.getTransactionReceipt(registry.deployTransaction.hash)).blockNumber;

  console.log(`GravatarRegistry deployed to ${registry.address} at block ${deployedBlockNumber}`);

  /* ---------- publish the contract ---------- */
  // https://evmdocs.acala.network/tooling/development-account/publishing-a-smart-contract
  const [deployer] = await ethers.getSigners();
  const evm = EVM__factory.connect(EVM_ADDR, deployer);
  const developerStatus = evm.developerStatus(deployer.address);
  if (!developerStatus) {
    console.log('enabling developer status ...');
    await (await evm.developerEnable()).wait();
  }

  console.log(`publishing contract ${registry.address} ...`);
  await (await evm.publishContract(registry.address)).wait();

  console.log('contract published 🎉');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
