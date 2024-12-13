

frappe.ui.form.on('Tender', {
    submission_deadline: function (frm) {
        calculate_validity_end_date(frm);
    },
    tender_validity: function (frm) {
        calculate_validity_end_date(frm);
    },
    onload: function(frm) {
        // Set dynamic filters
        
            frm.set_query('contact_person', function() {
                return {
                    filters: {
                        link_doctype: 'Customer',
                        link_name: frm.doc.organization
                    }
                };
            });

            frm.set_query('sales_order', function() {
                return {
                    filters: {
                        customer: frm.doc.organization,
                        docstatus: 1
                    }
                };
            });

            frm.set_query('consignee_address', 'items', function(doc, cdt, cdn) {
                return {
                    filters: {
                        link_doctype: "Customer",
                        link_name: frm.doc.organization
                    }
                };
            });

            frm.set_query('reporting_officer', 'items', function(doc, cdt, cdn) {
                return {
                    filters: {
                        link_doctype: "Customer",
                        link_name: frm.doc.organization
                    }
                };
            });
        
    },

    refresh: function(frm) {
        if (frm.doc.docstatus === 0 && !frm.doc.__islocal) {
            // Add custom buttons
            frm.add_custom_button(__('EMD'), () => frm.events.make_emd(frm), __('Create'));
            frm.add_custom_button(__('Quotation'), () => frm.events.make_quotation(frm), __('Create'));
            frm.add_custom_button(__('Sales Order'), () => frm.events.make_sales_order(frm), __('Create'));
            frm.add_custom_button(__('Project'), () => frm.events.make_project(frm), __('Create'));
            frm.add_custom_button(__('Bank Guarantee'), () => frm.events.make_bank_guarantee(frm), __('Create'));

            // Set buttons group as primary
            frm.page.set_inner_btn_group_as_primary(__('Create'));
        }
    },

    make_emd: function(frm) {
        frappe.model.open_mapped_doc({
            method: "bid_management.bid_management.doctype.tender.tender.make_emd",
            frm: frm
        });
    },

    make_quotation: function(frm) {
        frappe.model.open_mapped_doc({
            method: "bid_management.bid_management.doctype.tender.tender.make_quotation",
            frm: frm
        });
    },

    make_sales_order: function(frm) {
        frappe.model.open_mapped_doc({
            method: "bid_management.bid_management.doctype.tender.tender.make_sales_order",
            frm: frm
        });
    },

    make_project: function(frm) {
        frappe.model.open_mapped_doc({
            method: "bid_management.bid_management.doctype.tender.tender.make_project",
            frm: frm
        });
    },

    make_bank_guarantee: function(frm) {
        frappe.model.open_mapped_doc({
            method: "bid_management.bid_management.doctype.tender.tender.make_bank_guarantee",
            frm: frm
        });
    }
});

frappe.ui.form.on('Tender Item', {
    consignee_address: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        if (row.consignee_address) {
            frappe.call({
                method: "frappe.contacts.doctype.address.address.get_address_display",
                args: { address_dict: row.consignee_address },
                callback: function(r) {
                    if (r.message) {
                        frappe.model.set_value(cdt, cdn, 'address_display', r.message);
                    } else {
                        frappe.msgprint(__('Address display not found.'));
                    }
                },
                error: function(err) {
                    frappe.msgprint(__('Error fetching address: {0}', [err.message]));
                }
            });
        } else {
            frappe.model.set_value(cdt, cdn, 'address_display', '');
        }
    }
});

function calculate_validity_end_date(frm) {
    if (frm.doc.submission_deadline && frm.doc.tender_validity) {
        const submission_deadline = frappe.datetime.str_to_obj(frm.doc.submission_deadline);
        const validity_end_date = frappe.datetime.add_days(submission_deadline, frm.doc.tender_validity);
        frm.set_value('validity_end_date', frappe.datetime.obj_to_str(validity_end_date));
    } else {
        frm.set_value('validity_end_date', null); 
    }
}
