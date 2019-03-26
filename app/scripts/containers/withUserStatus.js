import React from 'react'
import { connect } from 'react-redux'

import { updateStatus } from '../actions/userStatus'

export default function withAuthState(WrappedComponent) {
  function mapStateToProps(state) {
    return {
      ...state.userStatus,
    }
  }

  return connect(mapStateToProps, { updateStatus })(props => {
    return <WrappedComponent {...props} />
  })
}
