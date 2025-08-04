const AchievementManager = require('../managers/AchievementManager')

const addAchievement = (req, res) => {
  const { userId, type, bookId } = req.body

  if (!userId || !type || !bookId) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  AchievementManager.addAchievement(userId, { type, bookId })
  return res.status(200).json({ message: `Achievement recorded for ${type}` })
}

const getAchievements = (req, res) => {
  const { userId } = req.params

  if (!userId) {
    return res.status(400).json({ message: 'Missing userId in URL' })
  }

  const achievements = AchievementManager.getUserAchievements(userId)
  return res.status(200).json({ userId, achievements })
}

module.exports = {
  addAchievement,
  getAchievements
}
