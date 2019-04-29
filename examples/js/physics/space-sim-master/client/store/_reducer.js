import {combineReducers} from '_utils/redux-plus'
import meta from './meta'
import camera from './camera'
import celestialObjects from './celestialObjects'

export default combineReducers({
  meta,
  camera,
  celestialObjects,
})
