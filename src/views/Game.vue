<template>
  <div class="game">
    <div v-if="animation">
        <PlayerAnouncement :playerName="this.automaton.getCurrentPlayer().getName()" :turn="this.automaton.getCurrentTurn() + 1"/>
    </div>
    <div v-else>
        <div id="nav">
         <Header :currentPlayer="automaton.getCurrentPlayer().getName()"/>
        </div>
        <!-- TODO STEPPERS -->
        <md-button class="md-fab md-fab-bottom-left md-plain md-primary" @click="goToScoreboard">
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

import Header from '../components/GameHeader'
import PlayerAnouncement from '../components/PlayerAnouncement'
import GameScore from '../objets/gameScore'

export default {
  name: 'Game',
  components: {
    Header,
    PlayerAnouncement
  },
  data: () => ({
    animation: true,
    automaton: null,
    active: 'first',
    first: false,
    second: false
  }),
  created () {
    this.automaton = this.$route.params.automaton
    this.showAnimation()
  },
  methods: {
    nextTurn () {
      this.setDone('second')
      this.automaton.advance()
      this.animation = true
      this.showAnimation()
    },
    goToScoreboard () {
      this.$router.push({ name: 'Scoreboard', params: { automaton: this.automaton, score: new GameScore(this.automaton.getGameParam()), currentPlayer: this.automaton.getCurrentPlayer().getName(), currentTurn: this.automaton.getCurrentTurn() + 1 } })
    },
    showAnimation () {
      setTimeout(() => { this.animation = false }, 2000)
    }
  }
}
</script>
