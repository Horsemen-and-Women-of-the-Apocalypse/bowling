// Import
const LoadPageInit = require('../../e2e-common/utils.js').LoadPageInit

// Game end tests
module.exports = {

  beforeEach: (browser) => browser.init(),
  afterEach: (browser) => browser.end(),
  'Test game preparation + end + replay': browser => {
    var app = LoadPageInit(browser, 1, 10, ['P1'])
    app.waitForElementVisible('.game')

    // First throw
    app.click('button[name=firstBtnValidate]')

    // Second throw
    app.waitForElementVisible('input[name=pinsFallen2]')
    app.click('button[name=secondBtnValidate]')

    // Game End
    app.waitForElementVisible('.gameend')
    app.waitForElementVisible('button[name=replay]')
    app.click('button[name=replay]')
    browser.waitForElementVisible('.gamepreparation')
  }
}
