import web3 from './web3'
import CampaignGenerator from './build/CampaignGenerator.json'

const factoryAddress = '0x5556DE07BbD71D4cb16047aeE0c87f1Df6A1636b'

const factory = new web3.eth.Contract(
    CampaignGenerator.abi,
    factoryAddress
    );

export default factory
