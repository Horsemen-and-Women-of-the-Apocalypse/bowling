<template>
  <div class="playerTurn">
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
          <h1 class='names'>{{ $t('playerTurn.first') }}</h1>
          <h1 class='names'>{{ $t('playerTurn.content') }}</h1>

          <!-- Input Layout -->
          <div class="md-layout md-alignment-center-center">
            <div class="md-layout-item">
              <md-button id='sub1' v-on:click="sub1" class="md-icon-button">
                <md-icon>remove</md-icon>
              </md-button>
            </div>
            <div class="md-layout-item">
              <md-field md-inline>
                <md-input v-model="count1" type="number" name="pinsFallen1" @blur="updatepinsFallen1($event)"/>
                {{count1}}
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-button id='add1' v-on:click="add1" class="md-icon-button">
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
          <h1 class='names'>{{ $t('playerTurn.second') }}</h1>
          <h1 class='names'>{{ $t('playerTurn.content') }}</h1>

          <!-- Input Layout -->
          <div class="md-layout md-alignment-center-center">
            <div class="md-layout-item">
              <md-button id='sub2' v-on:click="sub2" class="md-icon-button">
                <md-icon>remove</md-icon>
              </md-button>
            </div>
            <div class="md-layout-item">
              <md-field md-inline>
                <md-input v-model="count2" type="number" name="pinsFallen2" @blur="updatepinsFallen2($event)"/>
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-button id='add2' v-on:click="add2" class="md-icon-button">
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
.playerTurn {
  background-color: #BFB35A;
  height: 100%;
}
@media only screen and (max-device-width: 480px) {
  .playerTurn {
      font-size: 1em;
  }
}
input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { /* Chrome, Safari, Edge, Opera support */
  -webkit-appearance: none;
}

input[type=number] { /* Firefox support */
  -moz-appearance: textfield;
}

.md-steppers {
  background-color: #bfb35a !important;
  height: 90vh;
}

.md-stepper {
  padding-left: 0px;
  padding-right: 0px;
}
</style>

<script>

export default {
  name: 'PlayerTurn',
  data: () => ({
    count1: 0,
    count2: 0,
    maxPinsSecondThrow: 0,
    active: 'first',
    first: false,
    second: false
  }),
  props: {
    totalPins: { type: Number, required: true }
  },
  created () {
    this.maxPinsSecondThrow = this.totalPins
  },
  computed: {
    pinsFallen1 () { // Method to get the number of pins fallen during the first throw
      return this.count1
    },
    pinsFallen2 () { // Method to get the number of pins fallen during the second throw
      return this.count2
    },
    test () {
      return parseInt(this.count1)
    }
  },
  watch: {
    count1 () {
      if (isNaN(this.count1)) {
        this.count1 = this.totalPins
      }
      this.maxPinsSecondThrow = this.totalPins - this.count1
    },
    count2 () {
      if (isNaN(this.count2)) {
        this.count2 = this.maxPinsSecondThrow
      }
    }
  },
  methods: {
    updatepinsFallen1: function (e) { // Update pins count1 if value >= 0
      if (this.count1 < 0 || this.count1 > this.totalPins) {
        this.count1 = this.totalPins
      }
    },
    updatepinsFallen2: function (e) { // Update pins count2 if value >= 0
      if (this.count2 < 0 || this.count2 > this.maxPinsSecondThrow) {
        this.count2 = this.maxPinsSecondThrow
      }
    },
    add1: function (e) { // Add 1 to number of pins fallen on the first throw
      if (this.count1 < this.totalPins) {
        this.count1++
      }
    },
    sub1: function (e) { // Remove 1 to number of pins fallen on the first throw
      if (this.count1 > 0) {
        this.count1--
      }
    },
    add2: function (e) { // Add 1 to number of pins fallen on the second throw
      if (this.count2 < this.maxPinsSecondThrow) {
        this.count2++
      }
    },
    sub2: function (e) { // Remove 1 to number of pins fallen on the second throw
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
    Reliez_moi_svp () {
      this.$emit('done')
    }
  }
}

</script>
