function LoadPageInit (browser, cnbTurn, cnbPins, cnbPlayers) {
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

module.exports = { LoadPageInit }
