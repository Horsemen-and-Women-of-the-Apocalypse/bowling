import gamepreparation from './gamepreparation'
import turn from './turn'
import pins from './pins'
import gameprepheader from './gameprepheader'
import playerListCreator from './playerListCreator'
import playerAnouncement from './playeranouncement.json'
import scoreBoard from './scoreBoard'
import playerTurn from './playerTurn'

import merge from 'deepmerge'

export default merge.all([
  gamepreparation,
  turn,
  pins,
  playerListCreator,
  gameprepheader,
  scoreBoard,
  playerAnouncement,
  playerTurn
])
