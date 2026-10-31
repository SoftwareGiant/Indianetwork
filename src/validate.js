export class ValidationError extends Error {
  constructor(errors) {
    super('Please check the highlighted fields.')
    this.status = 400
    this.errors = errors
  }
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const isEmail = v => typeof v === 'string' && EMAIL.test(v.trim())
const isDate = v => typeof v === 'string' && ISO_DATE.test(v) && !Number.isNaN(Date.parse(v))
const text = (v, max = 200) => typeof v === 'string' && v.trim().length > 0 && v.trim().length <= max

function today() {
  return new Date().toISOString().slice(0, 10)
}

export function validateTrip(trip) {
  const errors = {}
  if (!trip || typeof trip !== 'object') throw new ValidationError({ trip: 'Trip details are required.' })
  if (!Number.isInteger(Number(trip.departureId)) || !trip.departureId) errors.departureId = 'Select your home country.'
  if (!Number.isInteger(Number(trip.destinationId)) || !trip.destinationId) errors.destinationId = 'Select your destination.'
  if (!isDate(trip.fromDate)) errors.fromDate = 'Enter a valid start date.'
  else if (trip.fromDate < today()) errors.fromDate = 'The start date cannot be in the past.'
  if (!isDate(trip.toDate)) errors.toDate = 'Enter a valid end date.'
  else if (isDate(trip.fromDate) && trip.toDate < trip.fromDate) errors.toDate = 'The end date must be after the start date.'
  if (!Array.isArray(trip.travelers) || trip.travelers.length === 0) errors.travelers = 'Add at least one traveler.'
  else if (trip.travelers.length > 10) errors.travelers = 'A quote can include up to 10 travelers.'
  else trip.travelers.forEach((t, i) => {
    if (!isDate(t?.dateOfBirth) || t.dateOfBirth >= today()) errors[`travelers.${i}.dateOfBirth`] = 'Enter a valid date of birth.'
    if (!Number.isInteger(Number(t?.genderId)) || !t?.genderId) errors[`travelers.${i}.genderId`] = 'Select a gender.'
  })
  if (Object.keys(errors).length) throw new ValidationError(errors)
  return trip
}

export function validateSelection(sel) {
  const errors = {}
  if (!sel || typeof sel.reference !== 'string' || !sel.reference) errors.reference = 'Quote reference is missing. Please get a new quote.'
  if (!Number.isInteger(Number(sel?.planId))) errors.planId = 'Plan is missing.'
  if (!Number.isInteger(Number(sel?.coverageId))) errors.coverageId = 'Coverage is missing.'
  if (sel?.riders && !Array.isArray(sel.riders)) errors.riders = 'Invalid add-on selection.'
  if (Object.keys(errors).length) throw new ValidationError(errors)
  return sel
}

export function validatePurchase(p, travelerCount) {
  const errors = {}
  const c = p?.contact ?? {}
  if (!text(c.name, 100)) errors['contact.name'] = 'Enter the contact name.'
  if (!isEmail(c.email)) errors['contact.email'] = 'Enter a valid email address.'
  if (!text(c.phone, 30)) errors['contact.phone'] = 'Enter a phone number.'

  const pay = p?.payment ?? {}
  const digits = String(pay.cardNumber ?? '').replace(/\D/g, '')
  if (digits.length < 13 || digits.length > 19 || !luhn(digits)) errors['payment.cardNumber'] = 'Enter a valid card number.'
  if (!Number.isInteger(Number(pay.cardType))) errors['payment.cardType'] = 'Select the card type.'
  if (!text(pay.cardName, 100)) errors['payment.cardName'] = 'Enter the name on the card.'
  const month = Number(pay.expMonth), year = Number(pay.expYear)
  const now = new Date()
  if (!(month >= 1 && month <= 12) || !(year >= now.getFullYear()) || (year === now.getFullYear() && month < now.getMonth() + 1)) errors['payment.expiry'] = 'Enter a valid expiry date.'
  if (!/^\d{3,4}$/.test(String(pay.cvv ?? ''))) errors['payment.cvv'] = 'Enter the 3 or 4 digit security code.'

  const list = Array.isArray(p?.travelers) ? p.travelers : []
  if (list.length !== travelerCount) errors.travelers = 'Traveler details do not match the quote.'
  list.forEach((t, i) => {
    if (!text(t?.firstName, 60)) errors[`travelers.${i}.firstName`] = 'Enter the first name.'
    if (!text(t?.lastName, 60)) errors[`travelers.${i}.lastName`] = 'Enter the last name.'
    if (!isEmail(t?.email)) errors[`travelers.${i}.email`] = 'Enter a valid email address.'
    if (!text(t?.phone, 30)) errors[`travelers.${i}.phone`] = 'Enter a phone number.'
    if (!text(t?.passport, 30)) errors[`travelers.${i}.passport`] = 'Enter the passport or ID number.'
  })
  if (!(Number(p?.amount) > 0)) errors.amount = 'The amount to charge is missing.'
  if (Object.keys(errors).length) throw new ValidationError(errors)
  return p
}

function luhn(num) {
  let sum = 0
  for (let i = 0; i < num.length; i++) {
    let d = Number(num[num.length - 1 - i])
    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9 }
    sum += d
  }
  return sum % 10 === 0
}
