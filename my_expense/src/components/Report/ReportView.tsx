type ReportParams = {
  cols: any[];
  data: any[];
};

const ReportView = ({ cols, data }: ReportParams) => {
  const formatDate = (date: Date) => new Intl.DateTimeFormat("en-GB").format(new Date(date)).replace(/\//g, "-");
  return (
    <div className="table-responsive mt-4 mb-3">
      <table className="table table-bordered">
        <thead>
          <tr className="text-center">
            {cols.map((col) => (
              <th key={col.fieldname}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="text-center">
              {cols.map((col, colIndex) => (
                col.fieldtype === "Date" ? (
                  <td key={colIndex}>
                    {row[col.fieldname] ? formatDate(row[col.fieldname]) : ""}
                  </td>
                ) : (
                <td key={colIndex}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: row[col.fieldname] ?? "",
                    }}
                  />
                </td>
              )))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportView;
