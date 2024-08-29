import React from 'react';
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
const TimeColumn = ({ sortBy, sortDirection, onSort }) => {
  return (
    <div className="grid grid-rows-2 w-3/12">
      <div className="font-semibold text-center border p-2 cursor-pointer" onClick={() => onSort("start_time")}>
        Time {sortBy === 'start_time' && (sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
      </div>
      <div className="grid grid-cols-3">
        <div className="border p-2 text-center cursor-pointer" onClick={() => onSort("start_time")}>
          Start Time
        </div>
        <div className="border p-2 text-center cursor-pointer" onClick={() => onSort("end_time")}>
          End Time  {sortBy === 'end_time' && (sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
        </div>
        <div className="border p-2 text-center cursor-pointer" onClick={() => onSort("date")}>
          Date {sortBy === 'date' && (sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
        </div>
      </div>

    </div>
  );
};

export default TimeColumn;
