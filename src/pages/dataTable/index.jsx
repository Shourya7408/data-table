import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomTable from "../../components/customTable";
import { getTableData } from "../../utils/getTableData";
import ColumnsModal from "./columnsModal";
import Pagination from "../../components/pagination";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [pageData, setPageData] = useState({
    page: 0,
    total_pages: 1,
    page_size: 15,
  });
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [usePagination, setUsePagination] = useState(true);
  const closeModal = () => setShowModal(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log("Search input:", e.target.value);
  };
  const fetchMoreData = async (
    page = pageData?.page + 1,
    page_size = pageData?.page_size,
    params = {},
    append = !usePagination
  ) => {
    if (page > pageData?.total_pages && page != 1) {
      setHasMore(false);
      return;
    } else if (!hasMore) {
      setHasMore(true);
    }
    if (search?.trim()?.length > 0) {
      params["search"] = search;
    }
    const response = await getTableData(page, page_size, params);
    if (page == 1) {
      const updatedColumns = response?.columns
        ?.map((item) => ({ ...item, is_visible: true }))
        ?.sort(
          (a, b) =>
            (b.is_fixed === true ? 1 : 0) - (a.is_fixed === true ? 1 : 0)
        );
      setColumns(updatedColumns);
      setData(response?.data ?? []);
    } else {
      setData((p) =>
        append ? [...p, ...response?.data] : response?.data ?? []
      );
    }
    setPageData((p) => ({
      ...p,
      page: page,
      total_pages: response?.totalPages,
    }));
    if (page >= response?.totalPages) {
      setHasMore(false);
    }
  };
  useEffect(() => {
    fetchMoreData(1);
  }, []);
  const handleSort = (key, direction) => {
    let params = {
      sorting_key: key,
      sorting_direction: direction,
    };

    fetchMoreData(1, pageData?.page_size, params);
    setSortConfig({ key, direction });
  };
  const handlePageChange = (newPage) => {
    fetchMoreData(newPage);
    setPageData((prev) => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (newPageSize) => {
    fetchMoreData(1, newPageSize);
    setPageData({ page: 1, total_pages: 1, page_size: newPageSize });
  };
  return (
    <div className="w-100 mt-1">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Data Table</h5>
        <div className="form-check form-switch">
          <label className="form-check-label" htmlFor="toggleSwitch">
            Use {usePagination ? "Infinite Scroll" : "Pagination"}
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="toggleSwitch"
            checked={!usePagination}
            onChange={() => {
              fetchMoreData(1, 15, {}, usePagination);
              setUsePagination((prev) => !prev);
            }}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between mb-3 gap-2 flex-wrap">
        <input
          type="text"
          className="form-control w-50 "
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchMoreData(1, pageData?.page_size);
            }
          }}
        />
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setShowModal(true)}>
          Manage Columns
        </button>
      </div>
      <div className="table-responsive" style={{ overflowX: "auto" }}>
        {usePagination ? (
          <>
            <CustomTable
              data={data}
              columns={columns}
              sortConfig={sortConfig}
              handleSort={handleSort}
            />
            <Pagination
              currentPage={pageData?.page}
              totalPages={pageData?.total_pages}
              pageSize={pageData?.page_size}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </>
        ) : (
          <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h6 className="text-center">Loading more...</h6>}
            endMessage={
              <div className="text-center">
                Yay! You have fetched data successfully!
              </div>
            }
            scrollableTarget="scrollableDiv">
            <CustomTable
              data={data}
              columns={columns}
              sortConfig={sortConfig}
              handleSort={handleSort}
            />
          </InfiniteScroll>
        )}
      </div>
      <ColumnsModal
        closeModal={closeModal}
        showModal={showModal}
        columns={columns}
        setColumns={setColumns}
      />
    </div>
  );
};

export default DataTable;
