<template>
  <div class="turn">
    <div class='spacing md-alignment-center-center'>
      <h1 class='eames'>{{ $t('turn.title') }} <span class="hansWegner">{{$t('turn.turn')}}</span> :</h1>
    </div>
    <div class="md-layout md-alignment-center-center">
      <div class="md-layout-item">
        <md-button id='minus' v-on:click="minus" class="md-icon-button md-raised md-primary">
          <md-icon>remove</md-icon>
        </md-button>
      </div>
      <div class="md-layout-item">
        <md-field md-inline>
          <md-input v-model="count" type="number" name="turnCount" @blur="updateTurn($event)">{{count}}</md-input>
        </md-field>
      </div>
      <div class="md-layout-item">
        <md-button id='add' v-on:click="add" class="md-icon-button md-raised md-primary">
          <md-icon>add</md-icon>
        </md-button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.eames {
  color: var(--eames);
}
.spacing {
  padding-top: 5%;
}
.hansWegner {
  color: var(--hansWegner);
}

.turn {
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

const defaultNbTurn = 10

export default {
  name: 'Turn',
  data: () => ({
    count: defaultNbTurn
  }),
  computed: {
    turnCount () { // Method to get turnCount
      return this.count
    }
  },
  watch: {
    count () {
      if (isNaN(this.count)) {
        this.count = defaultNbTurn
      }
    }
  },
  methods: {
    updateTurn: function (e) { // Update turn count if negative
      const value = parseInt(e.target.value)
      if (value < 1) {
        this.count = defaultNbTurn
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
