import React from 'react';
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
const StatusColumn = ({ sortBy, sortDirection, onSort }) => {
  const handleSort = () => onSort("status");

  return (
    <div className="border w-1/12 p-2 font-semibold text-center cursor-pointer" onClick={handleSort}>
      <span>Status </span>
      {sortBy === 'status' && (sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
    </div>
  );
};

export default StatusColumn;
