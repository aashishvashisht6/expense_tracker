# Copyright (c) 2025, Aashish and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.query_builder import Case, Order
from frappe.utils import getdate


def execute(filters=None):
	columns, data = [], []
	columns = get_columns()
	data = get_data(filters)
	return columns, data


def get_columns():
	columns = [
		{
			"fieldname": "bank_account",
			"label": "Bank Account",
			"fieldtype": "Link",
			"options": "ET Bank Account",
			"width": 200,
		},
		{
			"fieldname": "transaction_date",
			"label": "Transaction Date",
			"fieldtype": "Date",
			"width": 150,
		},
		{
			"fieldname": "transaction_type",
			"label": "Transaction Type",
			"fieldtype": "Data",
			"width": 150,
		},
		{
			"fieldname": "credit",
			"label": "Credit",
			"fieldtype": "Currency",
			"width": 120,
		},
		{
			"fieldname": "debit",
			"label": "Debit",
			"fieldtype": "Currency",
			"width": 120,
		},
		{
			"fieldname": "balance",
			"label": "Balance",
			"fieldtype": "Currency",
			"width": 120,
		},
	]
	return columns


def get_data(filters):
	bank_txn = frappe.qb.DocType("ET Bank Transaction")
	query = (
		frappe.qb.from_(bank_txn)
		.select(
			"bank_account",
			"transaction_date",
			"transaction_type",
			Case().when(bank_txn.transaction_type == "Expense", bank_txn.amount).else_(0).as_("debit"),
			Case().when(bank_txn.transaction_type == "Income", bank_txn.amount).else_(0).as_("credit"),
		)
		.where(bank_txn.cancelled == 0)
		.orderby("transaction_date", order=Order.asc)
	)

	query = get_conditions(filters, query, bank_txn)
	data = query.run(as_dict=True)

	return calculate_balance(data)


def calculate_balance(data):
	balance = 0.0
	total_debit = 0.0
	total_credit = 0.0
	for row in data:
		total_credit += row.credit
		total_debit += row.debit
		row.balance = balance + row.credit - row.debit
		balance = row.balance

	data.append(
		{"transaction_type": "<b>Total</b>", "credit": total_credit, "debit": total_debit, "balance": balance}
	)
	return data


def get_conditions(filters, query, bank_txn):
	if getdate(filters.get("from_date")) > getdate(filters.get("to_date")):
		frappe.throw(_("From Date cannot be greater than To Date"))

	if filters.get("bank_account"):
		query = query.where(bank_txn.bank_account == filters.get("bank_account"))
	if filters.get("from_date"):
		query = query.where(bank_txn.transaction_date >= filters.get("from_date"))
	if filters.get("to_date"):
		query = query.where(bank_txn.transaction_date <= filters.get("to_date"))
	return query
