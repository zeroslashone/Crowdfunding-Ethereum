//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.7.0;

import  "./Campaign.sol";

contract CampaignGenerator {
    address[] public campaigns;
    address private campaignAddress;
    event newCampaign(address);
    function createCampaign(uint minimum, string memory _name) public {
        Campaign campaign = new Campaign(minimum, msg.sender, _name);
        campaignAddress = address(campaign);
        emit newCampaign(campaignAddress);
        campaigns.push(campaignAddress);
    }
    function listCampaigns() public view returns (address[] memory) {
        return campaigns;
    }
}