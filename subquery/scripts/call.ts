import { ethers } from "hardhat";

const GRAVITAR_REGISTRY_ADDR = '0xdF52D8385AA79ff50e0f1BDB09FD967dbFA0BF34';

async function main() {
  const wallets = await ethers.getSigners();
  const GravatarRegistry = await ethers.getContractFactory("GravatarRegistry");
  const registry = GravatarRegistry.attach(GRAVITAR_REGISTRY_ADDR);

  await (await registry.connect(wallets[0]).createGravatar('AAAAA', 'https://example/AAAAA.png')).wait();
  await (await registry.connect(wallets[1]).createGravatar('BBBBB', 'https://example/BBBBB.jpg')).wait();
  await (await registry.connect(wallets[2]).createGravatar('CCCCC', 'https://example/CCCCC.jpg')).wait();

  console.log('create gravitars finished!');

  await (await registry.connect(wallets[0]).updateGravatarName('aaaaa')).wait();
  await (await registry.connect(wallets[1]).updateGravatarName('bbbbb')).wait();
  await (await registry.connect(wallets[2]).updateGravatarName('ccccc')).wait();

  console.log('update gravitars finished!');

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});