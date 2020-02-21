// store/modules/chartconfigs.js
/* Current approach for configs
 *
 * state holds configs:
 * dfltConfig is a key/value in configs for the default theme
 * configs enables multiple charts to be maintained
 * with whatever settings are necessary. They are keyed by
 * either 'dflt' or the modId.
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
// import { D3LinePlot } from '@/classes/D3/D3LinePlot'
import { D3DateLinePlot } from '@/classes/D3/D3DateLinePlot'
import { D3PiePlot } from '@/classes/D3/D3PiePlot'

import mods from '@/data/mods'

Vue.use(Vuex)

const state = {

  defaults: {
    config: defaultTheme
  },

  // holds the runtime values for each chart
  // id: height, width, configId (or config?), chartTypeId
  // the id is unique to one location in the app
  charts: {
    'scale-test': {}
  },

  // enumerates the available chart types
  chartTypes: {
    'date-line-plot': {
      id: 'date-line-plot',
      desc: 'A plot of time series data',
      // decide what to do about key
      sampleParams: { key: 'ts1', numColumns: 3, length: 200 },
      ChartClass: D3DateLinePlot,
      dataConstraints: {}
    },
    // 'line-plot': {
    //   id: 'line-plot',
    //   desc: 'A plot of data in two dimensions',
    //   sampleParams: { key: 'labeled1', numColumns: 3, length: 200 },
    //   ChartClass: D3LinePlot,
    //   dataConstraints: {}
    // },
    //   'bar-plot': {
    //     id: 'bar-plot',
    //     desc: 'A bar chart',
    //     sampleParams: { key: 'labeled1', numColumns: 7, length: 1 },
    //     ChartClass: D3Plot
    //   },
    'pie-plot': {
      id: 'pie-plot',
      desc: 'A pie plot',
      sampleParams: { key: 'labeled1', numColumns: 7, length: 1 },
      ChartClass: D3PiePlot,
      dataConstraints: {
        onlyPositive: true
      }
    }
  },

  // the transactional mods that can be applied
  mods: { ...mods },

  // mod that is to be applied to all charts in ChartView
  currentMod: mods.dflt,

  // the chart type for all charts in ThemeView
  currentChartType: null,

  // will be used in D3DateLinePlot for switch frequencies
  frequencies: [
    { ptype: 'd', text: 'Daily' },
    { ptype: 'w', text: 'Weekly' },
    { ptype: 'm', text: 'Monthly' },
    { ptype: 'q', text: 'Quarterly' },
    { ptype: 'y', text: 'Yearly' }
  ],

  // to be used for setting in-program color variaations
  // not currently used
  colorPicker: {
    colorModal: false,
    type: null,
    color: null
  },
  // a flag where the key represents a chart that should be
  // refreshed. Upon refresh the key is deleted
  refreshCharts: {}
}

const mutations = {
  clearCharts (state, payload) {
    Vue.set(state, 'charts', payload)
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
  setCurrentChartType (state, payload) {
    Vue.set(state, 'currentChartType', payload)
  },

  setMods (state, payload) {
    state.mods = payload
  },
  setMod (state, payload) {
    Vue.set(state.mods, payload.id, payload)
  },
  setCurrentMod (state, payload) {
    Vue.set(state, 'currentMod', payload)
  },
  setColor (state, payload) {
    Vue.set(state.colorPicker, payload)
  },
  applyConfig (state, payload) {
    Vue.set(state.configs, payload.id, payload)
  },
  setRefreshChart (state, payload) {
    // delete worked better for watch functions
    if (payload.id !== undefined) {
      payload = JSON.parse(JSON.stringify(payload))
      if (payload.value === true) {
        Vue.set(state.refreshCharts, payload.id, payload.value)
      } else {
        delete state.refreshCharts[payload.id]
      }
    }
  }
}

const actions = {
  clearCharts ({ commit }) {
    commit('clearCharts', {})
  },
  setChart ({ commit }, payload) {
    commit('setChart', payload)
    commit('setRefreshChart', { id: payload.id, value: true })
  },
  setDims ({ commit }, payload) {
    commit('setDims', payload)
    commit('setRefreshChart', { id: payload.id, value: true })
  },
  setChartType ({ state, commit }, payload) {
    // sets the chart type of a particular chart
    // does not modify state.chartTypes
    commit('setChartType', payload)
  },
  setCurrentChartType ({ commit }, payload) {
    commit('setCurrentChartType', payload)
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
  },
  setCurrentMod ({ commit }, payload) {
    commit('setCurrentMod', payload)
  }
}

const getters = {
  getDefaultConfig (state) {
    return state.defaults.config
  },
  getCharts (state) {
    return state.charts
  },
  getChart: (state) => (payload) => {
    return state.charts[payload.id]
  },
  getChartTypes (state) {
    return state.chartTypes
  },
  getChartType: (state) => (payload) => {
    return state.chartTypes[payload.id]
  },
  getCurrentChartType (state) {
    return state.currentChartType
  },
  getMod: (state) => (payload) => {
    return state.mods[payload.id]
  },
  getMods (state) {
    return state.mods
  },
  getCurrentMod (state) {
    return state.currentMod
  },
  frequencies (state) {
    return state.frequencies
  },
  getColor (state) {
    return state.colorPicker
  },
  getRefreshCharts (state) {
    return state.refreshCharts
  },
  getRefreshChart: (state) => (payload) => {
    return state.refreshCharts[payload.id]
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
