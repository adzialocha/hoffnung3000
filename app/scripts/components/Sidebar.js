import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import {
  Drawer,
  SidebarActivity,
  SidebarRandomMeeting,
  SidebarToggle,
} from './'

import { translate } from '../../../common/services/i18n'

import {
  withAuthState,
  withDrawerState,
  withUserStatus,
} from '../containers'

class Sidebar extends Component {
  static propTypes = {
    firstname: PropTypes.string,
    isActive: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isParticipant: PropTypes.bool.isRequired,
    isSidebarExpanded: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    unreadMessagesCount: PropTypes.number.isRequired,
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

  renderWelcome() {
    return (
      <div
        dangerouslySetInnerHTML={
          {
            __html: translate('components.sidebar.welcomeUser', {
              firstname: this.props.firstname,
            }),
          }
        }
      />
    )
  }

  renderActivity() {
    return (
      <div>
        <SidebarActivity />
        <div className="button-group">
          <Link className="button" to="/activity">
            {
              translate('components.sidebar.activityButton')
            }
          </Link>
        </div>
      </div>
    )
  }

  renderInbox() {
    return (
      <div className="button-group">
        <Link className="button" to="/inbox">
          {
            translate('components.sidebar.inboxButton', {
              count: this.props.unreadMessagesCount,
            })
          }
        </Link>
      </div>
    )
  }

  renderAuthenticatedContent() {
    const { isActive, isParticipant, isAdmin } = this.props

    if (isActive && (isParticipant || isAdmin)) {
      return (
        <section>
          <h5 className="sidebar__title">
            { translate('components.sidebar.activityTitle') }
          </h5>
          { this.renderActivity() }
          <br />
          { this.renderInbox() }
          <hr className="separator separator--white" />
          <h5 className="sidebar__title">
            { translate('components.sidebar.randomMeetingTitle') }
          </h5>
          <p>{ translate('components.sidebar.randomMeetingDescription' )}</p>
          <SidebarRandomMeeting />
        </section>
      )
    }

    return (
      <section>
        { this.renderWelcome() }
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

export default withAuthState(withDrawerState(withUserStatus(Sidebar)))
