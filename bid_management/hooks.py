app_name = "bid_management"
app_title = "Bid Management"
app_publisher = "Himanshu Shivhare"
app_description = "Tender/Bid Management App"
app_email = "himanshushivhare047@gmail.com"
app_license = "mit"
# required_apps = []

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/bid_management/css/bid_management.css"
# app_include_js = "/assets/bid_management/js/bid_management.js"

# include js, css files in header of web template
# web_include_css = "/assets/bid_management/css/bid_management.css"
# web_include_js = "/assets/bid_management/js/bid_management.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "bid_management/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}
doctype_list_js = {"EMD" : "bid_management/emd_management/doctype/emd/emd_list.js"}
doctype_js = {"Journal Entry": "public/js/journal_entry.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "bid_management/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "bid_management.utils.jinja_methods",
# 	"filters": "bid_management.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "bid_management.install.before_install"
# after_install = "bid_management.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "bid_management.uninstall.before_uninstall"
# after_uninstall = "bid_management.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "bid_management.utils.before_app_install"
# after_app_install = "bid_management.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "bid_management.utils.before_app_uninstall"
# after_app_uninstall = "bid_management.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "bid_management.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }
doc_events = {
	
	# "EMD": {"on_update_after_submit": "bid_management.emd_management.doctype.emd.emd.on_update_after_submit"},
	"Journal Entry":
	{
		"on_cancel": "bid_management.emd_management.doc_events.journal_entry.on_cancel"
	},
	"EMD":
	{
		"validate":"bid_management.emd_management.doctype.emd.emd.validate"
	},
     "Project": {
        "after_insert": "bid_management.bid_management.doctype.tender.tender.update_tender_with_project"
    }	
}


# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"bid_management.tasks.all"
# 	],
# 	"daily": [
# 		"bid_management.tasks.daily"
# 	],
# 	"hourly": [
# 		"bid_management.tasks.hourly"
# 	],
# 	"weekly": [
# 		"bid_management.tasks.weekly"
# 	],
# 	"monthly": [
# 		"bid_management.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "bid_management.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "bid_management.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "bid_management.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["bid_management.utils.before_request"]
# after_request = ["bid_management.utils.after_request"]

# Job Events
# ----------
# before_job = ["bid_management.utils.before_job"]
# after_job = ["bid_management.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"bid_management.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }
# doc_events = {
#     "Sales Order": {
#         "on_update": "bid_management.api.send_data_to_node_app"
#     }
# }

fixtures = [
       {
        "dt": "Property Setter", 
        "filters":[["name", "in", ['EMD-payment_mode-hidden','EMD-payment_mode-reqd','EMD-receipient-fetch_from','EMD-naming_series-options','EMD-cost_center-fetch_from', 'EMD-write_off_account-allow_on_submit', 'EMD-bank_account-depends_on', 'EMD-cancel_forfeited-depends_on', 'EMD-cost_center-fetch_if_empty', 'EMD-reference_date-default', 'Journal Entry-voucher_type-options']]]
      },
]
