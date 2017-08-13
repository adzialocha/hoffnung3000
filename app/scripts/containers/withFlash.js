import React from 'react'
import { connect } from 'react-redux'

import flash from '../actions/flash'

export default function withFlash(WrappedComponent) {
  return connect(null, {
    flash,
  })((props) => {
    return <WrappedComponent {...props} />
  })
}
