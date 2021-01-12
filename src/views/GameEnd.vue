<template>
  <div class="gameend">
    <div id="nav">
      <Header :firstLine="$t('gameEnd.title')" :secondLine="$t('gameEnd.result')"/>
    </div>
    <div id="podium">
      <Podium :scores='this.$route.params.gameScore.totalScore()'/>
    </div>
    <div id="Scoreboard">
      <Scoreboard :score="this.$route.params.gameScore"/>
    </div>
    <md-button class="md-fab md-fab-bottom-right md-plain md-primary" name="replay" @click="replay()">
        <md-tooltip md-direction="top">{{ $t('gameEnd.replay') }}</md-tooltip>
        <md-icon>home</md-icon>
    </md-button>
  </div>
</template>

<script>
import Header from '../components/Header'
import Podium from '../components/Podium'
import Scoreboard from '../components/ScoreBoard/ScoreBoard.vue'

export default {
  name: 'GameEnd',
  components: {
    Podium,
    Header,
    Scoreboard
  },
  methods: {
    replay () {
      this.$router.push({ name: 'GamePreparation' })
    }
  }
}
</script>

<style scoped>
.gameend {
  margin: 0px;
}
#nav {
  height: 10vh;
}
#podium{
  height: 35vh;
}
</style>
