// const actionsInjector = require('inject-loader!./actions')
const actionsInjector = require('inject-loader!../../../src/store/actions')
// import chartConfigsStore from '@/store/modules/chartconfigs'

// create the module with our mocks
const actions = actionsInjector({
  '../api/shop': {
    getProducts (cb) {
      setTimeout(() => {
        cb([ /* mocked response */ ])
      }, 100)
    }
  }
})

// helper for testing action with expected mutations
const testAction = (action, payload, state, expectedMutations, done) => {
  let count = 0

  // mock commit
  const commit = (type, payload) => {
    const mutation = expectedMutations[count]

    try {
      expect(type).to.equal(mutation.type)
      if (payload) {
        expect(payload).to.deep.equal(mutation.payload)
      }
    } catch (error) {
      done(error)
    }

    count++
    if (count >= expectedMutations.length) {
      done()
    }
  }

  // call the action with mocked store and arguments
  action({ commit, state }, payload)

  // check if no mutations should have been dispatched
  if (expectedMutations.length === 0) {
    expect(count).to.equal(0)
    done()
  }
}

describe('actions', () => {
  it('getAllProducts', done => {

    testAction(
      actions.getAllProducts,   // action
      null,                     // payload
      {},                       // state
      [                         // expectedMutations
        { type: 'REQUEST_PRODUCTS' },
        { type: 'RECEIVE_PRODUCTS', payload: { /* mocked response */ } }
      ],
      done                      // returned result
    )
  })
})
