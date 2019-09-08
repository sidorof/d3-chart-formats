import Vue from 'vue'
import Vuex from 'vuex'

import chartConfigsStore from './modules/chartconfigs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    'chart': chartConfigsStore
  }
})
