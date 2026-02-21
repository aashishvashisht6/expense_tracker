import re
import frappe

no_cache = 1

SCRIPT_TAG_PATTERN = re.compile(r"\<script[^<]*\</script\>")
CLOSING_SCRIPT_TAG_PATTERN = re.compile(r"</script\>")

def get_context(context):
    """
    Get context for index.html template.
    Injects Frappe boot data and CSRF token for React app.
    """
    # Get CSRF token first to ensure session is initialized
    csrf_token = frappe.sessions.get_csrf_token()
    frappe.db.commit()  # nosemgrep

    boot = frappe._dict()
    boot["csrf_token"] = csrf_token  # Also set at root level


    context.update({
        "build_version": frappe.utils.get_build_version(),
        "csrf_token": csrf_token,
    })

    context["app_name"] = "ET Expense Tracker"

    return context

@frappe.whitelist()
def get_context_for_dev():
    """
    Get context for index.html template.
    Injects Frappe boot data and CSRF token for React app.
    """
    context = frappe._dict()
    # Get CSRF token first to ensure session is initialized
    csrf_token = frappe.sessions.get_csrf_token()
    frappe.db.commit()  # nosemgrep

    boot = frappe._dict()
    boot["csrf_token"] = csrf_token  # Also set at root level


    context.update({
        "build_version": frappe.utils.get_build_version(),
        "csrf_token": csrf_token,
    })

    context["app_name"] = "ET Expense Tracker"

    return context