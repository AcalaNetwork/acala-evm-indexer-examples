import { ethers } from "hardhat";
import { GRAVITAR_REGISTRY_ADDR, printCurGravitars, randString } from "./utils";

async function main() {
  console.log('updating gravitars ...');

  const wallets = (await ethers.getSigners()).slice(0, 3);

  const GravatarRegistry = await ethers.getContractFactory("GravatarRegistry");
  const registry = GravatarRegistry.attach(GRAVITAR_REGISTRY_ADDR);

  await printCurGravitars(wallets, registry);

  const receipt0 = await (await registry.connect(wallets[0]).updateGravatarName(randString())).wait();
  console.log(`gravitar updated for wallet 0 at block ${receipt0.blockNumber}`)
  
  const receipt1 = await (await registry.connect(wallets[1]).updateGravatarName(randString())).wait();
  console.log(`gravitar updated for wallet 1 at block ${receipt1.blockNumber}`)
  
  const receipt2 = await (await registry.connect(wallets[2]).updateGravatarName(randString())).wait();
  console.log(`gravitar updated for wallet 2 at block ${receipt2.blockNumber}`)

  console.log('update gravitars finished!');
  await printCurGravitars(wallets, registry);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});