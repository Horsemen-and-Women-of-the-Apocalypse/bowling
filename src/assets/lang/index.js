import home from './home'
import pins from './pins'
import merge from 'deepmerge'

export default merge.all([home, pins])
