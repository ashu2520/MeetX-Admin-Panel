import React from "react";

const TableHeading = ({ onSort, currentSortBy, currentSortOrder }) => {
  // Helper function to determine sort order and apply active sort indicator
  const handleSort = (column) => {
    const newOrder = currentSortBy === column && currentSortOrder === "ASC" ? "DESC" : "ASC";
    onSort(column, newOrder);
  };

  return (
    <div className="bg-white border flex shadow-md">
      <div className="border w-1/12 p-2 font-semibold">Sl. No.</div>
      <div
        className="border w-2/12 p-2 font-semibold cursor-pointer"
        onClick={() => handleSort("id")}
      >
        User ID
      </div>
      <div
        className="border w-2/12 p-2 font-semibold cursor-pointer"
        onClick={() => handleSort("username")}
      >
        Name
      </div>
      <div
        className="border w-3/12 p-2 font-semibold cursor-pointer"
        onClick={() => handleSort("email")}
      >
        Email
      </div>
      <div
        className="border w-2/12 p-2 font-semibold cursor-pointer"
        onClick={() => handleSort("mobile_number")}
      >
        Mobile
      </div>
      <div className="border w-2/12 p-2 font-semibold">User Type</div>
      <div
        className="border w-2/12 p-2 font-semibold cursor-pointer"
        onClick={() => handleSort("created_at")}
      >
        Created At
      </div>
      <div className="border w-1/12 p-2 font-semibold">Action</div>
    </div>
  );
};

export default TableHeading;
