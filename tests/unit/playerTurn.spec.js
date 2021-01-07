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
  test('Normal normal', async () => {
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

  test('any spare', async () => {
    const totalPins = 10
    const throw1 = 5
    const throw2 = 5

    const wrapper = mountComponent(totalPins)

    await wrapper.find('input[name=pinsFallen1]').setValue(throw1)
    expect(wrapper.find('button[name=firstBtnValidate].md-accent').exists()).toBe(false)
    await wrapper.find('button[name=BtnNext]').trigger('click')

    await wrapper.find('input[name=pinsFallen2]').setValue(throw2)
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
      throw2: 0
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
    expect(wrapper.vm.count2).toBe('' + throw2)
    await wrapper.find('button[name=BtnCancel]').trigger('click')
    // 1
    await wrapper.find('input[name=pinsFallen1]').setValue(throw1Bis)
    await wrapper.find('button[name=BtnNext]').trigger('click')
    // 2
    expect(parseInt(wrapper.vm.count2)).toBe(0) // Check the value reset
    await wrapper.find('input[name=pinsFallen2]').setValue(throw2Bis)
    await wrapper.find('button[name=secondBtnValidate]').trigger('click')
    expect(wrapper.emitted('done')).toStrictEqual([[{
      throw1: throw1Bis,
      throw2: throw2Bis
    }]])
  })

  test('Text input check', async () => {
    const totalPins = 10
    const throw1 = 5
    const throw2 = 5

    const wrapper = mountComponent(totalPins)

    await wrapper.find('input[name=pinsFallen1]').setValue('TOTO')
    expect(wrapper.vm.count1).toBe('')
    await wrapper.find('button[name=BtnNext]').trigger('click')

    expect(wrapper.vm.count2).toBe(0)
    await wrapper.find('button[name=BtnCancel]').trigger('click')

    await wrapper.find('input[name=pinsFallen1]').setValue(throw1)
    await wrapper.find('button[name=BtnNext]').trigger('click')

    await wrapper.find('input[name=pinsFallen2]').setValue('TOTA')
    expect(wrapper.vm.count2).toBe('')
    expect(wrapper.emitted('done')).not.toBeTruthy() // ?????
    await wrapper.find('input[name=pinsFallen2]').setValue(throw2)
    await wrapper.find('button[name=secondBtnValidate]').trigger('click')

    expect(wrapper.emitted('done')).toStrictEqual([[{
      throw1: throw1,
      throw2: throw2
    }]])
  })
})
