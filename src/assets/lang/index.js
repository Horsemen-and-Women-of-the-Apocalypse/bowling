import home from './home'
import PlayerListCreator from './PlayerListCreator'
import merge from 'deepmerge'

export default merge.all([home, PlayerListCreator])
