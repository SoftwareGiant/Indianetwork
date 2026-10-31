// Sends website forms (contact, volunteer, newsletter, donation, member-project, scholarship)
// to our server, which saves them for the admin panel.

export type FormName = 'contact' | 'volunteer' | 'newsletter' | 'donation' | 'member-project' | 'scholarship'

export class FormError extends Error {
  fields?: Record<string, string>
  constructor(message: string, fields?: Record<string, string>) {
    super(message)
    this.fields = fields
  }
}

export async function submitForm(form: FormName, data: Record<string, string | number | undefined>) {
  let res: Response
  try {
    res = await fetch(`/api/forms/${form}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
  } catch {
    throw new FormError('Could not reach the server. Please check your connection and try again.')
  }
  const body = await res.json().catch(() => null)
  if (!res.ok) {
    const fields = body?.fields as Record<string, string> | undefined
    // Show the first field problem when there is one — it is more useful than the generic message
    throw new FormError((fields && Object.values(fields)[0]) || body?.error || 'Something went wrong. Please try again.', fields)
  }
}
