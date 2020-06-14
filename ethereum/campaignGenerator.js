import web3 from './web3'
import CampaignGenerator from './build/CampaignGenerator.json'

const factoryAddress = '0x6Ffb4B0CC6b0Ac8DC0E0a7dCB16d1f6c919FCEbD'

const factory = new web3.eth.Contract(
    CampaignGenerator.abi,
    factoryAddress
    );

export default factory

//0xd435582412f2aD47fBCEa94A819e058D55c58b35