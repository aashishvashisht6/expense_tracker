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
        reqd:true,
        default: "Expense",
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
        reqd:true,
        default: "Income",
      },
      { key: "amount", label: "Amount", type: "number", reqd:true  },
      { key: "remarks", label: "Remarks", type: "text", reqd:true  },
      { key: "cancelled", label: "Cancelled", type: "checkbox" },
    ],
  },
  bank_transfer: {
    title: "Bank Transfer",
    endpoint: "/api/resource/ET%20Bank%20Transaction",
    fields: [
      { key: "name", label: "ID", type: "text", hidden: true },
      { key: "bank_account", label: "From Bank Account", type: "link", reqd:true, options: "ET Bank Account"  },
      { key: "to_bank_account", label: "To Bank Account", type: "link", reqd:true, options: "ET Bank Account"  },
      { key: "transaction_date", label: "Transaction Date", type: "date", reqd:true  },
      {
        key: "transaction_type",
        label: "Transaction Type",
        type: "select",
        options: ["Bank Transfer"],
        reqd:true,
        default: "Bank Transfer",
      },
      { key: "amount", label: "Amount", type: "number", reqd:true  },
      { key: "remarks", label: "Remarks", type: "text", reqd:true  },
      { key: "cancelled", label: "Cancelled", type: "checkbox" },
    ],
  },
  
};
