import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Drawer, SidebarToggle } from './'
import { translate } from '../services/i18n'
import { withUserState, withDrawerState } from '../containers'

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
        <Link className="button" to="/profile">
          { translate('components.sidebar.profileButton' )}
        </Link>
        <button className="button" onClick={this.props.logout}>
          { translate('components.sidebar.logoutButton' )}
        </button>
      </div>
    )
  }

  renderAuthenticatedContent() {
    const { firstname } = this.props

    return (
      <section>
        <div
          dangerouslySetInnerHTML={
            {
              __html: translate('components.sidebar.welcomeUser', { firstname }),
            }
          }
        />
        <hr className="separator separator--white" />
        <div className="button-group">
          <Link className="button" to="/inbox">
            { translate('components.sidebar.inboxButton', { count: 0 }) }
          </Link>
        </div>
      </section>
    )
  }

  renderSidebarContent() {
    if (!this.props.isAuthenticated) {
      return (
        <section>
          <div
            dangerouslySetInnerHTML={
              {
                __html: translate('components.sidebar.defaultHeader'),
              }
            }
          />
          <br />
          <p>{ translate('components.sidebar.signUpHeader' )}</p>
          <div className="button-group">
            <Link className="button" to="/register">
              { translate('components.sidebar.signUpButton' )}
            </Link>
          </div>
          <hr className="separator separator--white" />
          <p>{ translate('components.sidebar.visitorHeader' )}</p>
          <div className="button-group">
            <Link className="button" to="/tickets">
              { translate('components.sidebar.visitorButton' )}
            </Link>
          </div>
          <hr className="separator separator--white" />
          <p>{ translate('components.sidebar.loginHeader' )}</p>
          <div className="button-group">
            <Link className="button" to="/login">
              { translate('components.sidebar.loginButton' )}
            </Link>
          </div>
        </section>
      )
    }

    return this.renderAuthenticatedContent()
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

export default withUserState(withDrawerState(Sidebar))
