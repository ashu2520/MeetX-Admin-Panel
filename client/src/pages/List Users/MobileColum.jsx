import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const MobileColumn = ({ handleSort, currentSortBy, currentSortOrder }) => {
  return (
    <div
      className="border w-3/12 p-2 font-semibold cursor-pointer flex items-center"
      onClick={() => handleSort("mobile_number")}
    >
      Mobile
      {currentSortBy === "mobile_number" && (
        <>
          {currentSortOrder === "ASC" ? (
            <FaArrowUp className="ml-2" />
          ) : (
            <FaArrowDown className="ml-2" />
          )}
        </>
      )}
    </div>
  );
};

export default MobileColumn;
