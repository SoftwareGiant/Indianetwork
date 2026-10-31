# INF API server

Node.js (Express) server for the India Network Foundation website. It keeps secrets off the browser and stores website form submissions.

## Run locally

```bash
cd server
npm install
cp .env.example .env   # then fill in BMI credentials, MONGODB_URI and the admin password/secret
npm run dev            # http://localhost:4000, restarts on file changes
```

From the project root you can also run `npm run server`.

The Vite dev server forwards every `/api/*` request to this server (see `apiProxy` in `vite.config.ts`), so the website just calls `/api/...`.

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/insurance/catalogs` | Home countries, destination regions, genders, card types (cached 6 h) |
| POST | `/api/insurance/quote` | BMI Step 1 — plans and prices for a trip |
| GET | `/api/insurance/benefits?planId=&coverageId=` | Benefit table for a coverage |
| POST | `/api/insurance/pricing` | BMI Steps 4/5 — per-traveler premium, add-ons, promo code |
| POST | `/api/insurance/email-quote` | BMI Step 3 — email the quote |
| POST | `/api/insurance/purchase` | BMI Step 7 — pay and issue the voucher |
| POST | `/api/forms/:form` | Save a website form (`contact`, `volunteer`, `newsletter`, `member-project`, `scholarship`, `donation`) — 10 per IP per 10 min |
| POST | `/api/admin/login` | Admin password → session token (12 h) |
| GET | `/api/admin/summary` | Collections with totals and new counts |
| GET | `/api/admin/records/:collection?page=&q=&status=` | List / search records |
| PATCH | `/api/admin/records/:collection/:id` | Mark `new` / `done` |
| DELETE | `/api/admin/records/:collection/:id` | Delete a record |
| GET | `/api/admin/export/:collection` | Download CSV |

## Data

Everything is stored in MongoDB (`MONGODB_URI`), one collection per form plus `insurance-purchases`. The fields each form may send, and the columns the admin panel shows, are defined in `src/collections.js` — add a form there first. Card details and passport numbers are never stored.

If MongoDB is unreachable when an insurance purchase completes, the record is written to `server/data/insurance-purchases.jsonl` instead (the customer has already been charged), so check that folder after any database outage.

## Admin panel

Open `/admin` on the website and log in with `ADMIN_PASSWORD`. It lists every collection with a count of new items, lets you search, open a record, mark it handled, delete it, and export CSV. Change `ADMIN_TOKEN_SECRET` to log everyone out.

## BMI API notes (differences from the PDF, found by testing the sandbox)

- Dates must be `YYYY-MM-DD` (the PDF's `MM-DD-YYYY` is rejected).
- Id lists are plain `1,2,3` — the PDF's `{1,2,3}` makes the server fail.
- Step 7 expects `sReferenceID` (the PDF says `ReferenceID`).
- Step 7 requires the card security code as `cvv` (not in the PDF; `BMI_CVV_FIELD` can override it).
- Step 7 must follow a Step 4/5 call for the same travelers, otherwise Error 8010 or 9999 — the server re-prices right before paying.
- Coverage names come back in Spanish (e.g. "Clásico") even when English is requested.
