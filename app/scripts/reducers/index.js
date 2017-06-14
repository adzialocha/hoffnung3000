import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'

import adminPage from './adminPage'
import api from './api'
import auth from './auth'
import drawer from './drawer'
import page from './page'
import paginatedList from './paginatedList'
import user from './user'

const rootReducer = combineReducers({
  adminPage,
  api,
  auth,
  drawer,
  form: formReducer,
  page,
  paginatedList,
  routing,
  user,
})

export default rootReducer
