import React from "react";

const TableHeading = () => {
  return (
    <div className="bg-white border flex shadow-md">
      <div className="border w-3/12 p-2 font-semibold text-center">
        Template Name
      </div>
      <div className="border w-3/12 p-2 font-semibold text-center">
        Created At
      </div>
      <div className="border w-3/12 p-2 font-semibold text-center">
        Updated At
      </div>
      <div className="border w-3/12 p-2 font-semibold text-center">
        Action
      </div>
    </div>
  );
};

export default TableHeading;
