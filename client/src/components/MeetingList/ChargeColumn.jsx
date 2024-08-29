import React from 'react';
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
const ChargeColumn = ({ sortBy, sortDirection, onSort }) => {
  const handleSort = () => onSort("charge");

  return (
    <div className="border w-1/12 p-2 font-semibold text-center cursor-pointer" onClick={handleSort}>
      <span> Charge </span>
     {sortBy === 'charge' && (sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
    </div>
  );
};

export default ChargeColumn;
