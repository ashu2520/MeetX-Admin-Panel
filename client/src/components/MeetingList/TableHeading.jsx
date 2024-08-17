import React from "react";

const TableHeading = () => {
  return (
    <div className="bg-white border flex shadow-md">
      <div className="border w-1/12 p-1 font-semibold text-center">Sl. No.</div>
     <div className="grid grid-rows-2 w-2/12 ">
        <div className=" font-semibold text-center border ">Meeting Initiator</div>
        <div className="grid grid-cols-2">
          <div className="border p-1  text-center">UserId</div>
          <div className="border p-1 text-center">Name</div>
        </div>
      </div>
       <div className="grid grid-rows-2 w-2/12">
        <div className="p-1 font-semibold text-center border">Meeting with</div>
        <div className="grid grid-cols-2">
          <div className="border  text-center">UserId</div>
          <div className="border  text-center">User</div>
        </div>
      </div>
      <div className="border w-1/12 p-1 font-semibold text-center">Charge</div>
      <div className="border w-1/12 p-1 font-semibold text-center">Amount</div>
      <div className="grid grid-rows-2 w-3/12">
        <div className="font-semibold p-1 text-center border">
          Time
        </div>
        <div className="grid grid-cols-3">
          <div className="border p-1 text-center">Start Time</div>
          <div className="border p-1 text-center">End Time</div>
          <div className="border p-1 text-center">Date</div>
        </div>
      </div>
      <div className="border w-1/12 p-1 font-semibold text-center">Created At</div>
      <div className="border w-1/12 p-1 font-semibold text-center">Status</div>

    </div>
  );
};

export default TableHeading;
