// Saving records: MongoDB first. Insurance purchases also have a file fallback (server/data/),
// because the customer has already been charged by the time we record the sale.
import { appendFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { db } from './db.js'

const DATA_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'data')

export async function save(collection, record) {
  const entry = { ...record, status: 'new', createdAt: new Date() }
  const { insertedId } = await db().collection(collection).insertOne(entry)
  return { ...entry, id: String(insertedId) }
}

export async function saveToFile(collection, record) {
  await mkdir(DATA_DIR, { recursive: true })
  const entry = { ...record, createdAt: new Date().toISOString() }
  await appendFile(path.join(DATA_DIR, `${collection}.jsonl`), JSON.stringify(entry) + '\n', 'utf8')
}
