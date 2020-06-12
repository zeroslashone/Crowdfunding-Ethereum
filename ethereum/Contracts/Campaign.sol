//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.7.0;

contract Campaign {
    uint public campaignMinimum;
    address public manager;
    string public campaignName;
    //address public campaignAddress;
    struct Goals {
        string name;
        string description;
        uint target;
        address payable recipient;
        bool completed;
    }
    Goals[] public goals;
    
    struct contributerDetails {
        uint totalContributions;
        uint count;
    }
    mapping(address => contributerDetails) public contributors;
    
    constructor(uint minimum, address creator, string memory _name) public {
        campaignMinimum = minimum;
        manager = creator;
        campaignName = _name;
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
    
    function createGoal(string memory name, string memory description, uint target, address payable recipient) 
    public accessCheck {
        Goals memory newGoal = Goals({
            name: name,
            description: description,
            target: target,
            recipient: recipient,
            completed: false
        });
        goals.push(newGoal);
    }
    
    function transferFunds(uint index, uint raisedAmount) public accessCheck {
        Goals storage goal = goals[index];
        require(raisedAmount<=address(this).balance,"The balance amount is not greater than goal amount");
        require(!goal.completed && raisedAmount >= (goal.target/2), "goal criteria not met");
        
        goal.completed = true;
        goal.recipient.transfer(raisedAmount);
    }
    
    function goalsDetails(uint index) public view returns(string memory,string memory,uint,address, bool ) {
        Goals storage goal = goals[index];
        return (
            goal.name,
            goal.description,
            goal.target,
            goal.recipient,
            goal.completed
        );
    }
    function sizeOfGoals() public view returns(uint) {
        return goals.length;
    }
    
    function contributorDetails(address contributorAddress) public view returns(uint,uint) {
        contributerDetails storage details = contributors[contributorAddress];
        return (
            details.totalContributions,
            details.count
        );
    }
    
}