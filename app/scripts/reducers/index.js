import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import api from './api'
import auth from './auth'
import drawer from './drawer'
import flash from './flash'
import form from './form'
import imageUpload from './imageUpload'
import inbox from './inbox'
import infiniteList from './infiniteList'
import meeting from './meeting'
import meta from './meta'
import page from './page'
import paginatedList from './paginatedList'
import resources from './resources'
import slots from './slots'
import ticket from './ticket'
import user from './user'
import userStatus from './userStatus'

const rootReducer = combineReducers({
  api,
  auth,
  drawer,
  flash,
  form,
  imageUpload,
  inbox,
  infiniteList,
  meeting,
  meta,
  page,
  paginatedList,
  resources,
  routing,
  slots,
  ticket,
  user,
  userStatus,
})

export default rootReducer
