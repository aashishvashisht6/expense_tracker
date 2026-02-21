import { useEffect, useState } from "react";
import { fetchAccountBalances } from "../../services/dashboard";
import "./AccountBalance.css"

type BalanceData = {
  account_name: string;
  balance: number;
};

export const AccountBalance = () => {
  const [data, setData] = useState<BalanceData[]>([]);
  const getAccountBalances = () => {
    fetchAccountBalances().then((resp) => {
      if (resp.length > 0) {
        setData(resp);
      }
    });
  };
  useEffect(() => {
    getAccountBalances();
  }, []);
  return (
    <div >
      {data.length > 0 && (
        <>
          <h4 className="mb-3 mt-4">Account Balances</h4>
          <div className="table table-responsive dashboard-table">
            <table className="table table-striped table-bordered">
              <thead>
                <tr className="text-center">
                  <th>Account Name</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row: BalanceData) => (
                    <tr className="text-center">
                        <td>{row.account_name}</td>
                        <td>{row.balance}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
