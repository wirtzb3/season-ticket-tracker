import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import matches from './matches-reducer'
import user from './user-reducer'

const rootReducer = combineReducers({
  matches,
  user,
  routing: routerReducer
})

export default rootReducer
