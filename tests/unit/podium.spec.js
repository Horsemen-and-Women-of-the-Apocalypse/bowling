import { mount } from '@vue/test-utils'
import Podium from '../../src/components/Podium.vue'

// Objects :

/**
 * Mount a mocked version of the Podium component
 *
 * @return {Wrapper<Podium>} Podium component
 */
const mountComponent = (scores) => {
  return mount(Podium, {
    mocks: {
      $t: () => 'i18n is mocked' // Mock i18n function
    },
    propsData: {
      scores
    }
  })
}

describe('Podium component', () => {
  test('player scores order', () => {
    const scoresOrdered = {
      p5: 50,
      p4: 40,
      p3: 30,
      p2: 20,
      p1: 10
    }

    const wrapper = mountComponent(scoresOrdered)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('#Podium #first .value').text()).toContain('50')
      expect(wrapper.find('#Podium #first .name').text()).toContain('p5')
      expect(wrapper.find('#Podium #second .value').text()).toContain('40')
      expect(wrapper.find('#Podium #second .name').text()).toContain('p4')
      expect(wrapper.find('#Podium #third .value').text()).toContain('30')
      expect(wrapper.find('#Podium #third .name').text()).toContain('p3')
    })

    const scoresNotOrdered = {
      p5: 50,
      p2: 20,
      p4: 40,
      p3: 30,
      p1: 10
    }

    const wrapper2 = mountComponent(scoresNotOrdered)
    wrapper2.vm.$nextTick(() => {
      expect(wrapper.find('#Podium #first .value').text()).toContain('50')
      expect(wrapper.find('#Podium #first .name').text()).toContain('p5')
      expect(wrapper.find('#Podium #second .value').text()).toContain('40')
      expect(wrapper.find('#Podium #second .name').text()).toContain('p4')
      expect(wrapper.find('#Podium #third .value').text()).toContain('30')
      expect(wrapper.find('#Podium #third .name').text()).toContain('p3')
    })
  })
  test('player numbers', () => {
    // 0 players
    const wrapper0 = mountComponent({})
    expect(wrapper0.findAll('.player').length).toBe(0)

    // 1 player
    const wrapper1 = mountComponent({ toto: 5 })
    expect(wrapper1.findAll('.player').length).toBe(1)

    // 2 players
    const wrapper2 = mountComponent({ toto: 5, tata: 60 })
    expect(wrapper2.findAll('.player').length).toBe(2)

    // 3 players
    const wrapper3 = mountComponent({ toto: 5, tata: 60, tutu: 0 })
    expect(wrapper3.findAll('.player').length).toBe(3)

    // 4 players
    const wrapper4 = mountComponent({ toto: 5, tata: 60, tutu: 0, tonton: 50 })
    expect(wrapper4.findAll('.player').length).toBe(3)
  })
  test('equality exeptions', () => {
    // no equality
    const noEquality = {
      p3: 30,
      p2: 20,
      p1: 10
    }

    const wrapper0 = mountComponent(noEquality)
    wrapper0.vm.$nextTick(() => {
      expect(wrapper0.find('#Podium #first.first').exists()).toBe(true)
      expect(wrapper0.find('#Podium #second.second').exists()).toBe(true)
      expect(wrapper0.find('#Podium #third.third').exists()).toBe(true)
    })

    // Two number one
    const twoNumOne = {
      p3: 30,
      p2: 30,
      p1: 10
    }

    const wrapper1 = mountComponent(twoNumOne)
    wrapper1.vm.$nextTick(() => {
      expect(wrapper1.find('#Podium #first.first').exists()).toBe(true)
      expect(wrapper1.find('#Podium #second.first').exists()).toBe(true)
      expect(wrapper1.find('#Podium #third.third').exists()).toBe(true)
    })

    // Two number two
    const twoNumTwo = {
      p3: 30,
      p2: 10,
      p1: 10
    }

    const wrapper2 = mountComponent(twoNumTwo)
    wrapper2.vm.$nextTick(() => {
      expect(wrapper2.find('#Podium #first.first').exists()).toBe(true)
      expect(wrapper2.find('#Podium #second.second').exists()).toBe(true)
      expect(wrapper2.find('#Podium #third.second').exists()).toBe(true)
    })

    // Three number one
    const threeNumOne = {
      p3: 30,
      p2: 30,
      p1: 30
    }

    const wrapper3 = mountComponent(threeNumOne)
    wrapper3.vm.$nextTick(() => {
      expect(wrapper3.find('#Podium #first.first').exists()).toBe(true)
      expect(wrapper3.find('#Podium #second.first').exists()).toBe(true)
      expect(wrapper3.find('#Podium #third.first').exists()).toBe(true)
    })
  })
})
