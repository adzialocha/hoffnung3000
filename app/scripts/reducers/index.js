import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import drawer from './drawer'

const rootReducer = combineReducers({
  routing,
  drawer,
})

export default rootReducer
