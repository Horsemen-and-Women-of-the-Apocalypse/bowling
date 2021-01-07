<template>
  <div class="game">
    <div v-if="animation">
        AHHH
    </div>
    <div v-else>
        <div id="nav">
         <Header :currentPlayer="automaton.getCurrentPlayer().getName()"/>
        </div>
        <md-steppers :md-active-step.sync="active" md-linear>
        <md-step id="first" md-label="First Step" md-description="Optional" :md-done.sync="first">
            <md-button class="md-raised next md-raised md-primary" @click="setDone('first', 'second')">{{ $t('game.confirm')}}</md-button>
        </md-step>

        <md-step id="second" md-label="Second Step" :md-done.sync="second">
            <md-button class="md-raised next md-raised md-primary" @click="nextTurn()">{{ $t('game.confirm')}}</md-button>
        </md-step>
        </md-steppers>
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
import GameScore from '../objets/gameScore'

export default {
  name: 'Game',
  components: {
    Header
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
    setTimeout(() => { this.animation = false }, 2000)
  },
  methods: {
    nextTurn () {
      this.setDone('second')
      this.automaton.advance()
      this.$router.push({ name: 'Game', params: { automaton: this.automaton } })
    },
    setDone (id, index) {
      this[id] = true

      if (index) {
        this.active = index
      }
    },
    goToScoreboard () {
      this.$router.push({ name: 'Scoreboard', params: { automaton: this.automaton, score: new GameScore(this.automaton.getGameParam()), currentPlayer: this.automaton.getCurrentPlayer().getName(), currentTurn: this.automaton.getCurrentTurn() + 1 } })
    }
  }
}
</script>
