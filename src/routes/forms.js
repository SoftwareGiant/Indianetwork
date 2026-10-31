import { Router } from 'express'
import { save } from '../store.js'
import { db } from '../db.js'
import { COLLECTIONS } from '../collections.js'
import { isEmail, ValidationError } from '../validate.js'
import { rateLimit } from '../rateLimit.js'

// Website forms (contact, volunteer, newsletter, donation, member-project, scholarship).
// Which fields each form may send is defined in collections.js; anything else is dropped.

const MAX = { text: 200, long: 5000, email: 200, phone: 30 }

// Returns [value, error] for one field
function clean(spec, raw) {
  const value = typeof raw === 'string' ? raw.trim() : raw
  if (value === undefined || value === null || value === '') return [undefined, spec.required ? 'This field is required.' : null]
  switch (spec.type) {
    case 'number': {
      const n = Number(value)
      return Number.isFinite(n) && n > 0 && n <= 10_000_000 ? [n, null] : [undefined, 'Enter a valid amount.']
    }
    case 'date':
      return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value))
        ? [value, null] : [undefined, 'Enter a valid date.']
    case 'email':
      return isEmail(value) ? [value.toLowerCase(), null] : [undefined, 'Enter a valid email address.']
    case 'phone':
      return typeof value === 'string' && /^\+?[\d\s\-().]{5,30}$/.test(value) ? [value, null] : [undefined, 'Enter a valid phone number.']
    default:
      if (typeof value !== 'string') return [undefined, 'Invalid value.']
      return value.length <= MAX[spec.type] ? [value, null] : [undefined, `Please keep this under ${MAX[spec.type]} characters.`]
  }
}

const router = Router()

router.post('/:form', rateLimit({ max: 10, windowMs: 10 * 60 * 1000, message: 'Too many submissions. Please try again in a few minutes.' }), async (req, res, next) => {
  try {
    const def = COLLECTIONS[req.params.form]
    if (!def?.form) return res.status(404).json({ error: 'Unknown form.' })
    const body = req.body && typeof req.body === 'object' ? req.body : {}

    const data = {}
    const errors = {}
    for (const [field, spec] of Object.entries(def.fields)) {
      const [value, error] = clean(spec, body[field])
      if (error) errors[field] = error
      else if (value !== undefined) data[field] = value
    }
    if (Object.keys(errors).length) throw new ValidationError(errors)

    const meta = { ip: req.ip, userAgent: req.get('user-agent') }

    // Subscribing twice just keeps the one subscription
    if (req.params.form === 'newsletter') {
      await db().collection('newsletter').updateOne(
        { email: data.email },
        { $setOnInsert: { ...data, ...meta, status: 'new', createdAt: new Date() } },
        { upsert: true },
      )
      return res.status(201).json({ received: true })
    }

    const entry = await save(req.params.form, { ...data, ...meta })
    res.status(201).json({ id: entry.id, received: true })
  } catch (e) {
    next(e)
  }
})

export default router
