<template>
  <div class="page" :class="streamLibraryItem ? 'streaming' : ''">
    <div class="w-full h-full bg-bg">
      <div class="w-full h-full flex">
        <div class="flex-1 overflow-y-auto">
          <div class="px-4 py-6">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
              <div>
                <h1 class="text-3xl font-bold text-white mb-2">My Badges</h1>
                <p class="text-gray-300">Progress: {{ totalUnlocked }} unlocked</p>
              </div>
            </div>

            <!-- Instruction -->
            <p class="text-gray-400 mb-8">Choose a collection to explore your badges.</p>

            <!-- Badge Categories Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="category in categories" :key="category.id" @click="navigateToCategory(category.id)" class="bg-gray-800 border border-gray-700 rounded-lg p-6 cursor-pointer hover:bg-gray-750 transition-colors">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-lg font-semibold text-white">{{ category.name }}</h3>
                  <span class="text-gray-400">{{ getUnlockedCountInCategory(category.id) }}/{{ getTotalBadgesInCategory(category.id) }} badges</span>
                </div>
                <!-- Progress Bar -->
                <div class="w-full bg-gray-600 rounded-full h-2">
                  <div class="bg-yellow-500 h-2 rounded-full transition-all duration-300" :style="{ width: getProgressPercentage(category.id) + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BadgesPage',
  async mounted() {
    await this.$store.dispatch('badges/loadBadges')
  },
  computed: {
    streamLibraryItem() {
      return this.$store.state.streamLibraryItem
    },
    categories() {
      return this.$store.state.badges?.categories || []
    },
    totalUnlocked() {
      return this.$store.getters['badges/getTotalUnlockedCount'] || 0
    }
  },
  methods: {
    navigateToCategory(categoryId) {
      this.$router.push(`/library/${this.$route.params.library}/badges/${categoryId}`)
    },
    getTotalBadgesInCategory(categoryId) {
      return this.$store.getters['badges/getBadgesByCategory'](categoryId)?.length || 0
    },
    getUnlockedCountInCategory(categoryId) {
      return this.$store.getters['badges/getUnlockedCountByCategory'](categoryId) || 0
    },
    getProgressPercentage(categoryId) {
      const total = this.getTotalBadgesInCategory(categoryId)
      const unlocked = this.getUnlockedCountInCategory(categoryId)
      return total > 0 ? (unlocked / total) * 100 : 0
    }
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background-color: #1a1a1a;
}

.page.streaming {
  padding-bottom: 160px;
}

.bg-gray-750 {
  background-color: #374151;
}
</style>
