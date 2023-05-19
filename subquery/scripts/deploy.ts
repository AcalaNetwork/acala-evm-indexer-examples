import { ethers } from "hardhat";

const gasOverride = {
  "gasPrice": "0x616dc303ea",
  "gasLimit": "0x329b140"
};

async function main() {
  const GravatarRegistry = await ethers.getContractFactory("GravatarRegistry");
  const registry = await GravatarRegistry.deploy(gasOverride);

  await registry.deployed();

  console.log("GravatarRegistry deployed to:", registry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
