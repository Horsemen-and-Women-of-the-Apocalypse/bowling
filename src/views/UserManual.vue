<template>
  <div id="UserManualView">
    <VueMarkdown id="userManual" class="ralewayRegular">
      {{ userManualMd }}
    </VueMarkdown>
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
// eslint-disable-next-line import/no-webpack-loader-syntax
import userManual from '!raw-loader!../assets/files/userManual.md'

export default {
  name: 'ScoreboardView',
  components: {
    VueMarkdown
  },
  data () {
    return {
      userManualMd: null
    }
  },
  created () {
    this.userManualMd = userManual
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
#UserManualView {
  height: 100vh;
  overflow: auto;
}
#userManual {
  text-align: left;
  margin: 0 3% 100px 3%;
}
</style>
