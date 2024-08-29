import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const CreatedAtColumn = ({ handleSort, currentSortBy, currentSortOrder }) => {
  return (
    <div
      className="border w-3/12 p-2 font-semibold cursor-pointer flex items-center"
      onClick={() => handleSort("created_at")}
    >
      Created At
      {currentSortBy === "created_at" && (
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

export default CreatedAtColumn;
