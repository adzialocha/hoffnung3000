import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter  } from 'react-router-redux'
import { createBrowserHistory } from 'history'

import configureStore from './store'
import Routes from './routes'
import { App } from './containers'

const initialState = {}
const history = createBrowserHistory()
const store = configureStore(initialState, history)

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
