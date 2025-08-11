<template>
  <div class="p-4 md:p-6">
    <h1 class="text-2xl font-bold mb-4">My Badges</h1>

    <div class="mb-4 text-sm opacity-80">
      Total completions: <b>{{ me.total }}</b>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div v-for="b in catalog" :key="b.key" class="rounded-xl p-4 border dark:border-white/10">
        <div class="text-lg font-semibold">{{ b.name }}</div>
        <div class="opacity-80 text-sm">Unlock at {{ b.count }}</div>
        <div class="mt-2">
          <span v-if="earnedSet.has(b.key)" class="inline-block px-2 py-1 rounded-full bg-green-600 text-white text-xs">Earned</span>
          <span v-else class="inline-block px-2 py-1 rounded-full bg-gray-300 dark:bg-gray-700 text-xs">Locked</span>
        </div>
        <div v-if="!earnedSet.has(b.key)" class="mt-2 text-xs opacity-80">{{ Math.min(me.total, b.count) }}/{{ b.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch({ store, params }) {
    await Promise.all([store.dispatch('achievements/fetchCatalog'), store.dispatch('achievements/fetchMe')])
  },
  computed: {
    me() {
      return this.$store.state.achievements.me
    },
    catalog() {
      return this.$store.state.achievements.catalog
    },
    earnedSet() {
      return new Set((this.me.badges || []).map((b) => b.key))
    }
  }
}
</script>
