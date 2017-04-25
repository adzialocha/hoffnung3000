import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'

import reducers from './reducers'

export default function configureStore(initialState, history) {
  const middleware = [
    thunk,
    createLogger(),
    routerMiddleware(history),
  ]
  const store = createStore(
    reducers,
    applyMiddleware(...middleware),
  )

  return store
}
