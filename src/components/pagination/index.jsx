const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const handlePageSizeChange = (e) => {
    onPageSizeChange(Number(e.target.value));
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <div>
        <label htmlFor="pageSize" className="me-2">
          Page Size:
        </label>
        <select
          id="pageSize"
          className="form-select d-inline-block w-auto"
          value={pageSize}
          onChange={handlePageSizeChange}>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>

      <div>
        <button
          className="btn btn-outline-primary me-2 btn-sm"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary ms-2 btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
