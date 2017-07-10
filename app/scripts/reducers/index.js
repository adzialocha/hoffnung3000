import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'

import api from './api'
import auth from './auth'
import drawer from './drawer'
import flash from './flash'
import meta from './meta'
import page from './page'
import paginatedList from './paginatedList'
import resources from './resources'
import ticket from './ticket'
import user from './user'

const rootReducer = combineReducers({
  api,
  auth,
  drawer,
  flash,
  form,
  meta,
  page,
  paginatedList,
  resources,
  routing,
  ticket,
  user,
})

export default rootReducer
