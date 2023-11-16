import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return pages.map((page) => (
      <span
        key={page}
        onClick={() => onPageChange(page)}
        className={`${
          currentPage === page
            ? " text-primary-blue bg-[#F9FCFF] rounded"
            : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
        } flex items-center justify-center px-4 py-2 text-sm cursor-pointer`}
      >
        {page}
      </span>
    ));
  };

  return (
    <nav className="flex items-center justify-between border-t border-gray-100 px-6 py-5 bg-white">
      <div className="flex items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className=" px-6 py-2.5 rounded-[10px] text-gray-400 text-sm flex gap-x-2 items-center justify-center border border-primary-border"
        >
          <ArrowLeft className=" h-4 w-4 text-gray-400" aria-hidden="true" />
          Previous
        </button>
      </div>
      <div className=" flex gap-x-9 items-center">
        <p className=" text-sm text-primary-greytext">
          Showing 10 results on page
        </p>
        <div className=" flex gap-x-3">{renderPageNumbers()}</div>
      </div>
      <div className=" flex justify-end">
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className=" px-6 py-2.5 rounded-[10px] flex text-sm gap-x-2 items-center justify-center border border-primary-border"
        >
          Next
          <ArrowRight className=" h-4 w-4 text-gray-600" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
};

export default CustomPagination;
