<template>
  <div class="pins">
    <div class='spacing md-alignment-center-center'>
      <h1 class='names'>{{ $t('pins.title') }} <span>{{$t('pins.pins')}}</span> :</h1>
    </div>
    <div class="md-layout md-alignment-center-center">
      <div class="md-layout-item">
        <md-button id='sub' v-on:click="sub" class="md-icon-button md-raised md-primary">
          <md-icon>remove</md-icon>
        </md-button>
      </div>
      <div class="md-layout-item">
        <md-field md-inline>
          <md-input v-model="count" type="number" name="pinsCount" @blur="updatePinsCount($event)">{{count}}</md-input>
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

.pins {
  height: 100%;
}

.spacing {
  padding-top: 5%;
}

@media only screen and (max-device-width: 480px) {
  .pins {
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

const defaultNbPins = 10

export default {
  name: 'Pins',
  data: () => ({
    count: defaultNbPins
  }),
  computed: {
    pinsCount () { // Method to get the number of pins
      return this.count
    }
  },
  watch: {
    count () {
      if (isNaN(this.count)) {
        this.count = defaultNbPins
      }
    }
  },
  methods: {
    updatePinsCount: function (e) { // Update pins count if value >= 1
      const value = parseInt(e.target.value)
      if (value <= 1) {
        this.count = defaultNbPins
      } else {
        this.count = value
      }
    },
    add: function (e) { // Add 1 to number of pins
      this.count++
    },
    sub: function (e) { // Remove 1 to number of pins
      if (this.count > 1) {
        this.count--
      }
    }
  }
}

</script>
