import '../styles/app.scss'

import moment from 'moment-timezone'
import React from 'react'
import { ConnectedRouter  } from 'react-router-redux'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import config from '../../common/config'
import configureStore from './store'
import flash from './actions/flash'
import Routes from './routes'
import { App } from './views'
import { checkExistingToken } from './actions/auth'
import { getItem, hasItem } from './services/storage'
import { translate } from '../../common/services/i18n'

moment.tz.setDefault(config.timezone)

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
