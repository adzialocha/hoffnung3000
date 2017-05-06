import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import auth from './auth'
import drawer from './drawer'
import user from './user'

const rootReducer = combineReducers({
  auth,
  drawer,
  routing,
  user,
})

export default rootReducer
