import { mount } from '@vue/test-utils'
import Score from '../../../src/components/ScoreBoard/Score.vue'

// Objects :
import GameParam from '../../../src/objets/gameparam'

/**
 * Mount a mocked version of the Score component
 *
 * @return {Wrapper<Score>} Score component
 */
const mountComponent = (gameParams, last, score) => {
  return mount(Score, {
    mocks: {
      $t: () => 'i18n is mocked' // Mock i18n function
    },
    propsData: {
      game: gameParams,
      last,
      score
    }
  })
}

describe('Score component', () => {
  test('Strike', () => {
    // Init component
    const nbPins = 10
    const isLast = false
    const firstThrow = nbPins
    const secondThrow = 5 // Should be ignored

    const gameParam = new GameParam([], 1, nbPins)

    const score = {
      throws: [firstThrow, secondThrow, null],
      score: null
    }
    const wrapper = mountComponent(gameParam, isLast, score)

    expect(wrapper.find('#Score #first').text()).toContain('X')
    expect(wrapper.find('#Score #second').text()).toContain('')
  })
  test('Spare', () => {
    // Init component
    const nbPins = 10
    const isLast = false
    const firstThrow = 2
    const secondThrow = 8

    const gameParam = new GameParam([], 1, nbPins)

    const score = {
      throws: [firstThrow, secondThrow, null],
      score: null
    }
    const wrapper = mountComponent(gameParam, isLast, score)

    expect(wrapper.find('#Score #first').text()).toContain(firstThrow)
    expect(wrapper.find('#Score #second').text()).toContain('/')
  })
  test('Normal', () => {
    // Init component
    const nbPins = 10
    const isLast = false
    const firstThrow = 2
    const secondThrow = 5

    const gameParam = new GameParam([], 1, nbPins)

    const score = {
      throws: [firstThrow, secondThrow, null],
      score: null
    }
    const wrapper = mountComponent(gameParam, isLast, score)

    expect(wrapper.find('#Score #first').text()).toContain(firstThrow)
    expect(wrapper.find('#Score #second').text()).toContain(secondThrow)
  })
  test('nul', () => {
    // Init component
    const nbPins = 10
    const isLast = false
    const firstThrow = 0
    const secondThrow = 0

    const gameParam = new GameParam([], 1, nbPins)

    const score = {
      throws: [firstThrow, secondThrow, null],
      score: null
    }
    const wrapper = mountComponent(gameParam, isLast, score)

    expect(wrapper.find('#Score #first').text()).toContain(firstThrow)
    expect(wrapper.find('#Score #second').text()).toContain(secondThrow)
  })
  test('Strike - more pins', () => {
    // Init component
    const nbPins = 100
    const isLast = false
    const firstThrow = nbPins
    const secondThrow = 5 // Should be ignored

    const gameParam = new GameParam([], 1, nbPins)

    const score = {
      throws: [firstThrow, secondThrow, null],
      score: null
    }
    const wrapper = mountComponent(gameParam, isLast, score)

    expect(wrapper.find('#Score #first').text()).toContain('X')
    expect(wrapper.find('#Score #second').text()).toContain('')
  })
  test('Spare - more pins', () => {
    // Init component
    const nbPins = 100
    const isLast = false
    const firstThrow = 20
    const secondThrow = 80

    const gameParam = new GameParam([], 1, nbPins)

    const score = {
      throws: [firstThrow, secondThrow, null],
      score: null
    }
    const wrapper = mountComponent(gameParam, isLast, score)

    expect(wrapper.find('#Score #first').text()).toContain(firstThrow)
    expect(wrapper.find('#Score #second').text()).toContain('/')
  })
  test('Normal - more pins', () => {
    // Init component
    const nbPins = 100
    const isLast = false
    const firstThrow = 20
    const secondThrow = 50

    const gameParam = new GameParam([], 1, nbPins)

    const score = {
      throws: [firstThrow, secondThrow, null],
      score: null
    }
    const wrapper = mountComponent(gameParam, isLast, score)

    expect(wrapper.find('#Score #first').text()).toContain(firstThrow)
    expect(wrapper.find('#Score #second').text()).toContain(secondThrow)
  })
  test('nul - more pins', () => {
    // Init component
    const nbPins = 100
    const isLast = false
    const firstThrow = 0
    const secondThrow = 0

    const gameParam = new GameParam([], 1, nbPins)

    const score = {
      throws: [firstThrow, secondThrow, null],
      score: null
    }
    const wrapper = mountComponent(gameParam, isLast, score)

    expect(wrapper.find('#Score #first').text()).toContain(firstThrow)
    expect(wrapper.find('#Score #second').text()).toContain(secondThrow)
  })
})
describe('last Score component', () => {
  test('3 strikes', () => {
    // Init component
    const nbPins = 10
    const isLast = true
    const firstThrow = nbPins
    const secondThrow = nbPins
    const thirdThrow = nbPins

    const gameParam = new GameParam([], 1, nbPins)

    const score = {
      throws: [firstThrow, secondThrow, thirdThrow],
      score: null
    }
    const wrapper = mountComponent(gameParam, isLast, score)

    expect(wrapper.find('#Score #first').text()).toContain('X')
    expect(wrapper.find('#Score #second').text()).toContain('X')
    expect(wrapper.find('#Score #third').text()).toContain('X')
  })
  test('2 strikes - 1 normal', () => {
    // Init component
    const nbPins = 10
    const isLast = true
    const firstThrow = nbPins
    const secondThrow = nbPins
    const thirdThrow = 5

    const gameParam = new GameParam([], 1, nbPins)

    const score = {
      throws: [firstThrow, secondThrow, thirdThrow],
      score: null
    }
    const wrapper = mountComponent(gameParam, isLast, score)

    expect(wrapper.find('#Score #first').text()).toContain('X')
    expect(wrapper.find('#Score #second').text()).toContain('X')
    expect(wrapper.find('#Score #third').text()).toContain(thirdThrow)
  })
  test('Strike, normal and spare', () => {
    // Init component
    const nbPins = 10
    const isLast = true
    const firstThrow = nbPins
    const secondThrow = 3
    const thirdThrow = 7

    const gameParam = new GameParam([], 1, nbPins)

    const score = {
      throws: [firstThrow, secondThrow, thirdThrow],
      score: null
    }
    const wrapper = mountComponent(gameParam, isLast, score)

    expect(wrapper.find('#Score #first').text()).toContain('X')
    expect(wrapper.find('#Score #second').text()).toContain(secondThrow)
    expect(wrapper.find('#Score #third').text()).toContain('/')
  })
  test('Normal spare and strike', () => {
    // Init component
    const nbPins = 10
    const isLast = true
    const firstThrow = 9
    const secondThrow = 1
    const thirdThrow = nbPins

    const gameParam = new GameParam([], 1, nbPins)

    const score = {
      throws: [firstThrow, secondThrow, thirdThrow],
      score: null
    }
    const wrapper = mountComponent(gameParam, isLast, score)

    expect(wrapper.find('#Score #first').text()).toContain(firstThrow)
    expect(wrapper.find('#Score #second').text()).toContain('/')
    expect(wrapper.find('#Score #third').text()).toContain('X')
  })
  test('Normal spare and normal', () => {
    // Init component
    const nbPins = 10
    const isLast = true
    const firstThrow = 9
    const secondThrow = 1
    const thirdThrow = 5

    const gameParam = new GameParam([], 1, nbPins)

    const score = {
      throws: [firstThrow, secondThrow, thirdThrow],
      score: null
    }
    const wrapper = mountComponent(gameParam, isLast, score)

    expect(wrapper.find('#Score #first').text()).toContain(firstThrow)
    expect(wrapper.find('#Score #second').text()).toContain('/')
    expect(wrapper.find('#Score #third').text()).toContain(thirdThrow)
  })
  test('2 Normal', () => {
    // Init component
    const nbPins = 10
    const isLast = true
    const firstThrow = 1
    const secondThrow = 1
    const thirdThrow = 5 // should be ignored

    const gameParam = new GameParam([], 1, nbPins)

    const score = {
      throws: [firstThrow, secondThrow, thirdThrow],
      score: null
    }
    const wrapper = mountComponent(gameParam, isLast, score)

    expect(wrapper.find('#Score #first').text()).toContain(firstThrow)
    expect(wrapper.find('#Score #second').text()).toContain(secondThrow)
    expect(wrapper.find('#Score #third').text()).toContain('')
  })
})
