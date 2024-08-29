import React from "react";

const Pagi = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`bg-white font-semibold p-2 text-sm border rounded-md hover:bg-orange-500 ${
            currentPage === i ? "bg-orange-500 text-white" : ""
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="bg-[#ddd] rounded-br-md rounded-bl-md border border-slate-300 flex justify-center gap-2 py-2">
      <button
        onClick={handlePrevious}
        className={`font-semibold p-2 text-sm border rounded-md hover:bg-orange-500 ${
          currentPage === 1 ? "cursor-not-allowed opacity-50" : "bg-white"
        }`}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNext}
        className={`font-semibold p-2 text-sm border rounded-md hover:bg-orange-500 ${
          currentPage === totalPages ? "cursor-not-allowed opacity-50" : "bg-white"
        }`}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagi;
