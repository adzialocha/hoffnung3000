import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { collapseAll, toggleNavigation, toggleSidebar } from '../actions/drawer'
import { Drawer, NavigationLinks, Sidebar } from './'

class Navigation extends Component {
  static propTypes = {
    collapseAll: PropTypes.func.isRequired,
    isNavigationExpanded: PropTypes.bool.isRequired,
    isSidebarExpanded: PropTypes.bool.isRequired,
    toggleNavigation: PropTypes.func.isRequired,
  }

  render() {
    const overlayClasses = classnames(
      'navigation__overlay', {
        'navigation__overlay--visible': (
          this.props.isSidebarExpanded || this.props.isNavigationExpanded
        ),
      }
    )

    const hamburgerClasses = classnames(
      'hamburger', {
        'hamburger--active': this.props.isNavigationExpanded,
      }
    )

    return (
      <nav className="navigation" role="navigation">
        <div
          className={overlayClasses}
          onClick={this.props.collapseAll}
        />
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
        <Sidebar />
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
    collapseAll,
    toggleNavigation,
    toggleSidebar,
  }
)(Navigation)
