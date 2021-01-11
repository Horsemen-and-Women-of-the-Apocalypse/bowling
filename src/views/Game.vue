<template>
  <div class="game">
    <div v-if="animation">
        <PlayerAnouncement :playerName="this.automaton.getCurrentPlayer().getName()" :turn="this.automaton.getCurrentTurn() + 1"/>
    </div>
    <div v-else>
        <div id="nav">
         <Header :firstLine="$t('game.turn')" :secondLine="this.automaton.getCurrentPlayer().getName()"/>
        </div>
        <LastPlayerTurn v-if="this.automaton.isLastTurn()" :totalPins="this.automaton.getGameParam().getPins()" @done="nextTurn"/>
        <PlayerTurn v-else :totalPins="automaton.getGameParam().getPins()" @done="nextTurn"/>
        <md-button class="md-fab md-fab-bottom-left md-plain md-primary" name="goToScoreboard" @click="goToScoreboard">
            <md-tooltip md-direction="top">{{ $t('scoreBoard.scoreboard') }}</md-tooltip>
            <md-icon>ballot</md-icon>
        </md-button>
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
    gameScore: null
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
      if (throws.throw1 < 10) { this.gameScore.registerThrow(this.automaton.getCurrentPlayer().getName(), this.automaton.getCurrentTurn() + 1, 2, throws.throw2) }
      if (this.automaton.isLastTurn() && (throws.throw1 + throws.throw2 >= 10)) { this.gameScore.registerThrow(this.automaton.getCurrentPlayer().getName(), this.automaton.getCurrentTurn() + 1, 3, throws.throw3) }
      if (this.automaton.isEnd()) {
        // TODO
      } else {
        this.automaton.advance()
        this.showAnimation()
      }
    },
    goToScoreboard () {
      this.$router.push({ name: 'Scoreboard', params: { automaton: this.automaton, score: this.gameScore } })
    },
    showAnimation () {
      setTimeout(() => { this.animation = false }, 2000)
    }
  }
}
</script>
