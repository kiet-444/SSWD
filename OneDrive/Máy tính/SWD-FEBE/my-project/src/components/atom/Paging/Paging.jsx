// src/components/atom/Paging/Paging.js
import React from "react";

const Paging = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        className={`px-4 py-2 border rounded-lg ${
          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"
        }`}
        onClick={handlePreviousClick}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-4 py-2 border rounded-lg">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className={`px-4 py-2 border rounded-lg ${
          currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"
        }`}
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Paging;
