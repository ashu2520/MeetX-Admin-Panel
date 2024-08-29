import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const UserWalletTableHeading = ({ onSort, sortColumn, sortDirection }) => {
  const renderSortIcon = (column) => {
    if (sortColumn !== column) return null;
    if (sortDirection === "asc")
      return <FaArrowUp className="inline ml-2" size={14} color="#000" />;
    if (sortDirection === "desc")
      return <FaArrowDown className="inline ml-2" size={14} color="#000" />;
  };

  return (
    <div className="bg-white border flex shadow-md">
      <div
        className="border w-1/6 p-2 font-semibold cursor-pointer"
        onClick={() => onSort("user_id")}
      >
        User ID {renderSortIcon("user_id")}
      </div>
      <div
        className="border w-1/6 p-2 font-semibold cursor-pointer"
        onClick={() => onSort("schedule_id")}
      >
        Schedule ID {renderSortIcon("schedule_id")}
      </div>
      <div
        className="border w-1/6 p-2 font-semibold cursor-pointer"
        onClick={() => onSort("type")}
      >
        Type {renderSortIcon("type")}
      </div>
      <div
        className="border w-2/6 p-2 font-semibold cursor-pointer"
        onClick={() => onSort("accountNo")}
      >
        Account No. {renderSortIcon("accountNo")}
      </div>
      <div
        className="border w-1/6 p-2 font-semibold cursor-pointer"
        onClick={() => onSort("ifsc")}
      >
        IFSC Code {renderSortIcon("ifsc")}
      </div>
      <div
        className="border w-1/6 p-2 font-semibold cursor-pointer"
        onClick={() => onSort("upi")}
      >
        UPI ID {renderSortIcon("upi")}
      </div>
      <div
        className="border w-1/6 p-2 font-semibold cursor-pointer"
        onClick={() => onSort("status")}
      >
        Status {renderSortIcon("status")}
      </div>
      <div
        className="border w-1/6 p-2 font-semibold cursor-pointer"
        onClick={() => onSort("amount")}
      >
        Amount {renderSortIcon("amount")}
      </div>
    </div>
  );
};

export default UserWalletTableHeading;
