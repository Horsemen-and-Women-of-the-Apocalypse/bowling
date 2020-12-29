import home from './home'
import turn from './turn'
import PlayerListCreator from './PlayerListCreator'
import merge from 'deepmerge'

export default merge.all([home, turn, PlayerListCreator])
