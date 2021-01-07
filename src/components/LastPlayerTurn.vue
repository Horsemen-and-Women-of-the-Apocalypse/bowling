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
        <h2 class="inputTitle">{{ $t("lastPlayerTurn.inputTitle") }}</h2>
        <!-- Input Layout -->
        <div class="md-layout md-alignment-center-center">
          <div class="md-layout-item md-size-25">
            <md-button
              id="subFirstThrow"
              v-on:click="subFirstThrow"
              class="md-icon-button md-raised md-primary"
            >
              <md-icon>remove</md-icon>
            </md-button>
          </div>
          <div class="md-layout-item md-size-50">
            <md-field md-inline>
              <md-input
                v-model="count1"
                name="pinsFallen1"
                :min="0"
                :max="totalPins"
              />
            </md-field>
          </div>
          <div class="md-layout-item md-size-25">
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
          :disabled="count1 < 0 || count1 > totalPins"
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
        <h2 class="inputTitle">{{ $t("lastPlayerTurn.inputTitle") }}</h2>

        <!-- Input Layout -->
        <div class="md-layout md-alignment-center-center">
          <div class="md-layout-item md-size-25">
            <md-button
              id="subSecondThrow"
              v-on:click="subSecondThrow"
              class="md-icon-button md-raised md-primary"
            >
              <md-icon>remove</md-icon>
            </md-button>
          </div>
          <div class="md-layout-item md-size-50">
            <md-field md-inline>
              <md-input
                v-model="count2"
                type="number"
                name="pinsFallen2"
                :min="0"
                :max="maxPinsSecondThrow"
              />
            </md-field>
          </div>
          <div class="md-layout-item md-size-25">
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
            name="secondBtnBack"
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
            name="secondBtnValidate"
            class="md-raised md-primary"
            @click="validateSecond()"
            :disabled="count2 < 0 || count2 > maxPinsSecondThrow"
          >
            {{ $t("lastPlayerTurn.continue") }}
          </md-button>
          <md-button
            v-else
            name="secondBtnValidate"
            class="md-raised md-accent"
            @click="terminate()"
            :disabled="count2 < 0 || count2 > maxPinsSecondThrow"
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
        <h2 class="inputTitle">{{ $t("lastPlayerTurn.inputTitle") }}</h2>

        <!-- Input Layout -->
        <div class="md-layout md-alignment-center-center">
          <div class="md-layout-item md-size-25">
            <md-button
              id="subThirdThrow"
              v-on:click="subThirdThrow"
              class="md-icon-button md-raised md-primary"
            >
              <md-icon>remove</md-icon>
            </md-button>
          </div>
          <div class="md-layout-item md-size-50">
            <md-field md-inline>
              <md-input
                v-model="count3"
                type="number"
                name="pinsFallen3"
                :min="0"
                :max="maxPinsThirdThrow"
              />
            </md-field>
          </div>
          <div class="md-layout-item md-size-25">
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
            name="thirdBtnBack"
            class="md-raised md-primary"
            @click="backThird()"
          >
            {{ $t("lastPlayerTurn.reset") }}
          </md-button>

          <!-- Valid Input -->
          <md-button
            name="thirdBtnValidate"
            class="md-raised md-accent"
            @click="terminate()"
            :disabled="count3 < 0 || count3 > maxPinsThirdThrow"
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
  name: 'LastPlayerTurn',
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
      if (this.isSecondThrowStrike || this.isSecondThrowSpare) {
        return this.totalPins
      } else if (this.isFirstThrowStrike) {
        return this.totalPins - parseInt(this.count2)
      }
      return 0
    }
  },
  methods: {
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
      if (Number.isInteger(parseInt(this.count1))) {
        this.active = 'second'
        this.first = true
      }
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
      if (Number.isInteger(parseInt(this.count2))) {
        this.active = 'third'
        this.second = true
      }
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
      if (
        Number.isInteger(parseInt(this.count1)) &&
        Number.isInteger(parseInt(this.count2)) &&
        Number.isInteger(parseInt(this.count3))
      ) {
        this.$emit('done', {
          throw1: parseInt(this.count1),
          throw2: parseInt(this.count2),
          throw3: parseInt(this.count3)
        })
      }
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
  color: var(--primary);
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
