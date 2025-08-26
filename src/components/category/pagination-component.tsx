import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface Pagination2Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const generatePageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number
) => {
  const pages = [];
  const halfMax = Math.floor(maxVisiblePages / 2);
  let startPage = Math.max(1, currentPage - halfMax);
  let endPage = Math.min(totalPages, currentPage + halfMax);

  if (currentPage - halfMax <= 1) {
    endPage = Math.min(totalPages, maxVisiblePages);
  }

  if (currentPage + halfMax >= totalPages) {
    startPage = Math.max(1, totalPages - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
};

export default function PaginationComponent({
  totalPages,
  currentPage,
  onPageChange,
}: Pagination2Props) {
  const maxVisiblePages = 4; // Adjust this value based on how many pages you want to show at once
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const pageNumbers = generatePageNumbers(
    currentPage,
    totalPages,
    maxVisiblePages
  );

  const handlePageChange = (page: number) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    onPageChange(page);
  };

  const handlePrevPage = () => {
    if (!isFirstPage) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex justify-between flex-1 sm:hidden">
          <Button
            onClick={handlePrevPage}
            disabled={isFirstPage}
            variant="outline"
            className={`px-4 py-2 mr-2 text-sm font-medium  ${
              isFirstPage
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-400"
            }`}
          >
            <ChevronRightIcon className="rotate-180" /> Previous
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={isLastPage}
            variant="outline"
            className={`px-4 py-2 mr-2 text-sm font-medium  ${
              isLastPage ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
            }`}
          >
            Next <ChevronRightIcon />
          </Button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
          <nav
            className="relative z-0 inline-flex space-x-4 rounded-md"
            aria-label="Pagination"
          >
            <button
              onClick={handlePrevPage}
              disabled={isFirstPage}
              className={`relative inline-flex items-center px-2 py-2 rounded-none border border-[#D9D9D9] bg-white text-sm font-medium text-gray-500 ${
                isFirstPage
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#e5e5e5] border hover:border-[#D9D9D9]"
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon
                className="w-5 h-3"
                aria-hidden="true"
                color="#161616"
              />
            </button>
            {pageNumbers[0] > 1 && (
              <>
                <button
                  onClick={() => onPageChange(1)}
                  className={`relative inline-flex items-center px-4 py-2 border rounded-none text-black text-sm font-medium hover:font-medium ${
                    currentPage === 1
                      ? "bg-[#161616] rounded-none text-white border-gray-800"
                      : "bg-white border-[#D9D9D9]  hover:bg-gray-300"
                  }`}
                >
                  1
                </button>
                {pageNumbers[0] > 2 && (
                  <div className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-black border rounded-none">
                    ...
                  </div>
                )}
              </>
            )}
            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 border rounded-none text-black text-sm font-medium hover:font-medium ${
                  currentPage === page
                    ? "bg-[#161616] rounded-none text-white border-gray-800"
                    : "bg-white border-[#D9D9D9]  hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
            {pageNumbers[pageNumbers.length - 1] < totalPages && (
              <>
                {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                  <div className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-black border rounded-none">
                    ...
                  </div>
                )}
                <button
                  onClick={() => onPageChange(totalPages)}
                  className={`relative inline-flex items-center px-4 py-2 border rounded-none text-black text-sm font-medium hover:font-medium ${
                    currentPage === totalPages
                      ? "bg-[#161616] rounded-none text-white border-gray-800"
                      : "bg-white border-[#D9D9D9]  hover:bg-gray-300"
                  }`}
                >
                  {totalPages}
                </button>
              </>
            )}
            <button
              onClick={handleNextPage}
              disabled={isLastPage}
              className={`relative inline-flex items-center px-2 py-2 rounded-none border border-[#D9D9D9] bg-white  text-sm font-medium text-gray-500 ${
                isLastPage
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#e5e5e5] border hover:border-[#D9D9D9]"
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon
                className="w-5 h-3"
                aria-hidden="true"
                color="#161616"
              />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
