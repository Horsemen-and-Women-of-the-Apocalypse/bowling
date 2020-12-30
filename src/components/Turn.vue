<template>
  <div class="turn">
    <div class='spacing md-alignment-center-center'>
      <h1 class='eames'>{{ $t('turn.title') }} <span class="hansWegner">{{$t('turn.turn')}}</span> :</h1>
    </div>
    <div class="md-layout md-alignment-center-center">
      <div class="md-layout-item">
        <md-button id='minus' v-on:click="minus" class="md-icon-button">
          <md-icon>remove</md-icon>
        </md-button>
      </div>
      <div class="md-layout-item">
        <md-field md-inline>
          <md-input v-model="count" type="number" name="turnCount" @blur="updateTurn($event)">{{count}}</md-input>
        </md-field>
      </div>
      <div class="md-layout-item">
        <md-button id='add' v-on:click="add" class="md-icon-button">
        <md-icon>add</md-icon>
      </md-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
.turn {
  background-color: #BFB35A;
  height: 100%;
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

export default {
  name: 'Turn',
  data: () => ({
    count: 10
  }),
  computed: {
    turnCount () { // Method to get turnCount
      return this.count
    }
  },
  methods: {
    updateTurn: function (e) { // Update turn count if negative
      const value = parseInt(e.target.value)
      if (value < 1) {
        this.count = 1
      } else {
        this.count = value
      }
    },
    add: function (e) { // Add 1 to number of count
      this.count++
    },
    minus: function (e) { // Remove 1 to number of count
      if (this.count > 1) {
        this.count--
      }
    }
  }
}

</script>
