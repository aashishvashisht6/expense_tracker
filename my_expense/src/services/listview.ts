import axios from "axios";

export const fetchListData = async (url: string, params?: {}) => {
  try {
    const result = await axios.get(url, { params });
    if (result.data?.message) {
      return result?.data?.message;
    }
    return result?.data;
  } catch (error: any) {
    console.error("List View error:", error);
    return error?.response?.data?.message || "An error occurred while fetching data" ;
  }
  
};