<template>
        <div class="scoreboardview">
            <div>
              <Scoreboard :score="this.$route.params.score" :currentPlayer="this.$route.params.currentPlayer" :currentTurn="this.$route.params.currentTurn"/>
            </div>
              <md-button class="md-raised md-primary fixed-bottom md-fab md-fab-bottom-center" @click="goToHome">
                <md-tooltip md-direction="top">{{ $t('scoreBoard.back') }}</md-tooltip>
                <md-icon>close</md-icon>
              </md-button>
        </div>
</template>

<style scoped>

.scoreboardview {
  height: 100vh;
}

</style>

<script>
import Scoreboard from '../components/ScoreBoard/ScoreBoard'

export default {
  name: 'ScoreboardView',
  components: {
    Scoreboard
  },
  methods: {
    goToHome () {
      this.$router.push({ name: 'Game', params: { automaton: this.$route.params.automaton, score: this.$route.params.score } })
    }
  }
}
</script>
