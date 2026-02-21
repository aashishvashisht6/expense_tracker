type ReportParams = {
  cols: any[];
  data: any[];
};

const ReportView = ({ cols, data }: ReportParams) => {
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
                <td key={colIndex}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: row[col.fieldname] ?? "",
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportView;
