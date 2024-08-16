import React from 'react'
import UserWalletTableHeading from '../../components/ListUsers/UserWalletTableHeading'
import Sidebar from '../../components/Sidebar'
import NavBar from '../../components/NavBar'
import UserWalletHistory from '../../components/ListUsers/UserWalletHistory'

const WalletHistory = () => {
  return (
    <>
    <NavBar />
    <div className="w-full flex">
      <Sidebar />
      <div className="p-4 w-full flex flex-col gap-4 relative">
        <h1 className="text-2xl">Wallet History</h1>
        <UserWalletTableHeading />
        <div className="bg-white min-h-96 max-h-[75vh] h-full overflow-y-scroll overflow-x-hidden connectionRequest-container shadow-xl">
          <UserWalletHistory/>
        </div>
      </div>
    </div>
  </>
  )
}

export default WalletHistory
