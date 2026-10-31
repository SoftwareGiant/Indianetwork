// Admin login: one shared password (ADMIN_PASSWORD) exchanged for a signed token that expires.
// Token = base64url(payload) + "." + HMAC-SHA256 signature, so the server keeps no session state.
import { createHash, createHmac, timingSafeEqual } from 'node:crypto'

const TOKEN_HOURS = 12

const sign = payload => createHmac('sha256', process.env.ADMIN_TOKEN_SECRET).update(payload).digest('base64url')
const sha = s => createHash('sha256').update(String(s)).digest()

export function checkPassword(password) {
  return typeof password === 'string' && timingSafeEqual(sha(password), sha(process.env.ADMIN_PASSWORD))
}

export function issueToken() {
  const expiresAt = Date.now() + TOKEN_HOURS * 60 * 60 * 1000
  const payload = Buffer.from(JSON.stringify({ exp: expiresAt })).toString('base64url')
  return { token: `${payload}.${sign(payload)}`, expiresAt }
}

function verifyToken(token) {
  const [payload, signature] = String(token).split('.')
  if (!payload || !signature) return false
  const expected = Buffer.from(sign(payload))
  const given = Buffer.from(signature)
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return false
  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')).exp > Date.now()
  } catch {
    return false
  }
}

export function requireAdmin(req, res, next) {
  const token = (req.get('authorization') || '').replace(/^Bearer\s+/i, '')
  if (!verifyToken(token)) return res.status(401).json({ error: 'Please log in again.' })
  next()
}
