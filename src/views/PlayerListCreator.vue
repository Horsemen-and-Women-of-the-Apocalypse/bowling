<template>
  <div id="PlayerListCreator">
    <div id="title">
      <h1>
        {{ $t("PlayerListCreator.title1_1") }}
        <span>{{ $t("PlayerListCreator.title1_2") }}</span> ?
      </h1>
      <h2>
        {{ $t("PlayerListCreator.title2") }}
      </h2>
    </div>
    <div id="playerList">
      <!-- Created player list -->
      <draggable v-model="players">
        <div
          class="player"
          v-for="(player, i) in players"
          :key="i"
          :id="'player_' + (i + 1)"
        >
          <div
            :class="'name ' + (newPlayerName === player.getName() ? 'red' : '')"
          >
            {{ player.getName() }}
          </div>
          <div class="removeBtn">
            <md-button
              v-on:click="removePlayer(i)"
              class="removePlayerBtn md-icon-button"
            >
              <md-icon>remove</md-icon>
            </md-button>
          </div>
        </div>
      </draggable>
      <!-- Add player line -->
      <form class="player add" @submit.prevent="">
        <div class="name">
          <input type="text" name="newPlayerName" v-model="newPlayerName" />
        </div>
        <div class="addBtn">
          <md-button
            type="submit"
            id="addPlayerBtn"
            @click="addPlayer"
            class="md-icon-button"
          >
            <md-icon>add</md-icon>
          </md-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Player from '../objets/player'

export default {
  name: 'PlayerListCreator',
  components: {
    draggable
  },
  data: () => ({
    newPlayerName: '',
    players: []
  }),
  methods: {
    addPlayer () {
      // Add a new player object to the player list
      if (
        this.newPlayerName.length > 0 &&
        this.players.find((p) => p.getName() === this.newPlayerName) ===
          undefined
      ) {
        // check for duplicates
        this.players.push(new Player(this.newPlayerName))
        this.newPlayerName = ''
      }
    },
    removePlayer (index) {
      // Remove a player from his index pos
      if (index >= 0 && index < this.players.length) { this.players.splice(index, 1) }
    },
    getPlayers () {
      // Method to get the player list
      return this.players
    }
  }
}
</script>

<style scoped>
#PlayerListCreator {
  background-color: #bfb35a;
  height: 100%;
}

/* Title */
#title {
  background-color: #bdbf5a;
  padding: 10px;
  text-align: left;
}
#title h1 {
  color: #8c2318;
  margin-bottom: 0px;
}
#title h1 span {
  color: #88a65e;
}
#title h2 {
  color: #8c2318;
  font-size: 1em;
  margin-top: 0px;
  font-weight: 100;
}

/* Players */
.player {
  padding: 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.player:nth-child(2n) {
  background-color: #bdbf5a;
}
.player .name {
  border-bottom: solid 3px #88a65e;
  margin-left: 4%;
  font-size: 1.5em;
}
.player .name.red {
  color: red;
  font-weight: bold;
}

.player.add {
  background-color: #f8d562;
}
.player.add input {
  border: 0;
  outline: 0;
  padding: 7px 0;
  background: transparent;
}

/* Buttons */
.md-button {
  background-color: #687555 !important;
}
.md-icon {
  color: white !important;
}
@media only screen and (max-device-width: 480px) {
  .turn {
    font-size: 1em;
  }
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* Chrome, Safari, Edge, Opera support */
  -webkit-appearance: none;
}

input[type="number"] {
  /* Firefox support */
  -moz-appearance: textfield;
}
</style>
