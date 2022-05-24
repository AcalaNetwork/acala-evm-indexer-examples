const GravatarRegistry = artifacts.require('./GravatarRegistry.sol')

module.exports = async function(deployer) {
  const registry = await GravatarRegistry.deployed()

  console.log('Account address:', registry.address)

  let accounts = await web3.eth.getAccounts()
  await registry.createGravatar('AAAAA', 'https://example/AAAAA.png', {
    from: accounts[0],
  })
  await registry.createGravatar('BBBBB', 'https://example/BBBBB.jpg', {
    from: accounts[1],
  })
  await registry.createGravatar('CCCCC', 'https://example/CCCCC.jpg', {
    from: accounts[2],
  })
}
