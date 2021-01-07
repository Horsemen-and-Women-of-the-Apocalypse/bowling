import { mount } from '@vue/test-utils'
import Vue from 'vue'
import LastPlayerTurn from '../../src/components/LastPlayerTurn.vue'
import VueMaterial from 'vue-material'

/**
 * Mount a mocked version of LastPlayerTurn component
 *
 * @return {Wrapper<LastPlayerTurn>} LastPlayerTurn component
 */
const mountComponent = (totalPins) => {
  return mount(LastPlayerTurn, {
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

describe('LastPlayerTurn classic use cases', () => {
  test('Normal normal', async () => {
    const totalPins = 10
    const throw1 = 4
    const throw2 = 2

    const wrapper = mountComponent(totalPins)

    await wrapper.find('input[name=pinsFallen1]').setValue(throw1)
    await wrapper.find('button[name=firstBtnValidate]').trigger('click')

    await wrapper.find('input[name=pinsFallen2]').setValue(throw2)
    expect(wrapper.find('button[name=SecondBtnValidate].md-accent').exists()).toBe(true)
    expect(wrapper.emitted('done')).toBe(undefined)
    await wrapper.find('button[name=SecondBtnValidate]').trigger('click')
    expect(wrapper.emitted('done')).toStrictEqual([[{
      turn1: throw1,
      turn2: throw2,
      turn3: 0
    }]])
  })

  test('Strike any any', async () => {
    const totalPins = 10
    const throw1 = totalPins
    const throw2 = 2
    const throw3 = 3

    const wrapper = mountComponent(totalPins)

    await wrapper.find('input[name=pinsFallen1]').setValue(throw1)
    await wrapper.find('button[name=firstBtnValidate]').trigger('click')

    await wrapper.find('input[name=pinsFallen2]').setValue(throw2)
    expect(wrapper.find('button[name=SecondBtnValidate].md-accent').exists()).toBe(false)
    await wrapper.find('button[name=SecondBtnValidate]').trigger('click')
    expect(wrapper.emitted('done')).toBe(undefined)

    await wrapper.find('input[name=pinsFallen3]').setValue(throw3)
    await wrapper.find('button[name=thirdBtnValidate]').trigger('click')
    expect(wrapper.emitted('done')).toStrictEqual([[{
      turn1: throw1,
      turn2: throw2,
      turn3: throw3
    }]])
  })

  test('Strike Strike Strike', async () => {
    const totalPins = 10
    const throw1 = totalPins
    const throw2 = totalPins
    const throw3 = totalPins

    // In this test, we add the pins with the buttons, and play with the sub btn
    const wrapper = mountComponent(totalPins)

    for (let i = 0; i < throw1; i++) await wrapper.find('#addFirstThrow').trigger('click')
    // Add and sub 1
    await wrapper.find('#subFirstThrow').trigger('click')
    await wrapper.find('#addFirstThrow').trigger('click')
    await wrapper.find('button[name=firstBtnValidate]').trigger('click')

    for (let i = 0; i < throw2; i++) await wrapper.find('#addSecondThrow').trigger('click')
    // Add and sub 1
    await wrapper.find('#subSecondThrow').trigger('click')
    await wrapper.find('#addSecondThrow').trigger('click')
    expect(wrapper.find('button[name=SecondBtnValidate].md-accent').exists()).toBe(false)
    await wrapper.find('button[name=SecondBtnValidate]').trigger('click')
    expect(wrapper.emitted('done')).toBe(undefined)

    for (let i = 0; i < throw3; i++) await wrapper.find('#addThirdThrow').trigger('click')
    // Add and sub 1
    await wrapper.find('#subThirdThrow').trigger('click')
    await wrapper.find('#addThirdThrow').trigger('click')
    await wrapper.find('button[name=thirdBtnValidate]').trigger('click')
    expect(wrapper.emitted('done')).toStrictEqual([[{
      turn1: throw1,
      turn2: throw2,
      turn3: throw3
    }]])
  })
  test('Normal back Normal Normal Back Spare normal back Strike ', async () => {
    const totalPins = 10
    const throw1 = 3
    const throw1Bis = 4
    const throw2 = 5
    const throw2Bis = 6
    const throw3 = 8
    const throw3Bis = totalPins

    const wrapper = mountComponent(totalPins)

    // 1
    await wrapper.find('input[name=pinsFallen1]').setValue(throw1)
    await wrapper.find('button[name=firstBtnValidate]').trigger('click')
    // 2
    await wrapper.find('input[name=pinsFallen2]').setValue(throw2)
    expect(wrapper.find('button[name=SecondBtnValidate].md-accent').exists()).toBe(true)
    expect(wrapper.vm.count2).toBe('' + throw2)
    await wrapper.find('button[name=SecondBtnBack]').trigger('click')
    // 1
    await wrapper.find('input[name=pinsFallen1]').setValue(throw1Bis)
    await wrapper.find('button[name=firstBtnValidate]').trigger('click')
    // 2
    expect(parseInt(wrapper.vm.count2)).toBe(0) // Check the value reset
    await wrapper.find('input[name=pinsFallen2]').setValue(throw2Bis)
    expect(wrapper.find('button[name=SecondBtnValidate].md-accent').exists()).toBe(false)
    await wrapper.find('button[name=SecondBtnValidate]').trigger('click')
    // 3
    await wrapper.find('input[name=pinsFallen3]').setValue(throw3)
    expect(wrapper.vm.count3).toBe('' + throw3)
    await wrapper.find('button[name=thirdBtnBack]').trigger('click')
    // 2
    expect(wrapper.vm.count2).toBe('' + throw2Bis)
    await wrapper.find('button[name=SecondBtnValidate]').trigger('click')
    // 3
    expect(parseInt(wrapper.vm.count3)).toBe(0) // Check the value reset
    await wrapper.find('input[name=pinsFallen3]').setValue(throw3Bis)
    await wrapper.find('button[name=thirdBtnValidate]').trigger('click')
    expect(wrapper.emitted('done')).toStrictEqual([[{
      turn1: throw1Bis,
      turn2: throw2Bis,
      turn3: throw3Bis
    }]])
  })
  test('Normal back Normal Normal Back Spare normal back Strike ', async () => {
    const totalPins = 10
    const throw1 = 'Text'

    const wrapper = mountComponent(totalPins)

    // 1
    await wrapper.find('input[name=pinsFallen1]').setValue(throw1)
    await wrapper.find('button[name=firstBtnValidate]').trigger('click')
    expect(wrapper.vm.count1).not.toBe(throw1)
  })
})
