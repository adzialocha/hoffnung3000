import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { toggleNavigation, toggleSidebar } from '../actions/drawer'

import {
  Drawer,
  NavigationLinks,
  Sidebar,
} from './'

class Navigation extends Component {
  static propTypes = {
    isNavigationExpanded: PropTypes.bool.isRequired,
    isSidebarExpanded: PropTypes.bool.isRequired,
    toggleNavigation: PropTypes.func.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
  }

  render() {
    const hamburgerClasses = classnames(
      'hamburger', {
        'hamburger--active': this.props.isNavigationExpanded,
      }
    )

    const profileImageClasses = classnames(
      'profile-image', {
        'profile-image--active': this.props.isSidebarExpanded,
      }
    )

    return (
      <nav className="navigation" role="navigation">
        <Drawer expanded={this.props.isNavigationExpanded}>
          <NavigationLinks />
        </Drawer>

        <button
          className="button button--clear navigation__toggle"
          onClick={this.props.toggleNavigation}
        >
          <div className={hamburgerClasses}>
            <div className="hamburger__line" />
            <div className="hamburger__line" />
            <div className="hamburger__line" />
          </div>
        </button>

        <button
          className="button button--clear navigation__toggle navigation__toggle--right"
          onClick={this.props.toggleSidebar}
        >
          <div className={profileImageClasses} />
        </button>

        <Drawer expanded={this.props.isSidebarExpanded} right={true}>
          <Sidebar />
        </Drawer>
      </nav>
    )
  }

  constructor(props) {
    super(props)
  }
}

function mapStateToProps(state) {
  return {
    ...state.drawer,
  }
}

export default connect(
  mapStateToProps, {
    toggleNavigation,
    toggleSidebar,
  }
)(Navigation)

