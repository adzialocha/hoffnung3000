import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { withDrawerState, withApiState, withUserStatus } from '../containers'

const SPINNER_TRESHOLD = 100

let timeout

class SidebarToggle extends Component {
  static propTypes = {
    isSidebarExpanded: PropTypes.bool.isRequired,
    pendingRequests: PropTypes.number.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    unreadMessagesCount: PropTypes.number.isRequired,
  }

  render() {
    const hasUnreadMessages = this.props.unreadMessagesCount > 0

    const sidebarToggleClasses = classnames(
      'sidebar-toggle', {
        'sidebar-toggle--active': this.props.isSidebarExpanded,
        'sidebar-toggle--spinning': this.state.hasPendingRequests,
        'sidebar-toggle--notified': hasUnreadMessages,
      }
    )

    return (
      <button
        className="button button--clear navigation__toggle navigation__toggle--right"
        onClick={this.props.toggleSidebar}
      >
        <div className={sidebarToggleClasses}>ORGANISE</div>
      </button>
    )
  }

  // @TODO: Update to modern React API
  /* eslint-disable-next-line camelcase */
  UNSAFE_componentWillUpdate(nextProps, nextState) {
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

  constructor(props) {
    super(props)

    this.state = {
      hasPendingRequests: false,
    }
  }
}

export default withApiState(withDrawerState(withUserStatus(SidebarToggle)))
