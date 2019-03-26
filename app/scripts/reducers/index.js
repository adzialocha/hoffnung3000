import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

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

export default history => combineReducers({
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
  router: connectRouter(history),
  slots,
  ticket,
  user,
  userStatus,
})
