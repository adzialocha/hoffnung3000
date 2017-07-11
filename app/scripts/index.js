import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter  } from 'react-router-redux'
import { createBrowserHistory } from 'history'

import configureStore from './store'
import flash from './actions/flash'
import Routes from './routes'
import { App } from './containers'
import { checkExistingToken } from './actions/auth'
import { getItem, hasItem } from './services/storage'
import { translate } from './services/i18n'

const initialState = {}
const history = createBrowserHistory()
const store = configureStore(initialState, history)

if (hasItem('token')) {
  store.dispatch(checkExistingToken(getItem('token')))
}

if (window.location.href.includes('?paypalSuccess')) {
  store.dispatch(
    flash({
      lifetime: 30000,
      text: translate('flash.signUpPaypalSuccess'),
      type: 'rainbow',
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
