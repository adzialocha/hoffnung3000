import React from 'react'
import { connect } from 'react-redux'

import { collapseAll, toggleNavigation, toggleSidebar } from '../actions/drawer'

export default function withDrawerState(WrappedComponent) {
  function mapStateToProps(state) {
    return {
      ...state.drawer,
    }
  }

  return connect(mapStateToProps, {
    collapseAll,
    toggleNavigation,
    toggleSidebar,
  })((props) => {
    return <WrappedComponent {...props} />
  })
}
