import frappe

def execute():
    create_email_template_for_emd()

def create_email_template_for_emd():
	et=frappe.new_doc("Email Template")
	et.name="Testing"
	et.subject="Refund of EMD"
	et.use_html==1	
	et.response_html="""
	Dear Sir<br><br>
			May we invite your kind immediate attention to our following E.M.D./s which may please be refunded in  case the tender/s have been finalised.<br><br>

			<div>
				<table border="1" cellspacing="0" cellpadding="0" width="100%" align="center">
					<thead>
						<tr>
							<td align="center" width="12%">Tender No</td>
							<td align="center" width="10%">Due Date</td>
							<td align="center" width="10%">EMD Amount</td>
							<td align="center" width="10%">Pay Mode</td>
							<td align="center" width="10%">Inst. No</td>
							<td align="center" width="15%">Bank Name</td>
							<td align="center" width="15%">Tender Name</td>
						</tr>
						<tr>
							<td><p>{{tender_no}}</p></td>
							<td><p>{{frappe.format_value(due_date, dict(fieldtype='Date'))}}</p></td>
							<td><p>{{frappe.format_value(amount, dict(fieldtype='Currency'))}}</p></td>
							<td><p>{{payment_mode}}</p></td>
							<td><p>{{reference_num}}</p></td>
							<td><p>{{bank_account}}</p></td>
							<td><p>{{tender_name}}</p></td>
						</tr>
					</thead>
				</table>
				
				

				We request for your immediate actions in this regards. <br><br>
				If you need any clarifications for any of above invoice/s, please reach out to our Accounts Receivable Team by sending email to {{frappe.db.get_value("User",frappe.session.user,"email")}}. <br><br>
				If refund already made from your end, kindly excuse us for this mail with the details of payments made to enable us to reconcile and credit your account. In case of online payment, sometimes, it is difficult to reconcile the name of the Payer and credit the relevant account. <br><br><br>
				Thanking you in anticipation. <br><br><br>
				<strong>For, {{company}}</strong><br>
				( Accountant )
			</div>

				</div>"""

	et.save(ignore_permissions=True)