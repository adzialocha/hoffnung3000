import React from 'react'
import { connect } from 'react-redux'

import { logout } from '../actions/auth'

export default function withAuthState(WrappedComponent) {
  function mapStateToProps(state) {
    return {
      ...state.auth,
      ...state.user,
    }
  }

  return connect(mapStateToProps, { logout })(props => {
    return <WrappedComponent {...props} />
  })
}
