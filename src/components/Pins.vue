<template>
  <div class="pins">
    <div class='spacing md-alignment-center-center'>
      <h1 class='names'>{{ $t('pins.title') }} <span class="hansWegner">{{$t('pins.pins')}}</span> :</h1>
    </div>
    <div class="md-layout md-alignment-center-center">
      <div class="md-layout-item">
        <md-button id='sub' v-on:click="sub" class="md-icon-button">
          <md-icon>remove</md-icon>
        </md-button>
      </div>
      <div class="md-layout-item">
        <md-field md-inline>
          <md-input v-model="count" type="number" name="pinsCount" @blur="updatePinsCount($event)">{{count}}</md-input>
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
.names {
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
.pins {
  background-color: #BFB35A;
  height: 100%;
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

export default {
  name: 'Pins',
  data: () => ({
    count: 10
  }),
  computed: {
    pinsCount () { // Method to get the number of pins
      return this.count
    }
  },
  watch: {
    count () {
      if (isNaN(this.count)) {
        this.count = 10
      }
    }
  },
  methods: {
    updatePinsCount: function (e) { // Update pins count if value >= 1
      const value = parseInt(e.target.value)
      if (value <= 1) {
        this.count = 10
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
