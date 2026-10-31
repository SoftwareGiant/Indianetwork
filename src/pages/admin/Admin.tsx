import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import {
  AuthError, deleteRecord, exportCsv, getRecords, getSession, getSummary, login, logout, setStatus, valueAt,
  type AdminRecord, type CollectionSummary, type Query, type RecordPage,
} from '../../lib/admin'

// Admin panel at /admin — lists everything saved from the website forms and insurance purchases.

const NAVY = '#0D2B45'
const ORANGE = '#F47C20'
const font = { fontFamily: 'Manrope, sans-serif' }

const LABELS: Record<string, string> = {
  dob: 'Date of Birth', ip: 'IP Address', userAgent: 'Browser', createdAt: 'Received', voucherUrl: 'Voucher Link',
  departureId: 'Home Country ID', destinationId: 'Destination ID', fromDate: 'From', toDate: 'To',
  planName: 'Plan', coverageName: 'Coverage', planId: 'Plan ID (BMI)', coverageId: 'Coverage ID (BMI)',
}
const humanize = (key: string) => LABELS[key] ?? key.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase())

const isMoney = (path: string) => /amount/i.test(path)
const money = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
const dateTime = (iso: string) => new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })

function cellText(path: string, v: unknown): string {
  if (v === undefined || v === null || v === '') return '—'
  if (typeof v === 'number') return isMoney(path) ? money(v) : v.toLocaleString('en-US')
  if (Array.isArray(v)) return `${v.length} item${v.length === 1 ? '' : 's'}`
  if (typeof v === 'object') return JSON.stringify(v)
  return String(v)
}

// ── Login ─────────────────────────────────────────────────────────────────────
function Login({ onLogin, notice }: { onLogin: () => void; notice?: string }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!password || busy) return
    setBusy(true)
    setError('')
    try {
      await login(password)
      onLogin()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#FFF9F3', ...font }}>
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm" style={{ border: '1px solid rgba(13,43,69,0.08)' }}>
        <h1 className="text-2xl font-extrabold mb-1" style={{ color: NAVY }}>INF Admin</h1>
        <p className="text-sm text-gray-500 mb-6">India Network Foundation — website submissions</p>
        {notice && !error && <p className="text-sm mb-4 rounded-xl px-4 py-3" style={{ background: 'rgba(244,124,32,0.08)', color: NAVY }}>{notice}</p>}
        <label className="block text-sm font-bold mb-1.5" style={{ color: NAVY }} htmlFor="admin-password">Password</label>
        <input id="admin-password" type="password" autoFocus autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-300" style={{ border: '1px solid rgba(13,43,69,0.15)' }} />
        {error && <p role="alert" className="text-sm mt-3" style={{ color: '#dc2626' }}>{error}</p>}
        <button type="submit" disabled={busy || !password} className="w-full mt-5 py-3 rounded-full text-white font-bold disabled:opacity-60" style={{ background: ORANGE }}>
          {busy ? 'Logging in…' : 'Log in'}
        </button>
        <Link to="/" className="block text-center text-sm text-gray-500 mt-5 hover:underline">← Back to website</Link>
      </form>
    </div>
  )
}

