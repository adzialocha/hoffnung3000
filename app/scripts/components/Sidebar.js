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
    if (!this.props.isAuthenticated) {
      return null
    }

    return (
      <div className="button-group">
        <Link className="button" to="/profile">Profile</Link>
        <button className="button" onClick={this.props.logout}>Logout</button>
      </div>
    )
  }

  renderSidebarContent() {
    if (!this.props.isAuthenticated) {
      return (
        <section>
          <p>Welcome dear visitor,</p>
          <p>please <em>register</em> or <em>login</em> below to use the platform.</p>
          <br/>
          <p>Read our <Link className="link link--white" to="/pages/information">participant information</Link> to find out how to be part of the festival.</p>
          <div className="button-group">
            <Link className="button" to="/register">Register as participant</Link>
          </div>
          <hr className="separator separator--white" />
          <p>Or buy a visitor ticket to visit the festival. Read more here: <Link className="link link--white" to="/pages/information">visitor information</Link>.</p>
          <div className="button-group">
            <Link className="button" to="/tickets">Buy a visitor ticket</Link>
          </div>
          <hr className="separator separator--white" />
          <p>Already have a login?</p>
          <div className="button-group">
            <Link className="button" to="/login">Login</Link>
          </div>
        </section>
      )
    }

    return (
      <section>
        <p>Hi { this.props.firstname },</p>
        <p>Big massive welcome to the platform!</p>
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
