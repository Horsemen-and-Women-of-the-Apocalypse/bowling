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
})
describe('Last Score component', () => {
  test('3 strikes', () => {
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
  test('Strike and 2 normal ', () => {
    const nbPins = 10
    const isLast = true
    const firstThrow = nbPins
    const secondThrow = 2
    const thirdThrow = 7

    const gameParam = new GameParam([], 1, nbPins)

    const score = {
      throws: [firstThrow, secondThrow, thirdThrow],
      score: null
    }
    const wrapper = mountComponent(gameParam, isLast, score)

    expect(wrapper.find('#Score #first').text()).toContain('X')
    expect(wrapper.find('#Score #second').text()).toContain(secondThrow)
    expect(wrapper.find('#Score #third').text()).toContain(thirdThrow)
  })
  test('Normal spare and strike', () => {
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
