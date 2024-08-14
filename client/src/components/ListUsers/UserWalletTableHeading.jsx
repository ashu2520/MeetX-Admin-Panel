import React from 'react'

const UserWalletTableHeading = () => {
  return (
    <div className='bg-white border flex shadow-md'>
        <div className='border w-1/6 p-2 font-semibold'>User ID</div>
        <div className='border w-1/6 p-2 font-semibold'>Schedule ID</div>
        <div className='border w-1/6 p-2 font-semibold'>Type</div>
        <div className='border w-2/6 p-2 font-semibold'>Account No.</div>
        <div className='border w-1/6 p-2 font-semibold'>IFSC Code</div>
        <div className='border w-1/6 p-2 font-semibold'>UPI ID</div>
        <div className='border w-1/6 p-2 font-semibold'>Status</div>
        <div className='border w-1/6 p-2 font-semibold'>Amount</div>
    </div>
  )
}

export default UserWalletTableHeading