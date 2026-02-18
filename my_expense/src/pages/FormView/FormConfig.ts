export const formConfig: any = {
  bank_account: {
    title: "Bank Account",
    endpoint: "/api/resource/ET%20Bank%20Account",
    fields: [
      { key: "name", label: "ID", type: "text", hidden: true },
      { key: "account_name", label: "Account Name", type: "text" },
      { key: "user", label: "User", type: "text", readonly: true },
    ],
  },
  expenses: {
    title: "Expenses",
    endpoint: "/api/resource/ET%20Bank%20Transaction",
    fields: [
      { key: "name", label: "ID", type: "text", hidden: true },
      { key: "bank_account", label: "Bank Account", type: "text" },
      { key: "transaction_date", label: "Transaction Date", type: "date" },
      {
        key: "transaction_type",
        label: "Transaction Type",
        type: "select",
        options: ["Expense"],
        readonly: true,
      },
      { key: "amount", label: "Amount", type: "number" },
      { key: "remarks", label: "Remarks", type: "text" },
      { key: "cancelled", label: "Cancelled", type: "number" },
    ],
  },
  income: {
    title: "Income",
    endpoint: "/api/resource/ET%20Bank%20Transaction",
    fields: [
      { key: "name", label: "ID", type: "text", hidden: true },
      { key: "bank_account", label: "Bank Account", type: "text" },
      { key: "transaction_date", label: "Transaction Date", type: "date" },
      {
        key: "transaction_type",
        label: "Transaction Type",
        type: "select",
        options: ["Income"],
        readonly: true,
      },
      { key: "amount", label: "Amount", type: "number" },
      { key: "remarks", label: "Remarks", type: "text" },
      { key: "cancelled", label: "Cancelled", type: "number" },
    ],
  },
};
