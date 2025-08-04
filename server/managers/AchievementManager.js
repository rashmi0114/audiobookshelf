//Manages reading/writing achievements to/from the local file system - Logic layer
//fs Nodejs building modules which are lets you read/write files and create the file path
const fs = require('fs')
const path = require('path')

// where the achievements are saved
const ACHIEVEMENT_FILE = path.join(__dirname, '../../data/achievements.json')

//Reads the achievements.json file. Returns all data as a JS object
function loadAchievements() {
  if (!fs.existsSync(ACHIEVEMENT_FILE)) return {}
  return JSON.parse(fs.readFileSync(ACHIEVEMENT_FILE, 'utf-8'))
}

//Writes updated achievements back to the file.
function saveAchievements(data) {
  fs.writeFileSync(ACHIEVEMENT_FILE, JSON.stringify(data, null, 2))
}

module.exports = {
  //Adds an achievement for the given user.
  addAchievement(userId, achievement) {
    const data = loadAchievements()
    if (!data[userId]) data[userId] = []
    data[userId].push({ ...achievement, timestamp: new Date().toISOString() })
    saveAchievements(data)
  },

  //Returns all achievements of a user.
  getUserAchievements(userId) {
    const data = loadAchievements()
    return data[userId] || []
  },

  //Checks if the user already has a specific achievement.
  hasAchievement(userId, type, bookId) {
    const data = loadAchievements()
    return (data[userId] || []).some((a) => a.type === type && a.bookId === bookId)
  }
}
