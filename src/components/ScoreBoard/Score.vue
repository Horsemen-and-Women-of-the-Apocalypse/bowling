<template>
  <div id="Score">
    <div id="top">
      <div class="throw" id="first">{{score.throws[0]}}</div>
      <div class="throw" id="second">{{score.throws[1]}}</div>
      <div v-if="last" class="throw" id="third">{{score.throws[2]}}</div>
    </div>
    <div id="bot">{{score.score}}</div>
  </div>
</template>

<script>
export default {
  name: 'Score',
  props: {
    last: { type: Boolean, default: false },
    score: { type: Object, requiered: true }
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
#bot, #top .throw{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
