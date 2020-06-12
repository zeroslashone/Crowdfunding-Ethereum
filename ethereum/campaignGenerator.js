import web3 from './web3'
import CampaignGenerator from './build/CampaignGenerator.json'

const factoryAddress = '0x364b1bF55dcc1273385F32701d1E363491d81010'

const factory = new web3.eth.Contract(
    CampaignGenerator.abi,
    factoryAddress
    );

export default factory