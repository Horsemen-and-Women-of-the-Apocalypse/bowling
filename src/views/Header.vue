<template>
  <div class="about">
    <div id="title">{{ $t('about.title')}}</div>
    <div id="gamePrep">{{ $t('about.prep')}}</div>
  </div>
</template>

<style scoped>
.about {
  height: 100%;
}
#title{
  width: 100%;
  height: 50%;
  background-color: #5E8C6A;
  font-size: 2em;
  color: #BFB35A;
  display: flex;
  align-items: center;
  justify-content: center;
}
#gamePrep{
  width: 100%;
  height: 50%;
  background-color: #88A65E;
  color: #8C2318;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
