import GameParam from './gameparam'
import scoreCalculation from './scoreCalculator'

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
      for (let i = 0; i < this.#playerThrows[playerName].length; i++) {
        // We look for the first score by turn that is still null
        // 3 options
        // It's null because the turn has not beeen finished (current turn)
        // It's null because it's a spare
        // It's null because it's a strike
        //
        if (this.#playerThrows[playerName][i].score === null) {
          // Null is at current turn
          if (i === turnNumber - 1) {
            // Current turn is the last one
            if (i === this.#playerThrows[playerName].length - 1) {
              // Last throw
              if (throwNumber === 3) {
                this.#playerThrows[playerName][i].score = scoreCalculation(this.translateThrows(playerName))
              }
            } else {
              // We can only know the score for the current turn if some pins remain after 2 throws
              if (throwNumber === 2) {
                if ((this.#playerThrows[playerName][i].throws[0] + this.#playerThrows[playerName][i].throws[1]) < this.#gameParam.getPins()) {
                  this.#playerThrows[playerName][i].score = scoreCalculation(this.translateThrows(playerName))
                }
              }
            }
          } else { // Null happens before current throw. Is it because of a spare or strike ?
            // Both options need the next throw
            if (this.#playerThrows[playerName][i + 1].throws[0] !== null) {
              if (this.#playerThrows[playerName][i].throws[0] === this.#gameParam.getPins()) { // Strike
                // Next turn is the last one
                if (i + 1 === this.#playerThrows[playerName].length - 1) {
                  // 2 next throws have been registered, we can go on
                  if (this.#playerThrows[playerName][i + 1].throws[1] !== 0) {
                    this.#playerThrows[playerName][i].score = scoreCalculation(this.translateThrows(playerName))
                  }
                } else {
                  // Strike
                  if (this.#playerThrows[playerName][i + 1].throws[0] === this.#gameParam.getPins()) {
                    if (this.#playerThrows[playerName][i + 2].throws[0] !== null) {
                      this.#playerThrows[playerName][i].score = scoreCalculation(this.translateThrows(playerName))
                    }
                  } else {
                    this.#playerThrows[playerName][i].score = scoreCalculation(this.translateThrows(playerName))
                  }
                }
              } else { // Spare
                this.#playerThrows[playerName][i].score = scoreCalculation(this.translateThrows(playerName))
              }
            }
          }
          break
        }
      }
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

    /**
     * Returns an array of throws for a specific player, ready to be computed
     * @return {int} - Throws
     */
    translateThrows (playerName) {
      const pthrows = this.#playerThrows[playerName]
      const translatedThrows = []
      for (let i = 0; i < pthrows.length; i++) {
        if (pthrows[i].throws[0] === this.#gameParam.getPins()) {
          translatedThrows.push(pthrows[i].throws[0])
          translatedThrows.push(0)
        } else {
          translatedThrows.push(pthrows[i].throws[0])
          translatedThrows.push(pthrows[i].throws[1])
        }
        if (i === pthrows.length - 1) translatedThrows.push(pthrows[i].throws[2])
      }
      return translatedThrows
    }
}
