import axios from "axios";

export const fetchReport = async (params: {}) => {
  try {
    const result = await axios.get("/api/method/frappe.desk.query_report.run", {
      params,
    });
    if (result.data?.message) {
      return result?.data?.message;
    }
    return result?.data;
  } catch (error: any) {
    console.error("Report View error:", error);
    return (
      error?.response?.data?.message || "An error occurred while fetching data"
    );
  }
};
