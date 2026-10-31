import { Router } from 'express'
import { getCatalogs, getQuote, getBenefits, getPricing, emailQuote, purchase } from '../bmi.js'
import { validateTrip, validateSelection, validatePurchase, isEmail, ValidationError } from '../validate.js'
import { save, saveToFile } from '../store.js'
import { db } from '../db.js'
import { rateLimit } from '../rateLimit.js'

const router = Router()
const wrap = fn => (req, res, next) => fn(req, res).catch(next)

// Readable names for the ids in a purchase record (both lookups are cached). Never fails:
// the sale is already complete, so missing names just leave those fields empty.
export async function describeTrip(trip, selection) {
  try {
    const [catalogs, benefits] = await Promise.all([getCatalogs(), getBenefits(selection.planId, selection.coverageId)])
    return {
      planName: benefits.planName || undefined,
      coverageName: benefits.coverageName || undefined,
      homeCountry: catalogs.countries.find(c => c.id === Number(trip.departureId))?.name,
      destination: catalogs.destinations.find(d => d.id === Number(trip.destinationId))?.name,
    }
  } catch (err) {
    console.error('Could not look up plan and country names:', err.message)
    return {}
  }
}

// Lists for the quote form: home countries, destination regions, genders, card types
router.get('/catalogs', wrap(async (_req, res) => {
  res.json(await getCatalogs())
}))

// Step 1 — all plans and coverages for a trip
router.post('/quote', wrap(async (req, res) => {
  const trip = validateTrip(req.body?.trip)
  res.json(await getQuote(trip))
}))

// Benefit table for one plan + coverage
router.get('/benefits', wrap(async (req, res) => {
  const { planId, coverageId } = req.query
  if (!Number.isInteger(Number(planId)) || !Number.isInteger(Number(coverageId))) throw new ValidationError({ planId: 'planId and coverageId are required.' })
  res.json(await getBenefits(planId, coverageId))
}))

// Steps 4/5 — per-traveler premium, optional add-ons, promo code and total
router.post('/pricing', wrap(async (req, res) => {
  const trip = validateTrip(req.body?.trip)
  const selection = validateSelection(req.body?.selection)
  res.json(await getPricing(trip, selection))
}))

// Step 3 — email the quote to the customer
router.post('/email-quote', wrap(async (req, res) => {
  const trip = validateTrip(req.body?.trip)
  const selection = validateSelection(req.body?.selection)
  if (!isEmail(req.body?.email)) throw new ValidationError({ email: 'Enter a valid email address.' })
  await emailQuote(trip, selection, req.body.email.trim())
  res.json({ sent: true })
}))

// Step 7 — pay and issue the voucher
router.post('/purchase', wrap(async (req, res) => {
  const trip = validateTrip(req.body?.trip)
  const selection = validateSelection(req.body?.selection)
  const info = validatePurchase(req.body?.purchase, trip.travelers.length)
  // Re-price first: Step 7 checks the travelers against the last Step 4/5 illustration
  // (Error 8010), and the charge must be BMI's total, not the amount the browser sent
  const pricing = await getPricing(trip, selection)
  const voucher = await purchase(selection, { ...info, amount: pricing.total })
  // Keep a record of the sale — never store card details. The card is already charged, so a
  // database problem must not turn into an error for the customer: fall back to a local file.
  const names = await describeTrip(trip, selection)
  const record = {
    voucherCode: voucher.voucherCode,
    voucherId: voucher.voucherId,
    voucherUrl: voucher.voucherUrl,
    transactionId: voucher.transactionId,
    amountCharged: voucher.amountCharged,
    reference: selection.reference,
    planName: names.planName,
    coverageName: names.coverageName,
    planId: selection.planId,
    coverageId: selection.coverageId,
    trip: {
      homeCountry: names.homeCountry,
      destination: names.destination,
      fromDate: trip.fromDate,
      toDate: trip.toDate,
      departureId: trip.departureId,
      destinationId: trip.destinationId,
    },
    contact: info.contact,
    travelers: info.travelers.map(t => ({ firstName: t.firstName, lastName: t.lastName, email: t.email, phone: t.phone })),
  }
  await save('insurance-purchases', record).catch(async err => {
    console.error(`Could not save purchase ${voucher.voucherCode} to MongoDB, writing it to server/data instead:`, err.message)
    await saveToFile('insurance-purchases', record).catch(e => console.error('File fallback failed too:', e.message, JSON.stringify(record)))
  })
  res.json(voucher)
}))

// Voucher lookup for customers: needs the voucher code AND the email of the contact or a traveler,
// so a leaked or guessed code alone reveals nothing. Both failures get the same answer on purpose.
router.post('/voucher', rateLimit({ max: 10, windowMs: 15 * 60 * 1000, message: 'Too many attempts. Please wait 15 minutes and try again.' }), wrap(async (req, res) => {
  const code = typeof req.body?.code === 'string' ? req.body.code.trim().toUpperCase() : ''
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : ''
  const errors = {}
  if (!/^[A-Z0-9-]{4,30}$/.test(code)) errors.code = 'Enter the voucher code from your confirmation.'
  if (!isEmail(email)) errors.email = 'Enter the email address used for the purchase.'
  if (Object.keys(errors).length) throw new ValidationError(errors)

  const p = await db().collection('insurance-purchases').findOne({ voucherCode: code })
  const emails = [p?.contact?.email, ...(p?.travelers ?? []).map(t => t.email)].filter(Boolean).map(e => e.toLowerCase())
  if (!p || !emails.includes(email)) {
    return res.status(404).json({ error: 'We could not find a voucher with that code and email. Please check both and try again.' })
  }
  res.json({
    voucherCode: p.voucherCode,
    voucherUrl: p.voucherUrl || null,
    purchasedAt: p.createdAt,
    amountCharged: p.amountCharged,
    transactionId: p.transactionId,
    planName: p.planName,
    coverageName: p.coverageName,
    trip: { homeCountry: p.trip?.homeCountry, destination: p.trip?.destination, fromDate: p.trip?.fromDate, toDate: p.trip?.toDate },
    contact: { name: p.contact?.name, email: p.contact?.email, phone: p.contact?.phone },
    travelers: (p.travelers ?? []).map(t => ({ firstName: t.firstName, lastName: t.lastName })),
  })
}))

export default router
