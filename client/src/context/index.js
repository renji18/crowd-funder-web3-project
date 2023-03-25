import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

// Created a context and passed to ./src/index.js
const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // accessing the contract

  // GOERLI
  // const { contract } = useContract('0xDA9Cff04f80b441C00716251b28d0fbfD21CbE83')

  // SEPOLIA
  const { contract } = useContract(
    "0x5614c4888e30a76ACb3df53B29d3E3da8009EA93"
  );

  // accessing the write method createCampaign
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  // Account which is connected to the page
  const address = useAddress();

  // Prompt metamask to connect to an account
  const connect = useMetamask();

  // custom function to send the form data to blockchain method createCampaign
  const publishCampaign = async (form) => {
    try {
      // sending the form data to createCampaign fn of the contract
      const data = await createCampaign([
        address, // owner
        form.title, //title
        form.description, //description
        form.target, //target
        new Date(form.deadline).getTime(), //deadline
        form.image,
      ]);
      console.log("Contract call success", data);
    } catch (error) {
      console.log("Contract call failed", error);
    }
  };

  const getCampaigns = async () => {
    // Calling the getCampaigns function of the contract
    const campaigns = await contract.call("getCampaigns");
    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i, // We set a custom pId here, not set in contract so we can access a particular contract using an Id.
    }));
    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    // To access only the campaigns created by a particular user
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );
    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaign", pId, {
      value: ethers.utils.parseEther(amount),
    });
    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", pId);
    const numOfDonations = donations[0].length;

    const parsedDonations = [];
    for (let i = 0; i < numOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }
    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        createCampaign: publishCampaign,
        connect,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
