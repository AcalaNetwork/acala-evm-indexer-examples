# Acala EVM+ Indexer Example - Subquery

This is a basic example of indexing Acala EVM+ data using subquery. It indexes Gravitars on mandala testnet from it's logs.

For more documentations please refer to the [subquery evm doc.](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html)
## run evm subquery on an already deployed Avatar contract
install deps
```
yarn --immutable 
```

build subquery
```
yarn build
```

start the whole evm subquery stack
```
yarn start
```

should see something like this
```
<BlockDispatcherService> INFO Enqueueing blocks 657634...657655, total 22 blocks
<BlockDispatcherService> INFO fetch block [657634,657655], total 22 blocks
<sandbox> INFO --------------------------------------
<sandbox> INFO New Gravar at block 657639
<sandbox> INFO --------------------------------------
<sandbox> INFO --------------------------------------
<sandbox> INFO New Gravar at block 657642
<sandbox> INFO --------------------------------------
<sandbox> INFO --------------------------------------
<sandbox> INFO New Gravar at block 657645
<sandbox> INFO --------------------------------------
<sandbox> INFO --------------------------------------
<sandbox> INFO Updated Gravar at block 657649
<sandbox> INFO --------------------------------------
<sandbox> INFO --------------------------------------
<sandbox> INFO Updated Gravar at block 657651
<sandbox> INFO --------------------------------------
<sandbox> INFO --------------------------------------
<sandbox> INFO Updated Gravar at block 657653
<sandbox> INFO --------------------------------------
```

## deploy you own Avatar instance and make your own calls
Note that subql log handlers will be triggerred once the block is **finalized**, not as soon as it's mined. Usually it's ~10s after the block is mined.

compile the avatar contract
```
yarn compile
```

deploy the gravitar registry contract to mandala and publish it
```
yarn deploy:mandala
```

create a couple of gravatars.
need to first replace the hardcoded contract address in `project.yaml` and `utils.ts`
```
yarn create:mandala
```

update the gravatars
```
yarn update:mandala
```

start subql services and wait for it to index
```
yarn build && yarn start
```

keep updating the gravatars (optional)
```
yarn update:mandala
```

## query the data

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
          "displayName": "yIv1W",
          "imageUrl": "https://example/CCCCC.jpg",
          "createdBlock": "657645"
        },
        {
          "id": "0x02",
          "owner": "\\x0085560b24769dac4ed057f1b2ae40746aa9aab6",
          "displayName": "xNZSe",
          "imageUrl": "https://example/BBBBB.jpg",
          "createdBlock": "657642"
        },
        {
          "id": "0x01",
          "owner": "\\x75e480db528101a381ce68544611c169ad7eb342",
          "displayName": "8cYyT",
          "imageUrl": "https://example/AAAAA.png",
          "createdBlock": "657639"
        }
      ]
    }
  }
}
```

## publish to managed service
After everything works locally, we can publish this project to the subquery [managed service](https://academy.subquery.network/run_publish/publish.html#requirements) for prod.