<template>
  <div class="gamepreparation">
    <div id="nav">
      <Header/>
    </div>
    <md-steppers :md-active-step.sync="active" md-linear  md-alternative>
      <md-step id="first" :md-label="$t('gamepreparation.turn')" :md-done.sync="first">
        <Turn ref="turn" />
        <md-button
          name="firstBtnValidate"
          class="md-raised next md-raised md-primary"
          @click="setDone('first', 'second')"
          >{{ $t("gamepreparation.continue") }}</md-button
        >
      </md-step>

      <md-step id="second" :md-label="$t('gamepreparation.pins')" :md-done.sync="second">
        <Pins ref="pins" />
        <md-button
          name="secondBtnValidate"
          class="md-raised next md-raised md-primary"
          @click="setDone('second', 'third')"
          >{{ $t("gamepreparation.continue") }}</md-button
        >
      </md-step>

      <md-step id="third" :md-label="$t('gamepreparation.players')" :md-done.sync="third">
        <Players ref="players" @playerListChange="playerListChange" />
        <md-button
          name="thirdBtnValidate"
          :disabled="players.length == 0"
          class="md-raised next md-raised md-primary"
          @click="createGameParam()"
          >{{ $t("gamepreparation.play") }}</md-button
        >
      </md-step>
    </md-steppers>

    <!-- Error msg -->

    <md-snackbar
      id="errorMsg"
      md-position="center"
      :md-duration="4000"
      :md-active.sync="errorMsg"
      md-persistent
    >
      <span>{{ $t("gamepreparation.errorMsg") }}</span>
      <md-button class="md-primary" @click="errorMsg = false"
        >{{ $t("gamepreparation.errorMsgCloseBtn") }}</md-button
      >
    </md-snackbar>
  </div>
</template>

<style scoped>
.gamepreparation {
  margin: 0px;
}
.md-steppers {
  background-color: var(--darker) !important;
  min-height: 90vh;
}
.md-stepper {
  padding-left: 0px;
  padding-right: 0px;
}
.next {
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
import Turn from '../components/Turn'
import Pins from '../components/Pins'
import Players from '../components/PlayerListCreator'
import GameParam from '../objets/gameparam'
import Automaton from '../objets/automaton'
import Header from '../components/GamePrepHeader.vue'
import GameScore from '../objets/gameScore'

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
    players: [],
    errorMsg: false
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

      try {
        this.gameParam = new GameParam(this.players, turn, pins)
        this.$router.push({ name: 'Game', params: { automaton: new Automaton(this.gameParam), score: new GameScore(this.gameParam) } })
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
