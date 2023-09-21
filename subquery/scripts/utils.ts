import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import { formatEther } from "ethers/lib/utils";

// remember to replace me with your own contract address!!
export const GRAVITAR_REGISTRY_ADDR = '0x8D385e360e760646D4a26351039e4a22518Ce93d';

export const randString = (length: number = 5): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const printCurGravitars = async (wallets: SignerWithAddress[], registry: Contract) => {
  const [g0, g1, g2] = await Promise.all([
    registry.getGravatar(wallets[0].address),
    registry.getGravatar(wallets[1].address),
    registry.getGravatar(wallets[2].address),
  ]);
  console.log('current gravitars: ', [g0, g1, g2]);
}

export const printWallets = async (wallets: SignerWithAddress[]) => {
  const balances = (await Promise.all(wallets.map(w => w.getBalance()))).map(formatEther);
  console.log('using wallets: ', wallets.map((w, i) => [w.address, balances[i]]));
}