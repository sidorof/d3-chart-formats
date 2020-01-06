// test/CustomCard.spec1.js

// Libraries
// import Vue from './setup.js'
import Vue from 'vue'
import Vuetify from 'vuetify'

// Components
import CustomCard from '@/components/CustomCard'

// Utilities
import {
  mount,
  createLocalVue
} from '@vue/test-utils'

const localVue = createLocalVue()

describe('CustomCard.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('should have a custom title', () => {
    const wrapper = mount(CustomCard, {
      localVue,
      vuetify,
      propsData: {
        title: 'Foobar'
      }
    })

    // We could also verify this differently
    // by checking the text content
    const title = wrapper.find('.v-card__title > span')

    console.log('title', title)
    expect(title.text()).toBe('Foobar')
  })

  it('should match snapshot', () => {
    const wrapper = mount(CustomCard, {
      localVue,
      vuetify,
      propsData: {
        title: 'Foobar'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit an event when the action v-btn is clicked', () => {
    const wrapper = mount(CustomCard, {
      localVue,
      vuetify,
    })

    const event = jest.fn()
    const button = wrapper.find('.v-btn')

    // Here we bind a listener to the wrapper
    // instance to catch our custom event
    // https://vuejs.org/v2/api/#Instance-Methods-Events
    wrapper.vm.$on('action-btn:clicked', event)

    expect(event).toHaveBeenCalledTimes(0)

    // Simulate a click on the button
    button.trigger('click')

    // Ensure that our mock event was called
    expect(event).toHaveBeenCalledTimes(1)
  })
})
