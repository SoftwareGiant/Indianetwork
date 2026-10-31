// Everything the server stores, one MongoDB collection each.
// `fields` (website forms only): what the form may send, checked by routes/forms.js.
//   type: text | long | email | phone | number | date — `required` marks mandatory fields.
// `columns`: what the admin panel shows in its table (dotted paths reach into nested objects).

export const COLLECTIONS = {
  contact: {
    label: 'Contact Messages',
    form: true,
    fields: {
      name: { type: 'text', required: true },
      email: { type: 'email', required: true },
      mobile: { type: 'phone' },
      subject: { type: 'text', required: true },
      message: { type: 'long', required: true },
    },
    columns: [['name', 'Name'], ['email', 'Email'], ['subject', 'Subject'], ['message', 'Message']],
  },
  volunteer: {
    label: 'Volunteers',
    form: true,
    fields: {
      name: { type: 'text', required: true },
      email: { type: 'email', required: true },
      interest: { type: 'text' },
    },
    columns: [['name', 'Name'], ['email', 'Email'], ['interest', 'Area of Interest']],
  },
  newsletter: {
    label: 'Newsletter Subscribers',
    form: true,
    fields: {
      email: { type: 'email', required: true },
      source: { type: 'text' },
    },
    columns: [['email', 'Email'], ['source', 'Signed up from']],
  },
  donation: {
    label: 'Donation Pledges',
    form: true,
    fields: {
      name: { type: 'text', required: true },
      email: { type: 'email', required: true },
      mobile: { type: 'phone', required: true },
      amount: { type: 'number', required: true },
      source: { type: 'text' },
    },
    columns: [['name', 'Name'], ['email', 'Email'], ['mobile', 'Mobile'], ['amount', 'Amount (USD)']],
  },
  'member-project': {
    label: 'Project Proposals',
    form: true,
    fields: {
      name: { type: 'text', required: true },
      detail: { type: 'long', required: true },
      amount: { type: 'number' },
    },
    columns: [['name', 'Name'], ['detail', 'Project'], ['amount', 'Budget (USD)']],
  },
  scholarship: {
    label: 'Scholarship Applications',
    form: true,
    fields: {
      name: { type: 'text', required: true },
      dob: { type: 'date', required: true },
      address: { type: 'long', required: true },
      education: { type: 'text', required: true },
      exam: { type: 'text', required: true },
    },
    columns: [['name', 'Name'], ['dob', 'Date of Birth'], ['education', 'Education'], ['exam', 'Exam']],
  },
  'insurance-purchases': {
    label: 'Insurance Purchases',
    form: false,
    columns: [['voucherCode', 'Voucher'], ['contact.name', 'Contact'], ['planName', 'Plan'], ['coverageName', 'Coverage'], ['trip.destination', 'Destination'], ['amountCharged', 'Amount (USD)'], ['trip.fromDate', 'From']],
  },
}
