import React from 'react'
import { connect } from 'react-redux'

import { uploadImages } from '../actions/imageUpload'

export default function withImageUpload(WrappedComponent) {
  function mapStateToProps(state) {
    return {
      ...state.imageUpload,
    }
  }

  return connect(mapStateToProps, { uploadImages })((props) => {
    return <WrappedComponent {...props} />
  })
}
