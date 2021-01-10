import gamepreparation from './gamepreparation'
import turn from './turn'
import pins from './pins'
import gameprepheader from './gameprepheader'
import playerListCreator from './playerListCreator'
import playerTurn from './playerTurn'
import playerAnouncement from './playeranouncement'
import scoreBoard from './scoreBoard'
import game from './game'

import merge from 'deepmerge'

export default merge.all([
  gamepreparation,
  turn,
  game,
  pins,
  playerListCreator,
  gameprepheader,
  playerTurn,
  scoreBoard,
  playerAnouncement
])
