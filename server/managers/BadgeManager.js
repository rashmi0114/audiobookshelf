const Logger = require('../Logger')
const Database = require('../Database')

/**
 * Badge Manager - Handles automatic badge unlocking based on user actions
 */
class BadgeManager {
  constructor() {
    this.badgeDefinitions = {
      // Reading Journey
      'first-page': { condition: 'finishedItems', threshold: 1 },
      'lost-stories': { condition: 'finishedItems', threshold: 5 },
      'cant-put-down': { condition: 'finishedItems', threshold: 10 },
      'flipping-worlds': { condition: 'finishedItems', threshold: 25 },
      'endurance-listener': { condition: 'finishedItems', threshold: 50 },
      'hundred-tales': { condition: 'finishedItems', threshold: 100 },
      'legend-library': { condition: 'finishedItems', threshold: 250 },

      // Getting Started
      'builder-shelves': { condition: 'createdLibrary', threshold: 1 },
      'shelf-organizer': { condition: 'editedLibrary', threshold: 1 },
      'first-contribution': { condition: 'uploadedBook', threshold: 1 },
      'pocket-librarian': { condition: 'downloadedBook', threshold: 1 },
      'saga-initiator': { condition: 'deletedUpload', threshold: 1 },
      'curator-training': { condition: 'createdCollection', threshold: 1 },
      'tune-weaver': { condition: 'createdPlaylist', threshold: 1 },

      // Adventurer's Path
      'seeker-stories': { condition: 'performedSearch', threshold: 1 },
      'refined-explorer': { condition: 'visitedUploadPage', threshold: 1 },
      'author-discoverer': { condition: 'visitedAuthorView', threshold: 1 },
      'voice-hunter': { condition: 'visitedNarratorView', threshold: 1 },
      pathfinder: { condition: 'visitedSettings', threshold: 1 },

      // Daily Devotion
      'first-login': { condition: 'loginCount', threshold: 1 },
      'double-dip': { condition: 'loginSameDay', threshold: 2 },
      'three-day-streak': { condition: 'loginStreak', threshold: 3 },
      'weekly-streak': { condition: 'loginStreak', threshold: 7 },
      'monthly-streak': { condition: 'loginStreak', threshold: 30 },

      // Search Master
      'first-search': { condition: 'searchCount', threshold: 1 },
      curious: { condition: 'searchCount', threshold: 3 },
      seeker: { condition: 'searchCount', threshold: 5 },
      explorer: { condition: 'searchCount', threshold: 10 },
      hunter: { condition: 'searchCount', threshold: 50 },
      'master-queries': { condition: 'searchCount', threshold: 100 },

      // Reading Streak
      'day-one-reader': { condition: 'readToday', threshold: 1 },
      'back-to-back': { condition: 'readingStreak', threshold: 2 },
      'focused-five': { condition: 'readingStreak', threshold: 5 },
      'weekly-reader': { condition: 'readingStreak', threshold: 7 },
      'monthly-reader': { condition: 'readingStreak', threshold: 30 }
    }
  }

  /**
   * Check and unlock badges for a user based on their current stats
   * @param {import('../models/User')} user
   * @param {string} actionType - The type of action that triggered the check
   * @param {Object} actionData - Additional data about the action
   */
  async checkAndUnlockBadges(user, actionType, actionData = {}) {
    try {
      const currentBadges = user.extraData?.badges || {}
      const unlockedBadges = []

      // Get user stats based on action type
      const stats = await this.getUserStats(user, actionType, actionData)

      // Check each badge definition
      for (const [badgeId, definition] of Object.entries(this.badgeDefinitions)) {
        // Skip if already unlocked
        if (currentBadges[badgeId]) continue

        // Check if condition is met
        if (this.checkBadgeCondition(badgeId, definition, stats, actionType)) {
          await this.unlockBadge(user, badgeId)
          unlockedBadges.push(badgeId)
          Logger.info(`[BadgeManager] Unlocked badge "${badgeId}" for user "${user.username}"`)
        }
      }

      // Emit socket event for newly unlocked badges
      if (unlockedBadges.length > 0) {
        const SocketAuthority = require('../SocketAuthority')
        SocketAuthority.clientEmitter(user.id, 'badges_unlocked', {
          badges: unlockedBadges
        })
      }

      return unlockedBadges
    } catch (error) {
      Logger.error(`[BadgeManager] Error checking badges for user ${user.username}:`, error)
      return []
    }
  }

