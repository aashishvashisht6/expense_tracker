import axios from "axios";

export const fetchAccountBalances = async () => {
  try {
    const result = await axios.get("/api/method/expense_tracker.api.dashboard.bank_account.get_balances");
    if (result.data?.message) {
      return result?.data?.message;
    }
    return result?.data;
  } catch (error: any) {
    console.error("List View error:", error);
    return error?.response?.data?.message || "An error occurred while fetching data" ;
  }
  
};


export const fetchExpenseIncomeChart = async () => {
  try {
    const result = await axios.get("/api/method/expense_tracker.api.dashboard.bank_account.expense_income_data");
    if (result.data?.message) {
      return result?.data?.message;
    }
    return result?.data;
  } catch (error: any) {
    console.error("List View error:", error);
    return error?.response?.data?.message || "An error occurred while fetching data" ;
  }
  
};


export const fetchExpenseDateWise = async () => {
  try {
    const result = await axios.get("/api/method/expense_tracker.api.dashboard.bank_account.expense_datewise_data");
    if (result.data?.message) {
      return result?.data?.message;
    }
    return result?.data;
  } catch (error: any) {
    console.error("List View error:", error);
    return error?.response?.data?.message || "An error occurred while fetching data" ;
  }
  
};