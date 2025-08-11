<template>
  <transition name="abs-pop">
    <div v-if="visible" role="status" aria-live="polite" class="fixed right-4 bottom-4 z-50 max-w-sm">
      <div class="rounded-2xl shadow-2xl p-4 backdrop-blur bg-white/90 text-gray-900 dark:bg-black/80 dark:text-white">
        <div class="flex items-start gap-3">
          <div aria-hidden="true" class="text-2xl">🎉</div>
          <div class="flex-1">
            <div class="font-semibold text-lg">{{ title || 'Completed!' }}</div>
            <div class="opacity-90 text-sm mt-1">{{ message }}</div>
            <div v-if="badge" class="mt-2 text-sm font-medium">
              <span class="px-2 py-1 rounded-full border border-current">
                {{ badge.name }}
              </span>
            </div>
          </div>
          <button class="ml-2 opacity-70 hover:opacity-100" @click="$emit('close')" aria-label="Close">×</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    title: String,
    message: String,
    badge: Object
  }
}
</script>

<style>
.abs-pop-enter-active,
.abs-pop-leave-active { transition: all 0.25s ease; }
.abs-pop-enter,
.abs-pop-leave-to { opacity: 0; transform: translateY(10px) scale(0.98); }
</style>
