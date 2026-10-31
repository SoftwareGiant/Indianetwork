// Client for the BMI Travel Assistance API.
// Notes from testing the sandbox (where it differs from the PDF):
//  - dates must be sent as YYYY-MM-DD (MM-DD-YYYY is rejected)
//  - id lists are plain "1,2,3" — the PDF's "{1,2,3}" makes the server fail
//  - Step 7 expects "sReferenceID" (the PDF says "ReferenceID")
//  - Step 7 needs the card security code as "cvv" (not in the PDF); configurable via BMI_CVV_FIELD
//  - Step 7 only works right after Step 4/5 for the same travelers, otherwise Error 8010 or a 9999

const API = () => `${process.env.BMI_BASE_URL.replace(/\/$/, '')}/api/v1/ecommerce`

let cachedToken = null // { value, expiresAt }

function tokenExpiry(token) {
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString('utf8'))
    if (payload.exp) return payload.exp * 1000
  } catch { /* not a JWT we can read */ }
  return Date.now() + 10 * 60 * 1000
}

export class BmiError extends Error {
  constructor(message, status = 502, details = undefined) {
    super(message)
    this.status = status
    this.details = details
  }
}

// BMI sometimes answers with PascalCase keys (e.g. "Code", "Data")
function normalize(body) {
  if (!body || typeof body !== 'object') return body
  return Object.fromEntries(Object.entries(body).map(([k, v]) => [k[0].toLowerCase() + k.slice(1), v]))
}

async function getToken() {
  if (cachedToken && cachedToken.expiresAt - 60_000 > Date.now()) return cachedToken.value
  const res = await fetch(`${API()}/Token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ authUser: process.env.BMI_AUTH_USER, authKey: process.env.BMI_AUTH_KEY }),
  })
  const body = normalize(await res.json().catch(() => null))
  if (!res.ok || !body?.data) throw new BmiError('Could not authenticate with BMI', 502)
  cachedToken = { value: body.data, expiresAt: tokenExpiry(body.data) }
  return cachedToken.value
}

async function call(method, path, payload, { retry = true } = {}) {
  const token = await getToken()
  const res = await fetch(`${API()}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: payload === undefined ? undefined : JSON.stringify(payload),
  })
  if (res.status === 401 && retry) {
    cachedToken = null
    return call(method, path, payload, { retry: false })
  }
  const body = normalize(await res.json().catch(() => null))
  if (!body) throw new BmiError('BMI returned an unreadable response', 502)
  const failed = !res.ok || (body.code !== 0 && body.code !== undefined) || body.isSuccess === false
  if (failed) {
    const message = body.validationMessages?.join(' ') || body.message || 'BMI request failed'
    throw new BmiError(message, res.status >= 500 ? 502 : 400, { code: body.code })
  }
  return body.data
}

const catalogCache = new Map()
async function cached(key, loader, ttlMs = 6 * 60 * 60 * 1000) {
  const hit = catalogCache.get(key)
  if (hit && hit.expiresAt > Date.now()) return hit.value
  const value = await loader()
  catalogCache.set(key, { value, expiresAt: Date.now() + ttlMs })
  return value
}

// ── Catalogs ────────────────────────────────────────────────────────────────
export async function getCatalogs() {
  return cached('catalogs', async () => {
    const [countries, destinations, genders, cards] = await Promise.all([
      call('GET', '/Bmita/MasterCountry_Catalog?UserLanguage=1'),
      call('GET', '/Bmita/MasterDestination_Catalog?UserLanguage=1'),
      call('GET', '/Bmita/MasterGender_Catalog'),
      call('GET', '/Bmita/MasterCreditCard_Catalog'),
    ])
    return {
      countries: (countries?.details ?? [])
        .map(c => ({ id: c.nCountryID, name: c.countryName }))
        .sort((a, b) => a.name.localeCompare(b.name)),
      destinations: (destinations?.details ?? []).map(d => ({ id: d.nDestination, name: d.destinationName })),
      genders: (genders?.details ?? []).map(g => ({ id: g.id, name: g.genderDescription })),
      cards: (cards?.details ?? []).map(c => ({ id: c.nCard_Type, name: c.creditCardDesc })),
    }
  })
}

// ── Quote building blocks ───────────────────────────────────────────────────
// trip = { departureId, destinationId, fromDate, toDate, travelers: [{ genderId, dateOfBirth }] }
function quoteBody(trip) {
  const agent = process.env.BMI_AGENT_ID ? Number(process.env.BMI_AGENT_ID) : null
  return {
    sLanguage: 'en-us',
    sClient: trip.clientName || 'India Network Foundation website',
    nDeparture: Number(trip.departureId),
    nDestination: Number(trip.destinationId),
    dFromDate: trip.fromDate,
    dToDate: trip.toDate,
    nAgentID: agent,
    travelers: trip.travelers.map((t, i) => ({ travelerId: i + 1, genderId: Number(t.genderId), dateOfBirth: t.dateOfBirth })),
  }
}

const tidy = s => (s ?? '').replace(/\s+/g, ' ').trim()

