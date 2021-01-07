<template>
    <div class="scoreboardview">
        <div>
            <Scoreboard :score="this.$route.params.score" :currentPlayer="this.$route.params.currentPlayer" :currentTurn="this.$route.params.currentTurn"/>
        </div>
        <md-button class="md-raised md-raised md-primary" @click="goToHome">{{$t('scoreBoard.back')}}</md-button>
    </div>
</template>

<style scoped>

</style>

<script>
import Scoreboard from '../components/scoreboard/ScoreBoard'

export default {
  name: 'ScoreboardView',
  components: {
    Scoreboard
  },
  methods: {
    goToHome () {
      this.$router.push({ name: 'Game', params: { automaton: this.$route.params.automaton } })
    }
  }
}
</script>
