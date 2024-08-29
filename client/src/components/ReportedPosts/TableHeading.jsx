import React from "react";

const TableHeading = () => {
  return (
    

    <div className="bg-white border flex shadow-md">
      <div className="border w-1/12 p-2 font-semibold text-center">Sl. No.</div>
      <div className="border w-2/12 p-2 font-semibold text-center">
        Reporting User Id
      </div>
      <div className="border w-2/12 p-2 font-semibold text-center">
        User Id of Reported Post
      </div>
      <div className="border w-2/12 p-2 font-semibold text-center">
        Reported Post Id
      </div>
      <div className="border w-2/12 p-2 font-semibold text-center">
        Post Type
      </div>
      <div className="border w-2/12 p-2 font-semibold text-center">Reason</div>
      <div className="border w-2/12 p-2 font-semibold text-center">
        Verified Status
      </div>
    </div>
  );
};

export default TableHeading;