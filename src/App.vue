<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

@font-face {
  font-family: "SpicyRice-Regular";
  src: url("./assets/font/SpicyRice-Regular.ttf");
}

@font-face {
  font-family: "Raleway-Regular";
  src: url("./assets/font/Raleway-Regular.ttf");
}

@font-face {
  font-family: "Raleway-Bold";
  src: url("./assets/font/Raleway-Bold.ttf");
}

@font-face {
  font-family: "Raleway-ExtraBold";
  src: url("./assets/font/Raleway-ExtraBold.ttf");
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-family: Raleway-Regular;
  background-color: var(--cantaloupeSkin);
}

.spicyRice {
  font-family: SpicyRice-Regular;
}

.ralewayRegular {
  font-family: SpicyRice-Regular;
}

.ralewayBold {
  font-family: SpicyRice-Regular;
}

.ralewayExtraBold {
  font-family: SpicyRice-Regular;
}

#app {
  height: 100vh;
}
</style>

<script>

export default {
  name: 'App'
}
</script>
