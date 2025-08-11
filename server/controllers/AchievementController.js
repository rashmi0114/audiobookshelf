const AchievementManager = require('../managers/AchievementManager')
const badgesCatalog = require('../utils/badges')

exports.getCatalog = async (_req, res) => {
  res.json({ badges: badgesCatalog })
}

exports.getMyAchievements = async (req, res) => {
  const userId = req.user?.id || 'anon'
  const data = await AchievementManager.readUser(userId)
  res.json(data)
}

exports.completeItem = async (req, res) => {
  const userId = req.user?.id || 'anon'
  const { itemId, itemType, title } = req.body || {}
  if (!itemId) return res.status(400).json({ message: 'Missing itemId' })

  const result = await AchievementManager.recordCompletion({ userId, itemId, itemType, title })
  res.json(result)
}
