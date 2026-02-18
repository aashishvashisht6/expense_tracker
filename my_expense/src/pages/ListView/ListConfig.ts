export const listConfig = {
  bank_account: {
    title: "Bank Account",
    endpoint: "/api/resource/ET%20Bank%20Account",
    filters: "{}",
    columns: [
      { key: "name", label: "ID", type: "Link" },
      { key: "account_name", label: "Account Name", type: "text" },
      { key: "user", label: "User", type: "text", readonly: true },
    ],
  },

  expenses: {
    title: "Expenses",
    endpoint: `/api/resource/ET%20Bank%20Transaction`,
    filters: JSON.stringify({ transaction_type: "Expense" }),
    columns: [
      { key: "name", label: "ID", type: "Link" },
      { key: "bank_account", label: "Bank Account", type: "text" },
      { key: "transaction_date", label: "Transaction Date", type: "date" },
      { key: "amount", label: "Amount", type: "number" },
      { key: "cancelled", label: "Cancelled", type: "checkbox" },
    ],
  },

  income: {
    title: "Income",
    endpoint: `/api/resource/ET%20Bank%20Transaction`,
    filters: JSON.stringify({ transaction_type: "Income" }),
    columns: [
      { key: "name", label: "ID", type: "Link" },
      { key: "bank_account", label: "Bank Account", type: "text" },
      { key: "transaction_date", label: "Transaction Date", type: "date" },
      { key: "amount", label: "Amount", type: "number" },
      { key: "cancelled", label: "Cancelled", type: "checkbox" },
    ],
  },
};
