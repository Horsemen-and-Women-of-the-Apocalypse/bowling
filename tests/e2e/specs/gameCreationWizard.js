// Game creation wizard tests

module.exports = {
  beforeEach: (browser) => browser.init(),
  afterEach: (browser) => browser.end(),
  'Wizard is present': browser => {
    const homepage = browser.page.homepage()
    homepage.waitForElementVisible('@appContainer')
    const app = homepage.section.app

    // Look for the 3 components
    app.assert.elementPresent('.turn')
    app.assert.elementPresent('.pins')
    app.assert.elementPresent('#PlayerListCreator')
  },
  'Create simple game': async browser => {
    const homepage = browser.page.homepage()
    homepage.waitForElementVisible('@appContainer')
    const app = homepage.section.app

    const nbTurn = 20
    const nbPins = 12
    const players = ['toto', 'tata', 'tutu']

    // Add turns
    app.assert.visible('input[name=turnCount]')
    app.assert.visible('button[name=firstBtnValidate]')

    app.clearValue('input[name=turnCount]')
    app.assert.value('input[name=turnCount]', '10')
    for (let i = 11; i <= nbTurn; i++) {
      app.click('.turn #add')
      app.assert.value('input[name=turnCount]', '' + i)
    }
    app.click('button[name=firstBtnValidate]')

    // Add pins
    app.assert.visible('input[name=pinsCount]')
    app.assert.visible('button[name=secondBtnValidate]')
    app.clearValue('input[name=pinsCount]')
    app.assert.value('input[name=pinsCount]', '10')
    for (let i = 11; i <= nbPins; i++) {
      app.click('.pins #add')
      app.assert.value('input[name=pinsCount]', '' + i)
    }
    app.click('button[name=secondBtnValidate]')

    // Add players
    app.assert.visible('input[name=newPlayerName]')
    app.assert.visible('button[name=thirdBtnValidate]')
    app.assert.attributeEquals('button[name=thirdBtnValidate]', 'disabled', 'true')

    players.forEach((playerName, i) => {
      app.setValue('input[name=newPlayerName]', playerName)
      app.click('#PlayerListCreator #addPlayerBtn')
      app.assert.elementPresent('#PlayerListCreator #player_' + (i + 1))
    })

    app.getAttribute('button[name=thirdBtnValidate]', 'disabled', result => { app.assert.equal(result.value, null) })
    players.forEach((playerName, i) => {
      app.assert.containsText('#PlayerListCreator #player_' + (i + 1) + ' .name', (i + 1) + ' : ' + playerName)
    })

    app.click('button[name=thirdBtnValidate]')
  },
  'Create game and remove players': browser => {
    const homepage = browser.page.homepage()
    homepage.waitForElementVisible('@appContainer')
    const app = homepage.section.app

    const players = ['toto', 'tata', 'tutu']

    // Add turns
    app.assert.visible('button[name=firstBtnValidate]')
    app.click('button[name=firstBtnValidate]')

    // Add pins
    app.assert.visible('button[name=secondBtnValidate]')
    app.click('button[name=secondBtnValidate]')

    // Add players
    app.assert.visible('input[name=newPlayerName]')

    players.forEach((playerName, i) => {
      app.setValue('input[name=newPlayerName]', playerName)
      app.click('#PlayerListCreator #addPlayerBtn')
    })

    // remove players by removing first players
    app.assert.elementCount('#PlayerListCreator .removeBtn', players.length)
    players.forEach(() => {
      app.click('#PlayerListCreator #player_1 .removeBtn')
    })
    app.assert.elementCount('#PlayerListCreator .removeBtn', 0)

    // Add players
    players.forEach((playerName, i) => {
      app.setValue('input[name=newPlayerName]', playerName)
      app.click('#PlayerListCreator #addPlayerBtn')
    })

    // remove second player
    app.assert.elementCount('#PlayerListCreator .removeBtn', players.length)
    app.click('#PlayerListCreator #player_2 .removeBtn')
    app.assert.elementCount('#PlayerListCreator .removeBtn', players.length - 1)
  }
}
