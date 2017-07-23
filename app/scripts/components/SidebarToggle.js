import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { withDrawerState, withApiState } from '../containers'

const SPINNER_TRESHOLD = 100

let timeout

class SidebarToggle extends Component {
  static propTypes = {
    isSidebarExpanded: PropTypes.bool.isRequired,
    pendingRequests: PropTypes.number.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
  }

  componentWillUpdate(nextProps, nextState) {
    const isPending = nextProps.pendingRequests > 0

    if (isPending && !nextState.hasPendingRequests) {
      timeout = setTimeout(() => {
        this.setState({
          hasPendingRequests: true,
        })
      }, SPINNER_TRESHOLD)
    } else if (!isPending && nextState.hasPendingRequests) {
      clearTimeout(timeout)

      this.setState({
        hasPendingRequests: false,
      })
    }
  }

  render() {
    const sidebarToggleClasses = classnames(
      'sidebar-toggle', {
        'sidebar-toggle--active': this.props.isSidebarExpanded,
        'sidebar-toggle--spinning': this.state.hasPendingRequests,
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

  constructor(props) {
    super(props)

    this.state = {
      hasPendingRequests: false,
    }
  }
}

export default withApiState(withDrawerState(SidebarToggle))
