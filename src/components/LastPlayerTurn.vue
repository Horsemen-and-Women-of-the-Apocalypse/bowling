<template>
  <div id="LastPlayerTurn" class="spacing md-alignment-center-center">
    <md-steppers :md-active-step.sync="active" md-linear md-alternative>
      <!-- First Throw -->
      <md-step
        id="first"
        :md-label="$t('lastPlayerTurn.first')"
        :md-done.sync="first"
        :md-editable="false"
      >
        <!-- Title -->
        <h1 class="pageTitle">{{ $t("lastPlayerTurn.first") }}</h1>
        <h2 class="inputTitle">{{ $t("lastPlayerTurn.inputTitle") }}</h2>

        <!-- Input Layout -->
        <div class="md-layout md-alignment-center-center">
          <div class="md-layout-item">
            <md-button
              id="subFirstThrow"
              v-on:click="subFirstThrow"
              class="md-icon-button md-raised md-primary"
            >
              <md-icon>remove</md-icon>
            </md-button>
          </div>
          <div class="md-layout-item">
            <md-field md-inline>
              <md-input
                v-model="count1"
                type="number"
                name="pinsFallen1"
                v-on:keypress="isNumber"
                :min="0"
                :max="totalPins"
              />
              / {{ totalPins }}
            </md-field>
          </div>
          <div class="md-layout-item">
            <md-button
              id="addFirstThrow"
              v-on:click="addFirstThrow"
              class="md-icon-button md-raised md-primary"
            >
              <md-icon>add</md-icon>
            </md-button>
          </div>
        </div>

        <!-- Valid Input -->
        <md-button
          name="firstBtnValidate"
          class="md-raised md-primary"
          @click="validateFirst"
          :disabled="count1 > totalPins"
        >
          {{ $t("lastPlayerTurn.continue") }}
        </md-button>
      </md-step>

      <!-- Second Throw -->
      <md-step
        id="second"
        :md-label="$t('lastPlayerTurn.second')"
        :md-done.sync="second"
        :md-editable="false"
      >
        <!-- Title -->
        <h1 class="pageTitle">{{ $t("lastPlayerTurn.second") }}</h1>
        <h2 class="inputTitle">{{ $t("lastPlayerTurn.inputTitle") }}</h2>

        <!-- Input Layout -->
        <div class="md-layout md-alignment-center-center">
          <div class="md-layout-item">
            <md-button
              id="subSecondThrow"
              v-on:click="subSecondThrow"
              class="md-icon-button md-raised md-primary"
            >
              <md-icon>remove</md-icon>
            </md-button>
          </div>
          <div class="md-layout-item">
            <md-field md-inline>
              <md-input
                v-model="count2"
                type="number"
                name="pinsFallen2"
                v-on:keypress="isNumber"
                :min="0"
                :max="maxPinsSecondThrow"
              />
              / {{ maxPinsSecondThrow }}
            </md-field>
          </div>
          <div class="md-layout-item">
            <md-button
              id="addSecondThrow"
              v-on:click="addSecondThrow"
              class="md-icon-button md-raised md-primary"
            >
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
            @click="backSecond()"
          >
            {{ $t("lastPlayerTurn.reset") }}
          </md-button>

          <!-- Valid Input -->
          <md-button
            v-if="
              isFirstThrowStrike || isSecondThrowSpare || isSecondThrowStrike
            "
            name="SecondBtnValidate"
            class="md-raised md-primary"
            @click="validateSecond()"
            :disabled="count2 > maxPinsSecondThrow"
          >
            {{ $t("lastPlayerTurn.continue") }}
          </md-button>
          <md-button
            v-else
            name="SecondBtnValidate"
            class="terminate md-raised md-primary"
            @click="terminate()"
            :disabled="count2 > maxPinsSecondThrow"
          >
            {{ $t("lastPlayerTurn.validate") }}
          </md-button>
        </div>
      </md-step>

      <!-- Third Throw -->
      <md-step
        id="third"
        :md-label="$t('lastPlayerTurn.third')"
        :md-done.sync="third"
        :md-editable="false"
      >
        <!-- Title -->
        <h1 class="pageTitle">{{ $t("lastPlayerTurn.third") }}</h1>
        <h2 class="inputTitle">{{ $t("lastPlayerTurn.inputTitle") }}</h2>

        <!-- Input Layout -->
        <div class="md-layout md-alignment-center-center">
          <div class="md-layout-item">
            <md-button
              id="subThirdThrow"
              v-on:click="subThirdThrow"
              class="md-icon-button md-raised md-primary"
            >
              <md-icon>remove</md-icon>
            </md-button>
          </div>
          <div class="md-layout-item">
            <md-field md-inline>
              <md-input
                v-model="count3"
                type="number"
                name="pinsFallen2"
                v-on:keypress="isNumber"
                :min="0"
                :max="maxPinsThirdThrow"
              />
              / {{ maxPinsThirdThrow }}
            </md-field>
          </div>
          <div class="md-layout-item">
            <md-button
              id="addThirdThrow"
              v-on:click="addThirdThrow"
              class="md-icon-button md-raised md-primary"
            >
              <md-icon>add</md-icon>
            </md-button>
          </div>
        </div>

        <!-- Valid or Reset -->
        <div class="md-layout-item">
          <!-- Reset Component -->
          <md-button
            name="thirdBtnValidate"
            class="md-raised md-primary"
            @click="backThird()"
          >
            {{ $t("lastPlayerTurn.reset") }}
          </md-button>

          <!-- Valid Input -->
          <md-button
            name="thirdBtnValidate"
            class="terminate md-raised md-primary"
            @click="terminate()"
            :disabled="count3 > maxPinsThirdThrow"
          >
            {{ $t("lastPlayerTurn.validate") }}
          </md-button>
        </div>
      </md-step>
    </md-steppers>
  </div>
