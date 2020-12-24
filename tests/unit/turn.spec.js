import { mount } from '@vue/test-utils'
import Turn from '../../src/views/Turn.vue'

describe('turn', () => {
  test('add', () => {
    const $t = () => {}

    const wrapper = mount(Turn, {
      mocks: { $t }
    })

    wrapper.find('md-button#add').trigger('click')

    expect(wrapper.vm.turnCount).toBe(2)
  })

  test('minus', () => {
    const $t = () => {}

    const wrapper = mount(Turn, {
      mocks: { $t }
    })

    wrapper.find('md-button#add').trigger('click')
    wrapper.find('md-button#minus').trigger('click')

    expect(wrapper.vm.turnCount).toBe(1)
  })

  test('minusTo0', () => {
    const $t = () => {}

    const wrapper = mount(Turn, {
      mocks: { $t }
    })

    wrapper.find('md-button#minus').trigger('click')

    expect(wrapper.vm.turnCount).toBe(1)
  })
})
