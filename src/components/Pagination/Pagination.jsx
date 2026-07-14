import "./Pagination.css";

function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
  pageSize,
  setPageSize,
}) {
  return (
    <div className="pagination">

      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages || 1}
      </span>

      <button
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>

      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          setCurrentPage(1);
        }}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>

    </div>
  );
}

export default Pagination;