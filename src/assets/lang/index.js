import gamepreparation from './gamepreparation'
import turn from './turn'
import pins from './pins'
import header from './header'
import playerListCreator from './playerListCreator'
import merge from 'deepmerge'

export default merge.all([gamepreparation, turn, pins, playerListCreator, header])
