let imports_in_progress = [];

frappe.listview_settings['EMD'] = {
	add_fields: ['status'],
	get_indicator: function(doc) {
		
		if(doc.status === "Due"){
            return [__("Due"), "orange", "status,=,Due"];
        }
		if(doc.status === "Refunded"){
            return [__("Refunded"), "green", "status,=,Refunded"];
        }
		if(doc.status === "Paid"){
            return [__("Paid"), "blue", "status,=,Paid"];
        }
		if(doc.status === "Forfeited"){
            return [__("Forfeited"), "red", "status,=,Forfeited"];
        }
	},
	hide_name_column: true
};