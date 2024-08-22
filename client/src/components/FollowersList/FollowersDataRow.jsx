import React from "react";

const UserDataRow = ({
  index,
  userId,
  send_Accepted,
  send_Pending,
  send_Rejected,
  received_Accepted,
  received_Pending,
  received_Rejected,
}) => {
  return (
    <div className="w-full connectionRequest-UserDataRow flex">
      <div className="p-2 border w-1/6">{index}</div>
      <div className="p-2 border w-1/6">{userId}</div>
      <div className="border w-2/6 grid grid-cols-3 text-center">
        <div className="p-2">{send_Accepted}</div>
        <div className="p-2">{send_Rejected}</div>
        <div className="p-2">{send_Pending}</div>
      </div>
      <div className="border w-2/6 grid grid-cols-3 text-center">
        <div className="p-2">{received_Accepted}</div>
        <div className="p-2">{received_Rejected}</div>
        <div className="p-2">{received_Pending}</div>
      </div>
    </div>
  );
};

export default UserDataRow;
