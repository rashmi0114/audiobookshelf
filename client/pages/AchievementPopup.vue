<!-- client/src/components/AchievementPopup.vue -->
<template>
  <div v-if="visible" class="achievement-popup">
    <h3>🎉 Achievement Unlocked!</h3>
    <p>{{ achievement.name }}</p>
  </div>
</template>

<script>
export default {
  props: ['achievement'],
  data() {
    return { visible: true }
  },
  mounted() {
    setTimeout(() => (this.visible = false), 4000)
  }
}
</script>

<style scoped>
.achievement-popup {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #222;
  color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>
