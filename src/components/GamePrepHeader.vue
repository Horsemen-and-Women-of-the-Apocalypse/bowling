<template>
  <div class="gameprepheader">
    <div id="title">{{ $t('gameprepheader.title')}}</div>
    <div id="gamePrep">{{ $t('gameprepheader.prep')}}</div>
  </div>
</template>

<style scoped>
.gameprepheader {
  height: 100%;
}
#title{
  width: 100%;
  height: 50%;
  background-color: var(--knoll);
  font-size: 2em;
  color: var(--cantaloupeSkin);
  display: flex;
  align-items: center;
  justify-content: center;
}
#gamePrep{
  width: 100%;
  height: 50%;
  background-color: var(--hansWegner);
  color: var(--eames);
  font-size: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
