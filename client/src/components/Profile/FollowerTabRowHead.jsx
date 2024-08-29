import React from "react";

const FollowerTabRowHead = () => {
  return (
    <div className="w-full bg-white grid grid-cols-2">
      <div className="flex flex-col">
        <div className="p-2 text-center text-xl border font-semibold">
          Sent Request
        </div>
        <div className="grid grid-cols-3">
          <div className="p-2 text-center border">Accepted</div>
          <div className="p-2 text-center border">Rejected</div>
          <div className="p-2 text-center border">Pending</div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="p-2 text-center text-xl border font-semibold">
          Recieved Request
        </div>
        <div className="grid grid-cols-3">
          <div className="p-2 text-center border">Accepted</div>
          <div className="p-2 text-center border">Rejected</div>
          <div className="p-2 text-center border">Pending</div>
        </div>
      </div>
    </div>
  );
};

export default FollowerTabRowHead;
