import gamePreparation from './gamepreparation'
import turn from './turn'
import pins from './pins'
import gamePrepheader from './gameprepheader'
import playerListCreator from './playerListCreator'
import playerTurn from './playerTurn'
import podium from './podium'
import playerAnouncement from './playeranouncement'
import scoreBoard from './scoreBoard'
import game from './game'
import gameEnd from './gameend'

import merge from 'deepmerge'

export default merge.all([
  gamePreparation,
  turn,
  pins,
  game,
  playerListCreator,
  gamePrepheader,
  playerTurn,
  podium,
  scoreBoard,
  playerAnouncement,
  gameEnd
])
