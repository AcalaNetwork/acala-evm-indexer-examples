# Example Subgraph With Acala EVM+
This is an example subgraph that indexes and query Gravitar on Acala EVM+.

## Setup
first we need to set up two things:
- a locally running acala node + RPC stack
- a graph-node stack

### install deps
`yarn`

### run a Acala node and rpc adapter
more details can be found in the [doc](https://evmdocs.acala.network/network/node-setup)
```
git clone --recurse-submodules git@github.com:AcalaNetwork/bodhi.js.git
cd evm_subql
yarn
yarn build
docker compose up

## in another tab
LOCAL_MODE=1 SUBQL_URL=http://localhost:3001 npx @acala-network/eth-rpc-adapter@^2.4.12`
```

### run a graph node and ipfs gateway locally
```
docker compose up
```

## Run
### run everything together
```
yarn run-all
```
this will build and deploy everything. If you want to dive deeper, please follow the more detailed steps below.


### build and deploy example Gravitar contract to Acala
```
yarn clean              # optional if repo dirty
yarn build-contract
yarn deploy-contract    # contract should be deployed to 0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108
```

### create and deploy a subgraph
```
yarn codegen
yarn build-graph
yarn create-local
yarn deploy-local
```

## Query Data
go to the playground http://127.0.0.1:8000/subgraphs/name/acala/examplesubgraph/graphql
```graphql
query {
  gravatars {
    id,
    displayName,
    imageUrl,
    owner
  }
}
```

we should see this result 
```
{
  "data": {
    "gravatars": [
      {
        "id": "0x0",
        "displayName": "AAAAA",
        "imageUrl": "https://example/AAAAA.png",
        "owner": "0x75e480db528101a381ce68544611c169ad7eb342"
      },
      {
        "id": "0x1",
        "displayName": "BBBBB",
        "imageUrl": "https://example/BBBBB.jpg",
        "owner": "0x0085560b24769dac4ed057f1b2ae40746aa9aab6"
      },
      {
        "id": "0x2",
        "displayName": "CCCCC",
        "imageUrl": "https://example/CCCCC.jpg",
        "owner": "0x0294350d7cf2c145446358b6461c1610927b3a87"
      }
    ]
  }
}
```