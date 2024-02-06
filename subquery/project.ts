import {
  EthereumProject,
  EthereumDatasourceKind,
  EthereumHandlerKind,
} from "@subql/types-ethereum";

// Can expand the Datasource processor types via the generic param
const project: EthereumProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "acala-evm-subquery-example-gravatar",
  description:
    "This project can be used as a starting point for developing your new Acala SubQuery project, it indexes all Gravatars on karura testnet EVM+",
  runner: {
    node: {
      name: "@subql/node-ethereum",
      version: ">=3.0.0",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  schema: {
    file: "./schema.graphql",
  },
  network: {
    // chainId is the EVM Chain ID, for mandala this is 595
    chainId: "595",

    // ETH RPC endpoint(not substrate url!!)
    // all rpc endpoints can be found here: https://evmdocs.acala.network/network/network-configuration
    endpoint: [
      "wss://eth-rpc-tc9.aca-staging.network",
      // "https://eth-rpc-tc9.aca-staging.network",   // use https also works, but wss might be a little faster
    ],
  },
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 1504990,  // when the Gravatar contract was deployed

      options: {
        abi: "gravity",
        address: "0x8d385e360e760646d4a26351039e4a22518ce93d",  // The contract address of the Gravatar on mandala
      },
      assets: new Map([["gravity", { file: "./abis/Gravity.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleNewGravatar",
            filter: {
              // Follows standard log filters https://docs.ethers.io/v5/concepts/events/
              topics: ["NewGravatar(uint256,address,string,string)"],
            },
          },

          /* ------------------second datasource------------------ */
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleUpdatedGravatar",
            filter: {
              topics: ["UpdatedGravatar(uint256,address,string,string)"],
            },
          },
        ],
      },
    },
  ],
  repository: "https://github.com/AcalaNetwork/acala-evm-indexer-examples/tree/master/subquery",
};

// Must set default to the project instance
export default project;
