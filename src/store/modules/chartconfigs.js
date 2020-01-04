import Vue from 'vue'
import Vuex from 'vuex'

// import chartThemes from '@/templates/templates'
// import { Theme } from '@/classes/D3Themes.class'

Vue.use(Vuex)

// console.log('Theme', Theme)
// console.log('chartThemes', chartThemes)
/* Sample Configuration
 * serves as a communicaton point between
 *  parent component and child components
 *
 * Parent at mount sets up the config
 *
  configs: {
    'uni-vami-unique-id': {
     plot: {
        size: { width: 500, height: 400 },
        background: '#666666',
        panel: { top: 40, right: 40, bottom: 45, left: 60 },
        margin: { top: 0.01, right: 0.02, bottom: 0.15, left: 0.0 }
      },
      series: {
        colorScheme: null,
        lineWidth: 1.0,
        markerSize: '5px',
        opacity: 1.0
      },
      ...
      plotControls: {
        frequency: 1,
        dateRange: { startDate: '2013-12-31', endDate: '2018-12-31' }
      }

    }
  }

  strategy:
    set which config to work on, such as datelinePlot, dateBarPlot, piePlot, etc
      those are the generic categories.

    The original thought process was to create an object that hierarchically
    held the components from themes to chart elemets. That process deteriorated
    once more and more details were added to the

    theme:
      a set of colors, motifs or other elements that can make up a family
      of characteristics

      The concept is that any chart created with that theme will by default
      have a certain look. However, any of those characteristics can be
      overlayed by characteristics that are specific to the chart.

      Therefore this looks a lot like an initial class that is extended into
      a new class.
*/
const state = {
  configs: {
    // dfltTheme: new Theme()
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
