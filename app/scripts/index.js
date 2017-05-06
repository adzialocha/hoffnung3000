import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter  } from 'react-router-redux'
import { createBrowserHistory } from 'history'

import configureStore from './store'
import Routes from './routes'
import { App } from './containers'
import { getItem } from './utils/storage'
import { loginSuccess } from './actions/auth'

const initialState = {}
const history = createBrowserHistory()
const store = configureStore(initialState, history)

const token = getItem('token')
if (token !== null) {
  store.dispatch(loginSuccess(token))
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
