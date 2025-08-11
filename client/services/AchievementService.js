// frontend/src/services/AchievementService.js

export default {
  async getUserAchievements(userId) {
    const res = await fetch(`/api/achievements/user?userId=${userId}`)
    if (!res.ok) throw new Error('Failed to fetch achievements')
    return res.json()
  },

  async notifyChapterComplete({ userId, bookId, chapterIndex }) {
    const res = await fetch('/api/achievements/chapter-complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, bookId, chapterIndex })
    })
    if (!res.ok) throw new Error('Failed to send chapter complete event')
    return res.json()
  }
}
