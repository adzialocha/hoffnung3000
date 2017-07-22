import React from 'react'
import { connect } from 'react-redux'

export default function withApiState(WrappedComponent) {
  function mapStateToProps(state) {
    return {
      ...state.api,
    }
  }

  return connect(mapStateToProps)((props) => {
    return <WrappedComponent {...props} />
  })
}
