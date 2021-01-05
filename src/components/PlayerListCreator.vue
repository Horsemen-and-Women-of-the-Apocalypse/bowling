<template>
  <div id="PlayerListCreator">
    <div id="title">
      <h1>
        {{ $t("playerListCreator.title1_1") }}
        <span>{{ $t("playerListCreator.title1_2") }}</span> ?
      </h1>
      <h2>
        {{ $t("playerListCreator.title2") }}
      </h2>
    </div>
    <div id="playerList">
      <!-- Created player list -->
      <draggable
        v-model="players"
        handle=".draggable"
        ghostClass="ghost"
        animation=200
      >
        <div
          class="player"
          v-for="(player, i) in players"
          :key="i"
          :id="'player_' + (i + 1)"
        >
          <div
          class="draggable"
          >
            <md-icon class="dragIcon">drag_indicator </md-icon>
            <div
              :class="'name ' + (newPlayerName === player.getName() ? 'red' : '')"
            >
              {{ i + 1 + " : " + player.getName() }}
            </div>
          </div>
          <div class="removeBtn">
            <md-button
              v-on:click="removePlayer(i)"
              class="removePlayerBtn md-icon-button md-raised md-primary"
            >
              <md-icon>remove</md-icon>
            </md-button>
          </div>
        </div>
      </draggable>
      <!-- Add player line -->
      <form class="player add" @submit.prevent="">
        <md-field class="name">
          <md-input type="text" name="newPlayerName" v-model="newPlayerName"></md-input>
        </md-field>
        <div class="addBtn">
          <md-button
            type="submit"
            id="addPlayerBtn"
            @click="addPlayer"
            class="md-icon-button md-raised md-primary"
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
        this.newPlayerName.length > 0 && this.newPlayerName.length < 28 &&
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
      if (index >= 0 && index < this.players.length) {
        this.players.splice(index, 1)
      }
    },
    getPlayers () {
      // Method to get the player list
      return this.players
    }
  },
  watch: {
    players () {
      this.$emit('playerListChange', this.players)
    }
  }
}
</script>

<style scoped>
#PlayerListCreator {
  height: 100%;
}

/* Title */
#title {
  padding: 10px;
  text-align: left;
}
#title h1 {
  color: var(--eames);
  margin-bottom: 0px;
}
#title h1 span {
  color: var(--hansWenger);
}
#title h2 {
  color: var(--eames);
  font-size: 1em;
  margin-top: 0px;
  font-weight: 100;
}

.ghost {
  opacity: 0;
}

/* Player */
.player {
  padding: 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.player:nth-child(n) {
  background-color: var(--playerListLight);
}
.player:nth-child(2n) {
  background-color: var(--playerListDark);
}

.player .draggable {
  cursor: move;
  display: flex;
  overflow: hidden;
  flex:1;
}
.player .dragIcon {
  color: var(--knoll) !important;
}
.player .name {
  flex:1;
  margin-left: 4%;
  user-select: none;

  /* Text: */
  text-align: left;
  font-size: 1.5em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.player .name.red {
  color: red;
  font-weight: bold;
}
.player.add {
  background-color: var(--vernerPanton);
}

/* Buttons */

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* Chrome, Safari, Edge, Opera support */
  -webkit-appearance: none;
}
</style>
