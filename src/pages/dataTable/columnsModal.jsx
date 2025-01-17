import { useEffect, useState } from "react";

const ColumnsModal = ({
  closeModal,
  showModal = false,
  columns = [],
  setColumns,
}) => {
  const [tempColumns, setTempColumns] = useState([]);

  const toggleColumnVisibility = (index) => {
    const updatedColumns = [...tempColumns];
    if (!updatedColumns[index].is_fixed) {
      updatedColumns[index].is_visible = !updatedColumns[index].is_visible;
      setTempColumns(updatedColumns);
    }
  };
  const saveChanges = () => {
    console.log("hiiiii");
    setColumns([...tempColumns]);
    closeModal();
  };
  useEffect(() => {
    console.log("pppppppppppp", showModal);
    if (showModal && tempColumns?.length == 0) {
      setTempColumns(columns);
    }
  }, [showModal]);
  return (
<>{showModal ?     <>
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1040 }}
        onClick={closeModal}></div>

      <div
        className="modal fade show d-block"
        style={{ zIndex: 1050 }}
        onClick={closeModal}>
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Configure Columns</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <ul className="list-group">
                {tempColumns?.map((column, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex gap-2 align-items-center">
                    <input
                      disabled={column.is_fixed}
                      type="checkbox"
                      checked={column.is_visible}
                      onChange={() => toggleColumnVisibility(index)}
                    />
                    <span>{column.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveChanges}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </> :<></>}</>
  );
};
export default ColumnsModal;
