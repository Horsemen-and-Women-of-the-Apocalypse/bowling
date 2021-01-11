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
              <md-button id='subFirstThrow' v-on:click="subFirstThrow" class="md-icon-button md-raised md-primary">
                <md-icon>remove</md-icon>
              </md-button>
            </div>
            <div class="md-layout-item md-size-50">
              <md-field md-inline>
                <md-input v-model="firstThrow" type="number" name="pinsFallen1" @blur="updateFirstThrow($event)"/>
              </md-field>
            </div>
            <div class="md-layout-item md-size-25">
              <md-button id='addFirstThrow' v-on:click="addFirstThrow" class="md-icon-button md-raised md-primary">
                <md-icon>add</md-icon>
              </md-button>
            </div>
          </div>

          <!-- Valid Input and Next -->
          <md-button
          name="BtnNext"
          class="md-raised md-primary"
          @click="setDone('first', 'second')"
          v-if="firstThrow != this.totalPins">
            {{ $t("playerTurn.continue") }}
          </md-button>
          <!-- Valid Input -->
          <md-button
          name="firstBtnValidate"
          class="md-raised md-accent"
          @click="terminate(1)"
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
              <md-button id='subSecondThrow' v-on:click="subSecondThrow" class="md-icon-button md-raised md-primary">
                <md-icon>remove</md-icon>
              </md-button>
            </div>
            <div class="md-layout-item md-size-50">
              <md-field md-inline>
                <md-input v-model="secondThrow" type="number" name="pinsFallen2" @blur="updateSecondThrow($event)"/>
              </md-field>
            </div>
            <div class="md-layout-item md-size-25">
              <md-button id='addSecondThrow' v-on:click="addSecondThrow" class="md-icon-button md-raised md-primary">
                <md-icon>add</md-icon>
              </md-button>
            </div>
          </div>

          <!-- Valid or Reset -->
          <div class="md-layout-item">
            <!-- Reset Component -->
            <md-button
            name="BtnCancel"
            class="md-raised md-primary"
            @click="resetComponent()">
              {{ $t("playerTurn.reset") }}
            </md-button>

            <!-- Valid Input -->
            <md-button
            name="secondBtnValidate"
            class="md-raised md-accent"
            @click="terminate(2)">
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
    firstThrow: 0,
    secondThrow: 0,
    active: 'first',
    first: false,
    second: false
  }),
  props: {
    totalPins: { type: Number, required: true }
  },
  computed: {
    maxPinsSecondThrow () {
      return this.totalPins - this.firstThrow
    }
  },
  watch: {
    firstThrow () {
      if (isNaN(this.firstThrow)) {
        this.firstThrow = 0
      }
    },
    secondThrow () {
      if (isNaN(this.secondThrow)) {
        this.secondThrow = 0
      }
    }
  },
  methods: {
    updateFirstThrow: function (e) { // Update pins firstThrow if value >= 0
      const value = parseInt(e.target.value)
      this.firstThrow = value
      if (this.firstThrow < 0 || this.firstThrow > this.totalPins) {
        this.firstThrow = this.totalPins
      }
    },
    updateSecondThrow: function (e) { // Update pins secondThrow if value >= 0
      const value = parseInt(e.target.value)
      this.secondThrow = value
      if (this.secondThrow < 0 || this.secondThrow > this.maxPinsSecondThrow) {
        this.secondThrow = this.maxPinsSecondThrow
      }
    },
    addFirstThrow: function (e) { // Add 1 to number of pins fallen on the first throw
      if (this.firstThrow < this.totalPins) {
        this.firstThrow++
      }
    },
    subFirstThrow: function (e) { // Remove 1 to number of pins fallen on the first throw
      if (this.firstThrow > 0) {
        this.firstThrow--
      }
    },
    addSecondThrow: function (e) { // Add 1 to number of pins fallen on the second throw
      if (this.secondThrow < this.maxPinsSecondThrow) {
        this.secondThrow++
      }
    },
    subSecondThrow: function (e) { // Remove 1 to number of pins fallen on the second throw
      if (this.secondThrow > 0) {
        this.secondThrow--
      }
    },
    setDone (id, index) {
      this[id] = true
      this.active = index
    },
    resetComponent () {
      this.active = 'first'
      this.second = false
      this.secondThrow = 0
    },
    terminate (nbThrow) {
      if (nbThrow === 2) {
        this.$emit('done', { throw1: parseInt(this.firstThrow), throw2: parseInt(this.secondThrow) })
      } else {
        this.$emit('done', { throw1: parseInt(this.firstThrow), throw2: undefined })
      }
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
