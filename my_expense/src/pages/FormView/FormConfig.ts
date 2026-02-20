export const formConfig: any = {
  bank_account: {
    title: "Bank Account",
    endpoint: "/api/resource/ET%20Bank%20Account",
    fields: [
      { key: "name", label: "ID", type: "text", hidden: true },
      { key: "account_name", label: "Account Name", type: "text", reqd:true },
      { key: "user", label: "User", type: "text", readonly: true, reqd:true },
    ],
  },
  expenses: {
    title: "Expenses",
    endpoint: "/api/resource/ET%20Bank%20Transaction",
    fields: [
      { key: "name", label: "ID", type: "text", hidden: true },
      { key: "bank_account", label: "Bank Account", type: "link", reqd:true, options: "ET Bank Account" },
      { key: "transaction_date", label: "Transaction Date", type: "date", reqd:true  },
      {
        key: "transaction_type",
        label: "Transaction Type",
        type: "select",
        options: ["Expense"],
        reqd:true 
      },
      { key: "amount", label: "Amount", type: "number", reqd:true  },
      { key: "remarks", label: "Remarks", type: "text", reqd:true  },
      { key: "cancelled", label: "Cancelled", type: "checkbox" },
    ],
  },
  income: {
    title: "Income",
    endpoint: "/api/resource/ET%20Bank%20Transaction",
    fields: [
      { key: "name", label: "ID", type: "text", hidden: true },
      { key: "bank_account", label: "Bank Account", type: "link", reqd:true, options: "ET Bank Account"  },
      { key: "transaction_date", label: "Transaction Date", type: "date", reqd:true  },
      {
        key: "transaction_type",
        label: "Transaction Type",
        type: "select",
        options: ["Income"],
        reqd:true 
      },
      { key: "amount", label: "Amount", type: "number", reqd:true  },
      { key: "remarks", label: "Remarks", type: "text", reqd:true  },
      { key: "cancelled", label: "Cancelled", type: "checkbox" },
    ],
  },
};
