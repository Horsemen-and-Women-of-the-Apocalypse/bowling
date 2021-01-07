import gamepreparation from './gamepreparation'
import turn from './turn'
import pins from './pins'
import gameprepheader from './gameprepheader'
import playerListCreator from './playerListCreator'
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
  scoreBoard
])
