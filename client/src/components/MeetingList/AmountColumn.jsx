import React from 'react';
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
const AmountColumn = ({ sortBy, sortDirection, onSort }) => {
  const handleSort = () => onSort("amount");

  return (
    <div className="border w-1/12 p-2 font-semibold text-center cursor-pointer" onClick={handleSort}>
      <span>Amount </span>
      {sortBy === 'amount' && (sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
    </div>
  );
};

export default AmountColumn;
