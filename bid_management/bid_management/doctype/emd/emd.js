// Copyright (c) 2024, Himanshu Shivhare and contributors
// For license information, please see license.txt

// frappe.ui.form.on("EMD", {
// 	refresh(frm) {

// 	},
// });

// Copyright (c) 2023, FinByz and contributors
// For license information, please see license.txt

frappe.ui.form.on('EMD', {
	posting_date: function(frm){
		cur_frm.set_value("reference_date", frm.doc.posting_date)
	},
	onload: function(frm){
		cur_frm.set_value("reference_date", frm.doc.posting_date)
	},
	send_weekly_reminder: function(frm){
		cur_frm.set_value("receipient", frm.doc.contact_email)
		cur_frm.set_value("email_template", "EMD Reminder")
	},
	cancel_return: function(frm){
		frm.call({
			doc: frm.doc,
			method: "cancel_return",
			callback: () => {
				window.location.reload();
			}
		})
	},
	mode_of_payment: function(frm){
		frappe.call({
			// doc: frm.doc.mode_of_payment,
			method: "bid_management.doctype.emd.emd.get_bank_account",
			args: {
				mode_of_payment: frm.doc.mode_of_payment 
			},
			callback: function(r){
				if(r.message){
					cur_frm.set_value("bank_account", r.message)
				}
			}
		})
	},
	cancel_forfeited: function(frm){
		frm.call({
			doc: frm.doc,
			method: "cancel_forfeited",
			callback: () => {
				window.location.reload();
			}
		})
	},
	refresh: function(frm) {
		frm.set_query('customer', function(doc) {
			return {
				filters: {
					"disabled": 0,
				}
			};
		});
		// frm.set_query('deposit_account', function(doc) {
		// 	return {
		// 		filters: {
		// 			"is_group": 0,
				
		// 		}
		// 	};
		// });
		// frm.set_query('bank_account', function(doc) {
		// 	return {
		// 		filters: {
		// 			"is_group": 0,
				
		// 		}
		// 	};
		// });
		// frm.set_query('return_account', function(doc) {
		// 	return {
		// 		filters: {
		// 			"is_group": 0,
				
		// 		}
		// 	};
		// });
		// frm.set_query('interest_account', function(doc) {
		// 	return {
		// 		filters: {
		// 			"is_group": 0,
				
		// 		}
		// 	};
		// });
		
		if (frm.doc.return_journal_entry) {
			cur_frm.set_df_property("return_account", "read_only", 1);
			cur_frm.set_df_property("interest_amount", "read_only", 1);
			cur_frm.set_df_property("interest_account", "read_only", 1);
			cur_frm.set_df_property("return_date", "read_only", 1);
		}
		else {
			cur_frm.set_df_property("return_account", "read_only", 0);
			cur_frm.set_df_property("interest_amount", "read_only", 0);
			cur_frm.set_df_property("interest_account", "read_only", 0);
			cur_frm.set_df_property("return_date", "read_only", 0);
		}
		if(!frm.doc.__islocal && frm.doc.return_journal_entry){
			// frm.set_df_property('returned', 'read_only',1);
			frm.set_df_property('return_account', 'read_only',1);
			frm.set_df_property('return_date', 'read_only',1);
		}
		if(frm.doc.forfeited == 1){
			cur_frm.set_df_property("returned", "hidden", 1);
		}
		if(frm.doc.returned == 1){
			cur_frm.set_df_property("forfeited", "hidden", 1);
		}
		if(frm.doc.status == "Forfeited"){
			cur_frm.set_df_property("forfeited", "read_only", 1);
		}
		if(frm.doc.status == "Refunded"){
			cur_frm.set_df_property("returned", "read_only", 1);
		}
		if(frm.doc.is_opening == "Yes"){
			cur_frm.set_df_property("bank_account", "hidden", 1);
		}
		
	},

	customer:function(frm){
		frappe.call({
			method:"bid_management.api.get_party_details",
			args:{
				party:frm.doc.customer,
				party_type:"Customer"
			},
			callback:function(r){
				if(r.message){
					frm.set_value('contact_person',r.message.contact_person)
					frm.set_value('contact_display',r.message.contact_display)
					frm.set_value('contact_mobile',r.message.contact_mobile)
					frm.set_value('contact_email',r.message.contact_email)
					frm.set_value('address_display',r.message.address_display)
					frm.set_value('address',r.message.customer_address)
				}
			}
				
		})
	},

	forfeited:function(frm){
		frappe.db.get_value("Company", frm.doc.company, 'abbr', function(r) {
			if(r.abbr){
				cur_frm.set_value("write_off_account", "Write Off - " + r.abbr)
			}
		})
		
	
	},



	address: function(frm){
		if(cur_frm.doc.address) {
			return frappe.call({
				method: "frappe.contacts.doctype.address.address.get_address_display",
				args: {
					"address_dict": frm.doc.address
				},
				callback: function(r) {
					if (r.message) {
						frm.set_value("address_display", r.message);
						}
				}
			});
		}
	},

	email_template:function(frm){
		frappe.call({
			method:"frappe.email.doctype.email_template.email_template.get_email_template",
			args:{
				template_name:frm.doc.email_template,
				doc:frm.doc
			},
			callback: function(r){
				
				frm.set_value("invitation_message", r.message.message)

			}
		})
	},

	
});

// Contact Query Filter
cur_frm.set_query("contact_person", function() {	
	return {
		query: "frappe.contacts.doctype.contact.contact.contact_query",
		filters: { link_doctype: "Customer", link_name: cur_frm.doc.customer } 
	};

});

// Address Filter
cur_frm.set_query("address", function() {
	return {
		query: "frappe.contacts.doctype.address.address.address_query",
		filters: { link_doctype: "Customer", link_name: cur_frm.doc.customer} 
	};

});

cur_frm.fields_dict.bank_account.get_query = function(doc) {
return {
	filters: {
		"account_type": "Bank",
		"company": doc.company,
		"is_group": 0
	}
}
};

cur_frm.fields_dict.cost_center.get_query = function(doc) {
	return {
		filters: {
			"company": doc.company
		}
	}
	};



cur_frm.fields_dict.deposit_account.get_query = function(doc) {
	return {
		filters: {
			
			"company": doc.company
		}
	}
	};

cur_frm.fields_dict.return_account.get_query = function(doc) {
return {
	filters: {
		"company": doc.company,
		"account_type": "Bank",
		"is_group": 0
	}
}
};

cur_frm.fields_dict.expense_account.get_query = function(doc) {
return {
	filters: {
		"company": doc.company,
		"account_type": "Expense Account"
	}
}
};
cur_frm.fields_dict.interest_account.get_query = function(doc) {
return {
	filters: {
		"company": doc.company,
	"account_type": "Income Account"
	}
}
};



