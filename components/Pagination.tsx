// Pagination.tsx
import { usePagination } from "@/app/hooks/usePagination";
import React from "react";

interface PaginationProps<T> {
  data: T[];
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps<any>> = ({
  data,
  pageSize,
  onPageChange,
}) => {
  const { currentData, currentPage, maxPages, nextPage, prevPage, goToPage } =
    usePagination({ data, pageSize });

  return (
    <div>
      {data.length > 0 && (
        <>
          <div>
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {maxPages}
            </span>
            <button onClick={nextPage} disabled={currentPage === maxPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Pagination;
