// MongoDB connection shared by the whole server. The database name comes from the end of MONGODB_URI.
import { MongoClient } from 'mongodb'
import { COLLECTIONS } from './collections.js'

let client = null

export function db() {
  if (!client) client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10_000 })
  return client.db()
}

// Connect early so a bad URI or blocked IP shows up in the log at startup, and make sure the indexes exist
export async function connectDb() {
  const database = db()
  await client.connect()
  for (const key of Object.keys(COLLECTIONS)) {
    await database.collection(key).createIndex({ createdAt: -1 })
  }
  await database.collection('newsletter').createIndex({ email: 1 }, { unique: true })
  await database.collection('insurance-purchases').createIndex({ voucherCode: 1 })
  console.log(`Connected to MongoDB database "${database.databaseName}"`)
}
