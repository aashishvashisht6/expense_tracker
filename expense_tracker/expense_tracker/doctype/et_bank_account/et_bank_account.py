# Copyright (c) 2025, Aashish and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ETBankAccount(Document):
	pass


@frappe.whitelist()
def get_bank_balance(account_name):
	"""Return dynamic balance for given bank account."""
	# Example: Replace this with your actual logic
	balance = (
		frappe.db.sql(
			"""
        SELECT SUM(amount)
        FROM `tabET Bank Transaction`
        WHERE account_name = %s
    """,
			(account_name,),
		)[0][0]
		or 0
	)
	return balance
