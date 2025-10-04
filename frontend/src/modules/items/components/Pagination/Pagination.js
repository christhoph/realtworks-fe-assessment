import { useCallback } from "react";

import "./Pagination.css";

export function Pagination({ isLoading, page, action, totalPages }) {
  const onPrev = useCallback(() => {
    action(Math.max(1, page - 1));
  }, [action, page]);

  const onNext = useCallback(() => {
    action(page + 1);
  }, [action, page]);

  const pageItems = Array.from({ length: totalPages }, (_, index) => index + 1);

  if (!pageItems.length) {
    return null;
  }

  return (
    <nav
      className="pagination"
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <button
        onClick={onPrev}
        disabled={isLoading || page === 1}
        className="pagination-button__prev"
        aria-label="Go to previous page"
        type="button"
      >
        <span aria-hidden="true">{"<"}</span>
        <span className="sr-only">Previous</span>
      </button>

      <div className="pagination-pages" role="group" aria-label="Page numbers">
        {pageItems.map((value) => (
          <button
            onClick={() => action(value)}
            key={`pagination-button__${value}`}
            className={[
              "pagination-button",
              page === value ? "pagination-button__active" : "",
            ].join(" ")}
            aria-label={`Go to page ${value}`}
            aria-current={page === value ? "page" : undefined}
            type="button"
          >
            {value}
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        className="pagination-button__next"
        disabled={isLoading || page === totalPages}
        aria-label="Go to next page"
        type="button"
      >
        <span aria-hidden="true">{">"}</span>
        <span className="sr-only">Next</span>
      </button>
    </nav>
  );
}
