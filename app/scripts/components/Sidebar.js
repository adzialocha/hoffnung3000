import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Drawer, SidebarToggle } from './'
import { logout } from '../actions/auth'

class Sidebar extends Component {
  static propTypes = {
    firstname: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    isSidebarExpanded: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
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
        <p>Big massive welcome to the platform! The tools for organising the festival will go live on the 29th of July, then you will be able to register equipment / spaces / skills / tools etc. and begin programming events. To help collaboration between participants we encourage you to start using the platform before the festival period starts. All events at HOFFNUNG 3000 are created by you, the participants ;-)</p>
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
    return (
      <aside role="complementary">
        <SidebarToggle />
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
    logout,
  }
)(Sidebar)
