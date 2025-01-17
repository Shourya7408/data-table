import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomTable from "../../components/customTable";
import { getTableData } from "../../utils/getTableData";
import ColumnsModal from "./columnsModal";

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
  const closeModal = () => setShowModal(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log("Search input:", e.target.value);
  };
  const fetchMoreData = async (
    page = pageData?.page + 1,
    page_size = pageData?.page_size,
    params = {}
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
    console.log(params, "jjjj");
    const response = await getTableData(page, page_size, params);
    console.log(response, page, page_size);
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
      setData((p) => [...p, ...response?.data]);
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
  return (
    <div className="w-100 mt-3">
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
