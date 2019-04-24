import React from 'react'
import { connect } from 'react-redux'

import {
  clearUploadedImages,
  removeImageFromList,
  uploadImages,
} from '../actions/imageUpload'

export default function withImageUpload(WrappedComponent) {
  function mapStateToProps(state) {
    return {
      ...state.imageUpload,
    }
  }

  const mapDispatchToProps = {
    clearUploadedImages,
    removeImageFromList,
    uploadImages,
  }

  return connect(mapStateToProps, mapDispatchToProps)(props => {
    return <WrappedComponent {...props} />
  })
}
