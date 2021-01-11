import { mount } from '@vue/test-utils'
import Vue from 'vue'
import PlayerTurn from '../../src/components/PlayerTurn.vue'
import VueMaterial from 'vue-material'

/**
 * Mount a mocked version of PlayerTurn component
 *
 * @return {Wrapper<PlayerTurn>} PlayerTurn component
 */
const mountComponent = (totalPins) => {
  return mount(PlayerTurn, {
    mocks: {
      $t: () => 'i18n is mocked' // Mock i18n function
    },
    propsData: {
      totalPins
    }
  })
}

beforeAll(() => {
  // Install vue-material components
  Vue.use(VueMaterial)
})

describe('PlayerTurn classic use cases', () => {
  test('Any Any', async () => {
    const totalPins = 10
    const throw1 = 4
    const throw2 = 2

    const wrapper = mountComponent(totalPins)

    await wrapper.find('input[name=pinsFallen1]').setValue(throw1)
    await wrapper.find('button[name=BtnNext]').trigger('click')

    await wrapper.find('input[name=pinsFallen2]').setValue(throw2)
    await wrapper.find('button[name=secondBtnValidate]').trigger('click')
    expect(wrapper.emitted('done')).toStrictEqual([[{
      throw1: throw1,
      throw2: throw2
    }]])
  })

  test('Any spare with input', async () => {
    const totalPins = 10
    const throw1 = 9
    const throw2 = 1

    // In this test, we add the pins with the buttons, and play with the sub btn
    const wrapper = mountComponent(totalPins)
    await wrapper.find('#subFirstThrow').trigger('click')
    for (let i = 0; i < throw1; i++) await wrapper.find('#addFirstThrow').trigger('click')
    // Add and sub 1
    await wrapper.find('#subFirstThrow').trigger('click')
    await wrapper.find('#addFirstThrow').trigger('click')
    await wrapper.find('#addFirstThrow').trigger('click')
    await wrapper.find('#addFirstThrow').trigger('click')
    await wrapper.find('#subFirstThrow').trigger('click')
    await wrapper.find('button[name=BtnNext]').trigger('click')

    await wrapper.find('#subSecondThrow').trigger('click')
    for (let i = 0; i < throw2; i++) await wrapper.find('#addSecondThrow').trigger('click')
    // Add and sub 1
    await wrapper.find('#subSecondThrow').trigger('click')
    await wrapper.find('#addSecondThrow').trigger('click')
    await wrapper.find('#addSecondThrow').trigger('click')
    await wrapper.find('button[name=secondBtnValidate]').trigger('click')
    expect(wrapper.emitted('done')).toStrictEqual([[{
      throw1: throw1,
      throw2: throw2
    }]])
  })

  test('Strike', async () => {
    const totalPins = 10
    const throw1 = totalPins

    const wrapper = mountComponent(totalPins)

    await wrapper.find('input[name=pinsFallen1]').setValue(throw1)
    await wrapper.find('button[name=firstBtnValidate]').trigger('click')
    expect(wrapper.emitted('done')).toStrictEqual([[{
      throw1: throw1,
      throw2: undefined
    }]])
  })

  test('Any back any any', async () => {
    const totalPins = 10
    const throw1 = 3
    const throw1Bis = 4
    const throw2 = 5
    const throw2Bis = 4

    const wrapper = mountComponent(totalPins)

    // 1
    await wrapper.find('input[name=pinsFallen1]').setValue(throw1)
    await wrapper.find('button[name=BtnNext]').trigger('click')
    // 2
    await wrapper.find('input[name=pinsFallen2]').setValue(throw2)
    expect(wrapper.find('button[name=secondBtnValidate]').exists()).toBe(true)
    expect(wrapper.vm.secondThrow).toBe('' + throw2)
    await wrapper.find('button[name=BtnCancel]').trigger('click')
    // 1
    await wrapper.find('input[name=pinsFallen1]').setValue(throw1Bis)
    await wrapper.find('button[name=BtnNext]').trigger('click')
    // 2
    expect(parseInt(wrapper.vm.secondThrow)).toBe(0) // Check the value reset
    await wrapper.find('input[name=pinsFallen2]').setValue(throw2Bis)
    await wrapper.find('button[name=secondBtnValidate]').trigger('click')
    expect(wrapper.emitted('done')).toStrictEqual([[{
      throw1: throw1Bis,
      throw2: throw2Bis
    }]])
  })

  test('Text any text back any any', async () => {
    const totalPins = 10
    const throw1 = 5
    const throw2 = 5

    const wrapper = mountComponent(totalPins)

    await wrapper.find('input[name=pinsFallen1]').setValue('TOTO')
    expect(wrapper.vm.firstThrow).toBe('')
    wrapper.find('input[name=pinsFallen1]').trigger('blur')
    expect(wrapper.vm.firstThrow).toBe(NaN)
    // NaN trigger watch on throw next tick
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.firstThrow).toBe(0)
    })
    await wrapper.find('button[name=BtnNext]').trigger('click')

    expect(wrapper.vm.secondThrow).toBe(0)
    await wrapper.find('button[name=BtnCancel]').trigger('click')

    await wrapper.find('input[name=pinsFallen1]').setValue(throw1)
    await wrapper.find('button[name=BtnNext]').trigger('click')

    await wrapper.find('input[name=pinsFallen2]').setValue('TOTA')
    expect(wrapper.vm.secondThrow).toBe('')
    wrapper.find('input[name=pinsFallen2]').trigger('blur')
    expect(wrapper.vm.secondThrow).toBe(NaN)
    // NaN trigger watch on throw next tick
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.secondThrow).toBe(0)
    })
    await wrapper.find('input[name=pinsFallen2]').setValue(throw2)
    await wrapper.find('button[name=secondBtnValidate]').trigger('click')

    expect(wrapper.emitted('done')).toStrictEqual([[{
      throw1: throw1,
      throw2: throw2
    }]])
  })

  test('Spare with overvalue', async () => {
    const totalPins = 10
    const throw1 = 6
    const throw2 = 4

    const wrapper = mountComponent(totalPins)

    await wrapper.find('input[name=pinsFallen1]').setValue(12)
    expect(wrapper.vm.firstThrow).toBe('12')
    wrapper.find('input[name=pinsFallen1]').trigger('blur')
    expect(wrapper.vm.firstThrow).toBe(10)
    await wrapper.find('input[name=pinsFallen1]').setValue(6)

    await wrapper.find('button[name=BtnNext]').trigger('click')

    await wrapper.find('input[name=pinsFallen2]').setValue(12)
    expect(wrapper.vm.secondThrow).toBe('12')
    wrapper.find('input[name=pinsFallen2]').trigger('blur')
    expect(wrapper.vm.secondThrow).toBe(4)

    await wrapper.find('button[name=secondBtnValidate]').trigger('click')

    expect(wrapper.emitted('done')).toStrictEqual([[{
      throw1: throw1,
      throw2: throw2
    }]])
  })
})
