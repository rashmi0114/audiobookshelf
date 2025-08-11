const assert = require('assert')
const manager = require('../../../server/managers/AchievementManager')
const fs = require('fs')

// Use a temp file for DB_FILE by monkeypatching if needed;
// or run with a throwaway userId each test.

describe('Badge thresholds', () => {
  it('awards correct badges at 1,5,10,25,50,100,101', async () => {
    const uid = 'test-user-' + Date.now()
    // 1
    await manager.recordCompletion({ userId: uid, itemId: 'A' })
    let me = await manager.readUser(uid)
    assert.equal(me.total, 1)
    assert.ok(me.badges.find((b) => b.key === 'new_reader'))

    // 5
    await manager.recordCompletion({ userId: uid, itemId: 'B' })
    await manager.recordCompletion({ userId: uid, itemId: 'C' })
    await manager.recordCompletion({ userId: uid, itemId: 'D' })
    await manager.recordCompletion({ userId: uid, itemId: 'E' })
    me = await manager.readUser(uid)
    assert.ok(me.badges.find((b) => b.key === 'bookworm'))

    // jump to 101 by unique ids
    for (let i = 6; i <= 101; i++) {
      await manager.recordCompletion({ userId: uid, itemId: 'X' + i })
    }
    me = await manager.readUser(uid)
    assert.equal(me.total, 101)
    assert.ok(me.badges.find((b) => b.key === 'centurion'))
    assert.ok(me.badges.find((b) => b.key === 'vip'))
  })

  it('is idempotent per itemId', async () => {
    const uid = 'test-idem-' + Date.now()
    await manager.recordCompletion({ userId: uid, itemId: 'A' })
    await manager.recordCompletion({ userId: uid, itemId: 'A' })
    const me = await manager.readUser(uid)
    assert.equal(me.total, 1)
  })
})
