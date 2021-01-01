import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Pins from '../../src/components/Pins.vue'
import VueMaterial from 'vue-material'

/**
 * Mount a mocked version of Pins  component
 *
 * @return {Wrapper<Pins>} Pins component
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

    await wrapper.find(AddButtonSelector).trigger('click') // 11

    expect(wrapper.vm.pinsCount).toBe(11)
    expect(wrapper.find(InputSelector).element.value).toBe('11')
  })

  test('sub', async () => {
    const wrapper = mountComponent()

    await wrapper.find(AddButtonSelector).trigger('click') // 11
    await wrapper.find(SubButtonSelector).trigger('click') // 10
    await wrapper.find(AddButtonSelector).trigger('click') // 11

    expect(wrapper.vm.pinsCount).toBe(11)
    expect(wrapper.find(InputSelector).element.value).toBe('11')
  })

  test('subTo0', async () => {
    const wrapper = mountComponent()

    for (let i = 0; i <= 10; i++) {
      await wrapper.find(SubButtonSelector).trigger('click') // 10-9-8...
    }

    expect(wrapper.vm.pinsCount).toBe(1)
    expect(wrapper.find(InputSelector).element.value).toBe('1')
  })

  test('setValueNegative', async () => {
    const wrapper = mountComponent()

    await wrapper.find(InputSelector).setValue(-1) // 1

    expect(wrapper.vm.pinsCount).toBe('-1')
    wrapper.find(InputSelector).trigger('blur')
    expect(wrapper.vm.pinsCount).toBe(10)
  })

  test('setValuePositive', async () => {
    const wrapper = mountComponent()

    await wrapper.find(InputSelector).setValue(11) // 11

    expect(wrapper.vm.pinsCount).toBe('11')
    wrapper.find(InputSelector).trigger('blur')
    expect(wrapper.vm.pinsCount).toBe(11)
  })

  test('setValueVoid', async () => {
    const wrapper = mountComponent()

    await wrapper.find(InputSelector).setValue('')

    expect(wrapper.vm.pinsCount).toBe('')
    wrapper.find(InputSelector).trigger('blur')
    expect(wrapper.vm.pinsCount).toBe(NaN)
    // NaN trigger watch on count next tick
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.pinsCount).toBe(10)
    })
  })

  test('setValueSpace', async () => {
    const wrapper = mountComponent()

    await wrapper.find(InputSelector).setValue(' ')

    expect(wrapper.vm.pinsCount).toBe('')
    wrapper.find(InputSelector).trigger('blur')
    expect(wrapper.vm.pinsCount).toBe(NaN)
    // NaN trigger watch on count next tick
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.pinsCount).toBe(10)
    })
  })

  test('setValueString', async () => {
    const wrapper = mountComponent()

    await wrapper.find(InputSelector).setValue('string')

    expect(wrapper.vm.pinsCount).toBe('')
    wrapper.find(InputSelector).trigger('blur')
    expect(wrapper.vm.pinsCount).toBe(NaN)
    // NaN trigger watch on count next tick
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.pinsCount).toBe(10)
    })
  })
})
