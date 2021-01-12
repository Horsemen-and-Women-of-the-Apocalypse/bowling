<template>
  <div class="game">
    <div v-if="animation">
        <PlayerAnouncement :playerName="this.automaton.getCurrentPlayer().getName()" :turn="this.automaton.getCurrentTurn() + 1"/>
    </div>
    <div v-else>
        <div id="nav">
         <Header :firstLine="$t('game.turnCount') + ' ' + Number(this.automaton.getCurrentTurn() + 1) +'/'+ this.automaton.getGameParam().getTurn() + ' - ' + $t('game.turn')" :secondLine="this.automaton.getCurrentPlayer().getName()"/>
        </div>
        <LastPlayerTurn v-if="this.automaton.isLastTurn()" :totalPins="this.automaton.getGameParam().getPins()" @done="nextTurn"/>
        <PlayerTurn v-else :totalPins="automaton.getGameParam().getPins()" @done="nextTurn"/>
        <md-button class="md-fab md-fab-bottom-left md-plain md-primary" name="goToScoreboard" @click="goToScoreboard">
            <md-tooltip md-direction="top">{{ $t('scoreBoard.scoreboard') }}</md-tooltip>
            <md-icon>ballot</md-icon>
        </md-button>
        <md-button class="md-fab md-fab-bottom-right md-plain md-primary" name="goToHome" @click="confirmExitDialog = true">
            <md-tooltip md-direction="top">{{ $t('scoreBoard.home') }}</md-tooltip>
            <md-icon>home</md-icon>
        </md-button>

        <!-- Confirmation dialog -->
        <md-dialog
        :md-active.sync="confirmExitDialog"
        :md-fullscreen="false"
        class="ralewayRegular"
        name="confirmExitDialog">
          <md-dialog-title>{{ $t('scoreBoard.dialog.title') }}</md-dialog-title>
          <md-dialog-content>
            {{ $t('scoreBoard.dialog.content') }}
          </md-dialog-content>

          <md-dialog-actions>
            <md-button name="cancel" @click="confirmExitDialog = false">
              {{ $t('scoreBoard.dialog.no') }}
            </md-button>
            <md-button name="confirm" @click="goToHome">
              {{ $t('scoreBoard.dialog.yes') }}
            </md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>
</template>

<style lang="scss" scoped>

#nav {
  height: 10vh;
}
</style>

<script>

import Header from '../components/Header'
import PlayerAnouncement from '../components/PlayerAnouncement'
import LastPlayerTurn from '../components/LastPlayerTurn'
import PlayerTurn from '../components/PlayerTurn'

export default {
  name: 'Game',
  components: {
    Header,
    PlayerAnouncement,
    LastPlayerTurn,
    PlayerTurn
  },
  data: () => ({
    animation: true,
    automaton: null,
    gameScore: null,

    confirmExitDialog: false
  }),
  created () {
    this.automaton = this.$route.params.automaton
    this.gameScore = this.$route.params.score
    this.showAnimation()
  },
  methods: {
    nextTurn (throws) {
      this.animation = true
      this.gameScore.registerThrow(this.automaton.getCurrentPlayer().getName(), this.automaton.getCurrentTurn() + 1, 1, throws.throw1)
      if (throws.throw2 !== undefined) {
        this.gameScore.registerThrow(this.automaton.getCurrentPlayer().getName(), this.automaton.getCurrentTurn() + 1, 2, throws.throw2)
      }
      if (throws.throw3 !== undefined) {
        this.gameScore.registerThrow(this.automaton.getCurrentPlayer().getName(), this.automaton.getCurrentTurn() + 1, 3, throws.throw3)
      }
      if (this.automaton.isEnd()) {
        this.$router.push({ name: 'GameEnd', params: { automaton: this.automaton, gameScore: this.gameScore } })
      } else {
        this.automaton.advance()
        this.showAnimation()
      }
    },
    goToScoreboard () {
      this.$router.push({ name: 'Scoreboard', params: { automaton: this.automaton, score: this.gameScore } })
    },
    goToHome () {
      this.$router.push({ name: 'GamePreparation' })
    },
    showAnimation () {
      setTimeout(() => { this.animation = false }, 2000)
    }
  }
}
</script>
