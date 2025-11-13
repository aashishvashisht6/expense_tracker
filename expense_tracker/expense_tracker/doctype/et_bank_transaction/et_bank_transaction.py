# Copyright (c) 2025, Aashish and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ETBankTransaction(Document):
	pass


def on_doctype_update() -> None:
	"""Adding Index for Transaction Doctype"""
	frappe.db.add_index("ET Bank Transaction", ["bank_account", "transaction_date", "cancelled"])