  /**
   * Get user statistics for badge checking
   * @param {import('../models/User')} user
   * @param {string} actionType
   * @param {Object} actionData
   * @returns {Promise<Object>}
   */
  async getUserStats(user, actionType, actionData) {
    const stats = {
      finishedItems: 0,
      createdLibrary: 0,
      editedLibrary: 0,
      uploadedBook: 0,
      downloadedBook: 0,
      deletedUpload: 0,
      createdCollection: 0,
      createdPlaylist: 0,
      performedSearch: 0,
      visitedUploadPage: 0,
      visitedAuthorView: 0,
      visitedNarratorView: 0,
      visitedSettings: 0,
      loginCount: 0,
      loginSameDay: 0,
      loginStreak: 0,
      searchCount: 0,
      readToday: 0,
      readingStreak: 0
    }

    try {
      // Count finished items
      const finishedProgress = user.mediaProgresses?.filter((mp) => mp.isFinished) || []
      stats.finishedItems = finishedProgress.length

      // Count libraries (simplified - would need to track creation events)
      // For now, we'll use a placeholder approach
      stats.createdLibrary = user.extraData?.stats?.createdLibrary || 0
      stats.editedLibrary = user.extraData?.stats?.editedLibrary || 0
      stats.uploadedBook = user.extraData?.stats?.uploadedBook || 0
      stats.downloadedBook = user.extraData?.stats?.downloadedBook || 0
      stats.deletedUpload = user.extraData?.stats?.deletedUpload || 0
      stats.createdCollection = user.extraData?.stats?.createdCollection || 0
      stats.createdPlaylist = user.extraData?.stats?.createdPlaylist || 0
      stats.performedSearch = user.extraData?.stats?.performedSearch || 0
      stats.visitedUploadPage = user.extraData?.stats?.visitedUploadPage || 0
      stats.visitedAuthorView = user.extraData?.stats?.visitedAuthorView || 0
      stats.visitedNarratorView = user.extraData?.stats?.visitedNarratorView || 0
      stats.visitedSettings = user.extraData?.stats?.visitedSettings || 0
      stats.searchCount = user.extraData?.stats?.searchCount || 0

      // Calculate login stats
      const today = new Date().toISOString().split('T')[0]
      const loginHistory = user.extraData?.loginHistory || []
      stats.loginCount = loginHistory.length

      // Count logins today
      stats.loginSameDay = loginHistory.filter((login) => login.date === today).length

      // Calculate login streak
      stats.loginStreak = this.calculateLoginStreak(loginHistory)

      // Calculate reading streak
      stats.readingStreak = this.calculateReadingStreak(finishedProgress)

      // Check if read today
      stats.readToday = finishedProgress.some((mp) => {
        const finishDate = new Date(mp.finishedAt).toISOString().split('T')[0]
        return finishDate === today
      })
        ? 1
        : 0
    } catch (error) {
      Logger.error(`[BadgeManager] Error getting user stats:`, error)
    }

    return stats
  }

  /**
   * Check if a badge condition is met
   * @param {string} badgeId
   * @param {Object} definition
   * @param {Object} stats
   * @param {string} actionType
   * @returns {boolean}
   */
  checkBadgeCondition(badgeId, definition, stats, actionType) {
    const { condition, threshold } = definition

    // Special handling for specific badges based on action type
    switch (badgeId) {
      case 'first-page':
        return actionType === 'itemFinished' && stats.finishedItems >= threshold
      case 'lost-stories':
      case 'cant-put-down':
      case 'flipping-worlds':
      case 'endurance-listener':
      case 'hundred-tales':
      case 'legend-library':
        return actionType === 'itemFinished' && stats.finishedItems >= threshold

      case 'builder-shelves':
        return actionType === 'libraryCreated' && stats.createdLibrary >= threshold
      case 'shelf-organizer':
        return actionType === 'libraryEdited' && stats.editedLibrary >= threshold
      case 'first-contribution':
        return actionType === 'bookUploaded' && stats.uploadedBook >= threshold
      case 'pocket-librarian':
        return actionType === 'bookDownloaded' && stats.downloadedBook >= threshold
      case 'saga-initiator':
        return actionType === 'uploadDeleted' && stats.deletedUpload >= threshold
      case 'curator-training':
        return actionType === 'collectionCreated' && stats.createdCollection >= threshold
      case 'tune-weaver':
        return actionType === 'playlistCreated' && stats.createdPlaylist >= threshold

      case 'seeker-stories':
        return actionType === 'searchPerformed' && stats.performedSearch >= threshold
      case 'refined-explorer':
        return actionType === 'uploadPageVisited' && stats.visitedUploadPage >= threshold
      case 'author-discoverer':
        return actionType === 'authorViewVisited' && stats.visitedAuthorView >= threshold
      case 'voice-hunter':
        return actionType === 'narratorViewVisited' && stats.visitedNarratorView >= threshold
      case 'pathfinder':
        return actionType === 'settingsVisited' && stats.visitedSettings >= threshold

      case 'first-login':
        return actionType === 'userLogin' && stats.loginCount >= threshold
      case 'double-dip':
        return actionType === 'userLogin' && stats.loginSameDay >= threshold
      case 'three-day-streak':
      case 'weekly-streak':
      case 'monthly-streak':
        return actionType === 'userLogin' && stats.loginStreak >= threshold

      case 'first-search':
      case 'curious':
      case 'seeker':
      case 'explorer':
      case 'hunter':
      case 'master-queries':
        return actionType === 'searchPerformed' && stats.searchCount >= threshold

      case 'day-one-reader':
        return actionType === 'itemFinished' && stats.readToday >= threshold
      case 'back-to-back':
      case 'focused-five':
      case 'weekly-reader':
      case 'monthly-reader':
        return actionType === 'itemFinished' && stats.readingStreak >= threshold

      default:
        return stats[condition] >= threshold
    }
  }

