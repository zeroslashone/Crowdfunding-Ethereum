import web3 from './web3'
import CampaignGenerator from './build/CampaignGenerator.json'

const factoryAddress = '0xd435582412f2aD47fBCEa94A819e058D55c58b35'

const factory = new web3.eth.Contract(
    CampaignGenerator.abi,
    factoryAddress
    );

export default factory