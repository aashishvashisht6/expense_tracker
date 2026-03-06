import frappe
from frappe.utils import getdate, today, get_first_day, get_last_day
from frappe.query_builder import Case
from frappe.query_builder.functions import Sum


@frappe.whitelist(methods=["GET"])
def get_balances():
    data = []
    for account in frappe.get_list("ET Bank Account"):
        acc_doc = frappe.get_doc("ET Bank Account", account.name)
        balance = acc_doc.get_bank_balance()
        data.append({"account_name": account.name, "balance": balance})
    return data


@frappe.whitelist(methods=["GET"])
def expense_income_data():
    first_day_month = get_first_day(today())
    last_day_month = get_last_day(today())

    accounts = [acc.name for acc in frappe.get_list("ET Bank Account")]

    txn = frappe.qb.DocType("ET Bank Transaction")
    query = (
        frappe.qb.from_(txn)
        .where(txn.bank_account.isin(accounts))
        .where(txn.cancelled == 0)
        .where(txn.transaction_date >= first_day_month)
        .where(txn.transaction_date <= last_day_month)
        .where(txn.transaction_type.isin(["Expense", "Income"]))
        .select(
            Sum(txn.amount).as_("balance"), txn.transaction_type
        ).groupby(txn.transaction_type)
    )

    result = query.run(as_dict=1)
    income, expense = 0.0, 0.0

    for row in result:
        if row.transaction_type == "Expense":
            expense += row.balance
        elif row.transaction_type == "Income":
            income += row.balance

    return {
        "labels": ["Income", "Expense"],
        "datasets": [
            {
                "label": "Amount",
                "data": [income, expense],
                "backgroundColor": [
                    "#4CAF50",
                    "#F44336"
                ],
                "borderWidth": 1,
            },
        ],
    }


@frappe.whitelist(methods=["GET"])
def expense_datewise_data():
    first_day_month = get_first_day(today())
    last_day_month = get_last_day(today())

    accounts = [acc.name for acc in frappe.get_list("ET Bank Account")]

    txn = frappe.qb.DocType("ET Bank Transaction")
    query = (
        frappe.qb.from_(txn)
        .where(txn.bank_account.isin(accounts))
        .where(txn.cancelled == 0)
        .where(txn.transaction_type == "Expense")
        .where(txn.transaction_date >= first_day_month)
        .where(txn.transaction_date <= last_day_month)
        .select(
            Sum(txn.amount).as_("balance"), txn.transaction_date
        ).groupby(txn.transaction_date)
    )

    result = query.run(as_dict=1)
    data, labels = [], []

    for row in result:
        data.append(row.balance)
        labels.append(row.transaction_date)

    return {
        "labels": labels,
        "datasets": [
            {
                "label": "Expense",
                "data": data,
                "borderColor": "#F44336",
                "backgroundColor": "rgba(244, 67, 54, 0.2)",
                "tension": "0.3",
                "fill": True,
                "pointRadius": 4,
            },
        ],
    }
