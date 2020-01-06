import Vue from 'vue'
import Vuex from 'vuex'

import { defaultTheme } from '@/templates/default'

Vue.use(Vuex)

// console.log('Theme', Theme)
console.log('defaultTheme', defaultTheme)
const state = {
  configs: {
    dfltConfig: defaultTheme
  },

  currentConfig: {},

  frequencies: [
    { ptype: 'd', text: 'Daily' },
    { ptype: 'w', text: 'Weekly' },
    { ptype: 'm', text: 'Monthly' },
    { ptype: 'q', text: 'Quarterly' },
    { ptype: 'y', text: 'Yearly' }
  ],

  colorPicker: {
    colorModal: false,
    type: null,
    color: null
  }
}

const mutations = {
  setConfig (state, payload) {
    console.log('mutations:setConfig: payload', payload)
    Vue.set(state.configs, payload.id, payload)
  },
  setColor (state, payload) {
    Vue.set(state.colorPicker, payload)
  },
  applyConfig (state) {
    Vue.set(
      state.configs.currentConfig.theme,
      state.currentConfig.id,
      state.currentConfig.id
    )
  }
}

const actions = {
  setConfig ({ commit }, payload) {
    commit('setConfig', payload)
    console.log('setConfig: payload', payload)
  },
  setColor ({ commit }, payload) {
    commit('setColor', payload)
  },
  applyConfig ({ commit }) {
    commit('applyConfig')
  }
}

const getters = {
  getConfig: (state) => (payload) => {
    console.log('getters:getConfig', payload)
    return state.configs[payload.id]
  },
  getConfigIds: (state) => (payload) => {
    var ids = []
    for (const config in state.configs) {
      ids.push(config.chartId)
    }
    return ids
  },
  getDefaultConfig (state) {
    console.log('store:getDefaultConfig')
    console.log('defaultTheme', defaultTheme)
    return defaultTheme
  },
  getConfigs (state) {
    return state.configs
  },
  frequencies (state) {
    return state.frequencies
  },
  getColor (state) {
    return state.colorPicker
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
