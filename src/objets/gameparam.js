import Player from './player'

/**
 * Class to describe parameter of the game
 */
export default class GameParam {
    players = []
    count = -1
    pins = -1

    /**
    * @param {Player[]} cplayers - List of player
    * @param {int} ccount - number of count
    * @param {int} cpins - number of pins
    */
    constructor (cplayers, ccount, cpins) {
      var ok = true

      cplayers.forEach(function (item, index, array) {
        if (!(item instanceof Player)) {
          ok = false
        }
      })
      if (ok) {
        this.players = cplayers
      } else {
        throw new Error('bad players type argument')
      }

      if (Number.isInteger(ccount)) {
        this.count = ccount
      } else {
        throw new Error('bad count type argument')
      }

      if (Number.isInteger(cpins)) {
        this.pins = cpins
      } else {
        throw new Error('bad pins type argument')
      }
    }

    /**
    * @param {int} pos - Position in list
    * Return player at pos
    */
    getPlayerAt (pos) {
      if (Number.isInteger(pos)) {
        return this.players[pos]
      }
      throw new Error('bad type argument')
    }

    /**
     * Return list of players
     */
    getPlayers () {
      return this.players
    }

    /**
    * @param {Player} player - Player
    * add a player
    */
    addPlayer (player) {
      if (player instanceof Player) {
        this.players.push(player)
        return
      }
      throw new Error('bad type argument')
    }

    /**
    * @param {Player} player -
    * remove player from instance
    */
    removePlayer (player) {
      if (player instanceof Player) {
        this.players.splice(this.players.indexOf(player), 1)
        return
      }
      throw new Error('bad type argument')
    }

    /**
    * @param {int} pos - Position in list
    * remove player from position in list
    */
    removePlayerFromIndex (pos) {
      if (Number.isInteger(pos)) {
        this.players.splice(pos, 1)
        return
      }
      throw new Error('bad type argument')
    }

    /**
     * return count
     */
    getCount () {
      return this.count
    }

    /**
     * return pins
     */
    getPins () {
      return this.pins
    }
}
