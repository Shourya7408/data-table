import  { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomTable from "../../components/customTable";
import { getTableData } from "../../utils/getTableData";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [columns,setColumns] = useState([]);
  const [pageData,setPageData]= useState({
    page:0,
    total_pages:1,
    page_size:10,
  })
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = async (page = pageData?.page+1,page_size = pageData?.page_size) => {
    if (page > pageData?.total_pages) {
      setHasMore(false);
      return;
    }
    const response =  await getTableData(page,page_size);
    if(page==1){
        const updatedColumns = response?.columns?.map(item => ({ ...item, is_visible: true }))?.sort((a, b) => (b.is_fixed === true ? 1 : 0) - (a.is_fixed === true ? 1 : 0));
        setColumns(updatedColumns);
        setData(response?.data ?? [])
    }else{
        setData(p=>[...p,response?.data]);
    }
    setPageData(p=>({...p,page: page,total_pages:response?.totalPages}))
    if(page>=response?.totalPages){
        setHasMore(false)
    }
  };
    useEffect(()=>{
        fetchMoreData(1)
    },[])
  return (
    <div className="container mt-3">
      <div className="table-responsive" style={{ overflowX: "auto" }}>
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h6 className="text-center">Loading more...</h6>}
          scrollableTarget="scrollableDiv"
        >
            <CustomTable data={data} columns={columns}/>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default DataTable;
