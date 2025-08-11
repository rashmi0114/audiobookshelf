const fs = require('fs')
const path = require('path')
const catalog = require('../utils/badges')
const DB_FILE = path.join(process.cwd(), 'data', 'achievements.json')

function ensureDirFor(filePath) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function readDb() {
  try {
    ensureDirFor(DB_FILE)
    if (!fs.existsSync(DB_FILE)) return {}
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8') || '{}')
  } catch {
    return {}
  }
}
function writeDb(db) {
  ensureDirFor(DB_FILE)
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))
}
function ensureUser(db, userId) {
  if (!db[userId]) db[userId] = { total: 0, completed: {}, badges: [] }
  return db[userId]
}
function computeNewBadges(total, existing) {
  const earned = new Set(existing.map((b) => b.key))
  const newly = []
  for (const b of catalog) {
    if (total >= b.count && !earned.has(b.key)) newly.push({ key: b.key, name: b.name, count: b.count })
  }
  return newly
}

exports.readUser = async (userId) => {
  const db = readDb()
  return ensureUser(db, userId)
}

exports.recordCompletion = async ({ userId, itemId, itemType, title }) => {
  const db = readDb()
  const u = ensureUser(db, userId)
  if (!u.completed[itemId]) {
    u.completed[itemId] = { itemType, title, at: Date.now() }
    u.total += 1
  }
  const newly = computeNewBadges(u.total, u.badges)
  if (newly.length) {
    const existing = new Set(u.badges.map((b) => b.key))
    for (const n of newly) if (!existing.has(n.key)) u.badges.push(n)
  }
  writeDb(db)
  const highest = newly.length ? newly.reduce((a, b) => (a.count > b.count ? a : b)) : null
  return { total: u.total, newlyAwardedBadges: newly, highest, state: u }
}
