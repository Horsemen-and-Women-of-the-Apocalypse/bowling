export default class GameParam {
    players = []
    count = -1
    pins = -1

    constructor (cplayers, ccount, cpins) {
      this.players = cplayers
      this.count = ccount
      this.pins = cpins
    }

    /**
    * @param {int} pos - Position in list
    */
    getPlayerAt (pos) {
      return this.players[pos]
    }

    getPlayers () {
      return this.players
    }

    /**
    * @param {Player} player - Player
    */
    addPlayer (player) {
      this.players.push(player)
    }

    /**
    * @param {Player} player - Player
    */
    removePlayer (player) {
      this.players.splice(this.players.indexOf(player), 1)
    }

    /**
    * @param {int} pos - Position in list
    */
    removePlayerFromIndex (pos) {
      this.players.splice(pos, 1)
    }

    getCount () {
      return this.count
    }

    getPins () {
      return this.pins
    }
}
