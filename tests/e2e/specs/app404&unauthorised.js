// Application 404 & unautorized page access tests

module.exports = {
  beforeEach: (browser) => browser.init(),
  afterEach: (browser) => browser.end(),
  '404 redirection': browser => {
    // Look for the default home page component
    browser.assert.elementPresent('.gamepreparation')

    // Non existant page
    browser.url('http://localhost:8080/IDONTEXIST')
    browser.assert.elementPresent('.gamepreparation')

    // Existing but non home page
    browser.url('http://localhost:8080/game')
    browser.assert.elementPresent('.gamepreparation')
  }
}
