import gamepreparation from './gamepreparation'
import turn from './turn'
import pins from './pins'
import gameprepheader from './gameprepheader'
import playerListCreator from './playerListCreator'
import playerTurn from './playerTurn'
import merge from 'deepmerge'

export default merge.all([gamepreparation, turn, pins, playerListCreator, gameprepheader, playerTurn])
