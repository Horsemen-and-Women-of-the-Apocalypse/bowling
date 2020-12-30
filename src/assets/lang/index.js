import home from './home'
import turn from './turn'
import pins from './pins'
import about from './about'
import playerListCreator from './playerListCreator'
import merge from 'deepmerge'

export default merge.all([home, turn, pins, playerListCreator, about])
