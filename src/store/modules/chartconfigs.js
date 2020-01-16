import Vue from 'vue'
import Vuex from 'vuex'

import defaultTheme from '@/templates/default'

console.log('defaultTheme', defaultTheme)

Vue.use(Vuex)

// console.log('Theme', Theme)
const state = {
  configs: {
    dfltConfig: { ...defaultTheme },
    currentConfig: { ...defaultTheme }
  },

  mods: {
    'default': ['test'],
    'dark': [
      { path: 'name', value: 'dark' },
      { path: 'styles.background', value: '#000' },
      { path: 'panel.styles.fill', value: '#333' },

      { path: 'axes.xAxis.styles.fill', value: 'white' },
      { path: 'axes.yAxis.styles.fill', value: 'white' },
      { path: 'axes.yRightAxis.styles.fill', value: 'white' },

      { path: 'axes.xAxis.stroke', value: 'white' },
      { path: 'axes.yAxis.stroke', value: 'white' },
      { path: 'axes.yRightAxis.stroke', value: 'white' },

      { path: 'axes.xAxis.label.fill', value: 'white' },
      { path: 'axes.yAxis.label.fill', value: 'white' },
      { path: 'axes.yRightAxis.label.fill', value: 'white' },
      { path: 'titles.1.styles.fill', value: 'white' },
      { path: 'titles.2.styles.fill', value: 'white' }
    ],

    'generic': [
      { path: 'name', value: 'plain' },
      { path: 'styles.background', value: '#FFF' },
      { path: 'panel.styles.fill', value: '#FFF' },

      { path: 'axes.xAxis.styles.fill', value: 'black' },
      { path: 'axes.yAxis.styles.fill', value: 'black' },
      { path: 'axes.yRightAxis.styles.fill', value: 'black' },

      { path: 'axes.xAxis.stroke', value: 'black' },
      { path: 'axes.yAxis.stroke', value: 'black' },
      { path: 'axes.yRightAxis.stroke', value: 'black' },

      { path: 'axes.xAxis.label.fill', value: 'black' },
      { path: 'axes.yAxis.label.fill', value: 'black' },
      { path: 'axes.yRightAxis.label.fill', value: 'black' },
      { path: 'titles.1.styles.fill', value: 'black' },
      { path: 'titles.2.styles.fill', value: 'black' }
    ]
  },

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
  },

  refreshChart: { value: false }
}

const mutations = {
  setConfig (state, payload) {
    // put it to a specific id
    console.log('mutations:setConfig: payload', payload)
    Vue.set(state.configs, payload.id, payload)
  },

  // applyMod (state, payload) {
  //   Vue.set(state.configs.cu)
  //   state.currentConfig = {
  //     ...state.getDefaultConfig,
  //     ...payload
  //   }
  // },

  scaleMod (state, payload) {
    const width = payload.width
    const height = payload.height
    const params = JSON.parse(
      JSON.stringify(state.configs.currentConfig))
    var modScales = []
    console.log('mutations:scaleMode: params', params)
    const scaling = params.scale

    // filter and flatten
    if (scaling !== undefined) {
      scaling.map((scale) => {
        console.log('scale', scale)
        if (scale.width !== undefined && scale.width >= width) {
          modScales = modScales.concat(scale.paths)
          console.log('width scale.paths added', scale.paths)
        }
        if (scale.height !== undefined && scale.height >= height) {
          modScales = modScales.concat(scale.paths)
          console.log('height scale.paths added', scale.paths)
        }
      })
    }
    console.log('accumulated mods', modScales)
    if (JSON.parse(JSON.stringify(modScales)).length > 0) {
      modScales.forEach((mod) => {
        console.log('mod', mod)
        console.log('mod.path', mod.path)
        const branch = mod.path.split('.').slice(0, -1)
        const leaf = mod.path.split('.').slice(-1)
        var part = params
        for (var i = 0; i < branch.length; i++) {
          part = part[branch[i]]
          part[leaf] = mod.value
        }
      })
      Vue.set(state.configs, 'currentConfig', { ...params })
    }
  },

  setMods (state, payload) {
    state.mods = payload
  },

  setMod (state, payload) {
    Vue.set(state.mods, payload.id, payload)
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
  },
  setRefreshChart (state, payload) {
    Vue.set(state.refreshChart, 'value', payload.value)
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
  },
  scaleMod ({ commit }, payload) {
    console.log('actions:scaleMod: payload', payload)
    commit('scaleMod', payload)
  },
  setRefreshChart ({ commit }, payload) {
    // ex. {payload.value: true}
    commit('setRefreshChart', payload)
  },
  setMods ({ commit }, payload) {
    commit('setMods', payload)
  },
  setMod ({ commit }, payload) {
    commit('setMod', payload)
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
    return state.configs.dfltConfig
  },
  getCurrentConfig (state) {
    return state.configs.currentConfig
  },
  getConfigs (state) {
    return state.configs
  },
  getMod: (state) => (payload) => {
    return state.mods[payload.id]
  },
  getMods (state) {
    return state.mods
  },
  frequencies (state) {
    return state.frequencies
  },
  getColor (state) {
    return state.colorPicker
  },
  getRefreshChart (state) {
    return state.refreshChart.value
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
