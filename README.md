
# Fund For Fun

FFF is a decentralized fundraiser project where one can create their own campaigns or dontate to a particular campaign that they like.

## Deployment

The site is already deployed and running with the help of Netlify on
 - [fund-for-fun](https://fund-for-fun.netlify.app/)
## Working Of Contract

Solidity version : ^0.8.9

We have a struct named ```Campaign``` which works as a custom data type to store miscellaneous information about the campaign, such as ```owner```, ```title```, ```description```, ```target```, ```deadline```, ```amountCollected```, ```image```, ```array of donators``` and ```array of donations```.

### The first function ```createCampaign```
Takes ```_owner```, ```_title```, ```_description```, ```_target```, ```_deadline```, and ```_image``` as parameters for creating a campaign. Anyone has access to this function, so anyone can create a campaign

Using mapping we set a unique key for every ```Campaign``` prototype created.

### The second function ```donateToCampaign```
Takes ```_id``` of the campaign which they want to donate eth to.

After accessing a particular campaign we pay the eth to the owner of that campaign and increment the amountCollected by the value which is payed

### The third function ```getDonators```
Also takes ```_id``` and returns the details about all the donators and their respective donations to a particular Campaign. It is a view function that means it is read only.

### The forth function ```getCampaigns```
This function returns an array of all the Campaign structs created so far.

To build the contract, run the following command
```bash
  npm run build
```

We can deploy the contract using
```bash
  npm run deploy
```

As this project is thirdweb package based, we don't need to write deploy.js for the deployment, everything is taken care by thirdweb.
## FrontEnd

### ```./src/index.js```
We require ```ThirdwebProvider``` from ```@thirdweb-dev/react``` package

We wrap our ```App```, ```Router``` and ```Custom Context Providers``` with ```ThirdwebProvider``` and pass the prop ```activeChain={ANY_DESIRED_CHAIN}```.

### ```./src/context/index.js```

This is the main heart of the project.

Communication with the smart contract is done in this file.

We extract various utility functions from ```@thirdweb-dev/react``` such as 
```
useAddress,
useContract,
useMetamask,
useContractWrite,
```

We access a contract which has been deployed on the blockchain using

```
const { contract } = useContract("CONTRACT_ADDRESS");

```

#### First Function ```publishCampaign``` (passed as ```createCampaign```)
We can use this function to create a campaign and send it to the contract.

#### Second Function ```getCampaigns```
We can use this function to get all the campaigns created on the contract.

#### Third Function ```getUserCampaigns```
We can use this function to get the campaigns created on the contract by a particular user.

#### Forth Function ```donate```
We can use this function to donate ETH to a particular campaign.

#### Fifth Function ```getDonations```
We can use this function to get the number of donations and the {donator, donation} data object for a particular campaign.


Rest of the functionality is about using the data form various functions of the contract and setting up a good UI/UX where the user can create and fund campaigns as they seem fit.
## 🚀 About Me

I am an up and coming full stack developer who has started small but has it all planned as to where I'll go.

I hope that you will be along with me on my journey and cheer for me if you see me worthy of it.
## 🛠 Skills
Nodejs, Express, React, MongoDb, Solidity, thirdweb, javascript, html, hbs