<template>
  <div class="turn">
    <h1>{{ $t('turn.title') }} {{$t('turn.turn')}} :</h1>
    <div class="md-layout">
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
