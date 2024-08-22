import React from "react";

const PaymentTabRow = ({ payment }) => {
  const { user_id, username, type, accountNo, ifsc, amount, status } = payment;

  return (
    <div className="bg-white grid grid-cols-7 connectionRequest-UserDataRow">
      <div className="p-2 text-center border h-full">{user_id}</div>
      <div className="p-2 text-center border h-full">{username}</div>
      <div className="p-2 text-center border h-full">{type}</div>
      <div className="p-2 text-center border h-full">{accountNo || "N/A"}</div>
      <div className="p-2 text-center border h-full">{ifsc || "N/A"}</div>
      <div className="p-2 text-center border h-full">Rs. {amount}</div>
      <div className="p-2 text-center border h-full">{status}</div>
    </div>
  );
};

export default PaymentTabRow;
