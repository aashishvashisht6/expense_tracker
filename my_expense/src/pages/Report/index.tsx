import { useState } from "react";
import FiltersView from "../../components/Report/FiltersView";
import ReportView from "../../components/Report/ReportView";
import { fetchReport } from "../../services/report";

export interface formDataProps {
  bank_account: string;
  from_date: string;
  to_date: string;
}

const Report = () => {
  const [formData, setFormData] = useState<formDataProps>({
    bank_account: "",
    from_date: "",
    to_date: "",
  });

  const [reportData, setReportData] = useState<any[]>([])
  const [reportCols, setReportCols] = useState<any[]>([])

  const handleFieldChange = (key: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const generateReport = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = {
      report_name: "Bank Transaction Report",
      filters: JSON.stringify({ ...formData }),
      ignore_prepared_report: false,
      are_default_filters: false,
    };
    fetchReport(params).then(resp => {
        if(resp.columns.length > 0){
            setReportCols(resp.columns)
            setReportData(resp.result)
        }
    })
  };

  return (
    <div>
      <h1>Reports</h1>
      <form onSubmit={generateReport}>
        <div className="row">
          <FiltersView
            formData={formData}
            handleFieldChange={handleFieldChange}
          />
        </div>
      </form>
      <div className="row">
        <ReportView cols={reportCols} data={reportData}/>
      </div>
    </div>
  );
};

export default Report;
