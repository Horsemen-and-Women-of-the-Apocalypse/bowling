import GameParam from './gameparam'

/**
 * Class to store game score
 */
export default class GameScore {
    #playerThrows = []
    #gameParam = null

    /**
     * @param {GameParam} cGameParam - Game Parameter
     */
    constructor (cGameParam) {
      this.#gameParam = cGameParam
      if (cGameParam instanceof GameParam) {
        cGameParam.getPlayers().forEach((p) => {
          const turns = []

          for (let i = 0; i < cGameParam.getTurn(); i++) {
            const score = {
              throws: [null, null, null],
              score: null
            }
            turns.push(score)
          }
          this.#playerThrows[p.getName()] = turns
        })
      } else {
        throw new Error('bad type argument')
      }
    }

    /**
     * @param {String} playerName -Existing name of a player
     * @param {int} turnNumber - number of the turn to register the score
     * @param {int} throwNumber - number of the throw to register the score (1, 2 or 3 (only for the last turn))
     * @param {int} pinsNumber - number of fallen pins
     */
    registerThrow (playerName, turnNumber, throwNumber, pinsNumber) {
      // Player name check
      if (
        this.#gameParam.getPlayers().find((p) => p.getName() === playerName) ===
          undefined
      ) {
        throw Error('Player not found')
      }

      // Turn number check
      if (turnNumber <= 0 || turnNumber > this.#gameParam.getTurn()) {
        throw Error('Invalid turn number')
      }

      // Throw number check
      if (
        throwNumber <= 0 ||
          (turnNumber === this.#gameParam.getTurn() && throwNumber > 3) ||
          (turnNumber < this.#gameParam.getTurn() && throwNumber > 2)
      ) {
        throw Error('Invalid throw number')
      }

      // Register throw
      this.#playerThrows[playerName][turnNumber - 1].throws[
        throwNumber - 1
      ] = pinsNumber

      // Calculate Score

      // TODO

      // Update total Score

      // TODO
    }

    /**
     * Return turn
     * @return {int} - Turn
     */
    getTurn () {
      return this.#gameParam.getTurn()
    }

    /**
     * Return players
     * @return {Players[]} - Players
     */
    getPlayers () {
      return this.#gameParam.getPlayers()
    }

    /**
     * Return game param
     * @return {GameParam} - game param
     */
    getGameParam () {
      return this.#gameParam
    }

    /**
     * Return throw
     * @return {int} - Throw
     */
    getThrow (playerName, turn) {
      return this.#playerThrows[playerName][turn]
    }

    /**
     * Return throws
     * @return {int[]} - Throws
     */
    getThrows (playerName) {
      return this.#playerThrows[playerName]
    }
}
