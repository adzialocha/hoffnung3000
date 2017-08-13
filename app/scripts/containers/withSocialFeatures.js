import React from 'react'
import { connect } from 'react-redux'

import {
  requestRandomMeeting,
} from '../actions/meeting'

export default function withSocialFeatures(WrappedComponent) {
  function mapStateToProps(state) {
    return {
      ...state.meeting,
    }
  }

  const mapDispatchToProps = {
    requestRandomMeeting,
  }

  return connect(mapStateToProps, mapDispatchToProps)((props) => {
    return <WrappedComponent {...props} />
  })
}
