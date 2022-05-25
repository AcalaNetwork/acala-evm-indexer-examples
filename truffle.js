require('babel-register')
require('babel-polyfill')
var HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonicPhrase = 'fox sight canyon orphan hotel grow hedgehog build bless august weather swarm';

const mandalaConfig = (endpointUrl) => ({
  provider: () => new HDWalletProvider(mnemonicPhrase, endpointUrl),
  network_id: 595,
  gasPrice: 0x2f03a803ea, // storage_limit = 64001, validUntil = 360001, gasLimit = 10000000
  gas: 0x329b140,
});

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    mandala: mandalaConfig('http://127.0.0.1:8545'),
    mandalaPub: mandalaConfig('https://tc7-eth.aca-dev.network'),
  },
  compilers: {
    solc: {
      version: '0.4.25'    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
}
