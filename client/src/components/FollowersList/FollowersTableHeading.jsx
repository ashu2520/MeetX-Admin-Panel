import React from "react";

const FollowersTableHeading = () => {
  return (
    <div className="bg-white border flex shadow-md">
      <div className="border w-1/6 p-2 font-semibold">Sl. No.</div>
      <div className="border w-1/6 p-2 font-semibold">User ID</div>
      <div className="grid grid-rows-2 w-2/6">
        <div className="p-2 font-semibold text-center border">
          Sent Requests
        </div>
        <div className="grid grid-cols-3">
          <div className="border p-2 text-center">Accepted</div>
          <div className="border p-2 text-center">Rejected</div>
          <div className="border p-2 text-center">Pending</div>
        </div>
      </div>
      <div className="grid grid-rows-2 w-2/6">
        <div className="font-semibold p-2 text-center border">
          Received Requests
        </div>
        <div className="grid grid-cols-3">
          <div className="border p-2 text-center">Accepted</div>
          <div className="border p-2 text-center">Rejected</div>
          <div className="border p-2 text-center">Pending</div>
        </div>
      </div>
    </div>
  );
};

export default FollowersTableHeading;