</template>

<script>
export default {
  name: 'PlayerTurn',
  data: () => ({
    count1: 0,
    count2: 0,
    count3: 0,

    // Steppers
    active: 'first',
    first: false,
    second: false,
    third: false
  }),
  props: {
    totalPins: { type: Number, required: true }
  },
  created () {},
  computed: {
    isFirstThrowStrike () {
      return parseInt(this.count1) === this.totalPins
    },
    isSecondThrowStrike () {
      return parseInt(this.count2) === this.totalPins
    },
    isSecondThrowSpare () {
      return parseInt(this.count1) + parseInt(this.count2) === this.totalPins
    },
    maxPinsSecondThrow () {
      if (this.isFirstThrowStrike) return this.totalPins
      else return this.totalPins - parseInt(this.count1)
    },
    maxPinsThirdThrow () {
      if (this.isSecondThrowStrike || this.isSecondThrowSpare) { return this.totalPins }
      return 0
    }
  },
  methods: {
    isNumber (evt) {
      evt = evt || window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    // First throw
    addFirstThrow () {
      // Add 1 to number of pins fallen on the first throw
      if (this.count1 < this.totalPins) {
        this.count1++
      }
    },
    subFirstThrow () {
      // Remove 1 to number of pins fallen on the first throw
      if (this.count1 > 0) {
        this.count1--
      }
    },
    validateFirst () {
      this.active = 'second'
      this.first = true
    },

    // Second throw
    addSecondThrow () {
      // Add 1 to number of pins fallen on the second throw
      if (this.count2 < this.maxPinsSecondThrow) {
        this.count2++
      }
    },
    subSecondThrow () {
      // Remove 1 to number of pins fallen on the second throw
      if (this.count2 > 0) {
        this.count2--
      }
    },
    validateSecond () {
      this.active = 'third'
      this.second = true
    },
    backSecond () {
      this.active = 'first'
      this.second = false

      this.count2 = 0
    },

    // third throw
    addThirdThrow () {
      // Add 1 to number of pins fallen on the Third throw
      if (this.count3 < this.maxPinsThirdThrow) {
        this.count3++
      }
    },
    subThirdThrow () {
      // Remove 1 to number of pins fallen on the Third throw
      if (this.count3 > 0) {
        this.count3--
      }
    },
    backThird () {
      this.active = 'second'
      this.third = false

      this.count3 = 0
    },

    // terminate
    terminate () {
      this.$emit('done', {
        turn1: this.count1,
        turn2: this.count2,
        turn3: this.count3
      })
    }
  }
}
</script>

<style scoped>
#LastPlayerTurn {
  height: 100%;
}
.md-steppers {
  height: 100%;
  background-color: var(--darker) !important;
}
h1,
h2 {
  color: #8c2318;
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
button.terminate {
  background: var(--accent) !important;
}

@media only screen and (max-device-width: 480px) {
  #LastPlayerTurn {
    font-size: 1em;
  }
}
</style>
