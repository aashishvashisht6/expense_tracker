export const listConfig = {
  bank_account: {
    title: "Bank Account",
    endpoint: "/api/resource/ET%20Bank%20Account",
    columns: [
      { key: "name", label: "ID" },
      { key: "account_name", label: "Account Name" },
      { key: "user", label: "User" },
    ],
  },

  expenses: {
    title: "Expenses",
    endpoint: "/api/resource/ET Bank Transaction?transaction_type=Expense",
    columns: [
      { key: "name", label: "ID" },
      { key: "bank_account", label: "Bank Account" },
      { key: "transaction_date", label: "Transaction Date", type: "date" },
      { key: "amount", label: "Amount", type: "number" },
      { key: "cancelled", label: "Cancelled", type: "check" },
    ],
  },

  income: {
    title: "Income",
    endpoint: "/api/resource/ET Bank Transaction?transaction_type=Income",
    columns: [
      { key: "name", label: "ID" },
      { key: "bank_account", label: "Bank Account" },
      { key: "transaction_date", label: "Transaction Date", type: "date" },
      { key: "amount", label: "Amount", type: "number" },
      { key: "cancelled", label: "Cancelled", type: "check" },
    ],
  },
};
