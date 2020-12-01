const HDWalletProvider = require("@truffle/hdwallet-provider");

const Web3 = require('web3');

const compiledGenerator = require('../ethereum/build/CampaignGenerator.json');

const fs = require('fs-extra')

const mnemonic = 'couple clump rare inspire dune attitude girl capable rural awkward deliver leaf' //fs.readFileSync(".secret").toString().trim();

const rinkebyProvider = 'https://rinkeby.infura.io/v3/18efa7d57b69434699108ad60a2c8a39'; //fs.readFileSync(".provider").toString().trim();

const provider = new HDWalletProvider(mnemonic, rinkebyProvider);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(web3.utils.fromWei(await web3.eth.getBalance(accounts[0]),'ether'))
  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(compiledGenerator.abi)
  .deploy({ data: '0x' + compiledGenerator.evm.bytecode.object })
  .send({ from: accounts[0] })
  .on('error', function(error){
      console.log(error)
  })

  console.log('Contract deployed to:', result.options.address);
};

deploy();