import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { toggleSidebar } from '../actions/drawer'

class SidebarToggle extends Component {
  static propTypes = {
    isSidebarExpanded: PropTypes.bool.isRequired,
    pendingRequests: PropTypes.number.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
  }

  render() {
    const hasPendingRequests = this.props.pendingRequests > 0
    const sidebarToggleClasses = classnames(
      'sidebar-toggle', {
        'sidebar-toggle--active': this.props.isSidebarExpanded,
        'sidebar-toggle--spinning': hasPendingRequests,
        'sidebar-toggle--notified': false,
      }
    )

    return (
      <button
        className="button button--clear navigation__toggle navigation__toggle--right"
        onClick={this.props.toggleSidebar}
      >
        <div className={sidebarToggleClasses} />
      </button>
    )
  }
}

function mapStateToProps(state) {
  return {
    isSidebarExpanded: state.drawer.isSidebarExpanded,
    pendingRequests: state.api.pendingRequests,
  }
}

export default connect(
  mapStateToProps, {
    toggleSidebar,
  }
)(SidebarToggle)
