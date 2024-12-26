import frappe
from frappe.custom.doctype.property_setter.property_setter import make_property_setter
def execute():
    create_custom_field()

def create_custom_field():
   if frappe.db.exists("Property Setter", {"doc_type": "Journal Entry", "property": "options"}) :
       doc=frappe.get_doc("Property Setter","Journal Entry-voucher_type-options")
       if "EMD Entry" not in doc.value:
           doc.value+="\nEMD Entry"
   else:
       data=frappe.db.get_value("DocField", {"fieldname":"voucher_type","fieldtype":"Select"},['options'])
       if "EMD Entry" not in data:
           data+="\EMD Entry"
       make_property_setter("Journal Entry","voucher_type","options",data)