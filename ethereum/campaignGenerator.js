import web3 from "./web3";
import CampaignGenerator from "./build/CampaignGenerator.json";

const factoryAddress = "0x4B532eaC7A15DBA6996Ad4FDf9Ce73e3ad04c591";

const factory = new web3.eth.Contract(CampaignGenerator.abi, factoryAddress);

export default factory;
