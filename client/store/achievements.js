export const namespaced = true

export const state = () => ({
  popup: { visible: false, type: 'completed', title: '', message: '', badge: null },
  me: { total: 0, badges: [], completed: {} },
  catalog: []
})

export const mutations = {
  SET_ME(s, v) { s.me = v },
  SET_CATALOG(s, v) { s.catalog = v },
  SHOW_POPUP(s, p) { s.popup = { visible: true, ...p } },
  HIDE_POPUP(s) { s.popup.visible = false }
}

export const actions = {
  async fetchCatalog({ commit }) {
    const { data } = await this.$axios.get('/api/achievements/catalog')
    commit('SET_CATALOG', data.badges || [])
  },
  async fetchMe({ commit }) {
    const { data } = await this.$axios.get('/api/achievements/me')
    commit('SET_ME', data)
  },
  async recordCompletion({ commit }, { itemId, itemType, title }) {
    const { data } = await this.$axios.post('/api/achievements/complete', { itemId, itemType, title })
    commit('SET_ME', data.state)

    const badge = data.highest
    const titleLine = badge ? `🏆 ${badge.name} earned!` : `Finished: ${title}`
    const msg = badge ? `Total ${data.total}. ${title} completed.` : `Great job! Total completed: ${data.total}.`

    commit('SHOW_POPUP', { type: 'completed', title: titleLine, message: msg, badge })
    setTimeout(() => commit('HIDE_POPUP'), 5000)
    return data
  }
}
