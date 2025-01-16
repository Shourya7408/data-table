import "./index.css"; // Include custom styles

const CustomTable = ({data,columns}) => {
  return (
    <table className="table table-bordered">
            <thead>
              <tr>
                {columns?.map((item,ind)=><th className={`${item?.is_fixed ? "fixed-column":"" }`}>{item?.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr key={item?.id}>
                    {columns?.map((col,ind)=><td className={`${col?.is_fixed ? "fixed-column":"" }`}>{item?.[`${col?.data_key}`]}</td>)}
                </tr>
              ))}
            </tbody>
    </table>
  );
};

export default CustomTable;
