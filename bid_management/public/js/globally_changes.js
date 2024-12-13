frappe.router.on("change", page_changed);
function page_changed(event) {
    // Waiting for the page to load completely
    frappe.after_ajax(function () {
        var route = frappe.get_route();

        if (route[0] === "Form") {
            var doctype = route[1];

            // Attach refresh handler to ensure it works on first load and reload
            frappe.ui.form.on(doctype, {
                refresh: function (frm) {
                    console.log("Doctype = " + frm.doctype);

                    // Skip for "Administrator" user or "System Manager" role
                    if (frappe.session.user === "Administrator" || frappe.user_roles.includes("System Manager")) {
                        console.log("Skipped for Administrator or System Manager role");
                        return;
                    }

                    // Remove "Duplicate" menu option for other users
                    frm.page.menu
                        .find(`[data-label="${__("Duplicate")}"]`)
                        .parent()
                        .parent()
                        .remove();
                }
            });

            // Trigger refresh manually for the first load
            if (cur_frm && cur_frm.doctype === doctype && cur_frm.doc) {
                cur_frm.refresh();
            }
        }
    });
}
