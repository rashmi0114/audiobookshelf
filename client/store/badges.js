export const state = () => ({
  userBadges: {
    // Reading Journey
    'first-page': false,
    'lost-stories': false,
    'cant-put-down': false,
    'flipping-worlds': false,
    'endurance-listener': false,
    'hundred-tales': false,
    'legend-library': false,

    // Getting Started
    'builder-shelves': false,
    'shelf-organizer': false,
    'first-contribution': false,
    'pocket-librarian': false,
    'saga-initiator': false,
    'curator-training': false,
    'tune-weaver': false,

    // Adventurer's Path
    'seeker-stories': false,
    'refined-explorer': false,
    'author-discoverer': false,
    'voice-hunter': false,
    pathfinder: false,

    // Daily Devotion
    'first-login': false,
    'double-dip': false,
    'three-day-streak': false,
    'weekly-streak': false,
    'monthly-streak': false,

    // Search Master
    'first-search': false,
    curious: false,
    seeker: false,
    explorer: false,
    hunter: false,
    'master-queries': false,

    // Reading Streak
    'day-one-reader': false,
    'back-to-back': false,
    'focused-five': false,
    'weekly-reader': false,
    'monthly-reader': false
  },

  badgeDefinitions: {
    // Reading Journey
    'first-page': {
      id: 'first-page',
      name: 'Turned the First Page',
      description: 'Finished your first item',
      category: 'reading-journey',
      mainBadgeImage: '/badges/page_turner.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'lost-stories': {
      id: 'lost-stories',
      name: 'Lost in Stories',
      description: 'Finished 5 items',
      category: 'reading-journey',
      mainBadgeImage: '/badges/bookworm.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'cant-put-down': {
      id: 'cant-put-down',
      name: "Can't Put It Down",
      description: 'Finished 10 items',
      category: 'reading-journey',
      mainBadgeImage: '/badges/avid.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'flipping-worlds': {
      id: 'flipping-worlds',
      name: 'Flipping Through Worlds',
      description: 'Finished 25 items',
      category: 'reading-journey',
      mainBadgeImage: '/badges/one_day_finish.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'endurance-listener': {
      id: 'endurance-listener',
      name: 'Endurance Listener',
      description: 'Finished 50 items',
      category: 'reading-journey',
      mainBadgeImage: '/badges/marathoner.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'hundred-tales': {
      id: 'hundred-tales',
      name: '100 Tales Conquered',
      description: 'Finished 100 items',
      category: 'reading-journey',
      mainBadgeImage: '/badges/centurion.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'legend-library': {
      id: 'legend-library',
      name: 'Legend of the Library',
      description: 'Finished 250 items',
      category: 'reading-journey',
      mainBadgeImage: '/badges/legend.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },

    // Getting Started
    'builder-shelves': {
      id: 'builder-shelves',
      name: 'Builder of Shelves',
      description: 'Created your first library',
      category: 'getting-started',
      mainBadgeImage: '/badges/library_creator.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'shelf-organizer': {
      id: 'shelf-organizer',
      name: 'Shelf Organizer',
      description: 'Edited a library',
      category: 'getting-started',
      mainBadgeImage: '/badges/library_editor.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'first-contribution': {
      id: 'first-contribution',
      name: 'First Contribution',
      description: 'Uploaded your first book',
      category: 'getting-started',
      mainBadgeImage: '/badges/book_uploader.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'pocket-librarian': {
      id: 'pocket-librarian',
      name: 'Pocket Librarian',
      description: 'Downloaded a book',
      category: 'getting-started',
      mainBadgeImage: '/badges/book_downloader.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'saga-initiator': {
      id: 'saga-initiator',
      name: 'Saga Initiator',
      description: 'Deleted your first uploaded file',
      category: 'getting-started',
      mainBadgeImage: '/badges/series_starter.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'curator-training': {
      id: 'curator-training',
      name: 'Curator in Training',
      description: 'Created your first collection/playlist',
      category: 'getting-started',
      mainBadgeImage: '/badges/collection_creator.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'tune-weaver': {
      id: 'tune-weaver',
      name: 'Tune Weaver',
      description: 'Created your first playlist',
      category: 'getting-started',
      mainBadgeImage: '/badges/tune_weaver.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },

    // Adventurer's Path
    'seeker-stories': {
      id: 'seeker-stories',
      name: 'Seeker of Stories',
      description: 'Performed your first search',
      category: 'adventurers-path',
      mainBadgeImage: '/badges/author_finder.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'refined-explorer': {
      id: 'refined-explorer',
      name: 'Refined Explorer',
      description: 'Visited the upload page',
      category: 'adventurers-path',
      mainBadgeImage: '/badges/refined_explorer.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'author-discoverer': {
      id: 'author-discoverer',
      name: 'Author Discoverer',
      description: 'Visited author view',
      category: 'adventurers-path',
      mainBadgeImage: '/badges/author_finder.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'voice-hunter': {
      id: 'voice-hunter',
      name: 'Voice Hunter',
      description: 'Visited narrator view',
      category: 'adventurers-path',
      mainBadgeImage: '/badges/narrator_finder.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    pathfinder: {
      id: 'pathfinder',
      name: 'Pathfinder',
      description: 'Visited settings',
      category: 'adventurers-path',
      mainBadgeImage: '/badges/pathfinder.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },

    // Daily Devotion
    'first-login': {
      id: 'first-login',
      name: 'First Login',
      description: 'Logged in for the first time',
      category: 'daily-devotion',
      mainBadgeImage: '/badges/first_login.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'double-dip': {
      id: 'double-dip',
      name: 'Double Dip',
      description: 'Logged in twice in the same day',
      category: 'daily-devotion',
      mainBadgeImage: '/badges/double_dip.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'three-day-streak': {
      id: 'three-day-streak',
      name: '3-Day Streak',
      description: 'Logged in 3 days in a row',
      category: 'daily-devotion',
      mainBadgeImage: '/badges/streak_3.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'weekly-streak': {
      id: 'weekly-streak',
      name: 'Weekly Streak',
      description: 'Logged in 7 days in a row',
      category: 'daily-devotion',
      mainBadgeImage: '/badges/streak_7.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'monthly-streak': {
      id: 'monthly-streak',
      name: 'Monthly Streak',
      description: 'Logged in 30 days in a row',
      category: 'daily-devotion',
      mainBadgeImage: '/badges/streak_30.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },

    // Search Master
    'first-search': {
      id: 'first-search',
      name: 'First Search',
      description: 'Searched for 1 item',
      category: 'search-master',
      mainBadgeImage: '/badges/first_search.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    curious: {
      id: 'curious',
      name: 'Curious',
      description: 'Searched for 3 items',
      category: 'search-master',
      mainBadgeImage: '/badges/curious.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    seeker: {
      id: 'seeker',
      name: 'Seeker',
      description: 'Searched for 5 items',
      category: 'search-master',
      mainBadgeImage: '/badges/seeker.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    explorer: {
      id: 'explorer',
      name: 'Explorer',
      description: 'Searched for 10 items',
      category: 'search-master',
      mainBadgeImage: '/badges/explorer.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    hunter: {
      id: 'hunter',
      name: 'Hunter',
      description: 'Searched for 50 items',
      category: 'search-master',
      mainBadgeImage: '/badges/hunter.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'master-queries': {
      id: 'master-queries',
      name: 'Master of Queries',
      description: 'Searched for 100 items',
      category: 'search-master',
      mainBadgeImage: '/badges/master_queries.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },

    // Reading Streak
    'day-one-reader': {
      id: 'day-one-reader',
      name: 'Day One Reader',
      description: 'Read an uploaded book today',
      category: 'reading-streak',
      mainBadgeImage: '/badges/new_reader.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'back-to-back': {
      id: 'back-to-back',
      name: 'Back-to-Back',
      description: 'Read uploaded books 2 days in a row',
      category: 'reading-streak',
      mainBadgeImage: '/badges/back_to_back.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'focused-five': {
      id: 'focused-five',
      name: 'Focused Five',
      description: 'Read uploaded books 5 days in a row',
      category: 'reading-streak',
      mainBadgeImage: '/badges/focused_five.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'weekly-reader': {
      id: 'weekly-reader',
      name: 'Weekly Reader',
      description: 'Read uploaded books 7 days in a row',
      category: 'reading-streak',
      mainBadgeImage: '/badges/weekly_reader.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    },
    'monthly-reader': {
      id: 'monthly-reader',
      name: 'Monthly Reader',
      description: 'Read uploaded books 30 days in a row',
      category: 'reading-streak',
      mainBadgeImage: '/badges/monthly_reader.png',
      ribbonBadgeImage: '/badges/ribbon_star.png'
    }
  },

  categories: [
    {
      id: 'reading-journey',
      name: 'Reading Journey',
      description: 'Achievements for completing books and audiobooks'
    },
    {
      id: 'getting-started',
      name: 'Getting Started',
      description: 'Basic setup and first-time user achievements'
    },
    {
      id: 'adventurers-path',
      name: "Adventurer's Path",
      description: 'Exploration and discovery achievements'
    },
    {
      id: 'daily-devotion',
      name: 'Daily Devotion',
      description: 'Login streak and daily activity achievements'
    },
    {
      id: 'search-master',
      name: 'Search Master',
      description: 'Search and discovery achievements'
    },
    {
      id: 'reading-streak',
      name: 'Reading Streak',
      description: 'Daily reading streak achievements'
    }
  ]
})

export const getters = {
  getBadgeById: (state) => (id) => {
    return state.badgeDefinitions[id]
  },

  getBadgesByCategory: (state) => (categoryId) => {
    return Object.values(state.badgeDefinitions).filter((badge) => badge.category === categoryId)
  },

  getUnlockedBadgesByCategory: (state) => (categoryId) => {
    return Object.values(state.badgeDefinitions).filter((badge) => badge.category === categoryId && state.userBadges[badge.id])
  },

  getTotalUnlockedCount: (state) => {
    return Object.values(state.userBadges).filter((unlocked) => unlocked).length
  },

  getUnlockedCountByCategory: (state) => (categoryId) => {
    return Object.values(state.badgeDefinitions).filter((badge) => badge.category === categoryId && state.userBadges[badge.id]).length
  },

  isBadgeUnlocked: (state) => (badgeId) => {
    return state.userBadges[badgeId] || false
  }
}

export const mutations = {
  UNLOCK_BADGE(state, badgeId) {
    state.userBadges[badgeId] = true
  },

  LOCK_BADGE(state, badgeId) {
    state.userBadges[badgeId] = false
  },

  SET_USER_BADGES(state, badges) {
    state.userBadges = { ...state.userBadges, ...badges }
  }
}

export const actions = {
  async loadBadges({ commit }) {
    try {
      const response = await this.$axios.get('/api/me/badges')
      if (response.data?.badges) {
        commit('SET_USER_BADGES', response.data.badges)
      }
    } catch (error) {
      console.error('Failed to load badges:', error)
    }
  },

  async unlockBadge({ commit, state }, badgeId) {
    commit('UNLOCK_BADGE', badgeId)

    // Save to server
    try {
      await this.$axios.patch('/api/me/badges', {
        badges: { [badgeId]: true }
      })
    } catch (error) {
      console.error('Failed to save badge:', error)
      // Revert on error
      commit('LOCK_BADGE', badgeId)
    }
  },

  lockBadge({ commit }, badgeId) {
    commit('LOCK_BADGE', badgeId)
  },

  setUserBadges({ commit }, badges) {
    commit('SET_USER_BADGES', badges)
  }
}
