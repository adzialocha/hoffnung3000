import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter  } from 'react-router-redux'
import { createBrowserHistory } from 'history'

import configureStore from './store'
import Routes from './routes'
import { App } from './containers'
import { checkExistingToken } from './actions/auth'
import { getItem, hasItem } from './services/storage'
import flash from './actions/flash'

const initialState = {}
const history = createBrowserHistory()
const store = configureStore(initialState, history)

if (hasItem('token')) {
  store.dispatch(checkExistingToken(getItem('token')))
}

if (window.location.href.includes('?paypalSuccess')) {
  store.dispatch(
    flash({
      text: 'Thank you and welcome to HOFFNUNG 3000! You successfully created your participant account!',
      type: 'rainbow',
      lifetime: 30000,
    })
  )
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
