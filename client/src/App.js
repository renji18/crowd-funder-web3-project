import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CampaignDetails from './pages/CampaignDetails'
import CreateCampaign from './pages/CreateCampaign'
import Profile from './pages/Profile'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='relative sm:-8 p-4 min-h-screen flex flex-row bg-[#13131a]'>
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar /> 
      </div>

      <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-campaign' element={<CreateCampaign />} />
          <Route path='/campaign-details/:id' element={<CampaignDetails />} />
        </Routes>
      </div>  
    </div>
  )
}

export default App