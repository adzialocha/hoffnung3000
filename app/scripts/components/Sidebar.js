import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Drawer } from './'
import { logout } from '../actions/auth'
import { toggleSidebar } from '../actions/drawer'

class Sidebar extends Component {
  static propTypes = {
    firstname: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    isSidebarExpanded: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
  }

  static defaultProps = {
    firstname: '',
  }

  renderSidebarBottom() {
    if (this.props.isAuthenticated) {
      return (
        <div className="button-group">
          <button className="button" onClick={this.props.logout}>Logout</button>
        </div>
      )
    }

    return (
      <div className="button-group">
        <Link className="button" to="/login">Login</Link>
        <Link className="button" to="/register">Register</Link>
      </div>
    )
  }

  renderSidebarContent() {
    if (!this.props.isAuthenticated) {
      return (
        <section>
          <p>Welcome dear visitor,</p>
          <p>please <em>register</em> or <em>login</em> below to use the platform.</p>
        </section>
      )
    }

    return (
      <section>
        <p>Hi { this.props.firstname },</p>
        <p>welcome to the platform.</p>
      </section>
    )
  }

  renderSidebar() {
    return (
      <div className="sidebar">
        <div className="sidebar__content">
          { this.renderSidebarContent() }
        </div>
        <div className="sidebar__bottom">
          { this.renderSidebarBottom() }
        </div>
      </div>
    )
  }

  render() {
    const profileImageClasses = classnames(
      'profile-image', {
        'profile-image--active': this.props.isSidebarExpanded,
      }
    )

    return (
      <aside role="complementary">
        <button
          className="button button--clear navigation__toggle navigation__toggle--right"
          onClick={this.props.toggleSidebar}
        >
          <div className={profileImageClasses} />
        </button>

        <Drawer expanded={this.props.isSidebarExpanded} right={true}>
          { this.renderSidebar() }
        </Drawer>
      </aside>
    )
  }
}

function mapStateToProps(state) {
  const { isAuthenticated } = state.auth
  const { firstname } = state.user
  return {
    ...state.drawer,
    isAuthenticated,
    firstname,
  }
}

export default connect(
  mapStateToProps, {
    toggleSidebar,
    logout,
  }
)(Sidebar)
