<template>
  <div class="gamepreparation">
    <scoreBoard :game="gameParam" curentPlayer="player 3" :curentTurn="5"/>
  </div>
</template>

<style scoped>
.gamepreparation {
  margin: 0px;
  height: 100%;
}
.md-steppers {
  background-color: #bfb35a !important;
  height: 90vh;
}
.md-stepper {
  padding-left: 0px;
  padding-right: 0px;
}
.md-button {
  background-color: #f2c45a !important;
  color: #88a65e !important;
  font-weight: bold;
}
#nav {
  height: 10vh;
}
#errorMsg {
  background-color: crimson;
}
</style>

<script>
import ScoreBoard from '../components/ScoreBoard/ScoreBoard'
import GameParam from '../objets/gameparam'
import Player from '../objets/player'

export default {
  name: 'GamePreparation',
  components: {
    ScoreBoard
  },
  data: () => ({
    active: 'first',
    first: false,
    second: false,
    third: false,
    gameParam: null,
    players: [],
    errorMsg: false
  }),
  created () {
    this.createGameParam()
  },
  methods: {
    setDone (id, index) {
      this[id] = true

      if (index) {
        this.active = index
      }
    },
    getgameParam () {
      return this.gameParam
    },
    createGameParam () {
      const turn = Math.floor(Math.random() * 5) * 10 + 1
      const pins = Math.floor(Math.random() * 15) + 1
      const nbPlayer = Math.floor(Math.random() * 15) + 1

      const players = []

      for (let i = 0; i < nbPlayer; i++) {
        players.push(new Player('player ' + i))
      }
      try {
        this.gameParam = new GameParam(players, turn, pins)
      } catch (error) {
        this.errorMsg = true
      }
    },
    playerListChange (players) {
      this.players = players
    }
  }
}
</script>
