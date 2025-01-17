import "./index.css"; // Include custom styles

const CustomTable = ({
  data = [],
  columns = [],
  sortConfig = {},
  handleSort,
}) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {columns
            ?.filter((it) => it?.is_visible)
            ?.map((col, ind) => (
              <th
                key={ind}
                onClick={() => col.is_sorting && handleSort(col.data_key)}>
                {col.label}
                {col.is_sorting && (
                  <span className="ms-2">
                    <i
                      style={{ cursor: "pointer" }}
                      className={`bi bi-arrow-up ${
                        sortConfig.key === col.data_key &&
                        sortConfig.direction === "ascending"
                          ? "text-primary"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          sortConfig.key === col.data_key &&
                          sortConfig.direction === "ascending"
                        ) {
                          handleSort(col.data_key, "");
                        } else {
                          handleSort(col.data_key, "ascending");
                        }
                      }}></i>
                    <i
                      style={{ cursor: "pointer" }}
                      className={`bi bi-arrow-down ${
                        sortConfig.key === col.data_key &&
                        sortConfig.direction === "descending"
                          ? "text-primary"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          sortConfig.key === col.data_key &&
                          sortConfig.direction === "descending"
                        ) {
                          handleSort(col.data_key, "");
                        } else {
                          handleSort(col.data_key, "descending");
                        }
                      }}></i>
                  </span>
                )}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr key={item?.id}>
            {columns
              ?.filter((it) => it?.is_visible)
              ?.map((col, ind) => (
                <td
                  key={ind}
                  className={`${col?.is_fixed ? "fixed-column" : ""}`}>
                  {item?.[`${col?.data_key}`]}
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTable;