export async function getQuote(trip) {
  const data = await call('POST', '/Bmita/BmitaPremiumCalculationStep1', quoteBody(trip))
  const rows = data?.details ?? []
  if (!rows.length) throw new BmiError('No plans are available for this trip. Please check the dates and travelers.', 404)
  const plans = new Map()
  for (const r of rows) {
    if (!plans.has(r.planId)) {
      plans.set(r.planId, {
        planId: r.planId,
        planSeq: r.planSeq,
        productId: r.productId,
        name: tidy(r.planName),
        shortDescription: tidy(r.sShortDescription),
        longDescription: tidy(r.sLongDescription),
        brochure: r.brochure || null,
        coverages: [],
      })
    }
    plans.get(r.planId).coverages.push({ coverageId: r.coverageSeq, name: tidy(r.coverageName), price: r.tPrice })
  }
  const list = [...plans.values()].sort((a, b) => a.planSeq - b.planSeq)
  list.forEach(p => p.coverages.sort((a, b) => a.price - b.price))
  return { reference: rows[0].reference, headerId: rows[0].headerId, plans: list }
}

export async function getBenefits(planId, coverageId) {
  return cached(`benefits:${planId}:${coverageId}`, async () => {
    const data = await call('POST', '/Bmita/MasterBenefits_Catalog', { nPlanId: Number(planId), sCoverage: String(coverageId), userLanguage: 1 })
    const rows = (data?.details ?? []).sort((a, b) => a.nSequence - b.nSequence)
    return {
      planName: tidy(rows[0]?.sPlanDescription),
      coverageName: tidy(rows[0]?.sCoverageDescription),
      benefits: rows.map(b => ({ id: b.nBenefitID, name: tidy(b.sBenefitDescription), value: tidy(b.sValue), type: b.nBenefitType })),
    }
  })
}

function riderSummary(data) {
  const rows = data?.details ?? []
  const travelers = new Map()
  for (const r of rows) {
    if (!travelers.has(r.travelerID)) travelers.set(r.travelerID, { travelerId: r.travelerID, description: r.travelerDescription, subTotal: r.subTotal, items: [] })
    const t = travelers.get(r.travelerID)
    t.subTotal = r.subTotal
    t.items.push({ benefitId: r.benefit_ID, name: tidy(r.benefit_Name), premium: r.premium, required: r.required === 1, selected: r.selected === 1 })
  }
  return {
    travelers: [...travelers.values()],
    discount: rows[0]?.discount ?? 0,
    total: rows[0]?.total ?? 0,
  }
}

// selection = { reference, planId, coverageId, riders: [{ travelerId, benefitId }], promoCode }
export async function getPricing(trip, selection) {
  const base = { ...quoteBody(trip), sReferenceID: selection.reference, sPlanID: String(selection.planId), nCoverage: Number(selection.coverageId) }
  const riders = selection.riders ?? []
  if (!riders.length && !selection.promoCode) {
    return riderSummary(await call('POST', '/Bmita/BmitaPremiumCalculationStep4', base))
  }
  const sBenefits = riders.map(r => `${r.travelerId},${r.benefitId}`).join(',')
  return riderSummary(await call('POST', '/Bmita/BmitaPremiumCalculationStep5', { ...base, sBenefits, sPromotionalCode: selection.promoCode || '' }))
}

export async function emailQuote(trip, selection, email) {
  return call('POST', '/Bmita/BmitaPremiumCalculationStep3', {
    ...quoteBody(trip),
    sReferenceID: selection.reference,
    sCoverageID: String(selection.coverageId),
    sEmailAddress: email,
    nSendQuote: 1,
  })
}

// purchase = { contact, payment, travelers: [{ firstName, lastName, genderId, dateOfBirth, email, phone, passport }], amount }
export async function purchase(selection, purchaseInfo) {
  const { contact, payment, travelers, amount } = purchaseInfo
  const body = {
    sReferenceID: selection.reference,
    sContactName: contact.name,
    sContactEmail: contact.email,
    sContactPhone: contact.phone,
    sContactComment: contact.comment || '',
    sCardNumber: String(payment.cardNumber).replace(/\D/g, ''),
    nCardType: Number(payment.cardType),
    sCardName: payment.cardName,
    nCardMonth: Number(payment.expMonth),
    nCardYear: Number(payment.expYear),
    [process.env.BMI_CVV_FIELD || 'cvv']: String(payment.cvv),
    sPayerEmail: payment.payerEmail || contact.email,
    nChargeAmount: Number(amount),
    travelers: travelers.map((t, i) => ({
      travelerId: i + 1,
      name: t.firstName,
      lastName: t.lastName,
      genderId: Number(t.genderId),
      dob: t.dateOfBirth,
      email: t.email,
      phoneNumber: t.phone,
      passportNumber: t.passport,
    })),
  }
  const data = await call('POST', '/Bmita/BmitaPremiumCalculationStep7', body)
  const v = (data?.details ?? [])[0]
  if (!v || !v.sVoucherCode) throw new BmiError('The payment could not be completed. Please check the card details and try again.', 402)
  return {
    voucherCode: v.sVoucherCode,
    voucherId: v.nVoucherID,
    transactionId: v.sTransactionID,
    authorizationCode: v.sAuthorizationCode,
    amountCharged: v.nChargeAmount,
    voucherUrl: v.voucherReport || null,
  }
}
