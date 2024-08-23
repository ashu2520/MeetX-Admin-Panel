import React from "react";

const UserWalletTableHeading = ({ onSort }) => {
  return (
    <div className="bg-white border flex shadow-md">
      <div className="border w-1/6 p-2 font-semibold cursor-pointer" onClick={() => onSort("user_id")}>
        User ID
      </div>
      <div className="border w-1/6 p-2 font-semibold cursor-pointer" onClick={() => onSort("schedule_id")}>
        Schedule ID
      </div>
      <div className="border w-1/6 p-2 font-semibold cursor-pointer" onClick={() => onSort("type")}>
        Type
      </div>
      <div className="border w-2/6 p-2 font-semibold">Account No.</div>
      <div className="border w-1/6 p-2 font-semibold">IFSC Code</div>
      <div className="border w-1/6 p-2 font-semibold">UPI ID</div>
      <div className="border w-1/6 p-2 font-semibold cursor-pointer" onClick={() => onSort("status")}>
        Status
      </div>
      <div className="border w-1/6 p-2 font-semibold cursor-pointer" onClick={() => onSort("amount")}>
        Amount
      </div>
    </div>
  );
};

export default UserWalletTableHeading;
