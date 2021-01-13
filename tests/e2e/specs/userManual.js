// Simple user manual tests

module.exports = {
  beforeEach: (browser) => browser.init(),
  afterEach: (browser) => browser.end(),
  'The manual exist': browser => {
    browser.assert.elementPresent('.gamepreparation')
    browser.click('button[name=goToManual]')
    browser.assert.elementPresent('#userManual')
    browser.waitForElementVisible('#UserManualView button[name=goToHome]')
    browser.click('#UserManualView button[name=goToHome]')
    browser.waitForElementVisible('.gamepreparation')
  }
}
