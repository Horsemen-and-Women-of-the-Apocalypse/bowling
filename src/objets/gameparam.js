import Player from './player'

/**
 * Class to describe parameter of the game
 */
export default class GameParam {
    players = []
    turn = -1
    pins = -1

    /**
    * @param {Player[]} cplayers - List of player
    * @param {int} cturn - number of turn
    * @param {int} cpins - number of pins
    */
    constructor (cplayers, cturn, cpins) {
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

      if (Number.isInteger(cturn)) {
        if (cturn > 0) {
            this.turn = cturn
        } else {
            throw new Error('wrong number of turn')
        }
      } else {
        throw new Error('bad turn type argument')
      }

      if (Number.isInteger(cpins)) {
        if (cpins > 0) {
            this.pins = cpins
        } else {
            throw new Error('wrong number of pins')
        }
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
        if (pos >= 0 && pos < this.players.length) {
          return this.players[pos]
        }
        throw new Error('index out of bound')
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
        if (this.players.includes(player)) {
          this.players.splice(this.players.indexOf(player), 1)
          return
        }
        throw new Error('player not in list')
      }
      throw new Error('bad type argument')
    }

    /**
    * @param {int} pos - Position in list
    * remove player from position in list
    */
    removePlayerFromIndex (pos) {
      if (Number.isInteger(pos)) {
        if (pos >= 0 && pos < this.players.length) {
          this.players.splice(pos, 1)
          return
        }
        throw new Error('index out of bound')
      }
      throw new Error('bad type argument')
    }

    /**
     * return turn
     */
    getTurn () {
      return this.turn
    }

    /**
     * return pins
     */
    getPins () {
      return this.pins
    }
}
