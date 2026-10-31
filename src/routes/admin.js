import { Router } from 'express'
import { ObjectId } from 'mongodb'
import { db } from '../db.js'
import { COLLECTIONS } from '../collections.js'
import { checkPassword, issueToken, requireAdmin } from '../auth.js'
import { rateLimit } from '../rateLimit.js'

const router = Router()
const wrap = fn => (req, res, next) => fn(req, res).catch(next)

router.post('/login', rateLimit({ max: 10, windowMs: 15 * 60 * 1000, message: 'Too many login attempts. Please wait 15 minutes.' }), (req, res) => {
  if (!checkPassword(req.body?.password)) return res.status(401).json({ error: 'Wrong password.' })
  res.json(issueToken())
})

router.use(requireAdmin)

function collectionFor(req) {
  const def = COLLECTIONS[req.params.collection]
  if (!def) throw Object.assign(new Error('Unknown collection.'), { status: 404 })
  return { def, col: db().collection(req.params.collection) }
}

const toJson = ({ _id, ...doc }) => ({ id: String(_id), ...doc })
const escapeRegex = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function filterFor(def, { q, status }) {
  const filter = {}
  if (status === 'new' || status === 'done') filter.status = status
  const term = typeof q === 'string' ? q.trim().slice(0, 100) : ''
  if (term) {
    const paths = new Set([...def.columns.map(([p]) => p), ...Object.keys(def.fields ?? {}), 'travelers.firstName', 'travelers.lastName'])
    const regex = { $regex: escapeRegex(term), $options: 'i' }
    filter.$or = [...paths].map(p => ({ [p]: regex }))
  }
  return filter
}

// Collections with their table columns and counts, for the sidebar
router.get('/summary', wrap(async (_req, res) => {
  const list = await Promise.all(Object.entries(COLLECTIONS).map(async ([key, def]) => {
    const col = db().collection(key)
    const [total, unread] = await Promise.all([col.estimatedDocumentCount(), col.countDocuments({ status: 'new' })])
    return { key, label: def.label, columns: def.columns.map(([path, label]) => ({ path, label })), total, unread }
  }))
  res.json(list)
}))

router.get('/records/:collection', wrap(async (req, res) => {
  const { def, col } = collectionFor(req)
  const limit = Math.min(Math.max(Number(req.query.limit) || 25, 1), 100)
  const page = Math.max(Number(req.query.page) || 1, 1)
  const filter = filterFor(def, req.query)
  const [items, total] = await Promise.all([
    col.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).toArray(),
    col.countDocuments(filter),
  ])
  res.json({ items: items.map(toJson), total, page, limit })
}))

// Mark a record as handled ("done") or back to "new"
router.patch('/records/:collection/:id', wrap(async (req, res) => {
  const { col } = collectionFor(req)
  const status = req.body?.status
  if (!ObjectId.isValid(req.params.id) || !['new', 'done'].includes(status)) return res.status(400).json({ error: 'Invalid request.' })
  const result = await col.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { status } })
  if (!result.matchedCount) return res.status(404).json({ error: 'Record not found.' })
  res.json({ ok: true })
}))

router.delete('/records/:collection/:id', wrap(async (req, res) => {
  const { col } = collectionFor(req)
  if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid id.' })
  const result = await col.deleteOne({ _id: new ObjectId(req.params.id) })
  if (!result.deletedCount) return res.status(404).json({ error: 'Record not found.' })
  res.json({ ok: true })
}))

// ── CSV export ──────────────────────────────────────────────────────────────
function flatten(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k
    if (v instanceof Date) out[key] = v.toISOString()
    else if (Array.isArray(v)) out[key] = v.map(x => (x && typeof x === 'object' ? Object.values(x).join(' ') : x)).join('; ')
    else if (v && typeof v === 'object') flatten(v, key, out)
    else out[key] = v
  }
  return out
}

function csvCell(value) {
  let s = value === undefined || value === null ? '' : String(value)
  // Stop spreadsheets from running cell text as formulas (phone numbers like "+1 555…" are left alone)
  if (/^[=@\t\r]/.test(s) || (/^[+-]/.test(s) && !/^[+-]?[\d\s().-]+$/.test(s))) s = `'${s}`
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

router.get('/export/:collection', wrap(async (req, res) => {
  const { def, col } = collectionFor(req)
  const docs = await col.find(filterFor(def, req.query)).sort({ createdAt: -1 }).limit(50_000).toArray()
  const rows = docs.map(d => flatten(toJson(d)))
  const headers = [...new Set(['id', 'createdAt', 'status', ...rows.flatMap(Object.keys)])]
  const csv = [headers.join(','), ...rows.map(r => headers.map(h => csvCell(r[h])).join(','))].join('\r\n')
  res.set('Content-Type', 'text/csv; charset=utf-8')
  res.set('Content-Disposition', `attachment; filename="${req.params.collection}-${new Date().toISOString().slice(0, 10)}.csv"`)
  res.send('﻿' + csv) // BOM so Excel reads UTF-8 names correctly
}))

export default router
