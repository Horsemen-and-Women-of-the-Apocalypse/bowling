import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Pins from '../../src/views/Pins.vue'
import VueMaterial from 'vue-material'

/**
 * Mount a mocked version of Turn component
 *
 * @return {Wrapper<Turn>} Turn component
 */
const mountComponent = () => {
  return mount(Pins, {
    mocks: {
      $t: () => 'i18n is mocked' // Mock i18n function
    }
  })
}

const InputSelector = '[name=pinsCount]'
const SubButtonSelector = '#sub'
const AddButtonSelector = '#add'

beforeAll(() => {
  // Install vue-material components
  Vue.use(VueMaterial)
})

describe('PinsComponent', () => {
  test('add', async () => {
    const wrapper = mountComponent()

    await wrapper.find(AddButtonSelector).trigger('click') // 2

    expect(wrapper.vm.pinsCount).toBe(2)
    expect(wrapper.find(InputSelector).element.value).toBe('2')
  })

  test('sub', async () => {
    const wrapper = mountComponent()

    await wrapper.find(AddButtonSelector).trigger('click') // 2
    await wrapper.find(SubButtonSelector).trigger('click') // 1
    await wrapper.find(AddButtonSelector).trigger('click') // 2

    expect(wrapper.vm.pinsCount).toBe(2)
    expect(wrapper.find(InputSelector).element.value).toBe('2')
  })

  test('subTo0', async () => {
    const wrapper = mountComponent()

    await wrapper.find(SubButtonSelector).trigger('click') // 1

    expect(wrapper.vm.pinsCount).toBe(1)
    expect(wrapper.find(InputSelector).element.value).toBe('1')
  })

  test('setValueNegative', async () => {
    const wrapper = mountComponent()

    await wrapper.find(InputSelector).setValue(-1) // 1

    expect(wrapper.vm.pinsCount).toBe('-1')
    wrapper.find(InputSelector).trigger('blur')
    expect(wrapper.vm.pinsCount).toBe(1)
  })

  test('setValuePositive', async () => {
    const wrapper = mountComponent()

    await wrapper.find(InputSelector).setValue(2) // 2

    expect(wrapper.vm.pinsCount).toBe('2')
    wrapper.find(InputSelector).trigger('blur')
    expect(wrapper.vm.pinsCount).toBe(2)
  })
})
