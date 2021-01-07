import GameParam from './gameparam'

/**
 * Class to describe automaton
 */
export default class Automaton {
    #gameParam = null
    #current = 0

    /**
     * @param {GameParam} cGameParam - Game Parameter
     */
    constructor (cGameParam) {
      if (cGameParam instanceof GameParam) {
        this.#gameParam = cGameParam
      } else {
        throw new Error('bad type argument')
      }
    }

    /**
     * Advance to the next player
     */
    advance () {
      if (!this.isEnd()) {
        this.#current = this.#current + 1
      }
    }

    /**
     * Get current player
     * @return {Player} - current player
     */
    getCurrentPlayer () {
      return this.#gameParam.getPlayerAt(this.#current % this.#gameParam.getPlayers().length)
    }

    /**
     * Get current turn
     * @return {int} - current turn
     */
    getCurrentTurn () {
      return parseInt(this.#current / this.#gameParam.getPlayers().length)
    }

    /**
     * Get game param
     * @return {GameParam} - Game param
     */
    getGameParam () {
      return this.#gameParam
    }

    /**
     * Get true if game is finished
     * @return {bool} - game status
     */
    isEnd () {
      return this.#current >= (this.#gameParam.getTurn() * this.#gameParam.getPlayers().length)
    }
}
