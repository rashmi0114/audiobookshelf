const express = require('express')
const router = express.Router()
const AchievementController = require('../controllers/AchievementController')

router.post('/complete', AchievementController.completeItem)
router.get('/me', AchievementController.getMyAchievements)
router.get('/catalog', AchievementController.getCatalog)

module.exports = router
