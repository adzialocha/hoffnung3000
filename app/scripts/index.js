import '../styles/app.scss'

import Modal from 'react-modal'
import React from 'react'
import { ConnectedRouter  } from 'connected-react-router'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { render } from 'react-dom'

import configureStore from './store'
import flash from './actions/flash'
import { checkExistingToken } from './actions/auth'
import { getItem, hasItem } from './services/storage'
import { translate } from '../../common/services/i18n'
import { updateMetaInformation } from './actions/meta'

import Routes from './routes'
import { App } from './views'

// @TODO
// moment.tz.setDefault(config.timezone)

Modal.setAppElement('#app')

const initialState = {}
const history = createBrowserHistory()
const store = configureStore(initialState, history)

// Get configuration from server
store.dispatch(updateMetaInformation())

// Check auth token validity when given
if (hasItem('token')) {
  store.dispatch(checkExistingToken(getItem('token')))
}

// Show message when user comes from PayPal checkout
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
