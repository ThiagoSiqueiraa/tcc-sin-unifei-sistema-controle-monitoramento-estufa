import { combineReducers } from 'redux'
import conditionals from './conditionals/reducer'
import devices from './devices/reducer'

export default combineReducers({
  conditionals,
  devices
})
