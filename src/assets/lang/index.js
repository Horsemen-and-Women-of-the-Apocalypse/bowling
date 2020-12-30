import home from './home'
import turn from './turn'
import playerListCreator from './playerListCreator'
import merge from 'deepmerge'

export default merge.all([home, turn, playerListCreator])
