<template>
  <div id="app">
    <div id="nav">
      <Header/>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  height: 10vh;
}

#app {
  height: 90vh;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>

import Header from './views/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>
