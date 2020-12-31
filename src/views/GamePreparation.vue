<template>
  <div class="gamepreparation">
    <div id="nav">
      <Header/>
    </div>
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" :md-label="$t('gamepreparation.turn')"  :md-done.sync="first">
        <Turn ref="turn"/>
        <md-button name="firstBtnValidate" class="md-raised md-primary" @click="setDone('first', 'second')">{{ $t("gamepreparation.continue")}}</md-button>
      </md-step>

      <md-step id="second" :md-label="$t('gamepreparation.pins')" :md-done.sync="second">
        <Pins ref="pins"/>
        <md-button name="secondBtnValidate" class="md-raised md-primary" @click="setDone('second', 'third')">{{ $t("gamepreparation.continue")}}</md-button>
      </md-step>

      <md-step id="third" :md-label="$t('gamepreparation.players')" :md-done.sync="third">
        <Players ref="players" @playerListChange="playerListChange"/>
        <md-button name="thirdBtnValidate" :disabled="players.length == 0" class="md-raised md-primary" @click="createGameParam()">{{ $t("gamepreparation.play")}}</md-button>
      </md-step>
    </md-steppers>
  </div>
</template>

<style scoped>
  .gamepreparation {
    margin:0px;
    height:100%;
  }
  .md-steppers {
    background-color: #BFB35A !important;
    min-height: 100%;
  }
  .md-stepper {
    padding-left: 0px;
    padding-right: 0px;
  }
  .md-button {
    background-color: #F2C45A !important;
    color: #88A65E !important;
    font-weight: bold;
  }
  #nav {
    height: 10vh;
  }
</style>

<script>

import Turn from '../components/Turn'
import Pins from '../components/Pins'
import Players from '../components/PlayerListCreator'
import GameParam from '../objets/gameparam'
import Header from '../components/GamePrepHeader.vue'

export default {
  name: 'GamePreparation',
  components: {
    Turn,
    Pins,
    Players,
    Header
  },
  data: () => ({
    active: 'first',
    first: false,
    second: false,
    third: false,
    gameParam: null,
    players: []
  }),
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
      this.setDone('third')

      const turn = this.$refs.turn.turnCount
      const pins = this.$refs.pins.pinsCount

      this.gameParam = new GameParam(this.players, turn, pins)
    },
    playerListChange (players) {
      this.players = players
    }
  }
}
</script>
