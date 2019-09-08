import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/* Sample Configuration
 * serves as a communicaton point between
 *  parent component and child components
 *
 * Parent at mount sets up the config
 *
  configs: {
    'uni-vami-unique-id': {
      plotParams: {
        useDots: false,
        xlabel: '',
        ylabel: 'Relative Value',
        title: 'Universe of Securities by Relative Value',
        useLegend: true
      },
      plotControls: {
        frequency: 1,
        dateRange: { startDate: '2013-12-31', endDate: '2018-12-31' }
      }

    }
  }

*/
const state = {
  configs: {},

  frequencies: [
    { ptype: 'd', text: 'Daily' },
    { ptype: 'w', text: 'Weekly' },
    { ptype: 'm', text: 'Monthly' },
    { ptype: 'q', text: 'Quarterly' },
    { ptype: 'y', text: 'Yearly' }
  ]
}

const mutations = {
  setConfig (state, payload) {
    console.log('mutations:setConfig: payload', payload)
    Vue.set(state.configs, payload.id, payload)
  }
}

const actions = {
  setConfig ({ commit }, payload) {
    commit('setConfig', payload)
  }
}

const getters = {
  getConfig: (state) => (payload) => {
    console.log('getters:getConfig: payload', payload)
    console.log('state.configs', state.configs)
    console.log('returning', state.configs[payload.id])
    return state.configs[payload.id]
  },
  getConfigs (state) {
    return state.configs
  },
  frequencies (state) {
    return state.frequencies
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
