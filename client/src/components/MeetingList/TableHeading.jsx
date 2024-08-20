import React from "react";

const TableHeading = () => {
  return (
    <div className="bg-white border flex shadow-md">
      <div className="border w-1/12 p-2 font-semibold text-center">Sl. No.</div>
      <div className="grid grid-rows-2 w-2/12">
        <div className="font-semibold text-center border p-2">
          Meeting Initiator
        </div>
        <div className="grid grid-cols-2">
          <div className="border p-2 text-center">UserId</div>
          <div className="border p-2 text-center">Name</div>
        </div>
      </div>
      <div className="grid grid-rows-2 w-2/12">
        <div className="font-semibold text-center border p-2">Meeting with</div>
        <div className="grid grid-cols-2">
          <div className="border p-2 text-center">UserId</div>
          <div className="border p-2 text-center">User</div>
        </div>
      </div>
      <div className="border w-1/12 p-2 font-semibold text-center">Charge</div>
      <div className="border w-1/12 p-2 font-semibold text-center">Amount</div>
      <div className="grid grid-rows-2 w-3/12">
        <div className="font-semibold text-center border p-2">Time</div>
        <div className="grid grid-cols-3">
          <div className="border p-2 text-center">Start Time</div>
          <div className="border p-2 text-center">End Time</div>
          <div className="border p-2 text-center">Date</div>
        </div>
      </div>
      <div className="border w-1/12 p-2 font-semibold text-center">
        Created At
      </div>
      <div className="border w-1/12 p-2 font-semibold text-center">Status</div>
    </div>
  );
};

export default TableHeading;
