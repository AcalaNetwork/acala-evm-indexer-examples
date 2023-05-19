# Acala EVM+ Indexer Example - Subquery 
## run evm subquery on an already deployed Avatar contract
start a subquery stack
```
docker compose up
```

should see something like this
```
<BlockDispatcherService> INFO Enqueueing blocks 2866972...2867024, total 53 blocks
<BlockDispatcherService> INFO fetch block [2866972,2867024], total 53 blocks
<subql-node> INFO Node started on port: 3000
<sandbox> INFO New Gravar at block 2866974
<sandbox> INFO New Gravar at block 2867006
<sandbox> INFO New Gravar at block 2867008
<sandbox> INFO New Gravar at block 2867010
<sandbox> INFO Updated Gravar at block 2867015
<sandbox> INFO Updated Gravar at block 2867017
<sandbox> INFO Updated Gravar at block 2867019
```

## deploy you own Avatar instance and make your own calls (optional)
compile the avatar contract
```
yarn compile
```

deploy the contract and make a couple calls to it
```
yarn deploy --network karuraTestnet

## need to publish the contract first
# and replace the hardcoded contract address in the config and script
yarn call --network karuraTestnet
```

#### query the data

Open your browser and head to `http://localhost:3000`.

Finally, you should see a GraphQL playground is showing in the explorer and the schemas that ready to query.

```graphql
query {
  gravatars(first: 5, orderBy: CREATED_BLOCK_DESC) {
    nodes {
      id
      owner
      displayName
      imageUrl
      createdBlock
    }
  }
}
```

result should look like this
```json
{
  "data": {
    "gravatars": {
      "nodes": [
        {
          "id": "0x03",
          "owner": "\\x0294350d7cf2c145446358b6461c1610927b3a87",
          "displayName": "ccccc",
          "imageUrl": "https://example/CCCCC.jpg",
          "createdBlock": "2867010"
        },
        {
          "id": "0x02",
          "owner": "\\x0085560b24769dac4ed057f1b2ae40746aa9aab6",
          "displayName": "bbbbb",
          "imageUrl": "https://example/BBBBB.jpg",
          "createdBlock": "2867008"
        },
        {
          "id": "0x01",
          "owner": "\\x75e480db528101a381ce68544611c169ad7eb342",
          "displayName": "aaaaa",
          "imageUrl": "https://example/AAAAA.png",
          "createdBlock": "2867006"
        },
        {
          "id": "0x00",
          "owner": "\\x75e480db528101a381ce68544611c169ad7eb342",
          "displayName": "AAAAA",
          "imageUrl": "https://example/AAAAA.png",
          "createdBlock": "2866974"
        }
      ]
    }
  }
}
```
