# Copyright (c) 2025, Aashish and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.query_builder import Case, Order
from frappe.query_builder import functions as fn
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
		{
			"fieldname": "remarks",
			"label": "Remarks",
			"fieldtype": "Small Text",
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
			"remarks",
			Case().when(bank_txn.transaction_type == "Expense", bank_txn.amount).else_(0).as_("debit"),
			Case().when(bank_txn.transaction_type == "Income", bank_txn.amount).else_(0).as_("credit"),
		)
		.where(bank_txn.cancelled == 0)
		.orderby("transaction_date", order=Order.asc)
	)

	query = get_conditions(filters, query, bank_txn)
	data = query.run(as_dict=True)
	opening_bal = calculate_opening_balance(filters)

	return calculate_balance(data, opening_bal)


def calculate_opening_balance(filters):
	if filters.get("bank_account") and filters.get("from_date"):
		bank_txn = frappe.qb.DocType("ET Bank Transaction")

		opening_query = (
			frappe.qb.from_(bank_txn)
			.select(
				(fn.Sum(Case().when(bank_txn.transaction_type == "Income", bank_txn.amount).else_(0))).as_(
					"total_credit"
				),
				(fn.Sum(Case().when(bank_txn.transaction_type == "Expense", bank_txn.amount).else_(0))).as_(
					"total_debit"
				),
			)
			.where(
				(bank_txn.bank_account == filters.get("bank_account"))
				& (bank_txn.transaction_date < filters.get("from_date"))
				& (bank_txn.cancelled == 0)
			)
		)

		result = opening_query.run(as_dict=True)
		row = result[0] if result else {}
		total_credit = row.get("total_credit") or 0
		total_debit = row.get("total_debit") or 0

		opening_balance = total_credit - total_debit
		return opening_balance
	return 0


def calculate_balance(data, opening_bal):
	balance = opening_bal
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
	data.insert(
		0, {"transaction_type": "<b>Opening</b>", "credit": 0.0, "debit": 0.0, "balance": opening_bal}
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
