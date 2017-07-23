import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'

import api from './middlewares/api'
import flash from './middlewares/flash'
import formErrorFlash from './middlewares/formErrorFlash'
import redirect from './middlewares/redirect'
import reducers from './reducers'

let store

export default function configureStore(initialState, history) {
  const middleware = [
    thunk,
    routerMiddleware(history),
    api,
    formErrorFlash,
    flash,
    redirect,
  ]

  if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger())
  }

  store = createStore(
    reducers,
    applyMiddleware(...middleware),
  )

  return store
}

export function getStore() {
  return store
}
