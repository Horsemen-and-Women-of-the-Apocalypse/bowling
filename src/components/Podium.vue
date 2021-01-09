<template>
  <div id="Podium">
    <!-- 3rd player -->
    <div id="third" class="player" v-if="sortedScores.length > 2">
      <span class="name">{{ sortedScores[2].name }}</span>
      <div class="score">
        <span class="value spicyRice"> {{ sortedScores[2].score }} </span>
        <span class="points"> {{ $t("podium.points") }} </span>
      </div>
    </div>
    <!-- 1st player -->
    <div id="first" class="player" v-if="sortedScores.length > 0">
      <span id="winner" class="name">{{ sortedScores[0].name }}</span>
      <div class="score">
        <span class="value spicyRice"> {{ sortedScores[0].score }} </span>
        <span class="points"> {{ $t("podium.points") }} </span>
      </div>
    </div>
    <!-- 2nd player -->
    <div id="second" class="player" v-if="sortedScores.length > 1">
      <span class="name">{{ sortedScores[1].name }}</span>
      <div class="score">
        <span class="value spicyRice"> {{ sortedScores[1].score }} </span>
        <span class="points"> {{ $t("podium.points") }} </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Podium',
  props: {
    scores: { type: Object, requiered: true }
  },
  computed: {
    sortedScores () {
      const ret = []
      for (var s in this.scores) ret.push({ name: s, score: this.scores[s] })
      return ret.sort((a, b) => a.score < b.score)
    }
  }
}
</script>

<style scoped>
#Podium {
  display: flex;
  justify-content: center;
  height: 100%;
  padding: 3% 10% 0 10%;
  overflow: hidden;
}

.player {
  display: flex;
  flex-direction: column;
  justify-content: end;
  max-width: 33%;
}
.name {
  font-size: 2em;
  padding: 0 5% 3% 5%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.score {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 10%;
}
.score .points {
  font-weight: bolder;
  color: var(--secondaryDarker);
}

/* First */
#first .name {
  /* 1rst player name overflow exeption */
  color: var(--accent);
  overflow: visible;
  display:flex;
  justify-content: center;
}
#first .score {
  height: 80%;
  background: var(--accent);
}
#first .score .value {
  font-size: 2em;
}
/* Second */
#second .name {
  color: var(--primary);
}
#second .score {
  height: 50%;
  background: var(--primary);
}
#second .score .value {
  font-size: 1.5em;
}

/* Third */
#third .name {
  color: var(--secondary);
}
#third .score {
  height: 35%;
  background: var(--secondary);
}
#third .score .value {
  font-size: 1.2em;
}
</style>
