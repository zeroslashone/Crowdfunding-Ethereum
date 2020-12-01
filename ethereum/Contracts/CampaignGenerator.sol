//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.7.0;

import  "./Campaign.sol";

contract CampaignGenerator {
    struct Factory {
        address campaignAddress;
        string name;
    }
    Factory[] public campaigns;
    address private campaignAddress;
    event newCampaign(address);
    function createCampaign(uint minimum, string memory _name, uint _target, address _recipient) public {
        require(msg.sender != _recipient, "The recipient is not allowed to recieve his own funds");
        Campaign campaign = new Campaign(minimum, msg.sender, _name, _target, payable(_recipient));
        campaignAddress = address(campaign);
        emit newCampaign(campaignAddress);
        campaigns.push(Factory({
            campaignAddress: campaignAddress,
            name:_name
        }));
    }
    function listCampaigns() public view returns (uint) {
        return campaigns.length;
    }
    
    function campaignData(uint index) public view returns(address, string memory) {
        Factory storage factoryInstance = campaigns[index];
        return (
            factoryInstance.campaignAddress,
            factoryInstance.name
        );
    }
}