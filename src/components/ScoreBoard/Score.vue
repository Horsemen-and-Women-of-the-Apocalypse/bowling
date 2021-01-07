<template>
  <div :class="turn % 2 ? 'odd' : ''" id="Score">
    <div id="top">
      <div class="throw" id="first">{{ processedScore.throw1 }}</div>
      <div class="throw" id="second">{{ processedScore.throw2 }}</div>
      <div v-if="last" class="throw" id="third">
        {{ processedScore.throw3 }}
      </div>
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
    score: { type: Object, requiered: true },
    turn: { type: Number, requiered: true }
  },
  computed: {
    processedScore () {
      // fallen pins to X & / symbols convertion
      var throw1 = null
      var throw2 = null
      var throw3 = null

      if (this.last) {
        // Last turn exeption
        if (this.score.throws[0] >= this.game.getPins()) {
          throw1 = 'X'

          if (this.score.throws[1] >= this.game.getPins()) {
            throw2 = 'X'

            if (this.score.throws[2] >= this.game.getPins()) throw3 = 'X'
            // Strike - Strike - Strike
            else throw3 = this.score.throws[2] // Strike - Strike - Normal
          } else if (
            this.score.throws[1] + this.score.throws[2] >=
            this.game.getPins()
          ) {
            // Strike - Normal - Spare
            throw2 = this.score.throws[1]
            throw3 = '/'
          } else {
            // Strike - Normal - Normal
            throw2 = this.score.throws[1]
            throw3 = this.score.throws[2]
          }
        } else if (
          this.score.throws[0] + this.score.throws[1] >=
          this.game.getPins()
        ) {
          throw1 = this.score.throws[0]
          throw2 = '/'

          if (this.score.throws[2] >= this.game.getPins()) throw3 = 'X'
          // Normal - Spare - Strike
          else throw3 = this.score.throws[2] // Normal - Spare - Normal
        } else {
          // Normal - Normal
          throw1 = this.score.throws[0]
          throw2 = this.score.throws[1]
        }
      } else {
        // First case : strike
        if (this.score.throws[0] >= this.game.getPins()) {
          throw1 = 'X'
        } else {
          throw1 = this.score.throws[0]

          // Second case : spare
          if (
            this.score.throws[0] + this.score.throws[1] >=
            this.game.getPins()
          ) {
            throw2 = '/'
          } else throw2 = this.score.throws[1]
        }
      }

      return { throw1, throw2, throw3 }
    }
  }
}
</script>

<style scoped>
#Score {
  display: flex;
  flex-direction: column;
}
#Score.odd {
  display: flex;
  flex-direction: column;
  background: var(--dark);
}
#top {
  flex: 0.8;
  display: flex;
  border-bottom: solid white 1px;
}
#top .throw {
  flex: 1;
}
#top .throw + .throw {
  border-left: solid white 1px;
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
