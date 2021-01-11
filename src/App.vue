<template>
  <div id="app">
    <transition>
      <router-view/>
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

</style>

<script>

export default {
  name: 'App'
}
</script>
