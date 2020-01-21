import Vue from 'vue'
import Vuex from 'vuex'

import defaultTheme from '@/classes/D3/templates/default'

Vue.use(Vuex)

const state = {
  configs: {
    dfltConfig: { ...defaultTheme },
    currentConfig: { ...defaultTheme }
  },

  mods: {
    'default': { desc: 'default value for standard graphs', mods: [] },
    'dark 1': {
      desc: 'dark background version 1',
      colors: {},
      mods: [
        { path: 'name', value: 'dark' },
        { path: 'styles.background', value: '#000' },
        { path: 'panel.styles.fill', value: 'black' },

        { path: 'axes.styles.stroke', value: 'white' },
        { path: 'axes.xAxis.stroke', value: 'white' },
        { path: 'axes.yAxis.stroke', value: 'white' },
        { path: 'axes.yRightAxis.stroke', value: 'white' },
        //
        { path: 'axes.xAxis.label.fill', value: 'white' },
        { path: 'axes.yAxis.label.fill', value: 'white' },
        { path: 'axes.yRightAxis.label.fill', value: 'white' },
        { path: 'axes.grids.vertical.stroke', value: '#444' },
        { path: 'axes.grids.vertical.stroke', value: '#444' },
        { path: 'titles.1.styles.fill', value: '#aaa' },
        { path: 'titles.2.styles.fill', value: '#aaa' }
      ]
    },

    'dark 2': {
      desc: 'dark background version 2',
      colors: {},
      mods: [
        { path: 'name', value: 'dark' },
        { path: 'styles.background', value: '#000' },
        { path: 'panel.styles.fill', value: '#222' },

        { path: 'axes.styles.stroke', value: 'white' },
        { path: 'axes.xAxis.stroke', value: 'white' },
        { path: 'axes.yAxis.stroke', value: 'white' },
        { path: 'axes.yRightAxis.stroke', value: 'white' },
        //
        { path: 'axes.xAxis.label.fill', value: 'white' },
        { path: 'axes.yAxis.label.fill', value: 'white' },
        { path: 'axes.yRightAxis.label.fill', value: 'white' },
        { path: 'axes.grids.vertical.stroke', value: '#444' },
        { path: 'axes.grids.vertical.stroke', value: '#444' },
        { path: 'titles.1.styles.fill', value: '#aaa' },
        { path: 'titles.2.styles.fill', value: '#aaa' }
      ]
    },

    'dark 3': {
      desc: 'dark background version 3',
      colors: {},
      mods: [
        { path: 'name', value: 'dark' },
        { path: 'styles.background', value: '#222' },
        { path: 'panel.styles.fill', value: 'black' },

        { path: 'axes.styles.stroke', value: 'white' },
        { path: 'axes.xAxis.stroke', value: 'white' },
        { path: 'axes.yAxis.stroke', value: 'white' },
        { path: 'axes.yRightAxis.stroke', value: 'white' },
        //
        { path: 'axes.xAxis.label.fill', value: 'white' },
        { path: 'axes.yAxis.label.fill', value: 'white' },
        { path: 'axes.yRightAxis.label.fill', value: 'white' },
        { path: 'axes.grids.vertical.stroke', value: '#444' },
        { path: 'axes.grids.vertical.stroke', value: '#444' },
        { path: 'titles.1.styles.fill', value: '#aaa' },
        { path: 'titles.2.styles.fill', value: '#aaa' }
      ]
    },

    'blue 1': {
      desc: 'dark background version 1',
      colors: {},
      mods: [
        { path: 'name', value: 'green 1' },
        { path: 'styles.background', value: '#384679' },
        { path: 'panel.styles.fill', value: '#33333d' },

        { path: 'axes.styles.stroke', value: '#c2c2c5' },
        { path: 'axes.xAxis.stroke', value: '#373740' },
        { path: 'axes.yAxis.stroke', value: '#c2c2c5' },
        { path: 'axes.yRightAxis.stroke', value: '#373740' },
        //
        { path: 'axes.xAxis.label.fill', value: '#c2c2c5' },
        { path: 'axes.yAxis.label.fill', value: '#c2c2c5' },
        { path: 'axes.yRightAxis.label.fill', value: '#c2c2c5' },
        { path: 'axes.grids.vertical.stroke', value: '#444' },
        { path: 'axes.grids.vertical.stroke', value: '#444' },
        { path: 'titles.1.styles.fill', value: '#c2c2c5' },
        { path: 'titles.2.styles.fill', value: '#c2c2c5' }
      ]
    },

    'blue 2': {
      desc: 'dark background version 2',
      colors: {},
      mods: [
        { path: 'name', value: 'blue 2' },
        { path: 'styles.background', value: '#121c43' },
        { path: 'panel.styles.fill', value: '#43121d' },

        { path: 'axes.styles.stroke', value: '#c2c2c5' },
        { path: 'axes.xAxis.stroke', value: '#373740' },
        { path: 'axes.yAxis.stroke', value: '#c2c2c5' },
        { path: 'axes.yRightAxis.stroke', value: '#373740' },
        //
        { path: 'axes.xAxis.label.fill', value: '#c2c2c5' },
        { path: 'axes.yAxis.label.fill', value: '#c2c2c5' },
        { path: 'axes.yRightAxis.label.fill', value: '#c2c2c5' },
        { path: 'axes.grids.vertical.stroke', value: '#444' },
        { path: 'axes.grids.vertical.stroke', value: '#444' },
        { path: 'titles.1.styles.fill', value: '#c2c2c5' },
        { path: 'titles.2.styles.fill', value: '#c2c2c5' }
      ]
    },

    'material design 1': {
      desc: 'using Material Design palette',
      colors: {},
      mods: [
        { path: 'name', value: 'blue 2' },
        { path: 'styles.background', value: '#018786' },
        { path: 'panel.styles.fill', value: '#121c43' },

        { path: 'axes.styles.stroke', value: '#8eacbb' },
        { path: 'axes.xAxis.stroke', value: '#8eacbb' },
        { path: 'axes.yAxis.stroke', value: '#fff' },
        { path: 'axes.yRightAxis.stroke', value: '#fff' },
        //
        { path: 'axes.xAxis.label.fill', value: '#8eacbb' },
        { path: 'axes.yAxis.label.fill', value: '#8eacbb' },
        { path: 'axes.yRightAxis.label.fill', value: '#ff#03dac6f' },
        { path: 'axes.grids.horizontal.stroke', value: '#121c43' },
        { path: 'axes.grids.vertical.stroke', value: '#121c43' },
        { path: 'titles.1.styles.fill', value: '#8eacbb' },
        { path: 'titles.2.styles.fill', value: '#8eacbb' },
        { path: 'data.path.strokeWidth', value: 4.0 }
      ]
    },

    'material design 2': {
      desc: 'using Material Design palette',
      colors: {
        primary: '#2196F3',
        secondary: '#1976D2',
        tertiary: '#EF5350',
        textLight: '#fff',
        textDark: '#000'
      },
      mods: [
        { path: 'name', value: 'blue 2' },
        { path: 'styles.background', value: '#FFF' },
        // { path: 'panel.styles.fill', value: '{primary}' },
        { path: 'panel.topPanel.styles.fill', value: '{secondary}' },
        { path: 'panel.rightPanel.styles.fill', value: '#ededed' },
        { path: 'panel.leftPanel.styles.fill', value: '#ededed' },
        { path: 'panel.bottomPanel.styles.fill', value: '#ededed' },

        { path: 'axes.styles.stroke', value: '{textDark}' },
        { path: 'axes.xAxis.stroke', value: '{textDark}' },
        { path: 'axes.yAxis.stroke', value: '{textDark}' },
        { path: 'axes.yRightAxis.stroke', value: '{textLight}' },
        //
        { path: 'axes.xAxis.label.fill', value: '{textDark}' },
        { path: 'axes.yAxis.label.fill', value: '{textDark}' },
        { path: 'axes.yRightAxis.label.fill', value: '{textDark}' },
        { path: 'axes.grids.horizontal.stroke', value: '#ddd' },
        { path: 'axes.grids.vertical.stroke', value: '#ddd' },
        { path: 'titles.1.styles.fill', value: '{textLight}' },
        { path: 'titles.2.styles.fill', value: '{textLight}' },
        { path: 'data.path.strokeWidth', value: 4.0 }
      ]
    },

    'generic': {
      desc: 'mostly white',
      colors: {},
      mods: [
        { path: 'name', value: 'plain' },
        { path: 'styles.background', value: '#FFF' },
        { path: 'panel.styles.fill', value: '#FFF' },

        { path: 'axes.styles.stroke-width', value: 1.0 },
        { path: 'axes.xAxis.styles.fill', value: 'black' },
        { path: 'axes.yAxis.styles.fill', value: 'black' },
        { path: 'axes.yAxis.styles.stroke-width', value: 1.0 },
        { path: 'axes.yRightAxis.styles.fill', value: 'black' },

        { path: 'axes.xAxis.stroke', value: 'black' },
        { path: 'axes.yAxis.stroke', value: 'black' },
        { path: 'axes.yRightAxis.stroke', value: 'black' },

        { path: 'axes.xAxis.label.fill', value: 'black' },
        { path: 'axes.yAxis.label.fill', value: 'black' },
        { path: 'axes.yRightAxis.label.fill', value: 'black' },
        { path: 'titles.1.styles.fill', value: 'black' },
        { path: 'titles.2.styles.fill', value: 'black' },
        { path: 'data.path.strokeWidth', value: 4.0 }
      ]
    }
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
    const scaling = params.scale

    // filter and flatten
    if (scaling !== undefined) {
      scaling.map((scale) => {
        if (scale.width !== undefined && scale.width >= width) {
          modScales = modScales.concat(scale.paths)
        }
        if (scale.height !== undefined && scale.height >= height) {
          modScales = modScales.concat(scale.paths)
        }
      })
    }
    if (JSON.parse(JSON.stringify(modScales)).length > 0) {
      modScales.forEach((mod) => {
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
  },
  setColor ({ commit }, payload) {
    commit('setColor', payload)
  },
  applyConfig ({ commit }) {
    commit('applyConfig')
  },
  scaleMod ({ commit }, payload) {
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
