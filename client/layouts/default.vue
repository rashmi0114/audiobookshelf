<template>
  <div class="text-white max-h-screen h-screen overflow-hidden bg-bg">
    <app-appbar />

    <app-side-rail v-if="isShowingSideRail" class="hidden md:block" />
    <div id="app-content" class="h-full" :class="{ 'has-siderail': isShowingSideRail }">
      <Nuxt :key="currentLang" />
    </div>

    <app-media-player-container ref="mediaPlayerContainer" />

    <modals-item-edit-modal />
    <modals-collections-add-create-modal />
    <modals-collections-edit-modal />
    <modals-playlists-add-create-modal />
    <modals-playlists-edit-modal />
    <modals-podcast-edit-episode />
    <modals-podcast-view-episode />
    <modals-authors-edit-modal />
    <modals-batch-quick-match-model />
    <modals-rssfeed-open-close-modal />
    <modals-raw-cover-preview-modal />
    <modals-share-modal />
    <prompt-confirm />
    <readers-reader />

    <!-- 🎉 Global completion popup -->
    <AchievementPopup
      :visible="popup.visible"
      :title="popup.title"
      :message="popup.message"
      :badge="popup.badge"
      @close="closeAchievementPopup"
    />
  </div>
</template>

<script>
import AchievementPopup from '~/components/modals/AchievementPopup.vue'

export default {
  middleware: 'authenticated',
  components: { AchievementPopup },
  data() {
    return {
      socket: null,
      isSocketConnected: false,
      isSocketAuthenticated: false,
      isFirstSocketConnection: true,
      socketConnectionToastId: null,
      currentLang: null,
      multiSessionOtherSessionId: null,
      multiSessionCurrentSessionId: null
    }
  },
  watch: {
    $route() {
      if (this.$store.state.showEditModal) {
        this.$store.commit('setShowEditModal', false)
      }
      this.$store.commit('globals/resetSelectedMediaItems', [])
      this.updateBodyClass()
    }
  },
  computed: {
    user() { return this.$store.state.user.user },
    isCasting() { return this.$store.state.globals.isCasting },
    currentLibraryId() { return this.$store.state.libraries.currentLibraryId },
    isShowingSideRail() { if (!this.$route.name) return false; return !this.$route.name.startsWith('config') && this.currentLibraryId },
    isShowingToolbar() { return this.isShowingSideRail && this.$route.name !== 'upload' && this.$route.name !== 'account' },
    appContentMarginLeft() { return this.isShowingSideRail ? 80 : 0 },
    popup() { return (this.$store.state.achievements && this.$store.state.achievements.popup) || { visible: false } }
  },
  methods: {
    closeAchievementPopup() {
      this.$store.commit('achievements/HIDE_POPUP')
    },
    // ... (everything else unchanged)
    updateBodyClass() {
      if (this.isShowingToolbar) {
        document.body.classList.remove('no-bars', 'app-bar')
        document.body.classList.add('app-bar-and-toolbar')
      } else {
        document.body.classList.remove('no-bars', 'app-bar-and-toolbar')
        document.body.classList.add('app-bar')
      }
    },
    tokenRefreshed(newAccessToken) {
      if (this.isSocketConnected && !this.isSocketAuthenticated) {
        this.socket.emit('auth', newAccessToken)
      }
    },
    // the rest of your existing methods unchanged...
    initializeSocket() {
      if (this.$root.socket) {
        console.warn('Socket already initialized')
        this.socket = this.$root.socket
        this.isSocketConnected = this.$root.socket?.connected
        this.isFirstSocketConnection = false
        this.socketConnectionToastId = null
        return
      }
      this.socket = this.$nuxtSocket({
        name: process.env.NODE_ENV === 'development' ? 'dev' : 'prod',
        persist: 'main',
        teardown: false,
        transports: ['websocket'],
        upgrade: false,
        reconnection: true,
        path: `${this.$config.routerBasePath}/socket.io`
      })
      this.$root.socket = this.socket
      this.isSocketAuthenticated = false
      // ... all your existing socket event bindings here (unchanged)
    },
    // ... rest unchanged
  },
  beforeMount() { this.initializeSocket() },
  mounted() {
    this.updateBodyClass()
    // ... rest unchanged
  },
  beforeDestroy() {
    // ... unchanged
  }
}
</script>

<style>
.Vue-Toastification__toast-body.custom-class-1 { font-size: 14px; }
#app-content { width: 100%; }
#app-content.has-siderail {
  width: calc(100% - 80px);
  max-width: calc(100% - 80px);
  margin-left: 80px;
}
@media (max-width: 768px) {
  #app-content.has-siderail { width: 100%; max-width: 100%; margin-left: 0px; }
}
</style>
