import React from 'react';
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
const CreatedAtColumn = ({ sortBy, sortDirection, onSort }) => {
  const handleSort = () => onSort("created_at");
  return (
    <div className="border w-1/12 p-2 font-semibold text-center cursor-pointer" onClick={handleSort}>
      <span> Created At</span>
      {sortBy === 'created_at' && (sortDirection === 'asc' ?<FaArrowUp /> : <FaArrowDown />)}
    </div>
  );
};

export default CreatedAtColumn;
