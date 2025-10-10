<template>
  <div class="page" :class="streamLibraryItem ? 'streaming' : ''">
    <div class="w-full h-full bg-bg">
      <div class="w-full h-full flex">
        <div class="flex-1 overflow-y-auto">
          <div class="px-4 py-6">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
              <div>
                <div class="flex items-center mb-2">
                  <button @click="goBack" class="text-gray-400 hover:text-white mr-2">← All Collections</button>
                </div>
                <h1 class="text-3xl font-bold text-white">{{ categoryName }}</h1>
              </div>
              <div class="text-gray-400">{{ unlockedCount }}/{{ totalCount }} unlocked</div>
            </div>

            <!-- Badges Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <BadgeCard v-for="badge in currentCategoryBadges" :key="badge.id" :badge="badge" :is-unlocked="isBadgeUnlocked(badge.id)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BadgeCard from '@/components/badges/BadgeCard.vue'

export default {
  name: 'BadgeCategoryPage',
  components: {
    BadgeCard
  },
  async mounted() {
    await this.$store.dispatch('badges/loadBadges')
  },
  computed: {
    streamLibraryItem() {
      return this.$store.state.streamLibraryItem
    },
    categoryId() {
      return this.$route.params.category
    },
    currentCategory() {
      return this.$store.state.badges?.categories?.find((cat) => cat.id === this.categoryId)
    },
    categoryName() {
      return this.currentCategory ? this.currentCategory.name : 'Unknown Category'
    },
    currentCategoryBadges() {
      return this.$store.getters['badges/getBadgesByCategory'](this.categoryId) || []
    },
    unlockedCount() {
      return this.$store.getters['badges/getUnlockedCountByCategory'](this.categoryId) || 0
    },
    totalCount() {
      return this.currentCategoryBadges.length
    }
  },
  methods: {
    goBack() {
      this.$router.push(`/library/${this.$route.params.library}/badges`)
    },
    isBadgeUnlocked(badgeId) {
      return this.$store.getters['badges/isBadgeUnlocked'](badgeId) || false
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
