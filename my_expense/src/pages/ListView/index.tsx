import { useEffect, useState } from "react";
import { listConfig } from "./ListConfig";
import { fetchListData } from "../../services/listview";
import { useNavigate } from "react-router-dom";

const ListView = ({
  doctype,
}: {
  doctype: "bank_account" | "expenses" | "income";
}) => {
  const [data, setData] = useState<any[]>([]);
  const [limitStart, setLimitStart] = useState<number>(0);

  const navigate = useNavigate();

  const navigateToDetail = (name: string) => {
    navigate(`/${doctype}/${name}`);
  }

  const getListData = () => {
    const url = `${listConfig[doctype].endpoint}`;
    const fields = JSON.stringify(
      listConfig[doctype].columns.map((col) => col.key),
    );
    fetchListData(url, {
      fields,
      filters: listConfig[doctype].filters,
      limit_start: limitStart,
      limit_page_length: 20,
    }).then((resp) => {
      setData(resp.data);
    });
  };

  useEffect(() => {
    // Fetch data from API based on doctype
    setData([]); // Clear previous data when doctype changes
    getListData();
  }, [doctype, limitStart]);
  return (
    <div className="container-fluid">
      <div className="d-flex flex-row justify-content-between mb-3">
        <h4>{listConfig[doctype].title}</h4>
        <button className="btn btn-primary" onClick={() => navigateToDetail("new")}>Add New</button>
      </div>

      <div className="table table-responsive mt-4 mb-3">
        <table className="table table-striped table-bordered ">
          <thead>
            <tr className="text-center">
              {listConfig[doctype].columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? data.map((row: any) => (
              <tr key={row.name} className="text-center">
                {listConfig[doctype].columns.map((col) => (
                    <>
                    {col.type === "Link"? (
                        <td key={col.key} className="text-decoration-underline" style={{cursor: "pointer"}} onClick={() => navigateToDetail(row[col.key])}>{row[col.key]}</td>
                    ) : (
                        <td key={col.key}>{row[col.key]}</td>
                    )}
                    </>
                //   <td key={col.key}>{row[col.key]}</td>
                ))}
              </tr>
            )) : (
                <tr className="text-center">
                  <td colSpan={listConfig[doctype].columns.length}>
                    No data available
                  </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      <ul className="pagination justify-content-between">
        <li className="page-item">
          <button
            className="btn btn-secondary"
            onClick={() => setLimitStart((prev) => Math.max(0, prev - 20))}
          >
            Previous
          </button>
        </li>

        <li className="page-item">
          <button
            className="btn btn-secondary"
            onClick={() => setLimitStart((prev) => prev + 20)}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ListView;
