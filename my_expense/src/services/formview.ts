import axios from "axios";

export const fetchFormData = async (url: string, params?: {}) => {
  try {
    const result = await axios.get(url, { params });
    if (result.data?.message) {
      return result?.data?.message;
    }
    return result?.data;
  } catch (error: any) {
    console.error("Form View error:", error);
    return (
      error?.response?.data?.message || "An error occurred while fetching data"
    );
  }
};

const headers= {
      "Content-Type": "application/json",
      "X-Frappe-CSRF-Token": (window as any).csrf_token,
}

export const postFormData = async (url: string, data: any) => {
  try {
    let result: any = {};
    if (data?.name) {
      result = await axios.put(url, data, {headers});
    } else {
      result = await axios.post(url, data, {headers});
    }
    if (result.data?.message) {
      return result?.data?.message;
    }
    return result?.data;
  } catch (error: any) {
    console.error("Form View Save error:", error);
    return {
      error: error.response.data.message
        ? error.response.data.message
        : error?.response?.data?.exception || "An error occurred while saving data",
    };
  }
};
