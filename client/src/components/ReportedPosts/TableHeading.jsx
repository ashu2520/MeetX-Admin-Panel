import React from "react";

const TableHeading = ({ onSort }) => {
  return (
    

    <div className="bg-white border flex shadow-md">
      <div className="border w-1/12 p-2 font-semibold text-center">Sl. No.</div>
      <div className="border w-2/12 p-2 font-semibold text-center cursor-pointer" onClick={() => onSort("rp.user_id")}>
        Reporting User Id
      </div>
      <div className="border w-2/12 p-2 font-semibold text-center cursor-pointer" onClick={() => onSort("ap.user_id")}>
        User Id of Reported Post
      </div>
      <div className="border w-2/12 p-2 font-semibold text-center cursor-pointer" onClick={() => onSort("rp.all_post_id")}>
        Reported Post Id
      </div>
      <div className="border w-2/12 p-2 font-semibold text-center cursor-pointer" onClick={() => onSort("ap.post_type")}>
        Post Type
      </div>
      <div className="border w-2/12 p-2 font-semibold text-center cursor-pointer" onClick={() => onSort("rp.remark")}>
        Reason
      </div>
      <div className="border w-2/12 p-2 font-semibold text-center">Verified Status</div>
    </div>
  );
};


export default TableHeading;
