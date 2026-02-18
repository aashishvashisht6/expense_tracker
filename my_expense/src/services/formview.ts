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
    return error?.response?.data?.message || "An error occurred while fetching data" ;
  }
  
};

export const postFormData = async (url: string, data?: {}) => {
  try {
    const result = await axios.post(url, data);
    if (result.data?.message) {
      return result?.data?.message;
    }
    return result?.data;
  } catch (error: any) {
    console.error("Form View Save error:", error);
    return {error: error.response.data.message ? error.response.data.message : error?.response?.data?.exc || "An error occurred while saving data"};
  }
  
};