import React from "react";
import ActionButton from "./ActionButton";

const UserWalletHistory = ({user_id, schedule_id, type, accountNo, ifsc, upi_id, status, amount}) => {
  return (
    <>
      <div className='bg-white border flex shadow-md connectionRequest-UserDataRow'>
        <div className='border w-1/6 p-2'>{user_id}</div>
        <div className='border w-1/6 p-2'>{schedule_id}</div>
        <div className='border w-1/6 p-2'>{type}</div>
        <div className='border w-2/6 p-2'>{accountNo}</div>
        <div className='border w-1/6 p-2'>{ifsc}</div>
        <div className='border w-1/6 p-2'>{upi_id}</div>
        <div className='border w-1/6 p-2'>{status}</div>
        <div className='border w-1/6 p-2'>{amount}</div>{/* this is the default data */}
    </div>
    </>
  );
};

export default UserWalletHistory;
