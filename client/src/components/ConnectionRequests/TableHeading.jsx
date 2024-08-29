import React from 'react';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const TableHeading = ({ sortOrder, onSortOrderChange }) => {
  return (
    <div className='bg-white border flex shadow-md'>
      <div className='border w-1/6 p-2 font-semibold'>Sl. No.</div>
      <div 
        className='border w-1/6 p-4 font-semibold flex justify-between items-center cursor-pointer'
        onClick={onSortOrderChange}
      > 
        User ID
        {sortOrder && (
          sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />
        )}
      </div>
      <div className='grid grid-rows-2 w-2/6'>
        <div className='p-2 font-semibold text-center border'>Sent Request</div>
        <div className="grid grid-cols-3">
          <div className='border p-2 text-center'>Accepted</div>
          <div className='border p-2 text-center'>Rejected</div>
          <div className='border p-2 text-center'>Pending</div>
        </div>
      </div>
      <div className='grid grid-rows-2 w-2/6'>
        <div className='font-semibold p-2 text-center border'>Received Request</div>
        <div className="grid grid-cols-3">
          <div className='border p-2 text-center'>Accepted</div>
          <div className='border p-2 text-center'>Rejected</div>
          <div className='border p-2 text-center'>Pending</div>
        </div>
      </div>
    </div>
  );
};

export default TableHeading;