  /**
   * Unlock a specific badge for a user
   * @param {import('../models/User')} user
   * @param {string} badgeId
   */
  async unlockBadge(user, badgeId) {
    try {
      const extraData = { ...user.extraData }
      if (!extraData.badges) extraData.badges = {}

      extraData.badges[badgeId] = true
      user.extraData = extraData
      user.changed('extraData', true)
      await user.save()

      Logger.info(`[BadgeManager] Unlocked badge "${badgeId}" for user "${user.username}"`)
    } catch (error) {
      Logger.error(`[BadgeManager] Error unlocking badge "${badgeId}" for user "${user.username}":`, error)
    }
  }

  /**
   * Update user stats for tracking
   * @param {import('../models/User')} user
   * @param {string} statType
   * @param {number} increment
   */
  async updateUserStat(user, statType, increment = 1) {
    try {
      const extraData = { ...user.extraData }
      if (!extraData.stats) extraData.stats = {}

      extraData.stats[statType] = (extraData.stats[statType] || 0) + increment
      user.extraData = extraData
      user.changed('extraData', true)
      await user.save()
    } catch (error) {
      Logger.error(`[BadgeManager] Error updating user stat "${statType}" for user "${user.username}":`, error)
    }
  }

  /**
   * Record user login for streak tracking
   * @param {import('../models/User')} user
   */
  async recordUserLogin(user) {
    try {
      const today = new Date().toISOString().split('T')[0]
      const extraData = { ...user.extraData }

      if (!extraData.loginHistory) extraData.loginHistory = []

      // Add today's login if not already recorded
      const todayLogin = extraData.loginHistory.find((login) => login.date === today)
      if (!todayLogin) {
        extraData.loginHistory.push({
          date: today,
          timestamp: Date.now()
        })

        // Keep only last 90 days of login history
        const cutoffDate = new Date()
        cutoffDate.setDate(cutoffDate.getDate() - 90)
        extraData.loginHistory = extraData.loginHistory.filter((login) => new Date(login.date) >= cutoffDate)

        user.extraData = extraData
        user.changed('extraData', true)
        await user.save()
      }
    } catch (error) {
      Logger.error(`[BadgeManager] Error recording login for user "${user.username}":`, error)
    }
  }

  /**
   * Calculate login streak from login history
   * @param {Array} loginHistory
   * @returns {number}
   */
  calculateLoginStreak(loginHistory) {
    if (!loginHistory || loginHistory.length === 0) return 0

    const sortedLogins = loginHistory.map((login) => new Date(login.date)).sort((a, b) => b - a) // Sort descending

    let streak = 0
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    for (const loginDate of sortedLogins) {
      const daysDiff = Math.floor((currentDate - loginDate) / (1000 * 60 * 60 * 24))

      if (daysDiff === streak) {
        streak++
      } else if (daysDiff === streak + 1) {
        // Allow for 1 day gap
        streak++
      } else {
        break
      }

      currentDate.setDate(currentDate.getDate() - 1)
    }

    return streak
  }

  /**
   * Calculate reading streak from finished progress
   * @param {Array} finishedProgress
   * @returns {number}
   */
  calculateReadingStreak(finishedProgress) {
    if (!finishedProgress || finishedProgress.length === 0) return 0

    const finishedDates = finishedProgress
      .map((mp) => new Date(mp.finishedAt).toISOString().split('T')[0])
      .filter((date, index, arr) => arr.indexOf(date) === index) // Remove duplicates
      .map((date) => new Date(date))
      .sort((a, b) => b - a) // Sort descending

    let streak = 0
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    for (const finishedDate of finishedDates) {
      const daysDiff = Math.floor((currentDate - finishedDate) / (1000 * 60 * 60 * 24))

      if (daysDiff === streak) {
        streak++
      } else if (daysDiff === streak + 1) {
        // Allow for 1 day gap
        streak++
      } else {
        break
      }

      currentDate.setDate(currentDate.getDate() - 1)
    }

    return streak
  }
}

module.exports = new BadgeManager()
