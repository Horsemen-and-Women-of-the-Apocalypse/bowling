<template>
  <div class="gamepreparation">
    <div id="nav">
      <Header/>
    </div>
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" :md-label="$t('home.turn')" :md-done.sync="first">
        <Turn ref="turn" />
        <md-button
          name="firstBtnValidate"
          class="md-raised md-primary"
          @click="setDone('first', 'second')"
          >{{ $t("home.continue") }}</md-button
        >
      </md-step>

      <md-step id="second" :md-label="$t('home.pins')" :md-done.sync="second">
        <Pins ref="pins" />
        <md-button
          name="secondBtnValidate"
          class="md-raised md-primary"
          @click="setDone('second', 'third')"
          >{{ $t("home.continue") }}</md-button
        >
      </md-step>

      <md-step id="third" :md-label="$t('home.players')" :md-done.sync="third">
        <Players ref="players" @playerListChange="playerListChange" />
        <md-button
          name="thirdBtnValidate"
          :disabled="players.length == 0"
          class="md-raised md-primary"
          @click="createGameParam()"
          >{{ $t("home.play") }}</md-button
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
      <span>{{ $t("home.errorMsg") }}</span>
      <md-button class="md-primary" @click="errorMsg = false"
        >{{ $t("home.errorMsgCloseBtn") }}</md-button
      >
    </md-snackbar>
  </div>
</template>

<style scoped>
.home {
  margin: 0px;
  height: 100%;
}
.md-steppers {
  background-color: #bfb35a !important;
  min-height: 100%;
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
