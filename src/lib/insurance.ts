// Visitor travel insurance (BMI Travel Assistance) — talks to our own server at /api/insurance,
// which holds the BMI credentials. The current quote is kept in sessionStorage so the
// plan details and checkout pages can use it.

export interface Option { id: number; name: string }
export interface Catalogs { countries: Option[]; destinations: Option[]; genders: Option[]; cards: Option[] }

export interface TravelerInput { dateOfBirth: string; genderId: string }
export interface Trip {
  departureId: string
  destinationId: string
  fromDate: string
  toDate: string
  travelers: TravelerInput[]
}

export interface Coverage { coverageId: number; name: string; price: number }
export interface Plan {
  planId: number
  planSeq: number
  name: string
  shortDescription: string
  longDescription: string
  brochure: string | null
  coverages: Coverage[]
}
export interface Quote { reference: string; headerId: number; plans: Plan[] }

export interface Benefit { id: number; name: string; value: string; type: number }
export interface Benefits { planName: string; coverageName: string; benefits: Benefit[] }

export interface PricingItem { benefitId: number; name: string; premium: number; required: boolean; selected: boolean }
export interface Pricing {
  travelers: { travelerId: number; description: string; subTotal: number; items: PricingItem[] }[]
  discount: number
  total: number
}

export interface Selection {
  reference: string
  planId: number
  coverageId: number
  riders?: { travelerId: number; benefitId: number }[]
  promoCode?: string
}

export interface Voucher {
  voucherCode: string
  voucherId: number
  transactionId: string
  authorizationCode: string
  amountCharged: number
  voucherUrl: string | null
}

export class ApiError extends Error {
  fields?: Record<string, string>
  constructor(message: string, fields?: Record<string, string>) {
    super(message)
    this.fields = fields
  }
}

async function request<T>(path: string, body?: unknown): Promise<T> {
  let res: Response
  try {
    res = await fetch(`/api/insurance${path}`, body === undefined
      ? undefined
      : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  } catch {
    throw new ApiError('Could not reach the server. Please check your connection and try again.')
  }
  const data = await res.json().catch(() => null)
  if (!res.ok) throw new ApiError(data?.error || 'Something went wrong. Please try again.', data?.fields)
  return data as T
}

export const getCatalogs = () => request<Catalogs>('/catalogs')
export const getQuote = (trip: Trip) => request<Quote>('/quote', { trip })
export const getBenefits = (planId: number, coverageId: number) => request<Benefits>(`/benefits?planId=${planId}&coverageId=${coverageId}`)
export const getPricing = (trip: Trip, selection: Selection) => request<Pricing>('/pricing', { trip, selection })
export const emailQuote = (trip: Trip, selection: Selection, email: string) => request<{ sent: boolean }>('/email-quote', { trip, selection, email })
export const purchase = (trip: Trip, selection: Selection, details: unknown) => request<Voucher>('/purchase', { trip, selection, purchase: details })

export interface VoucherDetails {
  voucherCode: string
  voucherUrl: string | null
  purchasedAt: string
  amountCharged: number
  transactionId: string
  planName?: string
  coverageName?: string
  trip: { homeCountry?: string; destination?: string; fromDate: string; toDate: string }
  contact: { name: string; email: string; phone: string }
  travelers: { firstName: string; lastName: string }[]
}
// Voucher lookup: needs the code and the email used for the purchase
export const findVoucher = (code: string, email: string) => request<VoucherDetails>('/voucher', { code, email })

// ── Saved quote (survives navigation between quote, details and checkout) ──
export interface SavedQuote {
  trip: Trip
  quote: Quote
  labels: { home: string; destination: string }
  savedAt: number
}

const KEY = 'inf-insurance-quote'
const MAX_AGE = 2 * 60 * 60 * 1000

export function saveQuote(q: Omit<SavedQuote, 'savedAt'>) {
  try { sessionStorage.setItem(KEY, JSON.stringify({ ...q, savedAt: Date.now() })) } catch { /* storage unavailable */ }
}

export function loadQuote(): SavedQuote | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return null
    const q = JSON.parse(raw) as SavedQuote
    return Date.now() - q.savedAt < MAX_AGE ? q : null
  } catch {
    return null
  }
}

export function clearQuote() {
  try { sessionStorage.removeItem(KEY) } catch { /* storage unavailable */ }
}

export function findCoverage(q: SavedQuote | null, planId: number, coverageId: number) {
  const plan = q?.quote.plans.find(p => p.planId === planId)
  const coverage = plan?.coverages.find(c => c.coverageId === coverageId)
  return plan && coverage ? { plan, coverage } : null
}

export const money = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

export function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function tripDays(trip: Trip) {
  const ms = Date.parse(trip.toDate) - Date.parse(trip.fromDate)
  return Math.round(ms / 86_400_000) + 1
}
