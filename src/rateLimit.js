// Small in-memory rate limiter per IP address — enough to stop form spam and password guessing
// on a single server. Counts reset when the server restarts.
export function rateLimit({ max, windowMs, message }) {
  const hits = new Map() // ip -> timestamps within the window

  setInterval(() => {
    const cutoff = Date.now() - windowMs
    for (const [ip, times] of hits) {
      const recent = times.filter(t => t > cutoff)
      if (recent.length) hits.set(ip, recent)
      else hits.delete(ip)
    }
  }, windowMs).unref()

  return (req, res, next) => {
    const now = Date.now()
    const recent = (hits.get(req.ip) ?? []).filter(t => t > now - windowMs)
    if (recent.length >= max) return res.status(429).json({ error: message })
    recent.push(now)
    hits.set(req.ip, recent)
    next()
  }
}
