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

    const nbTurn = 10
    const nbPins = 8
    const players = ['toto', 'tata', 'tutu']

    // Add turns
    app.assert.visible('input[name=turnCount]')
    app.assert.visible('button[name=firstBtnValidate]')

    app.clearValue('input[name=turnCount]')
    app.setValue('input[name=turnCount]', 0)
    for (let i = 0; i < nbTurn; i++) app.click('.turn #add')
    app.click('button[name=firstBtnValidate]')

    // Add pins
    app.assert.visible('input[name=pinsCount]')
    app.assert.visible('button[name=secondBtnValidate]')
    app.clearValue('input[name=pinsCount]')
    app.setValue('input[name=pinsCount]', 0)
    for (let i = 0; i < nbPins; i++) app.click('.pins #add')
    app.click('button[name=secondBtnValidate]')

    // Add players
    app.assert.visible('input[name=newPlayerName]')
    app.assert.visible('button[name=thirdBtnValidate]')
    players.forEach((playerName, i) => {
      app.setValue('input[name=newPlayerName]', playerName)
      app.click('#PlayerListCreator #addPlayerBtn')
      app.assert.elementPresent('#PlayerListCreator #player_' + (i + 1))
    })
    app.click('button[name=thirdBtnValidate]')
  }
}
