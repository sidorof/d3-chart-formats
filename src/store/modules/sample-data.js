import Vue from 'vue'
import Vuex from 'vuex'

import { TS } from '@/classes/TS.class'

Vue.use(Vuex)

const state = {
  ts: {}
}

const mutations = {
  setTs (state, payload) {
    state.ts = payload
  }
}

const getters = {
  getTs (state) {
    return state.ts
  }
}

const actions = {
  createTimeseries ({ commit }, payload) {
    /* Create a sample timeseries
     * key elements:
     *    number of datapoints
     *    length of timeseries
     * could add spec for frequency, but just using
     * days for now
     */
    const key = payload.key
    const numColumns = payload.numColumns
    const length = payload.length
    var curDate = new Date()

    var ts = new TS()
    ts.key = key
    ts.frequency = 'd'
    for (var i = 0; i < numColumns; i++) {
      ts.columns.push('Variable ' + (i + 1))
    }

    var values = []
    for (i = 0; i < numColumns; i++) {
      values.push(100)
    }

    var dateKey = curDate.toISOString().substr(0, 10)

    ts.dateRange.startDate = dateKey

    ts.data[dateKey] = values
    // create the timeseries, string date is key
    for (i = 1; i < length; i++) {
      curDate.setDate(curDate.getDate() + 1)
      dateKey = curDate.toISOString().substr(0, 10)
      values = values.slice()
      for (var j = 0; j < numColumns; j++) {
        const change = (Math.random() - 0.5) / 50
        values[j] *= (1.0 + change)
      }
      ts.data[dateKey] = values
    }
    ts.dateRange.endDate = dateKey

    commit('setTs', ts)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
