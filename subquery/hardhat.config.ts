import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  networks: {
    local: {
      accounts: {
        mnemonic: 'fox sight canyon orphan hotel grow hedgehog build bless august weather swarm',   // mandala test accounts
        path: 'm/44\'/60\'/0\'/0',
      },
      chainId: 595,
      url: 'http://localhost:8545',
    },
    mandala: {
      accounts: {
        mnemonic: 'fox sight canyon orphan hotel grow hedgehog build bless august weather swarm',   // mandala test accounts
        path: 'm/44\'/60\'/0\'/0',
      },
      chainId: 595,
      url: 'https://eth-rpc-tc9.aca-staging.network',
    },
  },
};

export default config;
