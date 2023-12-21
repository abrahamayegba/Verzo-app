import { useState, useEffect } from "react";

interface PaginationProps<T> {
  data: T[] | undefined;
  pageSize: number;
}

export function usePagination<T>({ data, pageSize }: PaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPages = Math.ceil((data?.length || 0) / pageSize);

  const currentData = data
    ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page whenever the data changes
  }, [data]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), maxPages));
  };

  const nextPage = () => {
    goToPage(currentPage + 1);
  };

  const prevPage = () => {
    goToPage(currentPage - 1);
  };

  return {
    currentData,
    currentPage,
    maxPages,
    nextPage,
    prevPage,
    goToPage,
  };
}
