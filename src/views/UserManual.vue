<template>
  <div id="UserManual">
    <div>
      test
      <VueMarkdown>
        #this is the default slot
      </VueMarkdown>
    </div>
    <md-button
      name="goToHome"
      class="md-raised md-primary fixed-bottom md-fab md-fab-bottom-center"
      @click="goToHome"
    >
      <md-tooltip md-direction="top">{{ $t("scoreBoard.back") }}</md-tooltip>
      <md-icon>close</md-icon>
    </md-button>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'ScoreboardView',
  components: {
    VueMarkdown
  },
  methods: {
    goToHome () {
      this.$router.push({
        name: 'GamePreparation'
      })
    }
  }
}
</script>

<style scoped>
.scoreboardview {
  height: 100vh;
}
</style>