// ── Detail panel ──────────────────────────────────────────────────────────────
function Value({ k, v }: { k: string; v: unknown }) {
  if (v === undefined || v === null || v === '') return <span className="text-gray-400">—</span>
  if (typeof v === 'string' && /^https?:\/\//.test(v)) return <a href={v} target="_blank" rel="noopener noreferrer" className="break-all hover:underline" style={{ color: ORANGE }}>Open link ↗</a>
  if (typeof v === 'number') return <>{isMoney(k) ? money(v) : v}</>
  if (Array.isArray(v)) {
    return (
      <ol className="space-y-2">
        {v.map((item, i) => (
          <li key={i} className="rounded-lg px-3 py-2 text-sm" style={{ background: '#FFF9F3' }}>
            {item && typeof item === 'object'
              ? Object.entries(item as Record<string, unknown>).map(([ik, iv]) => (
                <div key={ik}><span className="text-gray-500">{humanize(ik)}:</span> {cellText(ik, iv)}</div>
              ))
              : String(item)}
          </li>
        ))}
      </ol>
    )
  }
  if (typeof v === 'object') {
    return (
      <div className="space-y-1">
        {Object.entries(v as Record<string, unknown>).map(([ik, iv]) => (
          <div key={ik}><span className="text-gray-500">{humanize(ik)}:</span> {cellText(ik, iv)}</div>
        ))}
      </div>
    )
  }
  return <span className="whitespace-pre-wrap break-words">{String(v)}</span>
}

function Detail({ record, label, onClose, onStatus, onDelete, busy }: {
  record: AdminRecord; label: string; busy: boolean
  onClose: () => void; onStatus: (s: 'new' | 'done') => void; onDelete: () => void
}) {
  const { id, status, createdAt, ip, userAgent, ...fields } = record
  return (
    <div className="fixed inset-0 z-40 flex justify-end" role="dialog" aria-modal="true" aria-label={`${label} details`}>
      <button className="absolute inset-0 bg-black/30" aria-label="Close" onClick={onClose} />
      <div className="relative w-full max-w-lg h-full bg-white shadow-2xl flex flex-col" style={font}>
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-gray-100">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: ORANGE }}>{label}</p>
            <p className="text-sm text-gray-500 mt-1">Received {dateTime(createdAt)}</p>
          </div>
          <button onClick={onClose} className="text-2xl leading-none text-gray-400 hover:text-gray-700" aria-label="Close">×</button>
        </div>
        <dl className="flex-1 overflow-y-auto px-6 py-5 space-y-4 text-sm">
          {Object.entries(fields).map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">{humanize(k)}</dt>
              <dd style={{ color: NAVY }}><Value k={k} v={v} /></dd>
            </div>
          ))}
          <div className="pt-4 border-t border-gray-100 text-xs text-gray-400 space-y-1">
            {ip ? <p>IP address: {String(ip)}</p> : null}
            {userAgent ? <p className="break-words">Browser: {String(userAgent)}</p> : null}
            <p>Record ID: {id}</p>
          </div>
        </dl>
        <div className="flex flex-wrap gap-3 px-6 py-4 border-t border-gray-100">
          {status === 'done' ? (
            <button disabled={busy} onClick={() => onStatus('new')} className="flex-1 py-2.5 rounded-full text-sm font-bold disabled:opacity-60" style={{ border: `2px solid ${NAVY}`, color: NAVY }}>Mark as New</button>
          ) : (
            <button disabled={busy} onClick={() => onStatus('done')} className="flex-1 py-2.5 rounded-full text-sm font-bold text-white disabled:opacity-60" style={{ background: '#2E8B57' }}>Mark as Handled</button>
          )}
          <button disabled={busy} onClick={onDelete} className="px-5 py-2.5 rounded-full text-sm font-bold disabled:opacity-60" style={{ color: '#dc2626', border: '2px solid rgba(220,38,38,0.3)' }}>Delete</button>
        </div>
      </div>
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ onAuthLost, onLogout }: { onAuthLost: (msg: string) => void; onLogout: () => void }) {
  const [params, setParams] = useSearchParams()
  const [summary, setSummary] = useState<CollectionSummary[] | null>(null)
  const [query, setQuery] = useState<Query>({ page: 1, q: '', status: '' })
  const [search, setSearch] = useState('')
  const [data, setData] = useState<RecordPage | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<AdminRecord | null>(null)
  const [busy, setBusy] = useState(false)
  const requestId = useRef(0)

  const active = summary?.find(s => s.key === params.get('c')) ?? summary?.[0]

  const fail = useCallback((err: unknown) => {
    if (err instanceof AuthError) onAuthLost(err.message)
    else setError((err as Error).message)
  }, [onAuthLost])

  const loadSummary = useCallback(() => getSummary().then(setSummary).catch(fail), [fail])

  const loadRecords = useCallback(async () => {
    if (!active) return
    const id = ++requestId.current
    setLoading(true)
    setError('')
    try {
      const page = await getRecords(active.key, query)
      if (id === requestId.current) setData(page)
    } catch (err) {
      if (id === requestId.current) fail(err)
    } finally {
      if (id === requestId.current) setLoading(false)
    }
  }, [active?.key, query, fail]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { loadSummary() }, [loadSummary])
  useEffect(() => { loadRecords() }, [loadRecords])

  // Search as you type, with a short pause so we don't query on every key
  useEffect(() => {
    const t = setTimeout(() => setQuery(q => (q.q === search ? q : { ...q, q: search, page: 1 })), 300)
    return () => clearTimeout(t)
  }, [search])

  function openCollection(key: string) {
    setParams({ c: key })
    setSearch('')
    setQuery({ page: 1, q: '', status: '' })
    setData(null)
    setSelected(null)
  }

  async function changeStatus(status: 'new' | 'done') {
    if (!selected || !active) return
    setBusy(true)
    try {
      await setStatus(active.key, selected.id, status)
      setSelected({ ...selected, status })
      setData(d => d && { ...d, items: d.items.map(i => (i.id === selected.id ? { ...i, status } : i)) })
      loadSummary()
    } catch (err) {
      fail(err)
    } finally {
      setBusy(false)
    }
  }

  async function remove() {
    if (!selected || !active) return
    if (!window.confirm('Delete this record permanently? This cannot be undone.')) return
    setBusy(true)
    try {
      await deleteRecord(active.key, selected.id)
      setSelected(null)
      await Promise.all([loadRecords(), loadSummary()])
    } catch (err) {
      fail(err)
    } finally {
      setBusy(false)
    }
  }

  async function download() {
    if (!active) return
    try {
      await exportCsv(active.key, query)
    } catch (err) {
      fail(err)
    }
  }

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1
  const from = data && data.total ? (data.page - 1) * data.limit + 1 : 0
  const to = data ? Math.min(data.page * data.limit, data.total) : 0

  return (
    <div className="min-h-screen" style={{ background: '#F7F8FA', ...font }}>
      <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 sm:px-6 py-3" style={{ background: NAVY }}>
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-white font-extrabold">INF Admin</span>
          <Link to="/" className="text-white/50 text-sm hover:text-white truncate">View website ↗</Link>
        </div>
        <button onClick={onLogout} className="text-sm text-white/80 hover:text-white px-3 py-1.5 rounded-full" style={{ border: '1px solid rgba(255,255,255,0.25)' }}>Log out</button>
      </header>

      <div className="lg:flex">
        {/* Collections: sidebar on large screens, scrolling chips on phones */}
        <nav aria-label="Collections" className="lg:w-64 lg:shrink-0 lg:min-h-[calc(100vh-52px)] bg-white lg:border-r border-b lg:border-b-0 border-gray-100">
          <ul className="flex lg:flex-col gap-1 overflow-x-auto p-3">
            {!summary && <li className="text-sm text-gray-400 px-3 py-2">Loading…</li>}
            {summary?.map(s => {
              const on = s.key === active?.key
              return (
                <li key={s.key} className="shrink-0">
                  <button onClick={() => openCollection(s.key)} aria-current={on ? 'page' : undefined}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm text-left whitespace-nowrap"
                    style={{ background: on ? 'rgba(244,124,32,0.1)' : 'transparent', color: on ? NAVY : '#4b5563', fontWeight: on ? 700 : 500 }}>
                    <span>{s.label}</span>
                    <span className="flex items-center gap-1.5">
                      {s.unread > 0 && <span className="text-[11px] font-bold text-white rounded-full px-2 py-0.5" style={{ background: ORANGE }} title={`${s.unread} new`}>{s.unread}</span>}
                      <span className="text-xs text-gray-400">{s.total}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {active && (
            <>
              <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
                <div>
                  <h1 className="text-2xl font-extrabold" style={{ color: NAVY }}>{active.label}</h1>
                  <p className="text-sm text-gray-500 mt-1">{active.total} total · {active.unread} new</p>
                </div>
                <button onClick={download} className="px-4 py-2 rounded-full text-sm font-bold" style={{ border: `2px solid ${NAVY}`, color: NAVY }}>Export CSV</button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <input type="search" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} aria-label="Search records"
                  className="flex-1 min-w-0 px-4 py-2.5 rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-orange-300" style={{ border: '1px solid rgba(13,43,69,0.12)' }} />
                <select value={query.status} onChange={e => setQuery(q => ({ ...q, status: e.target.value as Query['status'], page: 1 }))} aria-label="Filter by status"
                  className="px-4 py-2.5 rounded-xl text-sm bg-white outline-none" style={{ border: '1px solid rgba(13,43,69,0.12)' }}>
                  <option value="">All</option>
                  <option value="new">New</option>
                  <option value="done">Handled</option>
                </select>
              </div>
            </>
          )}

          {error && <p role="alert" className="rounded-xl px-4 py-3 mb-4 text-sm" style={{ background: 'rgba(220,38,38,0.06)', color: '#b91c1c' }}>{error}</p>}

          {active && (
            <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(13,43,69,0.08)' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wide text-gray-400" style={{ background: '#FAFAFB' }}>
                      <th className="px-4 py-3 font-bold whitespace-nowrap">Received</th>
                      {active.columns.map(c => <th key={c.path} className="px-4 py-3 font-bold whitespace-nowrap">{c.label}</th>)}
                      <th className="px-4 py-3 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.items.map(r => (
                      <tr key={r.id} onClick={() => setSelected(r)} className="border-t border-gray-100 cursor-pointer hover:bg-orange-50/40"
                        style={{ fontWeight: r.status === 'new' ? 600 : 400 }}>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                          <button className="text-left hover:underline" onClick={e => { e.stopPropagation(); setSelected(r) }}>{dateTime(r.createdAt)}</button>
                        </td>
                        {active.columns.map(c => (
                          <td key={c.path} className="px-4 py-3 max-w-[260px] truncate" style={{ color: NAVY }} title={cellText(c.path, valueAt(r, c.path))}>
                            {cellText(c.path, valueAt(r, c.path))}
                          </td>
                        ))}
                        <td className="px-4 py-3">
                          <span className="text-xs font-bold rounded-full px-2.5 py-1 whitespace-nowrap"
                            style={r.status === 'done' ? { background: 'rgba(46,139,87,0.1)', color: '#2E8B57' } : { background: 'rgba(244,124,32,0.12)', color: '#c25e0f' }}>
                            {r.status === 'done' ? 'Handled' : 'New'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {data && data.items.length === 0 && !loading && (
                <p className="text-center text-sm text-gray-400 py-12">{query.q || query.status ? 'No records match.' : 'Nothing here yet.'}</p>
              )}
              {loading && !data && <p className="text-center text-sm text-gray-400 py-12">Loading…</p>}
              {data && data.total > 0 && (
                <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 text-sm text-gray-500">
                  <span>{from}–{to} of {data.total}</span>
                  <div className="flex gap-2">
                    <button disabled={data.page <= 1} onClick={() => setQuery(q => ({ ...q, page: q.page - 1 }))} className="px-3 py-1.5 rounded-lg disabled:opacity-40" style={{ border: '1px solid rgba(13,43,69,0.12)' }}>← Prev</button>
                    <button disabled={data.page >= totalPages} onClick={() => setQuery(q => ({ ...q, page: q.page + 1 }))} className="px-3 py-1.5 rounded-lg disabled:opacity-40" style={{ border: '1px solid rgba(13,43,69,0.12)' }}>Next →</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {selected && active && (
        <Detail record={selected} label={active.label} busy={busy} onClose={() => setSelected(null)} onStatus={changeStatus} onDelete={remove} />
      )}
    </div>
  )
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => !!getSession())
  const [notice, setNotice] = useState('')

  useEffect(() => { document.title = 'Admin — India Network Foundation' }, [])

  // Keep the admin panel out of search engines
  useEffect(() => {
    const meta = Object.assign(document.createElement('meta'), { name: 'robots', content: 'noindex, nofollow' })
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])

  const onAuthLost = useCallback((msg: string) => { setNotice(msg); setAuthed(false) }, [])

  if (!authed) return <Login notice={notice} onLogin={() => { setNotice(''); setAuthed(true) }} />
  return <Dashboard onAuthLost={onAuthLost} onLogout={() => { logout(); setAuthed(false) }} />
}
