// tests/unit/store/chartconfigs.spec.js
import chartConfigsStore from '@/store/modules/chartconfigs'

// destructure assign `mutations`

describe('mutation', () => {
  const { setConfig } = chartConfigsStore.mutations

  it('setConfig', () => {
    // mock state
    const state = { configs: {} }
    // apply mutation
    const payload = {
      id: 'datelinePlot',
      plot: { background: "#EEE" }
    }

    setConfig(state, payload)
    // assert result
    expect(state.configs).toEqual({ datelinePlot: payload })
  })
})

// import actions from './actions'
// import { fetchData } from '../api'
//
// jest.mock('../api')
//
// test('commits items returned by api method', async () => {
//   const items = [1, 2, 3]
//   fetchData.mockResolvedValue(items)
//   const commit = jest.fn()
//   await actions.fetchItems({ commit })
//   expect(commit).toHaveBeenCalledWith(
//     'setItems', { item }
//   )
// })

LOOK AT OTHER FOR expectedMutations
const testAction = (action, payload, state, expectedMutations, done) => {


describe('actions', () => {

  const state = { configs: {} }

  // mock commit
  const commit = (type, payload) => {
    const mutation = expectedMutations[count]

    const mutSetConfig = chartConfigsStore.mutations.setConfig
  }
  const { setConfig } = chartConfigsStore.actions

  it('setConfig', () => {
    const payload = {
      id: 'datelinePlot',
      plot: { background: "#EEE" }
    }
    setConfig ({ commit }, payload)

    expect(state.configs).toEqual({ datelinePlot: payload })
  })
})

// const testAction = (action, payload, state, expectedMutations, done) => {
//   let count = 0
//
//   const commit = (type, payload) => {
//     const mutations = expectedMutations[count]
//   }
//
//   try {
//     expect(type).toEqual(mutation.type)
//     if (payload) {
//       expect(payload).toEqual(mutations.payload)
//     }
//   } catch (error) {
//     done(error)
//   }
//   count++
//   if (count >= expectedMutations.length) {
//     done()
//   }
// }
//
// describe('actions', () => {
//   it('setConfig', done => {
//
//
//   })
//
// })
