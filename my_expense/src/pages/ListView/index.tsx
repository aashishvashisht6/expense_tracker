
import { useEffect, useState } from "react";
import { listConfig } from "./ListConfig";
import { fetchListData } from "../../services/listview";

const ListView = ({ doctype }: { doctype: 'bank_account' | 'expenses' | 'income' }) => {
    const [limitStart, setLimitStart] = useState(0);
    
    const getListData = () => {
        const url = `${listConfig[doctype].endpoint}?limit_start=${limitStart}&limit_page_length=20`;
        fetchListData(url).then((data) => {
            console.log("Fetched List Data:", data);
        })
    }

    useEffect(() => {
        // Fetch data from API based on doctype
        getListData();
    }, [doctype])
  return (
    <div className="container-fluid">
      <div className="d-flex flex-row justify-content-between mb-3">
        <h4>{listConfig[doctype].title}</h4>
        <button className="btn btn-primary">Add New</button>
      </div>

      <div className="table table-responsive mt-4">
        <table className="table table-striped table-bordered ">
          <thead>
            <tr className="text-center">
            {listConfig[doctype].columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            </tr>
          </thead>

          <tbody>
            <tr className="text-center">
              <td>1</td>
              <td>Groceries</td>
              <td>User</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListView;
