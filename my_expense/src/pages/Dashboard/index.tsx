import { AccountBalance } from "../../components/Dashboard/AccountBalance";
import ExpenseLineChart from "../../components/Dashboard/ExpenseLineChart";
import FinancePieChart from "../../components/Dashboard/ExpVsIncome";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <AccountBalance/>
        </div>
        <div className="col-sm-12 col-md-6">
          <FinancePieChart/>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <ExpenseLineChart/>
        </div>
      </div>
    </div>
  );
}


export default Dashboard;