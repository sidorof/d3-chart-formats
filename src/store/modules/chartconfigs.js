// store/modules/chartconfigs.js
/* Current approach for configs
 *
 * state holds configs:
 * dfltConfig is a key/value in configs for the default theme
 * configs enables multiple charts to be maintained
 * with whatever settings are necessary. They are keyed by
 * either 'default' or the modId.
 *
 * In addition, store is the primary communication point for all
 * charts, eliminating parameters send via props to subcomponents.
 * That means the svg height and width scaling exploring directives
 * are sent to store.charts.{id}.
 *
 */
import Vue from 'vue'
import Vuex from 'vuex'

import defaultTheme from '@/data/templates/default'
import { D3DateLinePlot } from '@/classes/D3/D3DateLinePlot'

import mods from '@/data/mods'

Vue.use(Vuex)

const state = {

  defaults: {
    config: defaultTheme
  },

  // holds the config for each separate theme
  configs: {},

  // holds the runtime values for each chart
  // id: height, width, configId
  // the id is unique to one location in the app
  charts: {
    'scale-test': {}
  },

  chartTypes: {
    'date-line-plot': {
      // decide what to do about key
      sampleParams: { key: 'ts1', numColumns: 3, length: 200 },
      ChartClass: D3DateLinePlot
    }
  },

  mods: { ...mods },

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

  refreshCharts: {}
}

const mutations = {
  setConfig (state, payload) {
    // put it to a specific id
    Vue.set(state.configs, payload.id, payload)
  },

  setChart (state, payload) {
    if (payload.id !== undefined) {
      Vue.set(state.charts, payload.id, payload)
    }
  },

  setDims (state, payload) {
    if (payload.width !== undefined) {
      Vue.set(
        state.charts[payload.id], 'width', payload.width)
    }
    if (payload.height !== undefined) {
      Vue.set(
        state.charts[payload.id], 'height', payload.height)
    }
  },

  setChartType (state, payload) {
    Vue.set(
      state.charts[payload.id], 'chartTypeId', payload.chartTypeId)
  },

  scaleMod (state, payload) {
    const chartId = payload.id
    const width = payload.width
    const height = payload.height
    const params = JSON.parse(
      JSON.stringify(state.charts[chartId].config))
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
      Vue.set(state.charts[chartId].config, { ...params })
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
  applyConfig (state, payload) {
    Vue.set(state.configs, payload.id, payload)
  },
  setRefreshChart (state, payload) {
    // delete worked better for watch functions
    if (payload.chartId !== undefined) {
      if (payload.value === true) {
        Vue.set(state.refreshCharts, payload.chartId, payload.value)
      } else {
        delete state.refreshCharts[payload.chartId]
      }
    }
  }
}

const actions = {
  setConfig ({ commit }, payload) {
    commit('setConfig', payload)
  },
  setChart ({ commit }, payload) {
    commit('setChart', payload)
    commit('setRefreshChart', { chartId: payload.id, value: true })
  },
  setDims ({ commit }, payload) {
    commit('setDims', payload)
    commit('setRefreshChart', { chartId: payload.id, value: true })
  },
  setChartType ({ state, commit }, payload) {
    // sets the chart type of a particular chart
    // does not modify state.chartTypes
    commit('setChartType', payload)
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
    return state.defaults.config
  },
  getChart: (state) => (payload) => {
    return state.charts[payload.id]
  },
  getConfigs (state) {
    return state.configs
  },
  getChartTypes (state) {
    return state.chartTypes
  },
  getChartType: (state) => (payload) => {
    return state.chartTypes[payload.id]
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
  getRefreshCharts (state) {
    return state.refreshCharts
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
