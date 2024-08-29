import React from "react";
import UserIdColumn from "./UserIdColumn";
import MobileColumn from "./MobileColum";
import EmailColumn from "./EmailColumn";
import NameColumn from "./Namecolumn";
import CreatedAtColumn from "./Created";
const TableHeading = ({ onSort, currentSortBy, currentSortOrder }) => {
  const handleSort = (column) => {
    const newOrder = currentSortBy === column && currentSortOrder === "ASC" ? "DESC" : "ASC";
    onSort(column, newOrder);
  };

  return (
    <div className="bg-white border flex shadow-md">
      <div className="border w-1/12 p-2 font-semibold">Sl. No.</div>
      <UserIdColumn handleSort={handleSort} currentSortBy={currentSortBy} currentSortOrder={currentSortOrder} />
      <NameColumn handleSort={handleSort} currentSortBy={currentSortBy} currentSortOrder={currentSortOrder} />
      <EmailColumn handleSort={handleSort} currentSortBy={currentSortBy} currentSortOrder={currentSortOrder} />
      <MobileColumn handleSort={handleSort} currentSortBy={currentSortBy} currentSortOrder={currentSortOrder}/>
      <div className="border w-2/12 p-2 font-semibold mt-3">User Type</div>
      <CreatedAtColumn handleSort={handleSort} currentSortBy={currentSortBy} currentSortOrder={currentSortOrder}/>
      <div className="border w-1/12 p-2 font-semibold mt-3">Action</div>
    </div>
  );
};

export default TableHeading;
