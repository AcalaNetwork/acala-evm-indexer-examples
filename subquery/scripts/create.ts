import { ethers } from "hardhat";
import { GRAVITAR_REGISTRY_ADDR, printCurGravitars, printWallets, randString } from "./utils";

async function main() {
  console.log('creating gravitars ...');

  const wallets = (await ethers.getSigners()).slice(0, 3);
  await printWallets(wallets)

  const GravatarRegistry = await ethers.getContractFactory("GravatarRegistry");
  const registry = GravatarRegistry.attach(GRAVITAR_REGISTRY_ADDR);

  await (await registry.connect(wallets[0]).createGravatar('AAAAA', 'https://example/AAAAA.png')).wait();
  await (await registry.connect(wallets[1]).createGravatar('BBBBB', 'https://example/BBBBB.jpg')).wait();
  await (await registry.connect(wallets[2]).createGravatar('CCCCC', 'https://example/CCCCC.jpg')).wait();

  console.log('create gravitars finished!');
  await printCurGravitars(wallets, registry);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});