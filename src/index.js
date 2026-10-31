import express from 'express'
import insuranceRoutes from './routes/insurance.js'
import formRoutes from './routes/forms.js'
import adminRoutes from './routes/admin.js'
import { connectDb } from './db.js'

const required = ['BMI_BASE_URL', 'BMI_AUTH_USER', 'BMI_AUTH_KEY', 'MONGODB_URI', 'ADMIN_PASSWORD', 'ADMIN_TOKEN_SECRET']
const missing = required.filter(k => !process.env[k])
if (missing.length) {
  console.error(`Missing settings in server/.env: ${missing.join(', ')} (see .env.example)`)
  process.exit(1)
}

const app = express()
app.disable('x-powered-by')
app.set('trust proxy', 1)
app.use(express.json({ limit: '100kb' }))

// Allow the website to call the API directly when it is hosted on another origin
const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)
app.use((req, res, next) => {
  const origin = req.get('origin')
  if (origin && allowed.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin)
    res.set('Vary', 'Origin')
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.set('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.use('/api/insurance', insuranceRoutes)
app.use('/api/forms', formRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found.' }))

// Errors: validation and BMI messages are safe to show; anything else is logged only
app.use((err, _req, res, _next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON body.' })
  const status = err.status && err.status < 600 ? err.status : 500
  if (status >= 500 && !err.details) console.error(err)
  res.status(status).json({
    error: status === 500 ? 'Something went wrong. Please try again.' : err.message,
    ...(err.errors ? { fields: err.errors } : {}),
  })
})

const port = Number(process.env.PORT) || 4000
app.listen(port, () => console.log(`INF API server running on http://localhost:${port}`))

// The server still starts if MongoDB is down (insurance quotes keep working); saving forms will fail until it is reachable
connectDb().catch(err => console.error(`Could not connect to MongoDB: ${err.message}`))
