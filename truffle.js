require('babel-register')
require('babel-polyfill')
var HDWalletProvider = require("@truffle/hdwallet-provider");

// const privateKeys = [
//   "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d",
//   "0x6cbed15c793ce57650b9877cf6fa156fbef513c4e6134f022a85b1ffdd59b2a1",
//   "0x6370fd033278c143179d81c5526140625662b8daa446c22ee2d73db3707e620c",
// ];

const mnemonicPhrase = 'fox sight canyon orphan hotel grow hedgehog build bless august weather swarm';

const mandalaConfig = (endpointUrl) => ({
  provider: () => new HDWalletProvider(mnemonicPhrase, endpointUrl),
  network_id: 595,
  gasPrice: 0x2f03a803ea, // storage_limit = 64001, validUntil = 360001, gasLimit = 10000000
  gas: 0x329b140,
  timeoutBlocks: 25,
  confirmations: 0
});

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    mandala: mandalaConfig('http://127.0.0.1:8545'),
  },
  compilers: {
    solc: {
      version: '0.4.25'    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
}
