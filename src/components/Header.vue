<template>
  <div class="gameprepheader">
    <div class="spicyRice" id="title">{{firstLine}}</div>
    <div class="ralewayBold" id="gamePrep">{{secondLine}}</div>
  </div>
</template>

<style scoped>
.gameprepheader {
  height: 100%;
}
#title{
  width: 100%;
  height: 50%;
  background-color: var(--secondaryDarker);
  font-size: 2em;
  color: var(--secondaryLighter);
  display: flex;
  align-items: center;
  justify-content: center;
}
#gamePrep{
  width: 100%;
  height: 50%;
  background-color: var(--secondary);
  color: var(--secondaryLighter);
  font-size: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<script>
export default {
  name: 'GameHeader',
  props: {
    firstLine: { type: String, requiered: true },
    secondLine: { type: String, requiered: true }
  }

}
</script>
