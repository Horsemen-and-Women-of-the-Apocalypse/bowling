<template>
  <div id="ScoreBoard">
    <!-- Players col -->
    <div id="playerNames">
      <div id="curentTurnNumber">{{ curentTurn }}</div>
      <div
        v-for="(player, i) in game.getPlayers()"
        :key="i"
        :class="'player ' + (player.getName() == curentPlayer ? 'curent' : '')"
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
        <div class="turnNumber" v-for="turn in game.getTurn()" :key="turn">
          {{ turn }}
        </div>
      </div>
      <div id="players">
        <div class="player" v-for="(player, i) in game.getPlayers()" :key="i">
          <Score
            class="score"
            v-for="(turn, j) in game.getTurn()"
            :key="turn"
            :last="j == game.getTurn() - 1"
            :score="globalScore[player.getName()][j]"
          />
        </div>
      </div>
    </div>

    <!-- Total score col -->
    <div id="totalScores">
      <div id="title"><b>TOT</b></div>
      <div class="score" v-for="(player, i) in game.getPlayers()" :key="i">
      </div>
    </div>
  </div>
</template>

<script>
import Score from './Score'

export default {
  components: { Score },
  name: 'ScoreBoard',
  props: {
    game: { type: Object, requiered: true },
    curentPlayer: { type: String, default: null },
    curentTurn: { type: Number, default: null }
  },
  data () {
    return {
      globalScore: null
    }
  },
  created () {
    const playerScores = []

    this.game.getPlayers().forEach((p) => {
      const turns = []

      for (let i = 0; i < this.game.getTurn(); i++) {
        const score = {
          throws: [null, null, null],
          score: null
        }
        turns.push(score)
      }
      playerScores[p.getName()] = turns
    })

    this.globalScore = playerScores
  },
  methods: {
    registerThrow (playerName, turnNumber, throwNumber, pinsNumber) {
      if (
        this.game.getPlayers().find((p) => p.getName() === playerName) ===
        undefined
      ) {
        throw Error('Player not found')
      }
      if (turnNumber <= 0 || turnNumber > this.game.getTurn()) {
        throw Error('Invalid turn number')
      }
      if (
        throwNumber <= 0 ||
        (turnNumber === this.game.getTurn() && throwNumber > 3) ||
        (turnNumber < this.game.getTurn() && throwNumber > 2)
      ) {
        throw Error('Invalid throw number')
      }

      // Register throw
      this.globalScore[playerName][turnNumber - 1].throws[
        throwNumber - 1
      ] = pinsNumber

      // Calculate Score

      // TODO

      // Update total Score

      // TODO
    }
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

  user-select: none;
  border: solid black 1px;
  padding: 5px;
}
#playerNames .player.curent .turnNumber,
.player.curent .name {
  background: red;
  color: white;
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
  border-left: none;
  background: lightgray;
}
#scores #players .player {
  height: var(--cellHeigth);
  flex: 1;
  display: flex;
}
#scores #players .player .score {
  height: var(--cellHeigth);
  min-width: var(--cellWidth);
  border: solid black 1px;
  border-left: none;
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
