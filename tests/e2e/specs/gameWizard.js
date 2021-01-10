// Game wizard tests

module.exports = {
  beforeEach: (browser) => browser.init(),
  afterEach: (browser) => browser.end(),
  'Wizard is present': browser => {
    const game = browser.url('http://localhost:8000/game')
  }
}
