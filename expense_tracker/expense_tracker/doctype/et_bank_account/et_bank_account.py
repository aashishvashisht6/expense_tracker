# Copyright (c) 2025, Aashish and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.query_builder import Case
from frappe.query_builder.functions import Sum


class ETBankAccount(Document):
	def validate(self):
		if not self.user:
			self.user = frappe.session.user
	
	def on_update(self):
		# First Check if permission exist if not Update Role Permissions for the user
		perms = frappe.permissions.get_user_permissions(self.user)
		if not perms.get(self.doctype) or self.name not in perms.get(self.doctype):
			frappe.permissions.add_user_permission(self.doctype, self.name, self.user)

	@frappe.whitelist()
	def get_bank_balance(self):
		"""Return dynamic balance for given bank account."""
		txn = frappe.qb.DocType("ET Bank Transaction")
		query = (
			frappe.qb.from_(txn)
			.where(txn.bank_account == self.name)
			.where(txn.cancelled == 0)
			.select(
				Sum(
					Case().when(txn.transaction_type == "Expense", -txn.amount)
					.when(txn.transaction_type == "Income", txn.amount).else_(0)
				).as_("balance")
			))
		result = query.run(as_dict=1)

		return result[0].get("balance") if result else 0
