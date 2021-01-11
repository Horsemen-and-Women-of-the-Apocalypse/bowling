// Game wizard tests

module.exports = {
  beforeEach: (browser) => browser.init(),
  afterEach: (browser) => browser.end(),
  'Wizard is present': browser => {
    var app = firstPage(browser, 10, 4, ['P1', 'P2'])
    app.assert.visible('#PlayerAnouncement')
    app.waitForElementVisible('.game')
    app.assert.visible('#playerTurn')
  },
  'Player Turn': browser => {
    var app = firstPage(browser, 10, 4, ['P1', 'P2'])
    app.assert.visible('#PlayerAnouncement')
    app.waitForElementVisible('.game')
    app.assert.visible('#playerTurn')

    // First throw
    app.assert.visible('input[name=pinsFallen1]')
    app.assert.visible('button[name=BtnNext]')

    app.clearValue('input[name=pinsFallen1]')
    app.assert.value('input[name=pinsFallen1]', '0')
    app.click('button[name=BtnNext]')

    // Second throw
    app.assert.visible('input[name=pinsFallen2]')
    app.assert.visible('button[name=secondBtnValidate]')

    app.clearValue('input[name=pinsFallen2]')
    app.assert.value('input[name=pinsFallen2]', '0')
    app.click('button[name=secondBtnValidate]')
  },
  'Player Last Turn': browser => {
    var app = firstPage(browser, 1, 10, ['P1', 'P2'])
    app.assert.visible('#PlayerAnouncement')
    app.waitForElementVisible('.game')
    app.assert.visible('#LastPlayerTurn')

    // First throw
    app.assert.visible('input[name=pinsFallen1]')
    app.assert.visible('button[name=firstBtnValidate]')

    app.clearValue('input[name=pinsFallen1]')
    for (let i = 0; i < 10; i++) {
      app.click('#LastPlayerTurn #addFirstThrow')
      app.assert.value('input[name=pinsFallen1]', '' + (i + 1))
    }
    app.assert.value('input[name=pinsFallen1]', '10')
    app.click('button[name=firstBtnValidate]')

    // Second throw
    app.assert.visible('input[name=pinsFallen2]')
    app.assert.visible('button[name=secondBtnValidate]')

    app.clearValue('input[name=pinsFallen2]')
    for (let i = 0; i < 5; i++) {
      app.click('#LastPlayerTurn #addSecondThrow')
      app.assert.value('input[name=pinsFallen2]', '' + (i + 1))
    }
    app.assert.value('input[name=pinsFallen2]', '5')
    app.click('button[name=secondBtnValidate]')

    // Third throw
    app.assert.visible('input[name=pinsFallen3]')
    app.assert.visible('button[name=thirdBtnValidate]')

    app.clearValue('input[name=pinsFallen3]')
    for (let i = 0; i < 5; i++) {
      app.click('#LastPlayerTurn #addThirdThrow')
      app.assert.value('input[name=pinsFallen3]', '' + (i + 1))
    }
    app.assert.value('input[name=pinsFallen2]', '5')
    app.click('button[name=thirdBtnValidate]')
  },
  'Open scoreboard': browser => {
    var app = firstPage(browser, 1, 10, ['P1', 'P2'])
    app.assert.visible('#PlayerAnouncement')
    app.waitForElementVisible('.game')
    app.assert.visible('#LastPlayerTurn')

    app.assert.visible('button[name=goToScoreboard]')
    app.click('button[name=goToScoreboard]')
    app.waitForElementVisible('.scoreboardview')
    app.assert.visible('#ScoreBoard')
  }
}

function firstPage (browser, cnbTurn, cnbPins, cnbPlayers) {
  const homepage = browser.page.homepage()
  homepage.waitForElementVisible('@appContainer')
  const app = homepage.section.app

  const nbTurn = cnbTurn
  const nbPins = cnbPins
  const players = cnbPlayers

  // Add turns

  for (let i = 10; i > nbTurn; i--) {
    app.click('.turn #minus')
  }
  app.click('button[name=firstBtnValidate]')

  // Add pins
  app.waitForElementVisible('button[name=secondBtnValidate]')
  for (let i = 11; i <= nbPins; i++) {
    app.click('.pins #add')
  }
  app.click('button[name=secondBtnValidate]')

  // Add players
  app.waitForElementVisible('input[name=newPlayerName]')

  players.forEach((playerName, i) => {
    app.setValue('input[name=newPlayerName]', playerName)
    app.click('#PlayerListCreator #addPlayerBtn')
  })

  app.click('button[name=thirdBtnValidate]')

  return app
}
