<template>
  <div class="turn">
    <div class='spacing md-alignment-center-center'>
      <h1 class='eames'>{{ $t('turn.title') }} <span class="hansWegner">{{$t('turn.turn')}}</span> :</h1>
    </div>
    <div class="md-layout md-alignment-center-center">
      <div class="md-layout-item">
        <md-button v-on:click="minus" class="md-icon-button">
          <md-icon>-</md-icon>
        </md-button>
      </div>
      <div class="md-layout-item">
        <md-field md-inline>
          <md-input :value="turnCount" type="number" name="turnCount">{{turnCount}}</md-input>
        </md-field>
      </div>
      <div class="md-layout-item">
        <md-button v-on:click="add" class="md-icon-button">
        <md-icon>+</md-icon>
      </md-button>
      </div>
    </div>
  </div>
</template>

<style>
.eames {
  color: #8C2318;
}
.spacing {
  padding-top: 5%;
}
.hansWegner {
  color: #88A65E;
}
.md-button {
  background-color: #88A65E !important;
}
.md-icon {
  color: white !important;
}
.md-layout {
  padding-top: 20%;
}
.turn {
  background-color: #BFB35A;
  height: 100%;
  font-size: 2em;
}
@media only screen and (max-device-width: 480px) {
  .turn {
      font-size: 1em;
  }
}
input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { /* Chrome, Safari, Edge, Opera support */
  -webkit-appearance: none;
}

input[type=number] { /* Firefox support */
  -moz-appearance: textfield;
}
</style>

<script>
import Vue from 'vue'

const turn = Vue.observable({ count: 1 }) // Global access to number of turn

export default {
  name: 'Turn',
  computed: {
    turnCount () { // Method to get turnCount
      return this.$turn.count
    }
  },
  methods: {
    add: function (e) { // Add 1 to number of count
      turn.count++
    },
    minus: function (e) { // Remove 1 to number of count
      if (turn.count > 1) {
        turn.count--
      }
    }
  }
}

Vue.prototype.$turn = turn

</script>
