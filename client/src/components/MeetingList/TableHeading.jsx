import React from "react";

const TableHeading = ({ sortBy, sortDirection, onSort }) => {
  const handleSort = (field) => {
    const direction = sortBy === field && sortDirection === "asc" ? "desc" : "asc";
    onSort(field, direction);
  };
  
  

  return (
    <div className="bg-white border flex shadow-md">
      <div className="border w-1/12 p-2 font-semibold text-center">Sl. No.</div>
      <div className="grid grid-rows-2 w-2/12">
        <div
          className="font-semibold text-center border p-2 cursor-pointer"
          onClick={() => handleSort("scheduling_user_id")}
        >
          Meeting Initiator
        </div>
        <div className="grid grid-cols-2">
          <div className="border p-2 text-center cursor-pointer" onClick={() => handleSort("scheduling_user_id")}>UserId</div>
          <div className="border p-2 text-center"
          onClick={()=>handleSort("initiator_name")}
          >Name</div>
        </div>
      </div>
      <div className="grid grid-rows-2 w-2/12">
        <div
          className="font-semibold text-center border p-2 cursor-pointer"
          onClick={() => handleSort("user_id")}
        >
          Meeting with
        </div>
        <div className="grid grid-cols-2">
          <div className="border p-2 text-center cursor-pointer" onClick={() => handleSort("user_id")}>UserId</div>
          <div className="border p-2 text-center"
          onClick={()=>handleSort("meeting_user_name")}
          >User</div>
        </div>
      </div>
      <div
        className="border w-1/12 p-2 font-semibold text-center cursor-pointer"
        onClick={() => handleSort("charge")}
      >
        Charge
      </div>
      <div
        className="border w-1/12 p-2 font-semibold text-center cursor-pointer"
        onClick={() => handleSort("amount")}
      >
        Amount
      </div>
      <div className="grid grid-rows-2 w-3/12">
        <div
          className="font-semibold text-center border p-2 cursor-pointer"
          onClick={() => handleSort("start_time")}
        >
          Time
        </div>
        <div className="grid grid-cols-3">
          <div className="border p-2 text-center"onClick={() => handleSort("start_time")}>Start Time</div>
          <div className="border p-2 text-center"onClick={() => handleSort("end_time")}>End Time</div>
          <div className="border p-2 text-center"onClick={() => handleSort("date")}>Date</div>
        </div>
      </div>
      <div
        className="border w-1/12 p-2 font-semibold text-center cursor-pointer"
        onClick={() => handleSort("created_at")}
      >
        Created At
      </div>
      <div
        className="border w-1/12 p-2 font-semibold text-center cursor-pointer"
        onClick={() => handleSort("status")}
      >
        Status
      </div>
      
    </div>
  );
};

export default TableHeading;