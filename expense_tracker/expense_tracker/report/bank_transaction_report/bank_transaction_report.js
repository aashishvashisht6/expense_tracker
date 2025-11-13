// Copyright (c) 2025, Aashish and contributors
// For license information, please see license.txt

frappe.query_reports["Bank Transaction Report"] = {
	filters: [
		{
			fieldname: "bank_account",
			label: __("Bank Account"),
			fieldtype: "Link",
			options: "ET Bank Account",
			reqd: 1,
		},
		{
			fieldname: "from_date",
			label: __("From Date"),
			fieldtype: "Date",
			reqd: 1,
			default: frappe.datetime.month_start(),
		},
		{
			fieldname: "to_date",
			label: __("To Date"),
			fieldtype: "Date",
			reqd: 1,
			default: frappe.datetime.get_today(),
		},
	],
};
