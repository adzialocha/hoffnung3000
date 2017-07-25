import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'

import api from './api'
import auth from './auth'
import drawer from './drawer'
import flash from './flash'
import imageUpload from './imageUpload'
import infiniteList from './infiniteList'
import meta from './meta'
import page from './page'
import paginatedList from './paginatedList'
import resources from './resources'
import slots from './slots'
import ticket from './ticket'
import user from './user'

const rootReducer = combineReducers({
  api,
  auth,
  drawer,
  flash,
  form,
  imageUpload,
  infiniteList,
  meta,
  page,
  paginatedList,
  resources,
  routing,
  slots,
  ticket,
  user,
})

export default rootReducer
