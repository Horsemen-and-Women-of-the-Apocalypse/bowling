import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Turn from '../../src/components/Turn.vue'
import VueMaterial from 'vue-material'

/**
 * Mount a mocked version of Turn component
 *
 * @return {Wrapper<Turn>} Turn component
 */
const mountComponent = () => {
  return mount(Turn, {
    mocks: {
      $t: () => 'i18n is mocked' // Mock i18n function
    }
  })
}

const InputSelector = '[name=turnCount]'
const MinusButtonSelector = '#minus'
const AddButtonSelector = '#add'

beforeAll(() => {
  // Install vue-material components
  Vue.use(VueMaterial)
})

describe('TurnComponent', () => {
  test('add', async () => {
    const wrapper = mountComponent()

    await wrapper.find(AddButtonSelector).trigger('click')

    expect(wrapper.vm.turnCount).toBe(11)
    expect(wrapper.find(InputSelector).element.value).toBe('11')
  })

  test('minus', async () => {
    const wrapper = mountComponent()

    await wrapper.find(AddButtonSelector).trigger('click')
    await wrapper.find(AddButtonSelector).trigger('click')
    await wrapper.find(MinusButtonSelector).trigger('click')

    expect(wrapper.vm.turnCount).toBe(11)
    expect(wrapper.find(InputSelector).element.value).toBe('11')
  })

  test('minusTo0', async () => {
    const wrapper = mountComponent()

    for (let i = 0; i <= 10; i++) {
      await wrapper.find(MinusButtonSelector).trigger('click') // 10-9-8-...
    }

    expect(wrapper.vm.turnCount).toBe(1)
    expect(wrapper.find(InputSelector).element.value).toBe('1')
  })

  test('setValueNegative', async () => {
    const wrapper = mountComponent()

    await wrapper.find(InputSelector).setValue(-5)

    expect(wrapper.vm.turnCount).toBe('-5')
    wrapper.find(InputSelector).trigger('blur')
    expect(wrapper.vm.turnCount).toBe(10)
  })

  test('setValuePositive', async () => {
    const wrapper = mountComponent()

    await wrapper.find(InputSelector).setValue(10)

    expect(wrapper.vm.turnCount).toBe('10')
    wrapper.find(InputSelector).trigger('blur')
    expect(wrapper.vm.turnCount).toBe(10)
  })

  test('setValueVoid', async () => {
    const wrapper = mountComponent()

    await wrapper.find(InputSelector).setValue('')

    expect(wrapper.vm.turnCount).toBe('')
    wrapper.find(InputSelector).trigger('blur')
    expect(wrapper.vm.turnCount).toBe(NaN)
    // NaN trigger watch on count next tick
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.turnCount).toBe(10)
    })
  })

  test('setValueSpace', async () => {
    const wrapper = mountComponent()

    await wrapper.find(InputSelector).setValue(' ')

    expect(wrapper.vm.turnCount).toBe('')
    wrapper.find(InputSelector).trigger('blur')
    expect(wrapper.vm.turnCount).toBe(NaN)
    // NaN trigger watch on count next tick
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.turnCount).toBe(10)
    })
  })

  test('setValueString', async () => {
    const wrapper = mountComponent()

    await wrapper.find(InputSelector).setValue('string')

    expect(wrapper.vm.turnCount).toBe('')
    wrapper.find(InputSelector).trigger('blur')
    expect(wrapper.vm.turnCount).toBe(NaN)
    // NaN trigger watch on count next tick
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.turnCount).toBe(10)
    })
  })
})
