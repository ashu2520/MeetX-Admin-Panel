import React from "react";

const TableHeading = () => {
  return (
    <div className="bg-white border flex shadow-md">
      <div className="border w-1/6 p-2 font-semibold">Sl. No.</div>
      <div className="border w-1/6 p-2 font-semibold">User ID</div>
      <div className="border w-1/6 p-2 font-semibold">Name</div>
      <div className="border w-2/6 p-2 font-semibold">Email</div>
      <div className="border w-1/6 p-2 font-semibold">Mobile</div>
      <div className="border w-1/6 p-2 font-semibold">User Type</div>
      <div className="border w-1/6 p-2 font-semibold">Created At</div>
      <div className="border w-1/6 p-2 font-semibold">Action</div>
    </div>
  );
};

export default TableHeading;
