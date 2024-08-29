import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import React from 'react';

const MeetingWithColumn = ({ sortBy, sortDirection, onSort }) => {
  const handleSort = (field) => onSort(field);

  return (
    <div className="grid grid-rows-2 w-2/12">
      {/* Meeting With Header */}
      <div 
        className="font-semibold text-center border p-2 cursor-pointer flex items-center justify-center space-x-2"
        onClick={() => handleSort("user_id")}
      >
        <span>Meeting With</span>
        {sortBy === 'user_id' && 
          (sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
      </div>

      <div className="grid grid-cols-2">
        {/* UserId Column */}
        <div 
          className="border p-2 text-center cursor-pointer flex items-center justify-center space-x-2"
          onClick={() => handleSort("user_id")}
        >
          <span>UserId</span>
          {sortBy === 'user_id' && 
            (sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
        </div>

        {/* User Column */}
        <div 
          className="border p-2 text-center cursor-pointer flex items-center justify-center space-x-2"
          onClick={() => handleSort("meeting_user_name")}
        >
          <span>User</span>
          {sortBy === 'meeting_user_name' && 
            (sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
        </div>
      </div>
    </div>
  );
  
};

export default MeetingWithColumn;
