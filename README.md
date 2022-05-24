# Example Subgraph With Acala EVM+
This is an example subgraph that indexes and query Gravitar on Acala EVM+.

## Run
### install deps
`yarn`

### run a Mandala node and rpc adapter
```
docker compose up   # in bodhi.js/evm_subql
LOCAL_MODE=1 SUBQL_URL=http://localhost:3001 npx @acala-network/eth-rpc-adapter@^2.4.12`  # in terminal 2
```

### deploy example Avatar contract to Mandala
```
yarn truffle compile
yarn truffle migrate --network mandala    # contract should be deployed to 0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108
```

### run a graph node
```
rm -rf data/ && docker compose up
```

### create and deploy a subgraph
```
yarn codegen
yarn create-local
yarn deploy-local
```

### query the data
go to the playground http://127.0.0.1:8000/subgraphs/name/graphprotocol/examplesubgraph/graphql
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
should see this result 
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