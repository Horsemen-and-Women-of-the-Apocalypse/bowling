import { mount } from '@vue/test-utils'
import Vue from 'vue'
import PlayerListCreator from '../../src/components/PlayerListCreator.vue'
import VueMaterial from 'vue-material'

/**
 * Mount a mocked version of PlayerListCreator component
 *
 * @return {Wrapper<PlayerListCreator>} PlayerListCreator component
 */
const mountComponent = () => {
  return mount(PlayerListCreator, {
    mocks: {
      $t: () => 'i18n is mocked' // Mock i18n function
    }
  })
}

const newPlayerNameInputSelector = '[name=newPlayerName]'
const addNewPlayerBtnSelector = '#addPlayerBtn'

beforeAll(() => {
  // Install vue-material components
  Vue.use(VueMaterial)
})

describe('PlayerListCreator component', () => {
  test('Add a new player with no name', async () => {
    const wrapper = mountComponent()

    expect(wrapper.vm.getPlayers().length).toBe(0)
    expect(wrapper.vm.newPlayerName).toBe('')

    await wrapper.find(addNewPlayerBtnSelector).trigger('click')

    expect(wrapper.vm.getPlayers().length).toBe(0)
  })

  test('Add a player', async () => {
    const wrapper = mountComponent()

    // 0 players
    expect(wrapper.vm.getPlayers().length).toBe(0)

    // 1 player
    const newPlayerName1 = 'tata toto'
    await wrapper.find(newPlayerNameInputSelector).setValue(newPlayerName1)
    expect(wrapper.vm.newPlayerName).toBe(newPlayerName1)

    await wrapper.find(addNewPlayerBtnSelector).trigger('click')

    expect(wrapper.vm.getPlayers().length).toBe(1)
    expect(wrapper.vm.getPlayers()[0].getName()).toBe(newPlayerName1)
    expect(wrapper.vm.newPlayerName).toBe('') // Name reset
  })
  test('Add multiple players', async () => {
    const wrapper = mountComponent()
    const nbPlayerToAdd = 40

    // 0 players
    expect(wrapper.vm.getPlayers().length).toBe(0)

    for (let i = 0; i < nbPlayerToAdd; i++) {
      // add player
      const newPlayerName = 'Player N°' + (i + 1)
      await wrapper.find(newPlayerNameInputSelector).setValue(newPlayerName)
      expect(wrapper.vm.newPlayerName).toBe(newPlayerName)

      await wrapper.find(addNewPlayerBtnSelector).trigger('click')

      expect(wrapper.vm.getPlayers().length).toBe(i + 1)
      expect(wrapper.vm.getPlayers()[i].getName()).toBe(newPlayerName)
      expect(wrapper.vm.newPlayerName).toBe('') // Name reset
    }
  })
  test('Add player with same name', async () => {
    const wrapper = mountComponent()

    // 0 players
    expect(wrapper.vm.getPlayers().length).toBe(0)

    // 1 player
    const newPlayerName1 = 'tata toto'
    await wrapper.find(newPlayerNameInputSelector).setValue(newPlayerName1)
    expect(wrapper.vm.newPlayerName).toBe(newPlayerName1)

    await wrapper.find(addNewPlayerBtnSelector).trigger('click')

    expect(wrapper.vm.getPlayers().length).toBe(1)
    expect(wrapper.vm.getPlayers()[0].getName()).toBe(newPlayerName1)

    // 2nd player with same name
    await wrapper.find(newPlayerNameInputSelector).setValue(newPlayerName1)
    expect(wrapper.vm.newPlayerName).toBe(newPlayerName1)

    await wrapper.find(addNewPlayerBtnSelector).trigger('click')

    expect(wrapper.vm.getPlayers().length).toBe(1) // no changement
    expect(wrapper.vm.getPlayers()[0].getName()).toBe(newPlayerName1)
  })
  test('Remove a player', async () => {
    const wrapper = mountComponent()

    // 0 players
    expect(wrapper.vm.getPlayers().length).toBe(0)

    // 1 player
    const newPlayerName1 = 'tata toto'
    await wrapper.find(newPlayerNameInputSelector).setValue(newPlayerName1)
    expect(wrapper.vm.newPlayerName).toBe(newPlayerName1)

    await wrapper.find(addNewPlayerBtnSelector).trigger('click')

    expect(wrapper.vm.getPlayers().length).toBe(1)
    expect(wrapper.vm.getPlayers()[0].getName()).toBe(newPlayerName1)

    // 2nd player
    const newPlayerName2 = 'tutu tonton'

    await wrapper.find(newPlayerNameInputSelector).setValue(newPlayerName2)
    expect(wrapper.vm.newPlayerName).toBe(newPlayerName2)

    await wrapper.find(addNewPlayerBtnSelector).trigger('click')

    expect(wrapper.vm.getPlayers().length).toBe(2)
    expect(wrapper.vm.getPlayers()[0].getName()).toBe(newPlayerName1)
    expect(wrapper.vm.getPlayers()[1].getName()).toBe(newPlayerName2)

    // remove first player
    await wrapper.find('#player_1 .removePlayerBtn').trigger('click')
    expect(wrapper.vm.getPlayers().length).toBe(1)
    expect(wrapper.vm.getPlayers()[0].getName()).toBe(newPlayerName2)

    // remove Second player
    await wrapper.find('#player_1 .removePlayerBtn').trigger('click')
    expect(wrapper.vm.getPlayers().length).toBe(0)
  })
  test('Remove a non existing player', async () => {
    const wrapper = mountComponent()

    // 0 players
    expect(wrapper.vm.getPlayers().length).toBe(0)

    // 1 player
    const newPlayerName1 = 'tata toto'
    await wrapper.find(newPlayerNameInputSelector).setValue(newPlayerName1)
    await wrapper.find(addNewPlayerBtnSelector).trigger('click')

    // 2nd player
    const newPlayerName2 = 'tutu tonton'
    await wrapper.find(newPlayerNameInputSelector).setValue(newPlayerName2)
    await wrapper.find(addNewPlayerBtnSelector).trigger('click')

    expect(wrapper.vm.getPlayers().length).toBe(2)
    expect(wrapper.vm.getPlayers()[0].getName()).toBe(newPlayerName1)
    expect(wrapper.vm.getPlayers()[1].getName()).toBe(newPlayerName2)

    // remove player -1
    wrapper.vm.removePlayer(-1)

    expect(wrapper.vm.getPlayers().length).toBe(2) // no changes
    expect(wrapper.vm.getPlayers()[0].getName()).toBe(newPlayerName1)
    expect(wrapper.vm.getPlayers()[1].getName()).toBe(newPlayerName2)

    // remove player len +1
    wrapper.vm.removePlayer(3)

    expect(wrapper.vm.getPlayers().length).toBe(2) // no changes
    expect(wrapper.vm.getPlayers()[0].getName()).toBe(newPlayerName1)
    expect(wrapper.vm.getPlayers()[1].getName()).toBe(newPlayerName2)
  })
})
