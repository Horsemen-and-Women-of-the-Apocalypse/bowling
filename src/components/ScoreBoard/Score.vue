<template>
  <div id="Score">
    <div id="top">
      <div class="throw" id="first">{{ throw1 }}</div>
      <div class="throw" id="second">{{ throw2 }}</div>
      <div v-if="last" class="throw" id="third">{{ throw3 }}</div>
    </div>
    <div id="bot">{{ score.score }}</div>
  </div>
</template>

<script>
export default {
  name: 'Score',
  data () {
    return {
      throw1: null,
      throw2: null,
      throw3: null
    }
  },
  props: {
    game: { type: Object, requiered: true },
    last: { type: Boolean, default: false },
    score: { type: Object, requiered: true }
  },
  created () {
    this.convertScoresToSymbol()
  },
  methods: {
    convertScoresToSymbol () {
      // fallen pins to X & / symbols convertion
      this.throw1 = null
      this.throw2 = null
      this.throw3 = null

      if (this.last) {
        // Last turn exeption
      } else {
        // First case : strike
        if (this.score.throws[0] >= this.game.getPins()) {
          this.throw1 = 'X'
          return
        }

        this.throw1 = this.score.throws[0]

        // Second case : spare
        if (
          this.score.throws[0] + this.score.throws[1] >=
          this.game.getPins()
        ) {
          this.throw2 = '/'
        } else this.throw2 = this.score.throws[1]
      }
    }
  },
  watch: {
    score () {
      this.convertScoresToSymbol()
    }
  }
}
</script>

<style scoped>
#Score {
  display: flex;
  flex-direction: column;
}
#top {
  flex: 0.8;
  display: flex;
  border-bottom: solid black 1px;
}
#top .throw {
  flex: 1;
}
#top .throw + .throw {
  border-left: solid black 1px;
}

#bot {
  flex: 1;
}

/* Center scores */
#bot,
#top .throw {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
