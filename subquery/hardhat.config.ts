import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  networks: {
    karuraTestnet: {
      accounts: {
        mnemonic: 'your mnemonic',
        path: 'm/44\'/60\'/0\'/0',
      },
      chainId: 596,
      url: 'https://eth-rpc-karura-testnet.aca-staging.network',
    },
  },
};

export default config;
