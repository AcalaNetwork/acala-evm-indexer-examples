import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  networks: {
    karuraTestnet: {
      accounts: {
        mnemonic: 'fox sight canyon orphan hotel grow hedgehog build bless august weather swarm',
        path: 'm/44\'/60\'/0\'/0',
      },
      chainId: 596,
      url: 'https://eth-rpc-karura-testnet.aca-staging.network',
    },
  },
  mocha: {
    timeout: 987654321,
  },
};

export default config;
