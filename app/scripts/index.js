import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter  } from 'react-router-redux'
import { createBrowserHistory } from 'history'

import configureStore from './store'
import Routes from './routes'
import { App } from './containers'
import { getItem, hasItem } from './utils/storage'
import { checkExistingToken } from './actions/auth'

const initialState = {}
const history = createBrowserHistory()
const store = configureStore(initialState, history)

if (hasItem('token') !== null) {
  store.dispatch(checkExistingToken(getItem('token')))
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Routes />
      </App>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
