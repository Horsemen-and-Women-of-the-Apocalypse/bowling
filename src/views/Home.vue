<template>
  <div class="home">
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" :md-label="$t('home.turn')"  :md-done.sync="first">
        <Turn/>
        <md-button class="md-raised md-primary" @click="setDone('first', 'second')">{{ $t("home.continue")}}</md-button>
      </md-step>

      <md-step id="second" :md-label="$t('home.pins')" :md-done.sync="second">
        <Pins/>
        <md-button class="md-raised md-primary" @click="setDone('second', 'third')">{{ $t("home.continue")}}</md-button>
      </md-step>

      <md-step id="third" :md-label="$t('home.players')" :md-done.sync="third">
        <Players/>
        <md-button class="md-raised md-primary" @click="setDone('third')">{{ $t("home.play")}}</md-button>
      </md-step>
    </md-steppers>
  </div>
</template>

<style scoped>
  .home {
    margin:0px;
    height:100%;
  }
  .md-steppers {
    background-color: #BFB35A !important;
    min-height: 100%;
  }
  .md-stepper {
    padding-left: 0px;
    padding-right: 0px;
  }
</style>

<script>

import Turn from '../components/Turn'
import Pins from '../components/Pins'
import Players from '../components/PlayerListCreator'

export default {
  name: 'Home',
  components: {
    Turn,
    Pins,
    Players
  },
  data: () => ({
    active: 'first',
    first: false,
    second: false,
    third: false
  }),
  methods: {
    setDone (id, index) {
      this[id] = true

      if (index) {
        this.active = index
      }
    }
  }
}
</script>
