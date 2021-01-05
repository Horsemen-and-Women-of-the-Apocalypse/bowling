import { mount } from '@vue/test-utils'
import Vue from 'vue'
import ScoreBoard from '../../src/components/ScoreBoard/ScoreBoard.vue'
import VueMaterial from 'vue-material'

// Objects :
import Player from '../../src/objets/player'
import GameParam from '../../src/objets/gameparam'

/**
 * Mount a mocked version of ScoreBoard component
 *
 * @return {Wrapper<ScoreBoard>} ScoreBoard component
 */
const mountComponent = (gameParams, currentPlayer, currentTurn) => {
  return mount(ScoreBoard, {
    mocks: {
      $t: () => 'i18n is mocked' // Mock i18n function
    },
    propsData: {
      game: gameParams,
      currentPlayer,
      currentTurn
    }
  })
}

beforeAll(() => {
  // Install vue-material components
  Vue.use(VueMaterial)
})

describe('ScoreBoard component', () => {
  test('Classic game', async () => {
    // create games params
    const nbTurn = 20
    const nbPins = 100
    const playerNames = ['tata', 'tutu', 'toto']
    const players = []

    playerNames.forEach(pn => {
      players.push(new Player(pn))
    })

    const gameParam = new GameParam(players, nbTurn, nbPins)
    const wrapper = mountComponent(gameParam, null, null)

    // Check comp initialisation
    expect(wrapper.vm.globalScore).not.toBe(undefined)
    playerNames.forEach(pn => {
      expect(wrapper.vm.globalScore[pn]).not.toBe(undefined)
      expect(wrapper.vm.globalScore[pn].length).toBe(nbTurn)

      for (let i = 0; i < nbTurn; i++) {
        // Assert none
        expect(wrapper.vm.globalScore[pn][i].score).toBe(null)
        expect(wrapper.vm.globalScore[pn][i].throws.length).toBe(3)
        expect(wrapper.vm.globalScore[pn][i].throws[0]).toBe(null)
        expect(wrapper.vm.globalScore[pn][i].throws[1]).toBe(null)
        expect(wrapper.vm.globalScore[pn][i].throws[2]).toBe(null)

        // First throw
        const pinsFallen1 = Math.floor(Math.random() * nbPins)
        wrapper.vm.registerThrow(pn, i + 1, 1, pinsFallen1)
        expect(wrapper.vm.globalScore[pn][i].throws[0]).toBe(pinsFallen1)

        // Second throw
        const pinsFallen2 = Math.floor(Math.random() * nbPins)
        wrapper.vm.registerThrow(pn, i + 1, 2, pinsFallen2)
        expect(wrapper.vm.globalScore[pn][i].throws[1]).toBe(pinsFallen2)

        // Third throw
        if (i === nbTurn - 1) {
          const pinsFallen3 = Math.floor(Math.random() * nbPins)
          wrapper.vm.registerThrow(pn, i + 1, 3, pinsFallen3)
          expect(wrapper.vm.globalScore[pn][i].throws[2]).toBe(pinsFallen3)
        }
      }
    })
  })
  test('currentPlayer props', async () => {
    // create games params
    const nbTurn = 20
    const nbPins = 100
    const playerNames = ['tata', 'tutu', 'toto']
    const currentplayerIndex = 1
    const players = []

    playerNames.forEach(pn => {
      players.push(new Player(pn))
    })

    const gameParam = new GameParam(players, nbTurn, nbPins)
    const wrapperWithPlayerProps = mountComponent(gameParam, playerNames[currentplayerIndex], null)

    expect(wrapperWithPlayerProps.find('#playerNames .current').text()).toContain(playerNames[currentplayerIndex])

    const wrapperWithNoPlayerProps = mountComponent(gameParam, null, null)
    expect(wrapperWithNoPlayerProps.find('#playerNames .current').exists()).toBe(false)
  })
  test('currentTurn props', async () => {
    // create games params
    const nbTurn = 20
    const nbPins = 100
    const playerNames = ['tata', 'tutu', 'toto']
    const currentTurn = 69420
    const players = []

    playerNames.forEach(pn => {
      players.push(new Player(pn))
    })

    const gameParam = new GameParam(players, nbTurn, nbPins)
    const wrapperWithCurTurnProps = mountComponent(gameParam, null, currentTurn)

    expect(wrapperWithCurTurnProps.find('#playerNames #currentTurnNumber').text()).toContain(currentTurn)

    const wrapperWithNoCurTurnProps = mountComponent(gameParam, null, null)
    expect(wrapperWithNoCurTurnProps.find('#playerNames #currentTurnNumber').text()).toContain('')
  })
  test('Classic game, wrong insertions', async () => {
    // create games params
    const nbTurn = 20
    const nbPins = 100
    const playerNames = ['tata', 'tutu', 'toto']
    const players = []

    playerNames.forEach(pn => {
      players.push(new Player(pn))
    })

    const gameParam = new GameParam(players, nbTurn, nbPins)
    const wrapper = mountComponent(gameParam)

    // Check comp initialisation
    playerNames.forEach(pn => {
      for (let i = 0; i < nbTurn; i++) {
        const pinsFallen1 = Math.floor(Math.random() * nbPins)

        // Wrong player
        expect(() => wrapper.vm.registerThrow('IDONTEXIST', i + 1, 1, pinsFallen1)).toThrow('Player not found')

        // Wrong turn (3, but too low)
        expect(() => wrapper.vm.registerThrow(pn, -1, 1, pinsFallen1)).toThrow('Invalid turn number')
        // Wrong turn 2 (too high)
        expect(() => wrapper.vm.registerThrow(pn, nbTurn + 5, 1, pinsFallen1)).toThrow('Invalid turn number')

        // Invalid trow (too low)
        expect(() => wrapper.vm.registerThrow(pn, i + 1, 0, pinsFallen1)).toThrow('Invalid throw number')
        // Invalid trow (too high)
        expect(() => wrapper.vm.registerThrow(pn, i + 1, 5, pinsFallen1)).toThrow('Invalid throw number')
        // Invalid trow (3, but not last turn)
        expect(() => wrapper.vm.registerThrow(pn, i + 1, 3, pinsFallen1)).toThrow('Invalid throw number')

        expect(wrapper.vm.globalScore[pn][i].throws[0]).toBe(null)
      }
    })
  })
})
