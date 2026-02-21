import DynamicField from "../common/ExpenseField";
import type { formDataProps } from "../../pages/Report";

type FilterProps = {
  formData: formDataProps;
  handleFieldChange: (key: string, value: any) => void;
};

const FiltersView: React.FC<FilterProps> = ({
  formData,
  handleFieldChange
}) => {
  return (
    <>
      <div className="col-sm-6 col-md-6 col-lg-3">
        <DynamicField
          field={{
            key: "bank_account",
            label: "Bank Account",
            type: "link",
            options: "ET Bank Account",
            reqd: true,
          }}
          value={formData.bank_account}
          onChange={handleFieldChange}
        />
      </div>

      <div className="col-sm-6 col-md-6 col-lg-3">
        <DynamicField
          field={{
            key: "from_date",
            label: "From Date",
            type: "date",
            reqd: true,
          }}
          value={formData.from_date}
          onChange={handleFieldChange}
        />
      </div>

      <div className="col-sm-6 col-md-6 col-lg-3">
        <DynamicField
          field={{
            key: "to_date",
            label: "To Date",
            type: "date",
            reqd: true,
          }}
          value={formData.to_date}
          onChange={handleFieldChange}
        />
      </div>

      <div className="col-sm-6 col-md-6 col-lg-3 align-self-center">
        <button className="btn btn-primary btn-md" type="submit" style={{marginTop: "2rem"}}>Generate Report</button>
      </div>
    </>
  );
};

export default FiltersView;
