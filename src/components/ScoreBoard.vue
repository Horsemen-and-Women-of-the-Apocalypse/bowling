<template>
  <div id="ScoreBoard">
    <!-- Players col -->
    <div id="playerNames">
      <div id="curentTurnNumber">{{ curentTurn }}</div>
      <div class="player" v-for="(player, i) in game.getPlayers()" :key="i">
        <div class="turnNumber">
          {{ i + 1 }}
        </div>
        <div class="name">
          {{ player.getName() }}
        </div>
      </div>
    </div>

    <!-- Score col -->
    <div id="scores">
      <div id="title">
        <div class="turnNumber" v-for="turn in game.getTurn()" :key="turn">
          {{ turn }}
        </div>
      </div>
      <div id="players">
        <div class="player" v-for="(player, i) in game.getPlayers()" :key="i">
          <div class="score" v-for="turn in game.getTurn()" :key="turn">
          </div>
        </div>
      </div>
    </div>

    <!-- Total score col -->
    <div id="totalScores">
      <div id="title"><b>TOTAL</b></div>
      <div class="score" v-for="(player, i) in game.getPlayers()" :key="i">
        265
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreBoard',
  props: {
    game: { type: Object, requiered: true }
  },
  data () {
    return {
      curentTurn: 5
    }
  }
}
</script>

<style>
#ScoreBoard {
  /* Variable */
  --headerHeigth: 40px;

  --cellWidth: 60px;
  --cellHeigth: 60px;

  display: flex;
  align-items: flex-start;
  height: 100%;
  overflow-y: auto;

  border: solid black 1px;
  font-size: 20px;
}

/* player Names */
#playerNames {
  max-width: 200px;
}
#playerNames #curentTurnNumber {
  height: var(--headerHeigth);
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  background: lightgray;
  font-weight: bold;
  font-size: 30px;
  border: solid black 1px;
}
#playerNames .player {
  height: var(--cellHeigth);
  display: flex;
}
#playerNames .player .turnNumber {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  font-weight: bold;
  background: lightgray;
  border: solid black 1px;
}
#playerNames .player .name {
  flex: 1;
  display: flex;
  align-items: center;

  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  /* TODO animate long names */

  border: solid black 1px;
  padding: 5px;
}

/* Scores */
#scores {
  flex: 1;
  overflow-x: auto;
}
#scores #title {
  display: flex;
}
#scores #title .turnNumber {
  min-width: var(--cellWidth);
  height: var(--headerHeigth);
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  border: solid black 1px;
  border-left:none;
  background: lightgray;
}
#scores #players .player {
  height: var(--cellHeigth);
  flex: 1;
  display: flex;
}
#scores #players .player .score{
  height: var(--cellHeigth);
  min-width: var(--cellWidth);
  border: solid black 1px;
  border-left:none;
}

/* Total scores */
#totalScores {
  width: 70px;
  background: lightgray;
}
#totalScores #title {
  height: var(--headerHeigth);
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid black 1px;
}
#totalScores .score {
  height: var(--cellHeigth);
  display: flex;
  align-items: center;
  justify-content: center;

  border: solid black 1px;
  font-weight: bold;
}
</style>
