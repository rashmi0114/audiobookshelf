<template>
  <div class="badge-card bg-gray-800 border border-gray-700 rounded-lg p-6 hover:bg-gray-750 transition-colors" :class="{ 'opacity-50': !isUnlocked }">
    <!-- Badge Icon with Static Images -->
    <div class="flex justify-center mb-4">
      <div class="badge-icon-container">
        <!-- Main Badge Image -->
        <div class="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden">
          <img :src="badge.mainBadgeImage" :alt="badge.name" class="w-full h-full object-cover" :class="{ grayscale: !isUnlocked }" />
        </div>
      </div>
    </div>

    <!-- Badge Info -->
    <div class="text-center">
      <h3 class="text-lg font-semibold text-white mb-2">{{ badge.name }}</h3>
      <p class="text-gray-400 text-sm mb-3">{{ badge.description }}</p>

      <!-- Status -->
      <div v-if="isUnlocked" class="text-green-400 text-sm font-medium">Unlocked ✓</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BadgeCard',
  props: {
    badge: {
      type: Object,
      required: true
    },
    isUnlocked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.bg-gray-750 {
  background-color: #374151;
}

.badge-card {
  cursor: pointer;
}

.badge-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.grayscale {
  filter: grayscale(100%);
  opacity: 0.6;
}
</style>
