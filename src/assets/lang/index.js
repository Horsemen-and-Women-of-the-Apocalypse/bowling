import home from './home'
import turn from './turn'
import pins from './pins'
import merge from 'deepmerge'

export default merge.all([home, turn, pins])
