<template>
  <div id="app">
    <transition name="slide-fade">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<style>

#app {
  font-family: Raleway-Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: var(--darker);
  height: 100vh;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-enter {
  transform: translateX(-100vw);
  opacity: 0;
}

</style>

<script>

export default {
  name: 'App'
}
</script>
