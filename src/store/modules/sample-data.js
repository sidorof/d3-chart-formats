import Vue from 'vue'
import Vuex from 'vuex'

import { TS } from '@/classes/TS.class'

Vue.use(Vuex)

const state = {
  data: {}
}

const mutations = {
  setData (state, payload) {
    Vue.set(state.data, payload.key, payload)
  }
}

const getters = {
  getData: (state) => (payload) => {
    return state.data[payload.key]
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
    const curDate = new Date()

    const ts = new TS()
    ts.key = key
    ts.frequency = 'd'
    for (let i = 0; i < numColumns; i++) {
      ts.columns.push('Variable ' + (i + 1))
    }

    let values = []
    for (let i = 0; i < numColumns; i++) {
      values.push(100)
    }

    let dateKey = curDate.toISOString().substr(0, 10)

    ts.dateRange.startDate = dateKey

    ts.data[dateKey] = values
    // create the timeseries, string date is key
    for (let i = 1; i < length; i++) {
      curDate.setDate(curDate.getDate() + 1)
      dateKey = curDate.toISOString().substr(0, 10)
      values = values.slice()
      for (let j = 0; j < numColumns; j++) {
        const change = (Math.random() - 0.5) / 50
        values[j] *= (1.0 + change)
      }
      ts.data[dateKey] = values
    }
    ts.dateRange.endDate = dateKey
    commit('setData', { key: key, ts: ts })
  },
  createLabeledData ({ commit }, payload) {
    /* example:
     * this.createLabeledData(
     *   { key: 'xy1', numColumns: 7, length: 200 })
     *
     * {
     *   columns: ['Variable 1', 'Variable 2', ..., 'Variable 7']
     *   values: [
     *      [num1, num2, num3, ..., num7],
     *      [num1, num2, num3, ..., num7],
     *      [num1, num2, num3, ..., num7],
     *      ...
     *      [num1, num2, num3, ..., num7]
     *    ]
     * }
     */

    const key = payload.key
    const numColumns = payload.numColumns
    const length = payload.length
    const onlyPositive = payload.onlyPositive
    const factor = payload.factor === undefined
      ? 1
      : payload.factor

    const data = {}
    data.key = key
    data.columns = []
    for (let i = 0; i < numColumns; i++) {
      data.columns.push('Variable ' + (i + 1))
    }

    const allValues = []

    // create the timeseries, string date is key
    for (let i = 0; i < length; i++) {
      const values = new Array(numColumns)

      for (let j = 0; j < numColumns; j++) {
        const value = onlyPositive
          ? Math.random()
          : Math.random() - 0.5
        values[j] = value * factor
      }
      allValues.push(values)
      data.values = values
    }
    commit('setData', { key: key, data: data })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
