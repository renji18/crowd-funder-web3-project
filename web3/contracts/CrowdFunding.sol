// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {

  // Defining custom data type using struct
  struct Campaign {
    address owner;
    string title;
    string description;
    uint256 target;
    uint256 deadline;
    uint256 amountCollected;
    string image;
    address[] donators;
    uint256[] donations;
  }

  // Natively accessed Campaign[0] in js requires us to create a mapping to be able to do the same in solidity
  mapping(uint256 => Campaign) public campaigns;
  uint256 public numberOfCampaigns = 0;

  // We require a memory keyword with strings
  function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
    // we create a campaign of type Campaign at campaigns[numberOfCampaigns] indes
    Campaign storage campaign = campaigns[numberOfCampaigns];

    // is a test to see if everything okay
    require(campaign.deadline < block.timestamp, 'The deadline should be a date in the future.');

    // setting the values
    campaign.owner = _owner;
    campaign.title = _title;
    campaign.description = _description;
    campaign.target = _target;
    campaign.deadline = _deadline;
    campaign.amountCollected = 0;
    campaign.image = _image;

    // Increasing the number of values for the next createCampaign call
    numberOfCampaigns++;
    return numberOfCampaigns - 1;
  }

  // payable signifies that we are going to send some crypto currency
  function donateToCampaign(uint256 _id) public payable {
    uint256 amount = msg.value;

    // accessing a particular campaign
    Campaign storage campaign = campaigns[_id];

    // updating the Campaign struct of the particular campaign
    campaign.donators.push(msg.sender);
    campaign.donations.push(amount);

    // We then pay the amount to the owner of the campaign
    (bool sent, ) = payable(campaign.owner).call{value: amount}("");
    if(sent) {
      // Updating the amount collected by the campaign
      campaign.amountCollected = campaign.amountCollected + amount;
    }
  }

  function getDonators(uint256 _id) view public returns(address[] memory, uint256[] memory) {
    return (campaigns[_id].donators, campaigns[_id].donations);
  }

  function getCampaigns() public view returns(Campaign[] memory) {
    // creating empty array of size numberOfCampaigns of the type Campaign
    Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

    // populating allCampaigns using for loop, bcoz we don't have access to all the Campaign structs before.
    for(uint256 i=0; i<numberOfCampaigns; i++) {
      Campaign storage item = campaigns[i];
      allCampaigns[i] = item;
    }
    return allCampaigns;
  }
}