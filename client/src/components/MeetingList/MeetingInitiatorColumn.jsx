import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import React from 'react';

const MeetingInitiatorColumn = ({ sortBy, sortDirection, onSort }) => {
  const handleSort = (field) => onSort(field);

  return (
    <div className="grid grid-rows-2 w-2/12">
      {/* Meeting Initiator Header */}
      <div 
        className="font-semibold text-center border p-2 cursor-pointer flex items-center justify-center space-x-2"
        onClick={() => handleSort("scheduling_user_id")}
      >
        <span>Meeting Initiator</span>
        {sortBy === 'scheduling_user_id' && 
          (sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
      </div>

      <div className="grid grid-cols-2">
        {/* UserId Column */}
        <div 
          className="border p-2 text-center cursor-pointer flex items-center justify-center space-x-2"
          onClick={() => handleSort("scheduling_user_id")}
        >
          <span>UserId</span>
          {sortBy === 'scheduling_user_id' && 
            (sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
        </div>

        {/* Name Column */}
        <div 
          className="border p-2 text-center cursor-pointer flex items-center justify-center space-x-2"
          onClick={() => handleSort("initiator_name")}
        >
          <span>Name</span>
          {sortBy === 'initiator_name' && 
            (sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
        </div>
      </div>
    </div>
  );
};

export default MeetingInitiatorColumn;
