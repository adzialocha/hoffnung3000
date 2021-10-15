import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import {
  Drawer,
  SidebarActivity,
  SidebarGifStream,
  SidebarRandomMeeting,
  SidebarToggle,
} from './'

import { translate } from '../../../common/services/i18n'

import {
  withAuthState,
  withConfig,
  withDrawerState,
  withUserStatus,
} from '../containers'

const ActivitySection = withConfig('isActivityStreamEnabled', () => {
  return (
    <Fragment>
      <h5 className="sidebar__title">
        { translate('components.sidebar.activityTitle') }
      </h5>

      <SidebarActivity />

      <div className="button-group">
        <Link className="button" to="/activity">
          { translate('components.sidebar.activityButton') }
        </Link>
      </div>
    </Fragment>
  )
})

const InboxSection = withConfig('isInboxEnabled', props => {
  return (
    <Fragment>
      <div className="button-group">
        <Link className="button" to="/inbox">
          {
            translate('components.sidebar.inboxButton', {
              count: props.unreadMessagesCount,
            })
          }
        </Link>
      </div>

      <hr className="separator separator--white" />
    </Fragment>
  )
})

const GifStreamSection = withConfig('gifStreamServerUrl', props => {
  return (
    <Fragment>
      <h5 className="sidebar__title">
        { translate('components.sidebar.gifStreamTitle') }
      </h5>

      <p>
        { translate('components.sidebar.gifStreamDescription' )}
        &nbsp;

        <Link to="/stream">
          { translate('components.sidebar.gifStreamLink' )}
        </Link>
      </p>

      <SidebarGifStream serverUrl={props.config.gifStreamServerUrl} />

      <hr className="separator separator--white" />
    </Fragment>
  )
})

const RandomMeetingSection = withConfig('isRandomMeetingEnabled', () => {
  return (
    <Fragment>

      <h5 className="sidebar__title">
        { translate('components.sidebar.randomMeetingTitle') }
      </h5>

      <p>{ translate('components.sidebar.randomMeetingDescription' )}</p>

      <SidebarRandomMeeting />

      <hr className="separator separator--white" />
    </Fragment>
  )
})

class Sidebar extends Component {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isParticipant: PropTypes.bool.isRequired,
    isSidebarExpanded: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    unreadMessagesCount: PropTypes.number.isRequired,
    username: PropTypes.string,
  }

  static defaultProps = {
    username: '',
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
              username: this.props.username,
            }),
          }
        }
      />
    )
  }

  renderAuthenticatedContent() {
    const { isActive, isParticipant, isAdmin, unreadMessagesCount } = this.props

    if (isActive && (isParticipant || isAdmin)) {
      return (
        <section>
          <ActivitySection />
          <br />
          <InboxSection unreadMessagesCount={unreadMessagesCount} />
          <GifStreamSection />
          <RandomMeetingSection />
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
