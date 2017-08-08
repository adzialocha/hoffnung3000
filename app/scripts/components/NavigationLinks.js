import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { translate } from '../../../common/services/i18n'

const PRIMARY_NAVIGATION = [
  { localeKey: 'home', url: '/' },
  { localeKey: 'about', url: '/pages/about' },
  { localeKey: 'calendar', url: '/calendar' },
]

const SECONDARY_NAVIGATION = [
  { localeKey: 'information', url: '/pages/information' },
  { localeKey: 'contact', url: '/pages/contact' },
]

const CURATION_NAVIGATION = [
  { localeKey: 'places', url: '/places' },
  { localeKey: 'resources', url: '/resources' },
]

const ADMIN_NAVIGATION = CURATION_NAVIGATION.concat([
  { localeKey: 'admin', url: '/admin' },
])

const PARTICIPANT_NAVIGATION = CURATION_NAVIGATION

const VISITOR_NAVIGATION = []

const DEFAULT_NAVIGATION = [
  { localeKey: 'tickets', url: '/tickets' },
]

class NavigationLinks extends Component {
  static propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    isParticipant: PropTypes.bool.isRequired,
    isVisitor: PropTypes.bool.isRequired,
  }

  renderNavigationItems(navigation) {
    return navigation.map((navigationItem, index) => {
      return (
        <li className="navigation-links__item" key={index}>
          <NavLink to={navigationItem.url}>
            { translate(
              `components.navigationLinks.${navigationItem.localeKey}`
            ) }
          </NavLink>
        </li>
      )
    })
  }

  renderNavigation(navigation) {
    return (
      <ul className="navigation-links">
        {
          this.renderNavigationItems(
            PRIMARY_NAVIGATION
              .concat(navigation)
              .concat(SECONDARY_NAVIGATION)
          )
        }
      </ul>
    )
  }

  render() {
    if (this.props.isAdmin) {
      return this.renderNavigation(ADMIN_NAVIGATION)
    } else if (this.props.isParticipant) {
      return this.renderNavigation(PARTICIPANT_NAVIGATION)
    } else if (this.props.isVisitor) {
      return this.renderNavigation(VISITOR_NAVIGATION)
    }
    return this.renderNavigation(DEFAULT_NAVIGATION)
  }
}

function mapStateToProps(state) {
  return {
    isAdmin: state.user.isAdmin,
    isParticipant: state.user.isParticipant && state.user.isActive,
    isVisitor: state.user.isVisitor && state.user.isActive,
  }
}

export default connect(
  mapStateToProps
)(NavigationLinks)
