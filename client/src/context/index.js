import React, { useContext, createContext } from "react";
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react'
import { ethers } from 'ethers'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {

  // accessing the contract

  // GOERLI
  // const { contract } = useContract('0xDA9Cff04f80b441C00716251b28d0fbfD21CbE83')
  

  // SEPOLIA
  const { contract } = useContract('0x5614c4888e30a76ACb3df53B29d3E3da8009EA93')

  // accessing the write method createCampaign
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign')

  // accessing the address and metamask
  const address = useAddress()
  const connect = useMetamask()

  // custom function to send the form data to blockchain method createCampaign
  const publishCampaign = async(form) => {
    try {
      const data = await createCampaign([
      address, // owner
      form.title, //title
      form.description, //description
      form.target, //target
      new Date(form.deadline).getTime(), //deadline
      form.image
    ])
    console.log('Contract call success', data);
  } catch (error) {
      console.log('Contract call failed', error);
    }
  }
  return (
    <StateContext.Provider value={{
      address,
      contract,
      createCampaign: publishCampaign,
      connect,
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)