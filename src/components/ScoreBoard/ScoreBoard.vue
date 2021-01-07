<template>
  <div id="ScoreBoard">
    <!-- Players col -->
    <div id="playerNames">
      <div id="currentTurnNumber" />
      <div
        v-for="(player, i) in score.getPlayers()"
        :key="i"
        :class="
          'player ' + (player.getName() === currentPlayer ? 'current' : '')
        "
        :title="player.getName()"
      >
        <div class="turnNumber">
          {{ i + 1 }}
        </div>
        <div class="name">
          <span>
            {{ player.getName() }}
          </span>
        </div>
      </div>
    </div>

    <!-- Score col -->
    <div id="scores">
      <div id="title">
        <div
          v-for="turn in score.getTurn()"
          :key="turn"
          :class="'turnNumber ' + (turn === currentTurn ? 'current' : '')"
        >
          {{ turn }}
        </div>
      </div>
      <div id="players">
        <div class="player" v-for="(player, i) in score.getPlayers()" :key="i">
          <Score
            v-for="(turn, j) in score.getTurn()"
            :key="turn"
            :game="score.getGameParam()"
            :last="j === score.getTurn() - 1"
            :score="score.getScore(player.getName(),j)"
            :turn="i"
            :class="'score ' + (j === currentTurn - 1 ? 'current' : '')"
          />
        </div>
      </div>
    </div>

    <!-- Total score col -->
    <div id="totalScores">
      <div id="title">
        <b>{{ $t("scoreBoard.total") }}</b>
      </div>
      <div
        class="score"
        v-for="(player, i) in score.getPlayers()"
        :key="i"
      ></div>
    </div>
  </div>
</template>

<script>
import Score from './Score'

export default {
  components: { Score },
  name: 'ScoreBoard',
  props: {
    score: { type: Object, requiered: true },
    currentPlayer: { type: String, default: null },
    currentTurn: { type: Number, default: null }
  }
}
</script>

<style scoped>
#ScoreBoard {
  /* Variable */
  --headerHeigth: 40px;

  --cellWidth: 60px;
  --cellHeigth: 60px;

  display: flex;
  align-items: flex-start;
  overflow-y: auto;

  border: solid white 1px;
  font-size: 1.5em;
  height: 100%;
  width: 100%;
}

/* player Names */
#playerNames {
  max-width: 40%;
}
#playerNames #currentTurnNumber {
  height: var(--headerHeigth);

  background: var(--secondaryDarker);
  border: solid white 1px;
}
#playerNames .player {
  height: var(--cellHeigth);
  display: flex;
  background: var(--darker);
}
#playerNames .player:nth-child(odd) {
  background: var(--dark);
}

#playerNames .player .turnNumber {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 25px;
  font-weight: bold;
  background: var(--secondaryDarker);
  border: solid white 1px;
  color: var(--accent);
}
#playerNames .player:nth-child(odd) .turnNumber {
  background: var(--secondary);
}
#playerNames .player.current .turnNumber {
  background: var(--accent);
  color: black;
}
#playerNames .player .name {
  flex: 1;
  display: flex;
  align-items: center;

  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  user-select: none;
  border: solid white 1px;
  padding: 5px;
}
#playerNames .player.current .name {
  background: var(--primary);
}
/* Scores */
#scores {
  flex: 1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; /* on laisse le défilement se poursuivre */
  background: var(--darker);
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
  background: var(--secondaryDarker);
  border: solid white 1px;
  border-left: none;
}
#scores #title .turnNumber.current {
  background: var(--accent);
}
#scores #players {
  flex: 1;
}
#scores #players .player {
  height: var(--cellHeigth);
  display: flex;
}

#scores #players .player .score {
  height: var(--cellHeigth);
  min-width: var(--cellWidth);
  border: solid white 1px;
  border-left: none;
}
#scores #players .score.current {
  background: rgba(255, 0, 0, 0.2);
}
/* Total scores */
#totalScores {
  width: 70px;
  background: var(--secondaryDarker);
}
#totalScores #title {
  height: var(--headerHeigth);
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid white 1px;
}
#totalScores .score {
  height: var(--cellHeigth);
  display: flex;
  align-items: center;
  justify-content: center;

  border: solid white 1px;
  font-weight: bold;
}

@media only screen and (max-device-width: 480px) {
  #playerNames {
    max-width: 50px;
  }
  #totalScores {
    width: 50px;
  }
  /* scrolling text */
  #playerNames .player .name {
    overflow: hidden;
    position: relative;
    width: 100px;
  }
  #playerNames .player .name span {
    position: absolute;
    text-align: left;
    height: 100%;
    line-height: var(--cellHeigth);
    /* Apply animation to this element */
    animation: scroll 8s ease-in infinite alternate;
  }
  /* Move it (define the animation) */
  @keyframes scroll {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
}
</style>
