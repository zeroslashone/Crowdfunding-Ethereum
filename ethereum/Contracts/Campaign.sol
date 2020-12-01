//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.7.0;

contract Campaign {
    uint public campaignMinimum;
    address public manager;
    string public campaignName;
    uint public target;
    bool public completed;
    address payable recipient;
    //address public campaignAddress;

    struct contributerDetails {
        uint totalContributions;
        uint count;
    }
    mapping(address => contributerDetails) public contributors;
    
    constructor(uint minimum, address creator, string memory _name, uint _target, address payable _recipient) public {
        campaignMinimum = minimum;
        manager = creator;
        campaignName = _name;
        target = _target;
        completed=false;
        recipient =_recipient;
        //campaignAddress = address(this);
    }
    
    modifier accessCheck() {
        require(msg.sender == manager, "only the campaign creator is allowed to invoke");
        _;
    }
    
    function contribute() public payable {
        require(msg.value >= campaignMinimum,"Contribution amount too low");
        require(msg.sender != manager, "The creator is not allowed to contribute to his own campaign");
        contributerDetails storage contributor = contributors[msg.sender];
        contributor.count++;
        contributor.totalContributions += msg.value;
    }
    
    
    function transferFunds() public accessCheck {
        require(!completed && address(this).balance >= (target/2), "Either this goal has already been completed or the raised amount is less than half the target");
        
        completed = true;
        recipient.transfer(address(this).balance);
    }
    
    function contributorDetails(address contributorAddress) public view returns(uint,uint) {
        contributerDetails storage details = contributors[contributorAddress];
        return (
            details.totalContributions,
            details.count
        );
    }
    
}