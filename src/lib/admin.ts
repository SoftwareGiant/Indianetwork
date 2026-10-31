// Admin panel API: log in with the admin password, then read and manage saved submissions.
// The session token is kept in localStorage and expires after 12 hours (set by the server).

export interface Column { path: string; label: string }
export interface CollectionSummary { key: string; label: string; columns: Column[]; total: number; unread: number }
export type AdminRecord = { id: string; status: 'new' | 'done'; createdAt: string } & Record<string, unknown>
export interface RecordPage { items: AdminRecord[]; total: number; page: number; limit: number }
export interface Query { page: number; q: string; status: '' | 'new' | 'done' }

const KEY = 'inf-admin-session'

export class AuthError extends Error {}

export function getSession(): string | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const { token, expiresAt } = JSON.parse(raw) as { token: string; expiresAt: number }
    return expiresAt > Date.now() ? token : null
  } catch {
    return null
  }
}

export function logout() {
  try { localStorage.removeItem(KEY) } catch { /* storage unavailable */ }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let res: Response
  try {
    res = await fetch(`/api/admin${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getSession() ?? ''}`, ...init.headers },
    })
  } catch {
    throw new Error('Could not reach the server.')
  }
  if (res.status === 401) {
    logout()
    throw new AuthError('Your session has ended. Please log in again.')
  }
  const body = await res.json().catch(() => null)
  if (!res.ok) throw new Error(body?.error || 'Something went wrong.')
  return body as T
}

export async function login(password: string) {
  let res: Response
  try {
    res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })
  } catch {
    throw new Error('Could not reach the server.')
  }
  const body = await res.json().catch(() => null)
  if (!res.ok) throw new Error(body?.error || 'Login failed.')
  try { localStorage.setItem(KEY, JSON.stringify(body)) } catch { /* storage unavailable */ }
}

const params = (q: Partial<Query>) =>
  new URLSearchParams(Object.entries(q).filter(([, v]) => v !== '' && v !== undefined).map(([k, v]) => [k, String(v)])).toString()

export const getSummary = () => request<CollectionSummary[]>('/summary')
export const getRecords = (collection: string, q: Query) => request<RecordPage>(`/records/${collection}?${params(q)}`)
export const setStatus = (collection: string, id: string, status: 'new' | 'done') =>
  request<{ ok: true }>(`/records/${collection}/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) })
export const deleteRecord = (collection: string, id: string) => request<{ ok: true }>(`/records/${collection}/${id}`, { method: 'DELETE' })

// Downloads a CSV of the collection (respects the current search and status filter)
export async function exportCsv(collection: string, q: Pick<Query, 'q' | 'status'>) {
  const res = await fetch(`/api/admin/export/${collection}?${params(q)}`, { headers: { Authorization: `Bearer ${getSession() ?? ''}` } })
  if (res.status === 401) { logout(); throw new AuthError('Your session has ended. Please log in again.') }
  if (!res.ok) throw new Error('Export failed.')
  const name = /filename="([^"]+)"/.exec(res.headers.get('content-disposition') ?? '')?.[1] ?? `${collection}.csv`
  const url = URL.createObjectURL(await res.blob())
  const a = Object.assign(document.createElement('a'), { href: url, download: name })
  a.click()
  URL.revokeObjectURL(url)
}

// Reads "contact.name" style paths
export function valueAt(record: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((v, k) => (v && typeof v === 'object' ? (v as Record<string, unknown>)[k] : undefined), record)
}
