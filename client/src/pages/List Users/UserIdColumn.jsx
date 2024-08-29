import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const UserIdColumn = ({ handleSort, currentSortBy, currentSortOrder }) => {
  return (
    <div
      className="border w-2/12 p-2 font-semibold cursor-pointer flex items-center"
      onClick={() => handleSort("id")}
    >
      User ID
      {currentSortBy === "id" && (
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

export default UserIdColumn;
