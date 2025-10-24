import axios from "axios";

export const login = async (email: string, pwd: string) => {
  const result = await axios.post("/api/method/login", { usr: email, pwd });
  if (result.data?.message) {
    return result?.data?.message;
  }
  console.error(result?.data);
};

export const getProfile = async () => {
  try {
    const result = await axios.get("/api/method/frappe.auth.get_logged_user");
    if (result.data?.message) {
      return result?.data;
    }
    return result?.data;
  } catch (error:any) {
    return {error: error?.response?.data?.exception};
  }
};
