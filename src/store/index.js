import Vue from 'vue'
import Vuex from 'vuex'

import chartConfigsStore from './modules/chartconfigs'
import sampleDataStore from './modules/sample-data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    chart: chartConfigsStore,
    sample: sampleDataStore
  }
})
