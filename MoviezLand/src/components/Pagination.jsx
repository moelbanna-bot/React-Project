import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage !== currentPage && newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const getPageNumbers = () => {
    const pages = [];

    pages.push("prev");

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        endPage = 4;
      }
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      for (let i = startPage; i <= endPage; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
    }

    pages.push("next");

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <BootstrapPagination>
      {getPageNumbers().map((page, index) => {
        if (page === "prev") {
          return (
            <BootstrapPagination.Prev
              key="prev"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
          );
        }

        if (page === "next") {
          return (
            <BootstrapPagination.Next
              key="next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          );
        }

        if (page === "...") {
          return (
            <BootstrapPagination.Ellipsis key={`ellipsis-${index}`} disabled />
          );
        }

        return (
          <BootstrapPagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </BootstrapPagination.Item>
        );
      })}
    </BootstrapPagination>
  );
};

export default Pagination;
