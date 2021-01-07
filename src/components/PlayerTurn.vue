<template>
  <div id="playerTurn">
    <div class='spacing md-alignment-center-center'>
      <md-steppers
      :md-active-step.sync="active"
      md-linear
      md-alternative>

        <!-- First Throw -->
        <md-step
        id="first"
        :md-label="$t('playerTurn.first')"
        :md-done.sync="first"
        :md-editable="false">

          <!-- Title -->
          <h1 class='names'>{{ $t('playerTurn.content', { max :this.totalPins }) }}</h1>

          <!-- Input Layout -->
          <div class="md-layout md-alignment-center-center">
            <div class="md-layout-item md-size-25">
              <md-button id='decrementFirstThrow' v-on:click="decrementFirstThrow" class="md-icon-button md-raised md-primary">
                <md-icon>remove</md-icon>
              </md-button>
            </div>
            <div class="md-layout-item md-size-50">
              <md-field md-inline>
                <md-input v-model="count1" type="number" name="pinsFallen1" @blur="updateFirstCount($event)"/>
              </md-field>
            </div>
            <div class="md-layout-item md-size-25">
              <md-button id='incrementFirstThrow' v-on:click="incrementFirstThrow" class="md-icon-button md-raised md-primary">
                <md-icon>add</md-icon>
              </md-button>
            </div>
          </div>

          <!-- Valid Input and Next -->
          <md-button
          name="firstBtnValidate"
          class="md-raised md-primary"
          @click="setDone('first', 'second')"
          v-if="count1 != this.totalPins">
            {{ $t("playerTurn.continue") }}
          </md-button>
          <!-- Valid Input -->
          <md-button
          name="firstBtnValidate"
          class="md-raised md-primary"
          @click="Reliez_moi_svp()"
          v-else>
            {{ $t("playerTurn.validate") }}
          </md-button>
        </md-step>

        <!-- Second Throw -->
        <md-step
        id="second"
        :md-label="$t('playerTurn.second')"
        :md-done.sync="second"
        :md-editable="false">

          <!-- Title -->
          <h1 class='names'>{{ $t('playerTurn.content', { max :this.maxPinsSecondThrow }) }}</h1>

          <!-- Input Layout -->
          <div class="md-layout md-alignment-center-center">
            <div class="md-layout-item md-size-25">
              <md-button id='decrementSecondThrow' v-on:click="decrementSecondThrow" class="md-icon-button md-raised md-primary">
                <md-icon>remove</md-icon>
              </md-button>
            </div>
            <div class="md-layout-item md-size-50">
              <md-field md-inline>
                <md-input v-model="count2" type="number" name="pinsFallen2" @blur="updateSecondCount($event)"/>
              </md-field>
            </div>
            <div class="md-layout-item md-size-25">
              <md-button id='incrementSecondThrow' v-on:click="incrementSecondThrow" class="md-icon-button md-raised md-primary">
                <md-icon>add</md-icon>
              </md-button>
            </div>
          </div>

          <!-- Valid or Reset -->
          <div class="md-layout-item">
            <!-- Reset Component -->
            <md-button
            name="SecondBtnValidate"
            class="md-raised md-primary"
            @click="resetComponent()">
              {{ $t("playerTurn.reset") }}
            </md-button>

            <!-- Valid Input -->
            <md-button
            name="SecondBtnValidate"
            class="md-raised md-primary"
            @click="Reliez_moi_svp ()">
              {{ $t("playerTurn.validate") }}
            </md-button>
          </div>
        </md-step>

      </md-steppers>

    </div>
  </div>
</template>

<script>

export default {
  name: 'PlayerTurn',
  data: () => ({
    count1: 0,
    count2: 0,
    active: 'first',
    first: false,
    second: false
  }),
  props: {
    totalPins: { type: Number, required: true }
  },
  computed: {
    pinsFallen1 () { // Method to get the number of pins fallen during the first throw
      return this.count1
    },
    pinsFallen2 () { // Method to get the number of pins fallen during the second throw
      return this.count2
    },
    maxPinsSecondThrow () {
      return this.totalPins - this.count1
    }
  },
  watch: {
    count1 () {
      if (isNaN(this.count1)) {
        this.count1 = 0
      }
      this.count2 = 0
    },
    count2 () {
      if (isNaN(this.count2)) {
        this.count2 = 0
      }
    }
  },
  methods: {
    updateFirstCount: function (e) { // Update pins count1 if value >= 0
      const value = parseInt(e.target.value)
      this.count1 = value
      if (this.count1 < 0 || this.count1 > this.totalPins) {
        this.count1 = this.totalPins
      }
    },
    updateSecondCount: function (e) { // Update pins count2 if value >= 0
      const value = parseInt(e.target.value)
      this.count2 = value
      if (this.count2 < 0 || this.count2 > this.maxPinsSecondThrow) {
        this.count2 = this.maxPinsSecondThrow
      }
    },
    incrementFirstThrow: function (e) { // Add 1 to number of pins fallen on the first throw
      if (this.count1 < this.totalPins) {
        this.count1++
      }
    },
    decrementFirstThrow: function (e) { // Remove 1 to number of pins fallen on the first throw
      if (this.count1 > 0) {
        this.count1--
      }
    },
    incrementSecondThrow: function (e) { // Add 1 to number of pins fallen on the second throw
      if (this.count2 < this.maxPinsSecondThrow) {
        this.count2++
      }
    },
    decrementSecondThrow: function (e) { // Remove 1 to number of pins fallen on the second throw
      if (this.count2 > 0) {
        this.count2--
      }
    },
    setDone (id, index) {
      this[id] = true

      if (index) {
        this.active = index
      }
    },
    resetComponent () {
      this.active = 'first'
      this.second = false
      this.count2 = 0
    },
    // TODO
    Reliez_moi_svp () {
      this.$emit('done')
    }
  }
}
</script>

<style scoped>
#playerTurn {
  height: 100%;
}
.md-steppers {
  height: 100%;
  background-color: var(--darker) !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* Chrome, Safari, Edge, Opera support */
  -webkit-appearance: none;
}
.md-field {
  white-space: nowrap;
}
input[type="number"] {
  /* Firefox support */
  -moz-appearance: textfield;
}
@media only screen and (max-device-width: 480px) {
  #LastPlayerTurn {
    font-size: 1em;
  }
}
</style>
